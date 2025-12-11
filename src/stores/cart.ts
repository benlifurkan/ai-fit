// src/stores/cart.ts
import { ref, computed, watch } from "vue";
import { products, type Product } from "@/data/products";

export interface CartItem {
  productId: number;
  quantity: number;
}

const STORAGE_KEY = "aifit_cart";

const cartItems = ref<CartItem[]>([]);

// LocalStorage'dan yükle
if (typeof window !== "undefined") {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        cartItems.value = parsed;
      }
    } catch (e) {
      console.error("Sepet verisi parse edilemedi:", e);
    }
  }
}

// Değiştikçe localStorage'a yaz
watch(
  cartItems,
  (val) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  { deep: true }
);

export function useCart() {
  const itemsWithProduct = computed(() => {
    return cartItems.value
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          ...item,
          product,
        } as { product: Product; productId: number; quantity: number };
      })
      .filter(Boolean) as {
      product: Product;
      productId: number;
      quantity: number;
    }[];
  });

  const totalQuantity = computed(() =>
    cartItems.value.reduce((sum, i) => sum + i.quantity, 0)
  );

  const totalPrice = computed(() =>
    itemsWithProduct.value.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    )
  );

  const addToCart = (productId: number, quantity = 1) => {
    const existing = cartItems.value.find((i) => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cartItems.value.push({ productId, quantity });
    }
  };

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((i) => i.productId !== productId);
  };

  const setQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find((i) => i.productId === productId);
    if (!item) return;
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  return {
    cartItems,
    itemsWithProduct,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
  };
}
