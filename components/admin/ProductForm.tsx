"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slug";
import { createProduct, updateProduct } from "@/app/admin/products/actions";
import type { Vegetable } from "@/lib/types";

const STORAGE_BUCKET = "product-images";

async function uploadImage(file: File, folder: string): Promise<string> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase isn't configured.");

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw new Error(error.message);

  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

const qualityPresets = ["Premium", "Grade A", "Standard", "Economy"];
const sizePresets = ["Small", "Medium", "Large"];
const unitPresets = ["kg", "bunch", "dozen", "piece", "gram", "box"];

export function ProductForm({ product }: { product?: Vegetable }) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [description, setDescription] = useState(product?.description ?? "");
  const [type, setType] = useState<"vegetable" | "fruit">(product?.type ?? "vegetable");
  const [category, setCategory] = useState(product?.category ?? "vegetable");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [unit, setUnit] = useState(product?.unit ?? "kg");
  const [quality, setQuality] = useState(product?.quality ?? "");
  const [size, setSize] = useState(product?.size ?? "");
  const [isImported, setIsImported] = useState(product?.is_imported ?? false);
  const [originCountry, setOriginCountry] = useState(product?.origin_country ?? "");
  const [isAvailable, setIsAvailable] = useState(product?.is_available ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [sortOrder, setSortOrder] = useState(product?.sort_order?.toString() ?? "0");

  const [coverUrl, setCoverUrl] = useState(product?.image_url ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryUrls, setGalleryUrls] = useState<string[]>(product?.gallery_urls ?? []);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const coverPreview = useObjectUrl(coverFile);
  const galleryPreviews = useObjectUrls(galleryFiles);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !slug.trim() || !price.trim()) {
      setError("Name, slug, and price are required.");
      return;
    }

    setSubmitting(true);
    try {
      let finalCoverUrl = coverUrl;
      if (coverFile) {
        finalCoverUrl = await uploadImage(coverFile, "covers");
      }

      let finalGalleryUrls = galleryUrls;
      if (galleryFiles.length > 0) {
        const uploaded = await Promise.all(
          galleryFiles.map((file) => uploadImage(file, "gallery"))
        );
        finalGalleryUrls = [...galleryUrls, ...uploaded];
      }

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        price: Number(price),
        unit: unit.trim() || "kg",
        category: category.trim() || "vegetable",
        type,
        quality: quality.trim() || null,
        size: size.trim() || null,
        is_imported: isImported,
        origin_country: originCountry.trim() || null,
        image_url: finalCoverUrl || null,
        gallery_urls: finalGalleryUrls,
        is_available: isAvailable,
        is_featured: isFeatured,
        sort_order: Number(sortOrder) || 0,
      };

      const result = isEdit
        ? await updateProduct(product!.id, payload)
        : await createProduct(payload);

      if (result.error) {
        setError(result.error);
        setSubmitting(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && (
        <p className="rounded-lg bg-tomato-500/10 px-4 py-3 text-sm text-tomato-600">{error}</p>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="URL slug" htmlFor="slug" required>
          <input
            id="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className={inputClass}
          />
        </Field>

        <Field label="Type" htmlFor="type">
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "vegetable" | "fruit")}
            className={inputClass}
          >
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
          </select>
        </Field>

        <Field label="Category" htmlFor="category">
          <input
            id="category"
            list="category-presets"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
            placeholder="vegetable, leafy, root..."
          />
          <datalist id="category-presets">
            <option value="vegetable" />
            <option value="leafy" />
            <option value="root" />
            <option value="citrus" />
            <option value="berry" />
            <option value="tropical" />
          </datalist>
        </Field>
      </section>

      <section>
        <Field label="Description" htmlFor="description">
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Field label="Price (Rs.)" htmlFor="price" required>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Unit" htmlFor="unit">
          <input
            id="unit"
            list="unit-presets"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={inputClass}
          />
          <datalist id="unit-presets">
            {unitPresets.map((u) => (
              <option key={u} value={u} />
            ))}
          </datalist>
        </Field>

        <Field label="Sort order" htmlFor="sort_order">
          <input
            id="sort_order"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={inputClass}
          />
        </Field>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Field label="Quality / freshness grade" htmlFor="quality">
          <input
            id="quality"
            list="quality-presets"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className={inputClass}
            placeholder="Premium, Grade A..."
          />
          <datalist id="quality-presets">
            {qualityPresets.map((q) => (
              <option key={q} value={q} />
            ))}
          </datalist>
        </Field>

        <Field label="Size" htmlFor="size">
          <input
            id="size"
            list="size-presets"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={inputClass}
            placeholder="Medium, 250g bunch..."
          />
          <datalist id="size-presets">
            {sizePresets.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </Field>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-lg border border-forest-100 px-4 py-3">
          <input
            id="is_imported"
            type="checkbox"
            checked={isImported}
            onChange={(e) => setIsImported(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="is_imported" className="text-sm font-medium text-forest-800">
            Imported produce (unchecked = local)
          </label>
        </div>

        <Field label="Origin country (optional)" htmlFor="origin_country">
          <input
            id="origin_country"
            value={originCountry}
            onChange={(e) => setOriginCountry(e.target.value)}
            className={inputClass}
            placeholder="e.g. China, Australia"
          />
        </Field>
      </section>

      <section className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-forest-800">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="h-4 w-4"
          />
          Available on the site
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-forest-800">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4"
          />
          Feature on homepage
        </label>
      </section>

      <section>
        <p className="mb-2 text-sm font-medium text-forest-800">Cover image</p>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-forest-50">
            {(coverPreview || coverUrl) && (
              <Image
                src={coverPreview ?? coverUrl}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                unoptimized={Boolean(coverPreview)}
              />
            )}
          </div>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
        </div>
      </section>

      <section>
        <p className="mb-2 text-sm font-medium text-forest-800">Gallery photos</p>
        <div className="flex flex-wrap gap-3">
          {galleryUrls.map((url) => (
            <div key={url} className="relative h-16 w-16 overflow-hidden rounded-lg bg-forest-50">
              <Image src={url} alt="" fill sizes="64px" className="object-cover" />
              <button
                type="button"
                onClick={() => setGalleryUrls((prev) => prev.filter((u) => u !== url))}
                className="absolute right-0 top-0 rounded-bl bg-black/60 px-1 text-xs text-white"
                aria-label="Remove image"
              >
                x
              </button>
            </div>
          ))}
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative h-16 w-16 overflow-hidden rounded-lg bg-forest-50">
              <Image
                src={galleryPreviews[i]}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => setGalleryFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute right-0 top-0 rounded-bl bg-black/60 px-1 text-xs text-white"
                aria-label="Remove image"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            setGalleryFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])])
          }
          className="mt-3 text-sm"
        />
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800 disabled:opacity-60"
        >
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Add product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-lg border border-forest-200 px-5 py-2.5 text-sm font-semibold text-forest-800 hover:border-forest-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-forest-200 px-3 py-2 text-sm text-forest-900 outline-none focus:border-forest-600";

function useObjectUrl(file: File | null): string | null {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  return url;
}

function useObjectUrls(files: File[]): string[] {
  const urls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  useEffect(() => () => { urls.forEach((url) => URL.revokeObjectURL(url)); }, [urls]);
  return urls;
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-forest-800">
        {label}
        {required && <span className="text-tomato-500"> *</span>}
      </label>
      {children}
    </div>
  );
}
