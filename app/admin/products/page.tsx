import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/admin/products";
import { ToggleCell } from "@/components/admin/ToggleCell";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { setAvailability, setFeatured, deleteProduct } from "@/app/admin/products/actions";

export const metadata: Metadata = { title: "Products" };
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-forest-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-forest-900 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
        >
          Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-center text-forest-600">
          No products yet.{" "}
          <Link href="/admin/products/new" className="underline">
            Add your first one
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-forest-100 bg-white">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-forest-100 text-xs uppercase tracking-wide text-forest-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Origin</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-forest-50">
                        {product.image_url && (
                          <Image
                            src={product.image_url}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-forest-900">{product.name}</p>
                        <p className="text-xs text-forest-500">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-forest-700">{product.type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        product.is_imported
                          ? "bg-carrot-400/20 text-carrot-600"
                          : "bg-leaf-400/20 text-leaf-600"
                      }`}
                    >
                      {product.is_imported ? "Imported" : "Local"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-forest-700">
                    Rs. {product.price.toLocaleString("en-PK")} / {product.unit}
                  </td>
                  <td className="px-4 py-3">
                    <ToggleCell
                      id={product.id}
                      initialValue={product.is_available}
                      action={setAvailability}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <ToggleCell
                      id={product.id}
                      initialValue={product.is_featured}
                      action={setFeatured}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-sm font-medium text-forest-700 hover:text-forest-900"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton
                        id={product.id}
                        name={product.name}
                        action={deleteProduct}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
