<template>
  <div
    class="favorites-page"
    :class="isDark ? 'favorites-page--dark' : 'favorites-page--light'"
  >
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1">Favori Ürünlerin</h1>
        <p class="text-body-2 text-medium-emphasis">
          Beğendiğin t-shirt'leri burada hızlıca bulup tekrar deneyebilirsin.
        </p>
      </div>

      <v-chip
        v-if="user"
        color="primary"
        variant="flat"
        size="small"
        prepend-icon="mdi-heart"
      >
        Toplam {{ favoriteProducts.length }} favori
      </v-chip>
    </div>

    <!-- Kullanıcı giriş yapmamışsa -->
    <template v-if="!user">
      <v-card class="pa-4 favorites-card" elevation="3">
        <div class="d-flex align-center">
          <v-icon class="mr-3" color="primary">mdi-information</v-icon>
          <div>
            <div class="text-subtitle-2 font-weight-medium mb-1">
              Oturum Açmanız Gerekiyor
            </div>
            <div class="text-body-2 text-medium-emphasis">
              Favori ürünlerini görebilmek için lütfen
              <RouterLink to="/login">giriş yap</RouterLink>.
            </div>
          </div>
        </div>
      </v-card>
    </template>

    <!-- Kullanıcı giriş yapmış ama favoriler hala yükleniyorsa -->
    <template v-else-if="!isLoaded">
      <v-card class="pa-4 favorites-card" elevation="2">
        <div class="d-flex align-center">
          <v-progress-circular indeterminate size="22" class="mr-3" />
          <div class="text-body-2 text-medium-emphasis">
            Favori ürünlerin yükleniyor...
          </div>
        </div>
      </v-card>
    </template>

    <!-- Kullanıcı giriş yapmış ama favorisi yoksa -->
    <template v-else-if="favoriteProducts.length === 0">
      <v-card class="pa-4 favorites-card" elevation="3">
        <div class="d-flex align-start">
          <v-icon class="mr-3" color="primary">mdi-heart-outline</v-icon>
          <div>
            <div class="text-subtitle-2 font-weight-medium mb-1">
              Henüz favorin yok
            </div>
            <div class="text-body-2 text-medium-emphasis">
              Beğendiğin ürünleri kalp ikonuna tıklayarak favorilerine
              ekleyebilirsin.
            </div>
          </div>
        </div>
      </v-card>
    </template>

    <!-- Favoriler listesi -->
    <template v-else>
      <div class="text-body-2 text-medium-emphasis mb-3">
        Aşağıda, favorilerine eklediğin t-shirt'leri görüyorsun.
      </div>

      <v-row align="stretch">
        <v-col
          v-for="p in favoriteProducts"
          :key="p.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="favorite-card favorites-card" elevation="3">
            <v-img :src="p.imageUrl" height="260" cover class="favorite-image">
              <template #placeholder>
                <div
                  class="d-flex align-center justify-center fill-height text-medium-emphasis text-caption"
                >
                  Görsel yükleniyor...
                </div>
              </template>

              <div class="favorite-chip-wrapper">
                <v-chip
                  size="x-small"
                  color="red"
                  variant="flat"
                  prepend-icon="mdi-heart"
                >
                  Favori
                </v-chip>
              </div>
            </v-img>

            <v-card-item>
              <v-card-title class="text-subtitle-1 font-weight-medium">
                {{ p.name }}
              </v-card-title>
              <v-card-subtitle class="text-caption text-medium-emphasis">
                {{ p.category }} • <strong>{{ formatPrice(p.price) }}</strong>
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="favorite-desc text-body-2 text-medium-emphasis">
              {{ p.description }}
            </v-card-text>

            <v-card-actions
              class="justify-space-between align-center px-4 pb-4 favorite-actions"
            >
              <div class="text-caption text-medium-emphasis">
                Favorilerinden biri
              </div>

              <div class="d-flex align-center ga-2">
                <v-btn
                  icon
                  variant="text"
                  class="favorite-icon-btn"
                  @click.stop="toggleFavorite(p.id)"
                >
                  <v-icon :color="isFavorite(p.id) ? '#f44336' : undefined">
                    {{ isFavorite(p.id) ? "mdi-heart" : "mdi-heart-outline" }}
                  </v-icon>
                </v-btn>

                <v-btn
                  color="primary"
                  variant="flat"
                  class="favorite-cta-btn"
                  @click="goTryOn(p)"
                >
                  AR Dene
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { products, type Product } from "@/data/products";
import { selectedProduct } from "@/stores/products";
import { useFavorites } from "@/composables/useFavorites";
import { useThemeStore } from "@/stores/theme";

const router = useRouter();
const { user, favoriteProductIds, isFavorite, toggleFavorite, isLoaded } =
  useFavorites();

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const favoriteProducts = computed<Product[]>(() => {
  if (!favoriteProductIds.value.length) return [];
  return products.filter((p) => favoriteProductIds.value.includes(p.id));
});

const formatPrice = (price: number) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  });
};

const goTryOn = (product: Product) => {
  selectedProduct.value = product;
  router.push({ name: "try-on" });
};
</script>

<style scoped>
.favorites-page {
  max-width: 1100px;
  margin: 0 auto;
  transition: color 0.25s ease, background-color 0.25s ease;
}

/* Tema bazlı root renkleri */
.favorites-page--light {
  color: #111827;
}

.favorites-page--dark {
  color: #e5e7eb;
}

/* Ortak kart stili -------------------------------------------------- */

.favorites-card {
  border-radius: 16px;
  overflow: hidden;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease, transform 0.18s ease;
}

/* Light mod kart görünümü */
.favorites-page--light .favorites-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

/* Dark mod kart görünümü */
.favorites-page--dark .favorites-card {
  background: radial-gradient(circle at top, #020617 0, #020617 70%);
  border: 1px solid rgba(148, 163, 184, 0.55);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.95);
}

/* Dark modda Vuetify'nin siyah textlerini override et */
.favorites-page--dark .favorites-card,
.favorites-page--dark .favorites-card .text-body-1,
.favorites-page--dark .favorites-card .text-body-2,
.favorites-page--dark .favorites-card .text-subtitle-1,
.favorites-page--dark .favorites-card .text-subtitle-2,
.favorites-page--dark .favorites-card .text-caption {
  color: #e5e7eb !important;
}

.favorites-page--dark .favorites-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* Kart spesifik stiller -------------------------------------------- */

.favorite-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.favorite-image {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

/* Hover efekti */
.favorites-page--dark .favorite-card:hover,
.favorites-page--light .favorite-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.85);
}

.favorite-chip-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;
}

.favorite-desc {
  flex-grow: 1;
}

.favorite-actions {
  border-top: 1px solid rgba(30, 64, 175, 0.4);
}

.favorite-cta-btn {
  border-radius: 999px;
}

.favorite-icon-btn {
  color: inherit !important;
}

/* Favori ikonu - her zaman kırmızı */
.favorite-icon-btn :deep(.v-icon[style*="f44336"]),
.favorite-icon-btn :deep(.v-icon[color="#f44336"]) {
  color: #f44336 !important;
}
</style>
