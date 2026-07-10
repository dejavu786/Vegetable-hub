export type ProductType = "vegetable" | "fruit";

export type Vegetable = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  unit: string;
  category: string;
  type: ProductType;
  quality: string | null;
  size: string | null;
  is_imported: boolean;
  origin_country: string | null;
  image_url: string | null;
  gallery_urls: string[];
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

/** Fields the admin form collects; `id`/`created_at` are server-assigned. */
export type VegetableInput = Omit<Vegetable, "id" | "created_at">;
