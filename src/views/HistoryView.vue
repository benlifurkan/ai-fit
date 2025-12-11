<template>
  <div
    class="history-page"
    :class="isDark ? 'history-page--dark' : 'history-page--light'"
  >
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1">Geçmiş AR Denemelerim</h1>
        <p class="text-body-2 text-medium-emphasis">
          Daha önce denediğin kombinleri burada görebilir, hoşuna gidenleri
          tekrar inceleyebilirsin.
        </p>
      </div>

      <v-chip
        v-if="user"
        color="primary"
        variant="flat"
        size="small"
        prepend-icon="mdi-camera-burst"
      >
        Toplam {{ sessions.length }} deneme
      </v-chip>
    </div>

    <!-- Kullanıcı giriş yapmamışsa -->
    <template v-if="!user">
      <v-card class="pa-4 history-card" elevation="3">
        <div class="d-flex align-center">
          <v-icon class="mr-3" color="primary">mdi-information</v-icon>
          <div>
            <div class="text-subtitle-2 font-weight-medium mb-1">
              Oturum Açmanız Gerekiyor
            </div>
            <div class="text-body-2 text-medium-emphasis">
              AR geçmişini görebilmek için lütfen
              <RouterLink to="/login">giriş yap</RouterLink>.
            </div>
          </div>
        </div>
      </v-card>
    </template>

    <!-- Kullanıcı giriş yapmışsa -->
    <template v-else>
      <!-- Yükleniyor göstergesi -->
      <v-card v-if="loading" class="pa-4 mb-4 history-card" elevation="2">
        <div class="d-flex align-center">
          <v-progress-circular indeterminate size="22" class="mr-3" />
          <div class="text-body-2 text-medium-emphasis">
            Geçmiş AR denemelerin yükleniyor...
          </div>
        </div>
      </v-card>

      <!-- Kayıt yoksa -->
      <template v-else-if="!sessions.length">
        <v-card class="pa-4 history-card" elevation="3">
          <div class="d-flex align-start">
            <v-icon class="mr-3" color="primary">mdi-image-off-outline</v-icon>
            <div>
              <div class="text-subtitle-2 font-weight-medium mb-1">
                Henüz kayıtlı bir AR denemen yok
              </div>
              <div class="text-body-2 text-medium-emphasis">
                Bir t-shirt seçip <strong>AI Try-On</strong> yaptığında,
                sonuçlar otomatik olarak burada listelenecek.
              </div>
            </div>
          </div>
        </v-card>
      </template>

      <!-- Kayıtlar varsa -->
      <template v-else>
        <v-row>
          <v-col
            v-for="s in sessionsWithProduct"
            :key="s.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="session-card history-card" elevation="3">
              <v-img :src="s.imageUrl" height="260" cover class="session-image">
                <template #placeholder>
                  <div
                    class="d-flex align-center justify-center fill-height text-medium-emphasis text-caption"
                  >
                    Görsel yükleniyor...
                  </div>
                </template>

                <div class="session-badge-wrapper">
                  <v-chip
                    size="x-small"
                    color="primary"
                    variant="flat"
                    prepend-icon="mdi-clock-outline"
                  >
                    {{ formatDateTime(s.createdAt) }}
                  </v-chip>
                </div>
              </v-img>

              <v-card-item>
                <v-card-title class="text-subtitle-1 font-weight-medium">
                  <span v-if="s.product">
                    {{ s.product.name }}
                  </span>
                  <span v-else>AI Try-On Sonucu</span>
                </v-card-title>

                <v-card-subtitle class="text-caption text-medium-emphasis">
                  <template v-if="s.product">
                    Ürün ID: {{ s.product.id }} • {{ s.product.category }}
                  </template>
                  <template v-else>Ürün bilgisi bulunamadı</template>
                </v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { currentUser } from "@/stores/auth";
import { products, type Product } from "@/data/products";
import { useThemeStore } from "@/stores/theme";

interface Session {
  id: number;
  userId: number;
  productId: number | null;
  imageUrl: string;
  createdAt: string;
}

interface SessionWithProduct extends Session {
  product: Product | null;
}

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const user = computed(() => currentUser.value);
const sessions = ref<Session[]>([]);
const loading = ref(false);

const fetchSessions = async () => {
  if (!user.value) return;
  loading.value = true;
  try {
    const res = await fetch(`/api/ar-sessions?userId=${user.value.id}`);
    const data = await res.json();
    sessions.value = data.sessions || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

// Session + ürün detayını birleştir
const sessionsWithProduct = computed<SessionWithProduct[]>(() =>
  sessions.value.map((s) => {
    const product =
      s.productId != null
        ? products.find((p) => p.id === s.productId) || null
        : null;

    return {
      ...s,
      product,
    };
  })
);

const formatDateTime = (iso: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("tr-TR");
};

onMounted(() => {
  fetchSessions();
});
</script>

<style scoped>
.history-page {
  max-width: 1100px;
  margin: 0 auto;
  transition: color 0.25s ease, background-color 0.25s ease;
}

/* Tema bazlı root renkleri */
.history-page--light {
  color: #111827;
}

.history-page--dark {
  color: #e5e7eb;
}

/* Ortak kart stili -------------------------------------------------- */

.history-card {
  border-radius: 16px;
  overflow: hidden;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease;
}

/* Light mod kart görünümü */
.history-page--light .history-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

/* Dark mod kart görünümü */
.history-page--dark .history-card {
  background: radial-gradient(circle at top, #0b1120 0, #020617 70%);
  border: 1px solid rgba(148, 163, 184, 0.55);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.95);
}

/* Dark modda Vuetify'nin default siyah yazılarını override et */
.history-page--dark .history-card,
.history-page--dark .history-card .text-body-1,
.history-page--dark .history-card .text-body-2,
.history-page--dark .history-card .text-subtitle-1,
.history-page--dark .history-card .text-subtitle-2,
.history-page--dark .history-card .text-caption {
  color: #e5e7eb !important;
}

.history-page--dark .history-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* Session kartı + görsel ------------------------------------------- */

.session-card {
  border-radius: 18px;
}

.session-image {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

/* Hover efekti: kart hafif yükselsin */
.history-page--dark .session-card:hover,
.history-page--light .session-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.85);
}

/* Badge pozisyonu */
.session-badge-wrapper {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
