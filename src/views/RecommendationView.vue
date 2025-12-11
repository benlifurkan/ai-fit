<template>
  <div
    :class="[
      'recommend-root',
      isDark ? 'recommend-root--dark' : 'recommend-root--light',
    ]"
  >
    <h1 class="text-h4 font-weight-bold mb-4 recommend-title">
      Sana Özel Öneriler
    </h1>
    <p class="text-body-2 text-medium-emphasis recommend-subtitle">
      AI önerilerin hesabına bağlı olarak Sana Özel Önerilerim sayfasında
      saklanır.
    </p>
    <br />

    <!-- 🔐 Giriş yapılmadıysa -->
    <template v-if="!user">
      <v-card
        class="pa-6 text-center recommend-card recommend-card--info"
        rounded="lg"
        elevation="4"
      >
        <v-icon size="40" class="mb-3">mdi-lock</v-icon>
        <h2 class="text-h6 font-weight-bold mb-2">
          Bu özelliği kullanmak için giriş yapmalısın
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-4">
          AI önerilerin hesabına bağlı olarak
          <strong>Sana Özel Önerilerim</strong> sayfasında saklanır.
        </p>
        <div class="d-flex justify-center ga-3 flex-wrap">
          <v-btn color="primary" to="/login">Giriş Yap</v-btn>
          <v-btn variant="outlined" to="/register">Kayıt Ol</v-btn>
        </div>
      </v-card>
    </template>

    <!-- Kullanıcı giriş yapmış ama fiziksel bilgileri eksikse -->
    <template v-else-if="!hasEnoughProfile">
      <v-alert type="warning" class="mb-4 recommend-alert">
        Sana tam olarak uygun t-shirt'leri önerebilmem için
        <strong>boy, kilo, vücut tipi, ten rengi ve saç rengi</strong>
        bilgilerini doldurman gerekiyor.
        <br />
        Bu bilgileri <RouterLink to="/profile">Bilgilerim</RouterLink>
        sayfasından güncelleyebilirsin.
      </v-alert>

      <v-row>
        <v-col
          v-for="p in fallbackProducts"
          :key="p.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="recommend-card recommend-card--product"
            rounded="lg"
            elevation="3"
          >
            <v-img :src="p.imageUrl" height="260" cover />
            <v-card-title class="text-subtitle-1">
              {{ p.name }}
            </v-card-title>
            <v-card-subtitle class="text-caption">
              {{ p.category }} • {{ formatPrice(p.price) }}
            </v-card-subtitle>
            <v-card-text class="text-body-2">
              {{ p.description }}
            </v-card-text>
            <v-card-actions class="justify-space-between align-center">
              <div class="text-caption text-medium-emphasis">
                Öne çıkan genel önerilerden biri
              </div>

              <div class="d-flex align-center ga-2">
                <!-- Sepete ekle ikon -->
                <v-btn
                  icon
                  variant="text"
                  class="recommend-icon-btn"
                  @click.stop="handleAddToCart(p)"
                >
                  <v-icon>mdi-cart</v-icon>
                </v-btn>

                <v-btn
                  color="primary"
                  variant="flat"
                  class="recommend-cta-btn"
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

    <!-- Tam profil + AI puanlamalı öneriler -->
    <template v-else>
      <v-alert
        type="success"
        class="mb-4 recommend-alert"
        v-if="recommendedProducts.length"
      >
        Aşağıdaki t-shirt'ler, senin <strong>vücut tipin</strong> ve
        <strong>ten rengin</strong> gibi fiziksel özelliklerin dikkate alınarak
        önerildi.
      </v-alert>

      <v-alert v-else type="info" class="mb-4 recommend-alert">
        Profiline göre öne çıkan özel bir t-shirt bulunamadı. Yine de aşağıdaki
        genel önerilere göz atabilirsin.
      </v-alert>

      <v-row>
        <v-col v-for="p in productsToShow" :key="p.id" cols="12" sm="6" md="4">
          <v-card
            class="recommend-card recommend-card--product"
            rounded="lg"
            elevation="3"
          >
            <v-img :src="p.imageUrl" height="260" cover />
            <v-card-title
              class="text-subtitle-1 d-flex justify-space-between align-center"
            >
              <span>{{ p.name }}</span>
              <span v-if="p.score !== undefined" class="text-caption">
                AI Skoru: {{ p.score.toFixed(1) }}
              </span>
            </v-card-title>
            <v-card-subtitle class="text-caption">
              {{ p.category }} • {{ formatPrice(p.price) }}
            </v-card-subtitle>
            <v-card-text class="text-body-2">
              {{ p.description }}
            </v-card-text>
            <v-card-actions class="justify-space-between align-center">
              <div class="d-flex flex-column text-caption text-medium-emphasis">
                <span v-if="userBodySummary">
                  Senin için uygun: {{ userBodySummary }}
                </span>
                <span v-if="p.score !== undefined">
                  AI Skoru: {{ p.score.toFixed(1) }}
                </span>
              </div>

              <div class="d-flex align-center ga-2">
                <!-- Favori ikon (vue-sonner ile) -->
                <v-btn
                  icon
                  variant="text"
                  class="recommend-icon-btn"
                  @click.stop="handleToggleFavorite(p)"
                >
                  <v-icon :color="isFavorite(p.id) ? '#f44336' : undefined">
                    {{ isFavorite(p.id) ? "mdi-heart" : "mdi-heart-outline" }}
                  </v-icon>
                </v-btn>

                <!-- Sepete ekle ikon -->
                <v-btn
                  icon
                  variant="text"
                  class="recommend-icon-btn"
                  @click.stop="handleAddToCart(p)"
                >
                  <v-icon>mdi-cart</v-icon>
                </v-btn>

                <!-- AR Dene -->
                <v-btn
                  color="primary"
                  size="small"
                  class="recommend-cta-btn"
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
import { useCart } from "@/stores/cart";
import { toast } from "vue-sonner";
import { useThemeStore } from "@/stores/theme";

interface ScoredProduct extends Product {
  score?: number;
}

const router = useRouter();

// Tema store
const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

// FAVORİLER composable'ı
const { user, isFavorite, toggleFavorite } = useFavorites();

// SEPET store'u
const { addToCart } = useCart();

// Kullanıcının profili yeterli mi?
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

// Kullanıcının özet fiziksel bilgisi (göstermek için)
const userBodySummary = computed(() => {
  if (!user.value) return "";
  const parts: string[] = [];
  if (user.value.bodyType) parts.push(user.value.bodyType);
  if (user.value.skinTone) parts.push(`Ten: ${user.value.skinTone}`);
  if (user.value.hairColor) parts.push(`Saç: ${user.value.hairColor}`);
  return parts.join(" • ");
});

// Basit fiyat formatlama
const formatPrice = (price: number) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  });
};

// "AI" skoru hesaplayan fonksiyon
const computeScore = (product: Product, u: any): number => {
  let score = 0;

  const userBodyType = String(u.bodyType || "").toLowerCase();
  const userSkinTone = String(u.skinTone || "").toLowerCase();
  const userHairColor = String(u.hairColor || "").toLowerCase();

  const fitFor = product.fitFor || {};
  const fitBodyTypes = (fitFor.bodyTypes || []).map((b) => b.toLowerCase());
  const fitSkinTones = (fitFor.skinTones || []).map((t) => t.toLowerCase());

  // 1) Vücut tipi eşleşmesi (en önemli)
  if (userBodyType && fitBodyTypes.includes(userBodyType)) {
    score += 4;
  }

  // 2) Ten rengi eşleşmesi
  if (userSkinTone && fitSkinTones.includes(userSkinTone)) {
    score += 3;
  }

  // 3) Boy/kilo değerlendirmesi → oversize / slim fit vs
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

// Önerilen ürünler (skora göre sıralı)
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

// Hiç skor çıkmazsa fallback (öne çıkan ürünler)
const fallbackProducts = computed<Product[]>(() => {
  return products.slice(0, 6);
});

// Sayfada gösterilecek nihai liste
const productsToShow = computed<ScoredProduct[]>(() => {
  if (recommendedProducts.value.length > 0) {
    return recommendedProducts.value;
  }
  return fallbackProducts.value as ScoredProduct[];
});

// AR denemeye yönlendirme
const goTryOn = (product: Product) => {
  selectedProduct.value = product;
  router.push({ name: "try-on" });
};

// Sepete ekleme
const handleAddToCart = (product: Product) => {
  addToCart(product.id, 1);
  toast.success("Sepete eklendi 🛒", {
    description: product.name,
    duration: 2500,
  });
};

// Favori toggle + toast
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
.recommend-root {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* LIGHT / DARK ROOT ---------------------------------------------------- */

.recommend-root--light {
  color: #111827;
}

.recommend-root--dark {
  color: #e5e7eb;
}

.recommend-root--dark .text-medium-emphasis {
  color: #9ca3af !important;
}

/* Başlıklar ------------------------------------------------------------ */

.recommend-title {
  color: inherit;
}

.recommend-subtitle {
  color: #6b7280;
}

.recommend-root--dark .recommend-subtitle {
  color: #9ca3af;
}

/* Card genel ----------------------------------------------------------- */

.recommend-card {
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.recommend-root--light .recommend-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
}

.recommend-root--dark .recommend-card {
  background-color: #020617;
  border: 1px solid rgba(51, 65, 85, 0.85);
  color: #e5e7eb;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.9);
}

.recommend-card--product:hover {
  transform: translateY(-3px);
}

/* Alert --------------------------------------------------------------- */

.recommend-alert {
  border-radius: 12px;
}

.recommend-root--dark .recommend-alert {
  background-color: #020617 !important;
  border-color: rgba(56, 189, 248, 0.7) !important;
  color: #e5e7eb !important;
}

/* Icon & CTA buton ----------------------------------------------------- */

.recommend-icon-btn {
  color: inherit !important;
}

/* Favori ikonu - her zaman kırmızı */
.recommend-icon-btn :deep(.v-icon[style*="f44336"]),
.recommend-icon-btn :deep(.v-icon[color="#f44336"]) {
  color: #f44336 !important;
}

.recommend-cta-btn {
  border-radius: 999px;
}
</style>
