<template>
  <div
    class="shopping-page"
    :class="isDark ? 'shopping-page--dark' : 'shopping-page--light'"
  >
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1 shopping-title">
          Sepet ve Ödeme
        </h1>
        <p class="text-body-2 text-medium-emphasis shopping-subtitle">
          Sepetine eklediğin t-shirt'leri gözden geçir, adetlerini düzenle ve
          demo ödeme ile siparişini tamamla.
        </p>
      </div>
    </div>

    <!-- 🔐 Giriş yapılmadıysa -->
    <template v-if="!user">
      <v-card class="pa-6 text-center shopping-card" rounded="lg" elevation="4">
        <v-icon size="40" class="mb-3">mdi-lock</v-icon>
        <h2 class="text-h6 font-weight-bold mb-2">
          Sepetini görüntülemek ve satın alma işlemi yapmak için giriş
          yapmalısın
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Sepetin ve satın alma işlemin hesabına bağlı olarak
          <strong>Sepetim</strong> sayfasında saklanır.
        </p>
        <div class="d-flex justify-center ga-3 flex-wrap">
          <v-btn color="primary" to="/login">Giriş Yap</v-btn>
          <v-btn variant="outlined" to="/register">Kayıt Ol</v-btn>
        </div>
      </v-card>
    </template>

    <!-- 🧺 Giriş yapmış ama sepet boşsa -->
    <template v-else-if="itemsWithProduct.length === 0">
      <v-card class="pa-6 text-center shopping-card" rounded="lg" elevation="4">
        <v-icon size="40" class="mb-3">mdi-cart-off</v-icon>
        <h2 class="text-h6 font-weight-bold mb-2">Sepetin şu an boş.</h2>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Öneriler sayfasından veya ana sayfadan ürün ekleyebilirsin.
        </p>
        <div class="d-flex justify-center ga-3 flex-wrap">
          <v-btn color="primary" to="/recommendations">Öneriler</v-btn>
          <v-btn variant="outlined" to="/">Ana sayfa</v-btn>
        </div>
      </v-card>
    </template>

    <!-- 🛒 Sepet doluysa -->
    <template v-else>
      <v-row>
        <!-- Sol: Sepet ürünleri -->
        <v-col cols="12" md="8">
          <v-card class="pa-4 mb-4 shopping-card" elevation="2">
            <div class="d-flex align-center justify-space-between mb-3">
              <div class="text-subtitle-1 font-weight-medium">
                Sepetindeki Ürünler ({{ totalQuantity }} adet)
              </div>
              <v-btn size="small" variant="text" @click="handleClearCart">
                Sepeti boşalt
              </v-btn>
            </div>

            <v-divider class="mb-3 shopping-divider" />

            <v-row>
              <v-col
                v-for="item in itemsWithProduct"
                :key="item.productId"
                cols="12"
              >
                <v-card
                  class="mb-3 shopping-item-card"
                  variant="outlined"
                  rounded="lg"
                >
                  <v-row no-gutters>
                    <v-col cols="4" sm="3">
                      <v-img
                        :src="item.product.imageUrl"
                        height="120"
                        cover
                        class="shopping-item-image"
                      />
                    </v-col>
                    <v-col cols="8" sm="9">
                      <div class="pa-3 d-flex flex-column h-100">
                        <div class="d-flex justify-space-between mb-1">
                          <div>
                            <div class="text-body-1 font-weight-medium">
                              {{ item.product.name }}
                            </div>
                            <div
                              class="text-caption text-medium-emphasis shopping-item-category"
                            >
                              {{ item.product.category }}
                            </div>
                          </div>
                          <div class="text-body-1 font-weight-bold">
                            {{
                              formatPrice(item.product.price * item.quantity)
                            }}
                          </div>
                        </div>

                        <div
                          class="d-flex align-center justify-space-between mt-auto"
                        >
                          <!-- Adet kontrol -->
                          <div class="d-flex align-center ga-2">
                            <span class="text-caption text-medium-emphasis">
                              Adet
                            </span>
                            <v-btn
                              icon
                              size="x-small"
                              variant="outlined"
                              class="shopping-qty-btn"
                              @click="decreaseQuantity(item.productId)"
                            >
                              <v-icon size="16">mdi-minus</v-icon>
                            </v-btn>
                            <span class="text-body-2">
                              {{ item.quantity }}
                            </span>
                            <v-btn
                              icon
                              size="x-small"
                              variant="outlined"
                              class="shopping-qty-btn"
                              @click="increaseQuantity(item.productId)"
                            >
                              <v-icon size="16">mdi-plus</v-icon>
                            </v-btn>
                          </div>

                          <v-btn
                            size="small"
                            variant="text"
                            color="red"
                            class="shopping-remove-btn"
                            @click="removeFromCart(item.productId)"
                          >
                            <v-icon size="16" start>mdi-delete</v-icon>
                            Kaldır
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Sağ: Ödeme özeti -->
        <v-col cols="12" md="4">
          <v-card
            class="pa-4 shopping-card shopping-summary-card"
            elevation="2"
          >
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="text-subtitle-1 font-weight-medium">
                Sipariş Özeti
              </div>
              <v-chip
                size="x-small"
                variant="outlined"
                class="shopping-summary-chip"
              >
                Demo Ödeme
              </v-chip>
            </div>

            <v-divider class="mb-3 shopping-divider" />

            <div class="d-flex justify-space-between mb-1 text-body-2">
              <span>Ürün toplamı</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-1 text-body-2">
              <span>Kargo</span>
              <span>Ücretsiz</span>
            </div>

            <v-divider class="my-3 shopping-divider" />
            <div class="d-flex justify-space-between mb-4 text-subtitle-1">
              <span>Genel Toplam</span>
              <span class="font-weight-bold">
                {{ formatPrice(totalPrice) }}
              </span>
            </div>

            <!-- Sahte ödeme formu -->
            <v-form @submit.prevent="handleCheckout">
              <v-text-field
                v-model="fullName"
                label="Ad Soyad"
                prepend-icon="mdi-account"
                class="mb-2 shopping-input"
                required
              />
              <v-text-field
                v-model="address"
                label="Teslimat Adresi"
                prepend-icon="mdi-home-map-marker"
                class="mb-2 shopping-input"
                required
              />
              <v-text-field
                v-model="cardNumber"
                label="Kart Numarası (demo)"
                prepend-icon="mdi-credit-card-outline"
                class="mb-4 shopping-input"
                required
              />

              <v-btn
                type="submit"
                color="primary"
                block
                class="shopping-pay-btn"
                :disabled="!canCheckout || isSubmitting"
                :loading="isSubmitting"
              >
                Satın Al
              </v-btn>
            </v-form>

            <p class="text-caption text-medium-emphasis mt-3 shopping-note">
              Bu, yalnızca demo amaçlı sahte bir ödeme ekranıdır. Gerçek bir
              ödeme işlemi yapılmaz.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { currentUser } from "@/stores/auth";
import { useCart } from "@/stores/cart";
import { toast } from "vue-sonner";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const user = computed(() => currentUser.value);

const {
  itemsWithProduct,
  totalQuantity,
  totalPrice,
  removeFromCart,
  setQuantity,
  clearCart,
} = useCart();

const fullName = ref(user.value?.name || "");
const address = ref("");
const cardNumber = ref("");

const isSubmitting = ref(false);

const canCheckout = computed(() => {
  return (
    itemsWithProduct.value.length > 0 &&
    !!fullName.value.trim() &&
    !!address.value.trim() &&
    !!cardNumber.value.trim()
  );
});

const formatPrice = (price: number) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  });
};

const increaseQuantity = (productId: number) => {
  const item = itemsWithProduct.value.find((i) => i.productId === productId);
  if (!item) return;
  setQuantity(productId, item.quantity + 1);
};

const decreaseQuantity = (productId: number) => {
  const item = itemsWithProduct.value.find((i) => i.productId === productId);
  if (!item) return;
  setQuantity(productId, item.quantity - 1);
};

const handleClearCart = () => {
  clearCart();
  toast("Sepet boşaltıldı.", {
    description: "Tüm ürünler sepetten kaldırıldı.",
  });
};

const handleCheckout = async () => {
  if (!canCheckout.value || !user.value) return;

  try {
    isSubmitting.value = true;

    const payload = {
      userId: user.value.id,
      fullName: fullName.value.trim(),
      address: address.value.trim(),
      cardLast4: cardNumber.value.trim().slice(-4),
      items: itemsWithProduct.value.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
      totalPrice: totalPrice.value,
    };

    // Express backend (server/index.cjs)
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Sipariş oluşturulamadı.");
    }

    const orderId = data.order?.id ?? data.orderId ?? "—";

    toast.success("Satın alma tamamlandı ✅", {
      description: `Sipariş numaran: ${orderId}. Teşekkür ederiz!`,
      duration: 3500,
    });

    clearCart();
    address.value = "";
    cardNumber.value = "";
  } catch (err: any) {
    console.error("Checkout error:", err);
    toast.error("Satın alma başarısız ❌", {
      description: err?.message || "Lütfen tekrar dene.",
      duration: 4000,
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.shopping-page {
  max-width: 1200px;
  margin: 0 auto;
  transition: background-color 0.25s ease, color 0.25s ease;
}

/* ROOT THEME --------------------------------------------------------- */

.shopping-page--light {
  color: #111827;
}

.shopping-page--dark {
  color: #e5e7eb;
}

/* Başlık + açıklama -------------------------------------------------- */

.shopping-title {
  /* renk root'tan geliyor */
}

.shopping-subtitle {
  color: #6b7280;
}

.shopping-page--dark .shopping-subtitle {
  color: #9ca3af;
}

/* Kartların ortak stili ---------------------------------------------- */

.shopping-card {
  border-radius: 18px;
  transition: box-shadow 0.2s ease, border-color 0.2s ease,
    background-color 0.2s ease;
}

/* LIGHT MODE kart görünümü */
.shopping-page--light .shopping-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
}

/* DARK MODE kart görünümü */
.shopping-page--dark .shopping-card {
  background: radial-gradient(circle at top, #0b1120 0, #020617 70%);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.95);
}

/* Dark modda “medium-emphasis” yazıları biraz açalım */
.shopping-page--dark .shopping-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* Divider ------------------------------------------------------------- */

.shopping-divider {
  border-color: rgba(148, 163, 184, 0.5) !important;
}

/* ÜRÜN KARTLARI ------------------------------------------------------ */

.shopping-item-card {
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease, background-color 0.18s ease;
}

/* Light item */
.shopping-page--light .shopping-item-card {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

/* Dark item */
.shopping-page--dark .shopping-item-card {
  background-color: #020617;
  border-color: rgba(51, 65, 85, 0.9);
}

.shopping-item-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.7);
  border-color: rgba(56, 189, 248, 0.9);
}

.shopping-item-image {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}

.shopping-item-category {
  opacity: 0.9;
}

/* Adet butonları ----------------------------------------------------- */

.shopping-qty-btn {
  min-width: 26px !important;
  height: 26px !important;
  border-radius: 999px !important;
  border-color: rgba(148, 163, 184, 0.75) !important;
}

/* Ödeme kartı -------------------------------------------------------- */

.shopping-summary-card {
  position: sticky;
  top: 90px;
}

/* Sağdaki ödeme kartını biraz daha “highlight” yapalım */
.shopping-page--dark .shopping-summary-card {
  background: radial-gradient(circle at top, #111827 0, #020617 80%);
  border-color: rgba(59, 130, 246, 0.6);
}

/* “Demo ödeme” chip’i */
.shopping-summary-chip {
  border-color: rgba(96, 165, 250, 0.9) !important;
  color: #1d4ed8 !important;
  background-color: rgba(219, 234, 254, 0.8) !important;
}

.shopping-page--dark .shopping-summary-chip {
  border-color: rgba(56, 189, 248, 0.9) !important;
  color: #e0f2fe !important;
  background-color: rgba(15, 23, 42, 0.9) !important;
}

/* Input alanları ----------------------------------------------------- */

.shopping-input :deep(.v-field) {
  border-radius: 12px;
}

/* Satın al butonu ---------------------------------------------------- */

.shopping-pay-btn {
  border-radius: 999px;
}

/* Alt not ------------------------------------------------------------ */

.shopping-note {
  line-height: 1.5;
  opacity: 0.9;
}

/* 🔥 DARK MODE'DA YAZILARI ZORLA AÇIK RENK YAPALIM */

/* Kartların içindeki tüm temel text sınıflarını override et */
.shopping-page--dark .shopping-card,
.shopping-page--dark .shopping-card .text-body-1,
.shopping-page--dark .shopping-card .text-body-2,
.shopping-page--dark .shopping-card .text-subtitle-1,
.shopping-page--dark .shopping-card .text-subtitle-2,
.shopping-page--dark .shopping-card .text-caption {
  color: #e5e7eb !important; /* açık gri / nerdeyse beyaz */
}

/* Medium-emphasis olanlar biraz daha soluk olsun */
.shopping-page--dark .shopping-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* “Kaldır”, “Sepeti boşalt” gibi kırmızı linkler yine kırmızı kalsın */
.shopping-page--dark .shopping-remove-btn {
  color: #f87171 !important;
}
</style>
