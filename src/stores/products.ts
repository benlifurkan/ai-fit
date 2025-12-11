// src/stores/products.ts
import { ref } from "vue";
import type { Product } from "@/data/products";

export const selectedProduct = ref<Product | null>(null);

export function setSelectedProduct(product: Product | null) {
  selectedProduct.value = product;
}
