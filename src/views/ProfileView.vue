<template>
  <div
    class="profile-page"
    :class="isDark ? 'profile-page--dark' : 'profile-page--light'"
  >
    <h1 class="text-h4 font-weight-bold mb-4">Bilgilerim</h1>

    <!-- Giriş yoksa -->
    <template v-if="!user">
      <v-card class="pa-4 profile-card" elevation="3">
        <div class="d-flex align-center">
          <v-icon class="mr-3" color="primary">mdi-information</v-icon>
          <div>
            <div class="text-subtitle-2 font-weight-medium mb-1">
              Oturum Açmanız Gerekiyor
            </div>
            <div class="text-body-2 text-medium-emphasis">
              Bilgilerini görebilmek için lütfen
              <RouterLink to="/login">giriş yap</RouterLink>.
            </div>
          </div>
        </div>
      </v-card>
    </template>

    <!-- Giriş varsa -->
    <template v-else>
      <!-- Üst kart: Kullanıcı özeti -->
      <v-card class="pa-5 mb-4 profile-header-card profile-card" elevation="3">
        <v-row align="center">
          <v-col cols="12" md="8" class="d-flex align-center">
            <div class="profile-avatar mr-4 d-flex align-center justify-center">
              <span class="text-h5 font-weight-bold">
                {{ initials }}
              </span>
            </div>
            <div>
              <div class="text-h5 font-weight-bold mb-1">
                {{ user.name || user.email }}
              </div>
              <div class="text-body-2 text-medium-emphasis mb-1">
                {{ user.email }}
              </div>
              <v-chip
                v-if="user.role"
                size="small"
                :color="user.role === 'admin' ? 'primary' : 'grey-darken-1'"
                variant="flat"
                class="mt-1"
                prepend-icon="mdi-account-badge"
              >
                {{ roleLabel }}
              </v-chip>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="text-md-right mt-4 mt-md-0">
            <div class="text-caption text-medium-emphasis mb-1">
              Özet Bilgiler
            </div>
            <div class="text-body-2">
              <span v-if="user.height || user.weight">
                {{ user.height || "?" }} cm • {{ user.weight || "?" }} kg
              </span>
              <span v-else>-</span>
            </div>
            <div class="text-caption text-medium-emphasis mt-1">
              Vücut tipi ve renk bilgilerin,
              <span class="font-italic">sana özel öneriler</span> için
              kullanılıyor.
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- Alt kart: Detaylı bilgiler -->
      <v-card class="pa-5 mb-3 profile-card" elevation="2">
        <v-row>
          <v-col cols="12" md="6">
            <div class="text-subtitle-2 font-weight-medium mb-3">
              Hesap Bilgileri
            </div>
            <v-list density="compact" class="no-bg-list">
              <v-list-item>
                <template #prepend>
                  <v-icon class="mr-2" color="primary">mdi-account</v-icon>
                </template>
                <v-list-item-title>Ad Soyad</v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.name || "-" }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-icon class="mr-2" color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title>E-posta</v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.email }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-icon class="mr-2" color="primary">
                    mdi-human-male-height
                  </v-icon>
                </template>
                <v-list-item-title>Boy / Kilo</v-list-item-title>
                <v-list-item-subtitle>
                  <span v-if="user.height || user.weight">
                    {{ user.height || "?" }} cm / {{ user.weight || "?" }} kg
                  </span>
                  <span v-else>-</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <div class="text-subtitle-2 font-weight-medium mb-3">
              Fiziksel Özelliklerim
            </div>
            <v-list density="compact" class="no-bg-list">
              <v-list-item>
                <template #prepend>
                  <v-icon class="mr-2" color="primary">mdi-human</v-icon>
                </template>
                <v-list-item-title>Vücut Tipi</v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.bodyType || "-" }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-icon class="mr-2" color="primary">mdi-palette</v-icon>
                </template>
                <v-list-item-title>Ten Rengi</v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.skinTone || "-" }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-icon class="mr-2" color="primary">mdi-hair-dryer</v-icon>
                </template>
                <v-list-item-title>Saç Rengi</v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.hairColor || "-" }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>

      <p class="text-caption text-medium-emphasis mt-1 profile-note">
        Not: Bu proje kapsamında bilgiler geçici olarak sunucu belleğinde ve
        tarayıcının localStorage alanında tutulmaktadır. Gerçek bir üretim
        ortamında, KV ve veritabanı ile güvenli saklama yöntemleri
        kullanılmalıdır.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { currentUser } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const user = computed(() => currentUser.value);

// İsim/soyisimden baş harfler (avatar için)
const initials = computed(() => {
  if (!user.value?.name && !user.value?.email) return "?";

  const nameSource = user.value.name || user.value.email || "";
  const parts = String(nameSource).trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0]?.charAt(0).toUpperCase() || "?";
  }

  return (
    (parts[0]?.charAt(0) || "").toUpperCase() +
    (parts[1]?.charAt(0) || "").toUpperCase()
  );
});

// Rol etiketi
const roleLabel = computed(() => {
  if (!user.value?.role) return "Kullanıcı";
  if (user.value.role === "admin") return "Yönetici (Admin)";
  return "Kullanıcı";
});
</script>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 0 auto;
  transition: color 0.25s ease, background-color 0.25s ease;
}

.profile-page--light {
  color: #111827;
}

.profile-page--dark {
  color: #e5e7eb;
}

/* Ortak kart stili --------------------------------------------------- */

.profile-card {
  border-radius: 16px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease,
    border-color 0.2s ease;
}

/* Light mod kart görünümü */
.profile-page--light .profile-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

/* Dark mod kart görünümü */
.profile-page--dark .profile-card {
  background: radial-gradient(circle at top, #0b1120 0, #020617 70%);
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.95);
}

/* Dark modda text renklerini Vuetify'den override et */
.profile-page--dark .profile-card,
.profile-page--dark .profile-card .text-body-1,
.profile-page--dark .profile-card .text-body-2,
.profile-page--dark .profile-card .text-subtitle-1,
.profile-page--dark .profile-card .text-subtitle-2,
.profile-page--dark .profile-card .text-caption {
  color: #e5e7eb !important;
}

.profile-page--dark .profile-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* Üst header kartına minik fark ------------------------------------- */
.profile-header-card {
  margin-bottom: 24px;
}

/* Avatar ------------------------------------------------------------- */

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: inline-flex;
  background: linear-gradient(
    135deg,
    rgba(56, 189, 248, 0.18),
    rgba(129, 140, 248, 0.22)
  );
  border: 1px solid rgba(148, 163, 184, 0.6);
}

/* v-list arka planını kartınkine yedir */
.no-bg-list :deep(.v-list-item) {
  padding-left: 0;
}

/* Not satırı --------------------------------------------------------- */

.profile-note {
  margin-top: 12px;
}

/* DARK MODDA PROFİL LİSTELERİNDEKİ BEYAZ ARKA PLANI TAMAMEN KALDIRIR */
.profile-page--dark .v-list,
.profile-page--dark .v-list-item,
.profile-page--dark .no-bg-list,
.profile-page--dark .no-bg-list :deep(.v-list-item-title),
.profile-page--dark .no-bg-list :deep(.v-list-item-subtitle) {
  background: transparent !important;
  color: #e5e7eb !important;
}

/* List kart bölümü de kararsın */
.profile-page--dark .v-list-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

/* Sol & sağ kutuların zeminini karta uyumlu yapıyoruz */
.profile-page--dark .profile-card .v-row > .v-col .v-list {
  background: transparent !important;
}

/* Alt not yazısı dark modda görünür olsun */
.profile-page--dark .text-medium-emphasis,
.profile-page--dark p.text-medium-emphasis,
.profile-page--dark .profile-page p {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Light modda da okunaklı kalsın */
.profile-page--light p {
  color: rgba(71, 85, 105, 0.9) !important;
}

.profile-page--light .text-medium-emphasis {
  color: rgba(100, 116, 139, 0.9) !important;
}
</style>
