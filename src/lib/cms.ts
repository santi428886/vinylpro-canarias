/**
 * CMS / Stripe integration hooks — prepared for future expansion.
 *
 * Replace `getProducts()` with a CMS fetch (Sanity, Contentful, etc.)
 * or a database query when ready. The Product type in @/types/product
 * is the canonical schema.
 */

import { allProducts, getProductBySlug, filterProducts } from "./products";
import type { Product, ProductFilters } from "@/types/product";

export type ProductRepository = {
  getAll: () => Promise<Product[]>;
  getBySlug: (slug: string) => Promise<Product | undefined>;
  filter: (filters: ProductFilters) => Promise<Product[]>;
};

/** Default in-memory repository backed by product-seeds.json */
export const productRepository: ProductRepository = {
  getAll: async () => allProducts,
  getBySlug: async (slug) => getProductBySlug(slug),
  filter: async (filters) => filterProducts(allProducts, filters),
};

/** Stripe checkout placeholder — wire up when payment is enabled */
export type CheckoutSession = {
  productSlug: string;
  squareMeters: number;
  totalEstimate: number;
};

export async function createCheckoutSession(
  _session: CheckoutSession,
): Promise<{ url: string } | null> {
  // Future: integrate Stripe Checkout
  return null;
}
