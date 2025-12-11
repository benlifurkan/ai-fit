<template>
  <div
    :class="['tryon-page', isDark ? 'tryon-page--dark' : 'tryon-page--light']"
  >
    <div class="d-flex justify-space-between align-center mb-4 flex-wrap ga-2">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1 tryon-title">
          Fotoğrafla AR Denemesi
        </h1>
        <p class="text-body-2 text-medium-emphasis tryon-subtitle">
          Fotoğrafını yükle, t-shirt seç ve yapay zekânın oluşturduğu sonucu
          önizle.
        </p>
      </div>

      <div
        v-if="user"
        class="text-right text-caption text-medium-emphasis tryon-user-info"
      >
        Oturum açıldı: <strong>{{ user.name || user.email }}</strong>
      </div>
    </div>

    <!-- 🔐 Giriş yapılmadıysa -->
    <template v-if="!user">
      <v-card
        class="pa-6 text-center tryon-card tryon-card--info"
        rounded="lg"
        elevation="4"
      >
        <v-icon size="40" class="mb-3">mdi-lock</v-icon>

        <h2 class="text-h6 font-weight-bold mb-2">
          Bu özelliği kullanmak için giriş yapmalısın
        </h2>

        <p class="text-body-2 text-medium-emphasis mb-4">
          AI try-on sonuçların hesabına bağlı olarak
          <strong>Geçmiş AR Denemelerim</strong> sayfasında saklanır.
        </p>

        <div class="d-flex justify-center ga-3 flex-wrap">
          <v-btn color="primary" to="/login">GİRİŞ YAP</v-btn>
          <v-btn variant="outlined" to="/register">KAYIT OL</v-btn>
        </div>
      </v-card>
    </template>

    <!-- ✅ Giriş yapıldıysa -->
    <template v-else>
      <v-row class="mt-2" align="stretch" no-gutters>
        <!-- SOL: KONTROL ALANI -->
        <v-col cols="12" md="5" class="pr-md-3 mb-4 mb-md-0">
          <v-card
            class="pa-4 tryon-card"
            :class="isDark ? 'tryon-card--dark' : 'tryon-card--light'"
            rounded="lg"
            elevation="4"
          >
            <v-card-title class="text-subtitle-1 font-weight-medium pb-2">
              Adım 1: Fotoğrafını yükle
            </v-card-title>

            <v-card-text class="pb-0 flex-grow-1 d-flex flex-column">
              <v-file-input
                v-model="userImage"
                label="Fotoğrafını seç"
                accept="image/*"
                prepend-icon="mdi-account"
                show-size
                density="comfortable"
                variant="outlined"
                class="mb-4"
              />

              <v-divider class="my-3" />

              <div class="mb-2 d-flex justify-space-between align-center">
                <span class="text-subtitle-2">Adım 2: T-shirt seçimi</span>
              </div>

              <!-- Seçili ürün özeti -->
              <div
                v-if="selectedProduct"
                class="d-flex ga-3 align-center selected-product"
              >
                <v-img
                  :src="selectedProduct.imageUrl"
                  width="72"
                  height="72"
                  cover
                  class="rounded-lg"
                />
                <div>
                  <div class="text-body-2 font-weight-medium">
                    {{ selectedProduct.name }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ selectedProduct.category }} •
                    {{ formatPrice(selectedProduct.price) }}
                  </div>
                </div>
              </div>

              <!-- ❗ Bu bilgilendirme kalıcı kalsın -->
              <v-alert
                v-else
                type="info"
                variant="tonal"
                density="comfortable"
                class="mt-1 pa-5 rounded-lg elevation-2 pt-8 pb-8 tryon-info-alert"
              >
                Henüz bir t-shirt seçmedin. Ana sayfadan veya öneriler
                sayfasında
                <strong>“AR Dene”</strong> butonuna tıklayarak buraya ürün
                gönderebilirsin.
              </v-alert>

              <v-spacer />

              <v-btn
                color="primary"
                class="mt-4 mb-4"
                block
                :loading="loading"
                :disabled="!userImage"
                @click="handleTryOn"
              >
                <v-icon start>mdi-sparkles</v-icon>
                AI TRY-ON BAŞLAT
              </v-btn>

              <p class="text-caption text-medium-emphasis mt-2 tryon-note">
                <strong>Not:</strong> Bu projede
                <strong>Replicate AI hizmeti</strong> üzerinden
                <strong>cuuupid/idm-vton</strong> modeli kullanılmaktadır. AI
                Try-On sonuçlarının doğruluğu; yüklediğiniz fotoğrafın
                kalitesine, ışık koşullarına ve kullanılan yapay zekâ servisinin
                anlık performansına bağlıdır. Bu nedenle oluşturulan görüntüler,
                her zaman gerçek görünümünüzü birebir yansıtmayabilir.
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- SAĞ: ÖNİZLEME ALANI -->
        <v-col cols="12" md="7" class="pl-md-3">
          <v-card
            class="pa-4 tryon-card"
            :class="isDark ? 'tryon-card--dark' : 'tryon-card--light'"
            rounded="lg"
            elevation="4"
          >
            <div class="d-flex justify-space-between align-center mb-3">
              <div>
                <h2 class="text-subtitle-1 font-weight-medium mb-1">
                  Önizleme
                </h2>
                <p class="text-caption text-medium-emphasis mb-0">
                  AI try-on tamamlandığında sonuç burada görünecek.
                </p>
              </div>
            </div>

            <div class="preview-area">
              <!-- 1) Yükleniyor -->
              <template v-if="loading">
                <v-progress-circular indeterminate size="40" class="mb-2" />
                <div class="text-caption text-medium-emphasis">
                  Görsel işleniyor, lütfen bekle...
                </div>
              </template>

              <!-- 2) Sonuç varsa -->
              <template v-else-if="resultImageUrl">
                <div class="preview-image-wrapper">
                  <img
                    :src="resultImageUrl"
                    alt="AI Try-On sonucu"
                    class="preview-image"
                  />
                </div>
                <div class="text-caption text-medium-emphasis mt-2">
                  Bu görsel, AI tarafından oluşturulan try-on sonucudur.
                </div>
              </template>

              <!-- 3) Sadece kullanıcı fotoğrafı varsa -->
              <template v-else-if="userImageUrl">
                <div class="preview-image-wrapper">
                  <img
                    :src="userImageUrl"
                    alt="Yüklenen fotoğraf"
                    class="preview-image preview-image--dim"
                  />
                </div>
                <div class="text-caption text-medium-emphasis mt-2">
                  Fotoğraf yüklendi. Bir t-shirt seçip
                  <strong>AI TRY-ON BAŞLAT</strong> butonuna bas.
                </div>
              </template>

              <!-- 4) Hiçbir şey yoksa -->
              <template v-else>
                <div class="text-center text-medium-emphasis">
                  <v-icon size="40" class="mb-2">mdi-image-plus</v-icon>
                  <div class="text-body-2 mb-1">Henüz bir önizleme yok.</div>
                  <div class="text-caption">
                    Soldan fotoğraf yükleyip bir t-shirt seçtiğinde, AI sonucu
                    burada görünecek.
                  </div>
                </div>
              </template>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { currentUser } from "@/stores/auth";
import { selectedProduct } from "@/stores/products";
import { toast } from "vue-sonner";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const user = computed(() => currentUser.value);

const userImage = ref<File | null>(null);
const clothImage = ref<File | null>(null);
const resultImageUrl = ref<string | null>(null);
const loading = ref(false);

const userImageUrl = computed(() =>
  userImage.value ? URL.createObjectURL(userImage.value) : null
);

// Seçili üründen clothImage üret
const loadClothFromSelectedProduct = async () => {
  if (!selectedProduct.value) {
    clothImage.value = null;
    return;
  }
  try {
    const res = await fetch(selectedProduct.value.imageUrl);
    const blob = await res.blob();
    const file = new File([blob], `product-${selectedProduct.value.id}.jpg`, {
      type: blob.type || "image/jpeg",
    });
    clothImage.value = file;
  } catch (e) {
    console.error("Kıyafet görseli alınamadı:", e);
    clothImage.value = null;
    toast.error(
      "Kıyafet görseli yüklenirken bir hata oluştu. Lütfen ürünü yeniden seç."
    );
  }
};

watch(
  () => selectedProduct.value,
  () => {
    loadClothFromSelectedProduct();
  },
  { immediate: true }
);

const formatPrice = (price: number) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  });
};

const handleTryOn = async () => {
  if (!user.value) {
    toast.error("Bu özelliği kullanmak için önce giriş yapmalısın.");
    return;
  }

  if (!userImage.value) {
    toast.error("Lütfen önce kendi fotoğrafını yükle.");
    return;
  }
  if (!clothImage.value) {
    toast.error(
      "Kıyafet görseli yüklenemedi. Ana sayfadan bir ürün seçip tekrar dene."
    );
    return;
  }

  loading.value = true;
  resultImageUrl.value = null;

  try {
    const formData = new FormData();
    formData.append("person_image", userImage.value);
    formData.append("cloth_image", clothImage.value);

    if (selectedProduct.value) {
      formData.append("productId", String(selectedProduct.value.id));
    }
    if (user.value) {
      formData.append("userId", String(user.value.id));
    }

    const response = await fetch("/api/try-on", {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => ({} as any));

    console.log("TRY-ON response:", data);

    if (!response.ok) {
      if (response.status === 402 && data.error === "insufficient_credit") {
        toast.error(
          "AI servisi için yeterli kredi yok. Fotoğrafın sadece önizleme olarak gösteriliyor."
        );
        resultImageUrl.value = userImageUrl.value;
        return;
      }
      throw new Error(data.message || "Sunucu hatası");
    }

    if (typeof data.imageUrl === "string") {
      resultImageUrl.value = data.imageUrl;
      toast.success("AI try-on tamamlandı! Sonuç önizlemede.");
    } else {
      toast.warning(
        "AI servisi beklenmedik bir çıktı verdi. Kendi fotoğrafın önizleme olarak gösteriliyor."
      );
      resultImageUrl.value = userImageUrl.value;
    }
  } catch (err: any) {
    console.error(err);
    toast.error(
      err?.message ||
        "Beklenmeyen bir hata oluştu. Detay için konsolu kontrol et."
    );
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.tryon-page {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

/* ROOT LIGHT / DARK --------------------------------------------------- */

.tryon-page--light {
  color: #111827;
}

.tryon-page--dark {
  color: #e5e7eb;
}

.tryon-page--dark .text-medium-emphasis {
  color: #9ca3af !important;
}

.tryon-title {
  color: inherit;
}

.tryon-subtitle {
  color: #6b7280;
}

.tryon-page--dark .tryon-subtitle {
  color: #9ca3af;
}

/* KARTLAR ------------------------------------------------------------- */

.tryon-card {
  height: 520px; /* sol ve sağ kart sabit ve eşit yükseklik */
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.18s ease, border-color 0.18s ease,
    background-color 0.18s ease;
}

.tryon-card--light {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
}

.tryon-card--dark {
  background: radial-gradient(circle at top, #020617 0, #020617 70%);
  border: 1px solid rgba(51, 65, 85, 0.9);
  color: #e5e7eb;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.95);
}

/* Seçili ürün kutusu -------------------------------------------------- */

.selected-product {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background-color: rgba(15, 23, 42, 0.02);
}

.tryon-page--dark .selected-product {
  border-color: rgba(148, 163, 184, 0.5);
  background-color: rgba(15, 23, 42, 0.8);
}

/* Alert --------------------------------------------------------------- */

.tryon-info-alert {
  border-radius: 10px;
}

.tryon-page--dark .tryon-info-alert {
  background-color: #020617 !important;
  border-color: rgba(56, 189, 248, 0.6) !important;
  color: #e5e7eb !important;
}

/* Preview alanı -------------------------------------------------------- */

.preview-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.preview-image-wrapper {
  width: 320px;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
}

.tryon-page--dark .preview-image-wrapper {
  box-shadow: 0 10px 32px rgba(15, 23, 42, 0.95);
}

.preview-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: inherit;
}

.preview-image--dim {
  opacity: 0.85;
}

/* Not metni ------------------------------------------------------------ */

.tryon-note {
  line-height: 1.5;
}

/* 🔐 Giriş yapılmadığında görünen lock kartı – Recommendations ile birebir aynı stil  */

.tryon-card {
  border-radius: 16px;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
}

/* LIGHT MODE – Recommendations'daki recommend-card ile aynı görünüm */
.theme-light-app .tryon-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
}

/* DARK MODE – Recommendations'daki recommend-card ile aynı görünüm */
.theme-dark-app .tryon-card {
  background-color: #020617; /* slate-950 vibe */
  border: 1px solid rgba(51, 65, 85, 0.85);
  color: #e5e7eb;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.9);
}

/* İçerideki açıklama text’lerinin tonu (Recommendations ile aynı mantık) */
.theme-dark-app .tryon-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* Hover efekti (masaüstü için) */
@media (hover: hover) {
  .tryon-card.tryon-card--info:hover {
    transform: translateY(-3px);
  }
}

/* ROOT ------------------------------------------------------------------ */
.tryon-root {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tryon-root--light {
  color: #111827; /* slate-900 */
}

.tryon-root--dark {
  color: #e5e7eb; /* slate-200 */
}

/* Vuetify'nin text-medium-emphasis'ini dark moda uyarlayalım */
.tryon-root--dark .text-medium-emphasis {
  color: #9ca3af !important; /* slate-400 */
}

/* Kart genel ------------------------------------------------------------ */
.tryon-card {
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
}

/* Light */
.tryon-root--light .tryon-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
}

/* Dark – Recommendations’taki ile aynı tonlar */
.tryon-root--dark .tryon-card {
  background-color: #020617; /* slate-950 */
  border: 1px solid rgba(51, 65, 85, 0.85); /* slate-700 */
  color: #e5e7eb;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.9);
}

/* Info kart (giriş yapmamış durum) */
.tryon-card--info {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
