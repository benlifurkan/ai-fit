<template>
  <div class="home-root">
    <!-- HERO BÖLÜMÜ -->
    <section class="mb-8">
      <v-sheet
        rounded="xl"
        elevation="4"
        class="hero-sheet pa-6 pa-md-8 d-flex flex-column"
        :class="[
          'pa-6 pa-md-8 d-flex flex-column',
          isDark ? 'hero-sheet--dark' : 'hero-sheet--light',
        ]"
      >
        <v-row align="center" justify="space-between" no-gutters>
          <!-- Sol taraf: metin + CTA -->
          <v-col cols="12" md="6" class="pr-md-6 mb-6 mb-md-0">
            <div class="d-flex align-center ga-2 mb-3">
              <v-chip
                size="small"
                color="primary"
                variant="flat"
                prepend-icon="mdi-shimmer"
              >
                Fotoğrafınla AR deneme
              </v-chip>
              <v-chip
                size="small"
                variant="outlined"
                class="hidden-sm-and-down hero-chip-outlined"
              >
                AI destekli t-shirt seçimi
              </v-chip>
            </div>

            <h1 class="text-h4 text-md-h3 font-weight-bold mb-3 hero-title">
              Stilini, bedenine en iyi uyan t-shirt’le birleştir.
            </h1>

            <p
              class="text-body-2 text-md-body-1 text-medium-emphasis mb-6 hero-text"
            >
              AI-Fit; boy, kilo, vücut tipi, ten ve saç rengine göre sana en
              uygun t-shirt’leri önerir, seçtiğin ürünü
              <strong>AI Try-On</strong> ile kendi fotoğrafın üzerinde gösterir.
            </p>

            <div class="d-flex flex-wrap ga-3 mb-4">
              <v-btn
                color="primary"
                size="large"
                class="elevation-2 hero-primary-btn"
                to="/recommendations"
              >
                Bana özel öneriler
              </v-btn>
              <v-btn
                variant="outlined"
                size="large"
                class="hero-secondary-btn"
                to="/try-on"
              >
                Sadece AR denemek istiyorum
              </v-btn>
            </div>

            <div class="d-flex ga-4 text-caption hero-meta">
              <div class="d-flex align-center ga-1">
                <v-icon size="18">mdi-tshirt-crew</v-icon>
                <span>{{ products.length }}+ t-shirt</span>
              </div>
              <div class="d-flex align-center ga-1 hidden-sm-and-down">
                <v-icon size="18">mdi-magic-staff</v-icon>
                <span>Gerçek bedenine göre öneriler</span>
              </div>
            </div>
          </v-col>

          <!-- Sağ taraf: ürün vitrini mockup -->
          <v-col cols="12" md="6" class="pl-md-4">
            <div class="hero-preview-wrapper d-flex justify-center">
              <v-sheet
                rounded="xl"
                class="hero-preview elevation-3 pa-4 d-flex flex-column"
              >
                <div class="d-flex justify-space-between align-center mb-3">
                  <div class="d-flex align-center ga-2">
                    <v-avatar size="28" color="primary">
                      <v-icon size="20">mdi-account-outline</v-icon>
                    </v-avatar>
                    <div class="text-caption">
                      <div class="font-weight-medium hero-preview-title">
                        Senin için seçildi
                      </div>
                      <div class="text-medium-emphasis hero-preview-subtitle">
                        AI öneri vitrini
                      </div>
                    </div>
                  </div>
                  <v-chip
                    size="x-small"
                    variant="outlined"
                    class="hero-chip-outlined"
                  >
                    Canlı önizleme
                  </v-chip>
                </div>

                <v-divider class="mb-3 hero-divider" />

                <div v-if="highlightProduct" class="d-flex ga-3">
                  <v-img
                    :src="highlightProduct.imageUrl"
                    height="140"
                    width="140"
                    cover
                    class="rounded-lg hero-preview-image"
                  />
                  <div class="d-flex flex-column justify-space-between flex-1">
                    <div>
                      <div
                        class="text-body-2 font-weight-medium mb-1 hero-preview-name"
                      >
                        {{ highlightProduct.name }}
                      </div>
                      <div
                        class="text-caption text-medium-emphasis mb-2 hero-preview-meta"
                      >
                        {{ highlightProduct.category }} •
                        {{ formatPrice(highlightProduct.price) }}
                      </div>
                      <div
                        class="text-caption text-medium-emphasis two-lines hero-preview-desc"
                      >
                        {{ highlightProduct.description }}
                      </div>
                    </div>

                    <div class="d-flex ga-2 mt-3 align-center">
                      <v-btn
                        size="small"
                        variant="outlined"
                        class="hero-secondary-btn"
                        @click="goToTryOn(highlightProduct)"
                      >
                        Fotoğrafımla dene
                      </v-btn>

                      <!-- Hero'da sepete ekle icon buton -->
                      <v-btn
                        icon
                        variant="text"
                        class="hero-icon-btn"
                        @click="handleAddToCart(highlightProduct)"
                      >
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="d-flex flex-column align-center justify-center text-center py-6 hero-empty"
                >
                  <v-icon size="40" class="mb-2">mdi-tshirt-crew</v-icon>
                  <div class="text-body-2 mb-1">
                    Ürünler hazır, seni bekliyor.
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    Aşağıdan koleksiyona göz at, beğendiğini AR ile dene.
                  </div>
                </div>
              </v-sheet>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </section>

    <!-- ÜRÜN LİSTESİ + FİLTRELER -->
    <section>
      <v-sheet rounded="xl" elevation="2" class="pa-4 pa-md-5 product-shell">
        <div
          class="d-flex flex-column flex-md-row align-center justify-space-between ga-3 mb-4"
        >
          <div>
            <h2 class="text-subtitle-1 font-weight-medium mb-1 product-title">
              Koleksiyonu Keşfet
            </h2>
            <p class="text-caption text-medium-emphasis mb-0 product-subtitle">
              Aşağıda ürünleri filtreleyebilir, arama yapabilir ve
              <strong>AR Dene</strong> ile istediğini deneyebilirsin.
            </p>
          </div>

          <div class="filters-right d-flex align-center ga-3 flex-wrap">
            <v-text-field
              v-model="search"
              density="comfortable"
              variant="outlined"
              hide-details
              clearable
              class="search-field"
              placeholder="T-shirt ara (isim, etiket...)"
              prepend-inner-icon="mdi-magnify"
            />
            <v-chip
              size="small"
              variant="outlined"
              class="text-caption product-chip-outlined"
            >
              {{ filteredProducts.length }} sonuç
            </v-chip>
          </div>
        </div>

        <div class="d-flex flex-wrap ga-2 mb-4 align-center">
          <span
            class="text-caption text-medium-emphasis mr-2 product-filter-label"
          >
            Kategori:
          </span>

          <v-chip
            :color="!selectedCategory ? 'primary' : undefined"
            :variant="!selectedCategory ? 'flat' : 'outlined'"
            size="small"
            class="product-filter-chip"
            @click="toggleCategory(null)"
          >
            Tümü
          </v-chip>

          <v-chip
            v-for="cat in allCategories"
            :key="cat"
            :color="selectedCategory === cat ? 'primary' : undefined"
            :variant="selectedCategory === cat ? 'flat' : 'outlined'"
            size="small"
            class="product-filter-chip"
            @click="toggleCategory(cat)"
          >
            {{ cat }}
          </v-chip>

          <v-spacer />
          <v-btn
            variant="text"
            size="small"
            class="text-caption product-reset-btn"
            @click="resetFilters"
          >
            Filtreleri temizle
          </v-btn>
        </div>

        <v-divider class="mb-4 product-divider" />

        <v-row dense>
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            lg="4"
            class="mb-4"
          >
            <v-card
              class="product-card h-100 d-flex flex-column"
              rounded="xl"
              elevation="1"
            >
              <v-img
                :src="product.imageUrl"
                height="200"
                cover
                class="product-image"
              />

              <v-card-item>
                <v-card-title
                  class="text-subtitle-2 font-weight-medium text-truncate mb-1 product-card-title"
                >
                  {{ product.name }}
                </v-card-title>
                <v-card-subtitle
                  class="text-caption d-flex justify-space-between align-center product-card-subtitle"
                >
                  <span>{{ product.category }}</span>
                  <span class="font-weight-medium">
                    {{ formatPrice(product.price) }}
                  </span>
                </v-card-subtitle>
              </v-card-item>

              <v-card-text
                class="text-caption text-medium-emphasis product-card-text"
              >
                {{ product.description }}
              </v-card-text>

              <v-spacer />

              <v-card-actions
                class="d-flex justify-space-between align-center pb-3 px-4 product-card-actions"
              >
                <div class="d-flex flex-wrap ga-1 align-center">
                  <v-chip
                    v-for="tag in product.tags.slice(0, 2)"
                    :key="tag"
                    size="x-small"
                    variant="outlined"
                    class="text-uppercase text-caption product-tag-chip"
                  >
                    {{ tag }}
                  </v-chip>
                </div>

                <div class="d-flex ga-2 align-center">
                  <!-- Favori kalp -->
                  <v-btn
                    icon
                    variant="text"
                    class="product-icon-btn"
                    @click.stop="handleToggleFavorite(product)"
                  >
                    <v-icon :color="isFavorite(product.id) ? '#f44336' : undefined">
                      {{
                        isFavorite(product.id)
                          ? "mdi-heart"
                          : "mdi-heart-outline"
                      }}
                    </v-icon>
                  </v-btn>

                  <!-- Sepete ekle: ikon buton -->
                  <v-btn
                    icon
                    variant="text"
                    class="product-icon-btn"
                    @click.stop="handleAddToCart(product)"
                  >
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>

                  <!-- AR dene -->
                  <v-btn
                    color="primary"
                    size="small"
                    class="product-cta-btn"
                    @click="goToTryOn(product)"
                  >
                    AR Dene
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col
            v-if="!filteredProducts.length"
            cols="12"
            class="text-center py-8 text-medium-emphasis product-empty"
          >
            <v-icon size="32" class="mb-2">mdi-magnify</v-icon>
            <div class="text-body-2 mb-1">Filtrelere uyan ürün bulunamadı.</div>
            <div class="text-caption mb-3">
              Arama terimini değiştirerek veya kategori filtresini temizleyerek
              tekrar deneyebilirsin.
            </div>
            <v-btn
              variant="text"
              size="small"
              class="product-reset-btn"
              @click="resetFilters"
            >
              Filtreleri sıfırla
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { products, type Category, type Product } from "@/data/products";
import { setSelectedProduct } from "@/stores/products";
import { useFavorites } from "@/composables/useFavorites";
import { useCart } from "@/stores/cart";
import { toast } from "vue-sonner";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);
const router = useRouter();

const search = ref("");
const selectedCategory = ref<Category | null>(null);

// Favoriler & sepet + KULLANICI
const { user, isFavorite, toggleFavorite } = useFavorites();
const { addToCart } = useCart();

// ---------------------------------------------------------
// FİLTRELENMİŞ LİSTE (eski kodun)
// ---------------------------------------------------------
const allCategories = computed(() => {
  const set = new Set<Category>();
  products.forEach((p) => set.add(p.category));
  return Array.from(set);
});

const filteredProducts = computed(() => {
  const term = search.value.toLowerCase().trim();

  return products.filter((p) => {
    const matchCategory =
      !selectedCategory.value || p.category === selectedCategory.value;

    const matchSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.tags.some((t) => t.toLowerCase().includes(term));

    return matchCategory && matchSearch;
  });
});

// ---------------------------------------------------------
// ANA SAYFA VİTRİNİ İÇİN AI ÖNERİ MANTIĞI
// RecommendationView.vue ile aynı mantık
// ---------------------------------------------------------
interface ScoredProduct extends Product {
  score?: number;
}

const hasEnoughProfile = computed(() => {
  if (!user.value) return false;
  return (
    !!user.value.height &&
    !!user.value.weight &&
    !!user.value.bodyType &&
    !!user.value.skinTone &&
    !!user.value.hairColor
  );
});

const computeScore = (product: Product, u: any): number => {
  let score = 0;

  const userBodyType = String(u.bodyType || "").toLowerCase();
  const userSkinTone = String(u.skinTone || "").toLowerCase();
  const userHairColor = String(u.hairColor || "").toLowerCase();

  const fitFor = product.fitFor || {};
  const fitBodyTypes = (fitFor.bodyTypes || []).map((b) => b.toLowerCase());
  const fitSkinTones = (fitFor.skinTones || []).map((t) => t.toLowerCase());

  // 1) Vücut tipi
  if (userBodyType && fitBodyTypes.includes(userBodyType)) {
    score += 4;
  }

  // 2) Ten rengi
  if (userSkinTone && fitSkinTones.includes(userSkinTone)) {
    score += 3;
  }

  // 3) BMI - oversize/basic tercihi
  const heightNum = u.height ? Number(u.height) : null;
  const weightNum = u.weight ? Number(u.weight) : null;

  if (heightNum && weightNum) {
    const bmi = weightNum / ((heightNum / 100) * (heightNum / 100));

    if (bmi < 19 && product.category.toLowerCase().includes("oversize")) {
      score += 1.5;
    }

    if (
      bmi >= 19 &&
      bmi <= 25 &&
      product.category.toLowerCase().includes("basic")
    ) {
      score += 1.5;
    }

    if (bmi > 25 && product.category.toLowerCase().includes("oversize")) {
      score += 2;
    }
  }

  // 4) Saç rengine ufak bonus
  if (userHairColor && product.tags) {
    if (
      userHairColor.includes("siyah") &&
      product.tags.some((t) => t.toLowerCase().includes("beyaz"))
    ) {
      score += 1;
    }
    if (
      userHairColor.includes("açık") &&
      product.tags.some((t) => t.toLowerCase().includes("siyah"))
    ) {
      score += 1;
    }
  }

  return score;
};

const recommendedProducts = computed<ScoredProduct[]>(() => {
  if (!user.value || !hasEnoughProfile.value) return [];

  const u = user.value;
  const scored = products.map((p) => {
    const s = computeScore(p, u);
    return { ...p, score: s } as ScoredProduct;
  });

  return scored
    .filter((p) => (p.score || 0) > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0));
});

// Öne çıkan genel öneriler (hiç skor yoksa)
const fallbackProducts = computed<Product[]>(() => {
  return products.slice(0, 6);
});

// Öneriler sayfasındakiyle bire bir aynı mantık
const productsToShow = computed<ScoredProduct[]>(() => {
  if (recommendedProducts.value.length > 0) {
    return recommendedProducts.value;
  }
  return fallbackProducts.value as ScoredProduct[];
});

// 🟦 HERO VİTRİNDE GÖRÜNECEK ÜRÜN
// (Öneriler sayfasındaki listenin ilki)
const highlightProduct = computed<Product | null>(() => {
  const first = productsToShow.value[0];
  return first || null;
});

// ---------------------------------------------------------
// FİLTRE / FORMAT / ACTIONLAR (eski kodun)
// ---------------------------------------------------------
const toggleCategory = (cat: Category | null) => {
  if (selectedCategory.value === cat) {
    selectedCategory.value = null;
  } else {
    selectedCategory.value = cat;
  }
};

const resetFilters = () => {
  search.value = "";
  selectedCategory.value = null;
};

const formatPrice = (price: number) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  });
};

const goToTryOn = (product: Product) => {
  setSelectedProduct(product);
  router.push({ name: "try-on" });
};

const handleAddToCart = (product: Product) => {
  addToCart(product.id, 1);
  console.log("🛒 Sepete ekleme - toast çağrılıyor:", product.name);
  toast.success("Sepete eklendi 🛒", {
    description: product.name,
    duration: 2500,
  });
  console.log("✅ Toast çağrıldı");
};

const handleToggleFavorite = async (product: Product) => {
  const wasFavorite = isFavorite(product.id);

  await toggleFavorite(product.id);

  if (!wasFavorite) {
    toast.success("Favorilere eklendi ❤️", {
      description: product.name,
      duration: 2200,
    });
  } else {
    toast("Favoriden çıkarıldı", {
      description: product.name,
      duration: 2000,
    });
  }
};
</script>

<style scoped>
.home-root {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* HERO ------------------------------------------------------------------ */

.hero-sheet {
  border-radius: 24px;
  transition: box-shadow 0.2s ease, border-color 0.2s ease,
    background 0.25s ease;
}

/* Light mode hero */
:global(body.theme-light) .home-root .hero-sheet {
  background: radial-gradient(
    circle at top left,
    #e3f2fd 0,
    #e8eaf6 35%,
    #ffffff 100%
  );
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  color: #0f172a;
}

/* Dark mode hero */
:global(body.theme-dark) .home-root .hero-sheet {
  background: radial-gradient(
    circle at top left,
    #1e293b 0,
    #020617 55%,
    #020617 100%
  );
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.9);
  color: #e5e7eb;
}

/* Hero title */
:global(body.theme-light) .home-root .hero-title {
  color: #0f172a;
}

:global(body.theme-dark) .home-root .hero-title {
  color: #f9fafb;
}

/* Hero text */
:global(body.theme-light) .home-root .hero-text {
  color: #4b5563;
}

:global(body.theme-dark) .home-root .hero-text {
  color: #cbd5e1;
}

/* Hero meta */
:global(body.theme-light) .home-root .hero-meta {
  color: #6b7280;
}

:global(body.theme-dark) .home-root .hero-meta {
  color: #9ca3af;
}

.hero-chip-outlined {
  border-color: rgba(148, 163, 184, 0.7) !important;
}

:global(body.theme-light) .home-root .hero-chip-outlined {
  color: #0f172a !important;
}

:global(body.theme-dark) .home-root .hero-chip-outlined {
  color: #e5e7eb !important;
}

.hero-primary-btn {
  background: linear-gradient(90deg, #38bdf8, #6366f1);
  border-radius: 999px;
  padding-inline: 22px;
}

.hero-secondary-btn {
  border-style: dashed;
  border-color: rgba(148, 163, 184, 0.9) !important;
}

:global(body.theme-light) .home-root .hero-secondary-btn {
  color: #0f172a !important;
}

:global(body.theme-dark) .home-root .hero-secondary-btn {
  color: #e5e7eb !important;
}

.hero-preview-wrapper {
  max-width: 420px;
  margin: 0 auto;
}

/* Hero preview */
:global(body.theme-light) .home-root .hero-preview {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.35);
  color: #0f172a;
}

:global(body.theme-dark) .home-root .hero-preview {
  background: radial-gradient(circle at top, #0f172a 0, #020617 70%);
  border: 1px solid rgba(148, 163, 184, 0.5);
  backdrop-filter: blur(16px);
  color: #e5e7eb;
}

:global(body.theme-light) .home-root .hero-preview-title {
  color: #0f172a;
}

:global(body.theme-dark) .home-root .hero-preview-title {
  color: #e5e7eb;
}

:global(body.theme-light) .home-root .hero-preview-subtitle,
:global(body.theme-light) .home-root .hero-preview-meta,
:global(body.theme-light) .home-root .hero-preview-desc {
  color: #6b7280 !important;
}

:global(body.theme-dark) .home-root .hero-preview-subtitle,
:global(body.theme-dark) .home-root .hero-preview-meta,
:global(body.theme-dark) .home-root .hero-preview-desc {
  color: #9ca3af !important;
}

:global(body.theme-light) .home-root .hero-divider {
  border-color: rgba(51, 65, 85, 0.2) !important;
}

:global(body.theme-dark) .home-root .hero-divider {
  border-color: rgba(51, 65, 85, 0.9) !important;
}

.hero-preview-image {
  border-radius: 14px;
}

:global(body.theme-light) .home-root .hero-icon-btn {
  color: #0f172a !important;
}

:global(body.theme-dark) .home-root .hero-icon-btn {
  color: #e5e7eb !important;
}

:global(body.theme-light) .home-root .hero-empty {
  color: #0f172a;
}

:global(body.theme-dark) .home-root .hero-empty {
  color: #e5e7eb;
}

/* PRODUCT SHELL ---------------------------------------------------------- */

.product-shell {
  border-radius: 24px;
  transition: background 0.22s ease, border-color 0.22s ease,
    box-shadow 0.22s ease;
  padding: 24px;
}

/* Light mode product shell */
:global(body.theme-light) .home-root .product-shell {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  color: #0f172a;
}

/* Dark mode product shell */
:global(body.theme-dark) .home-root .product-shell {
  background: radial-gradient(
    circle at top,
    #020617 0,
    #020617 35%,
    #020617 100%
  );
  border: 1px solid rgba(30, 64, 175, 0.55);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.95);
  color: #e5e7eb;
}

/* Product title */
:global(body.theme-light) .home-root .product-title {
  color: #111827;
}

:global(body.theme-dark) .home-root .product-title {
  color: #f9fafb;
}

/* Product subtitle */
:global(body.theme-light) .home-root .product-subtitle {
  color: #6b7280;
}

:global(body.theme-dark) .home-root .product-subtitle {
  color: #94a3b8;
}

.product-chip-outlined {
  border-color: rgba(148, 163, 184, 0.7) !important;
}

:global(body.theme-light) .home-root .product-chip-outlined {
  color: #0f172a !important;
}

:global(body.theme-dark) .home-root .product-chip-outlined {
  color: #e5e7eb !important;
}

/* Product filter label */
:global(body.theme-light) .home-root .product-filter-label {
  color: #6b7280;
}

:global(body.theme-dark) .home-root .product-filter-label {
  color: #cbd5e1;
}

.product-filter-chip {
  color: inherit;
}

.product-reset-btn {
  text-transform: none !important;
}

:global(body.theme-light) .home-root .product-reset-btn {
  color: #6b7280 !important;
}

:global(body.theme-dark) .home-root .product-reset-btn {
  color: #9ca3af !important;
}

:global(body.theme-light) .home-root .product-divider {
  border-color: rgba(148, 163, 184, 0.3) !important;
}

:global(body.theme-dark) .home-root .product-divider {
  border-color: rgba(30, 64, 175, 0.5) !important;
}

/* PRODUCT CARD ----------------------------------------------------------- */

.product-card {
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
  border-radius: 18px;
  overflow: hidden;
}

/* Light mode product card */
:global(body.theme-light) .home-root .product-card {
  background-color: #ffffff;
  border: 1px solid rgba(209, 213, 219, 0.9);
  color: #111827;
  box-shadow: none;
}

:global(body.theme-light) .home-root .product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);
  border-color: rgba(59, 130, 246, 0.9);
}

/* Dark mode product card */
:global(body.theme-dark) .home-root .product-card {
  background-color: #020617;
  border: 1px solid rgba(51, 65, 85, 0.9);
  color: #e5e7eb;
  box-shadow: none;
}

:global(body.theme-dark) .home-root .product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.95);
  border-color: rgba(56, 189, 248, 0.85);
}

/* Product card title */
:global(body.theme-light) .home-root .product-card-title {
  color: #111827;
}

:global(body.theme-dark) .home-root .product-card-title {
  color: #e5e7eb;
}

/* Product card subtitle */
:global(body.theme-light) .home-root .product-card-subtitle {
  color: #6b7280;
}

:global(body.theme-dark) .home-root .product-card-subtitle {
  color: #9ca3af;
}

/* Product card text */
:global(body.theme-light) .home-root .product-card-text {
  color: #4b5563;
}

:global(body.theme-dark) .home-root .product-card-text {
  color: #b8c4d6;
  line-height: 1.45;
}

:global(body.theme-light) .home-root .product-card-actions {
  border-top: 1px solid rgba(209, 213, 219, 0.5);
}

:global(body.theme-dark) .home-root .product-card-actions {
  border-top: 1px solid rgba(30, 64, 175, 0.6);
}

.product-image {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

.product-tag-chip {
  border-color: rgba(148, 163, 184, 0.7) !important;
  color: inherit !important;
}

.product-icon-btn {
  color: inherit !important;
}

/* Favori ikonu - her zaman kırmızı */
.product-icon-btn :deep(.v-icon[style*="f44336"]),
.product-icon-btn :deep(.v-icon[color="#f44336"]) {
  color: #f44336 !important;
}

.product-cta-btn {
  border-radius: 999px;
}

/* EMPTY STATE ------------------------------------------------------------ */

:global(body.theme-light) .home-root .product-empty {
  color: #6b7280;
}

:global(body.theme-dark) .home-root .product-empty {
  color: #9ca3af;
}

/* SEARCH FIELD ----------------------------------------------------------- */

.search-field {
  min-width: 230px;
}

/* Light mode search field */
:global(body.theme-light) .home-root :deep(.search-field .v-field__input) {
  color: #0f172a !important;
}

:global(body.theme-light)
  .home-root
  :deep(.search-field .v-field__input::placeholder) {
  color: #9ca3af !important;
}

:global(body.theme-light) .home-root :deep(.search-field .v-icon) {
  color: #6b7280 !important;
}

:global(body.theme-light) .home-root :deep(.search-field .v-field) {
  background-color: #ffffff !important;
}

:global(body.theme-light) .home-root :deep(.search-field .v-field__outline) {
  border-color: rgba(148, 163, 184, 0.4) !important;
}

/* === LIGHT MODE – Product section text fixleri ======================= */

:global(body.theme-light) .home-root .product-shell .text-medium-emphasis {
  color: #6b7280 !important;
}

/* === DARK MODE – Product section text fixleri ======================= */

:global(body.theme-dark) .home-root .product-shell .text-medium-emphasis {
  color: #9ca3af !important;
}
</style>
