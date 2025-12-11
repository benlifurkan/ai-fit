<template>
  <div
    class="login-page"
    :class="isDark ? 'login-page--dark' : 'login-page--light'"
  >
    <v-row class="login-shell" align="stretch" justify="center" no-gutters>
      <!-- SOL TARAF – Marka / Benefit alanı (md ve üzeri) -->
      <v-col cols="12" md="6" class="hidden-md-and-down pr-6">
        <div class="login-hero">
          <div class="login-badge">
            <span class="dot"></span>
            AI · AR Powered Fit Engine
          </div>

          <h1 class="login-title">
            Tek bir hesapla,
            <span>stilini ve bedenini</span>
            senin adına yöneten akıllı asistan.
          </h1>

          <p class="login-text">
            AI-Fit hesabınla; vücut ölçülerini kaydedebilir, sana özel t-shirt
            önerileri alabilir, AI Try-On ile kombinlerini üzerinde
            görebilirsin. Giriş yaptıktan sonra
            <strong>favorilerin</strong>, <strong>sepetin</strong> ve
            <strong>geçmiş denemelerin</strong> seninle gelir.
          </p>

          <ul class="login-list">
            <li>
              <v-icon size="18" class="mr-2">mdi-check-decagram</v-icon>
              Kişisel ölçülerine göre beden önerisi
            </li>
            <li>
              <v-icon size="18" class="mr-2">mdi-image-search</v-icon>
              Fotoğrafınla AI Try-On geçmişi
            </li>
            <li>
              <v-icon size="18" class="mr-2">mdi-heart</v-icon>
              Favori ürünlerine hızlı erişim
            </li>
          </ul>
        </div>
      </v-col>

      <!-- SAĞ TARAF – Login kartı -->
      <v-col cols="12" md="6">
        <v-card class="login-card" elevation="6">
          <div class="login-card-header">
            <div class="login-chip">
              <span class="chip-dot"></span>
              Hesabına giriş yap
            </div>
            <h2 class="login-card-title">Tekrar hoş geldin 👋</h2>
            <p class="login-card-subtitle">
              E-posta ve şifrenle giriş yaparak AI-Fit deneyimini kaldığın
              yerden devam ettir.
            </p>
          </div>

          <v-form @submit.prevent="handleLogin" class="mt-4">
            <v-text-field
              v-model="email"
              label="E-posta adresin"
              prepend-icon="mdi-email-outline"
              type="email"
              autocomplete="email"
              required
              density="comfortable"
              variant="outlined"
              class="mb-3"
            />
            <v-text-field
              v-model="password"
              label="Şifre"
              prepend-icon="mdi-lock-outline"
              type="password"
              autocomplete="current-password"
              required
              density="comfortable"
              variant="outlined"
            />

            <div
              class="d-flex justify-space-between align-center mt-2 mb-1 text-caption text-medium-emphasis"
            >
              <span
                >Şifreni unuttuysan yakında buradan sıfırlayabileceksin.</span
              >
            </div>

            <v-btn
              type="submit"
              color="primary"
              class="mt-4 login-submit-btn"
              :loading="loading"
              block
            >
              <v-icon start>mdi-login</v-icon>
              Giriş Yap
            </v-btn>
          </v-form>

          <div class="login-footer text-caption mt-5">
            <span>Henüz hesabın yok mu?</span>
            <RouterLink to="/register" class="login-link">
              Kayıt ol
            </RouterLink>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { setUser } from "@/stores/auth";
import { toast } from "vue-sonner";
import { useThemeStore } from "@/stores/theme";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const handleLogin = async () => {
  loading.value = true;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Giriş sırasında hata oluştu.");
    }

    setUser(data.user);
    toast.success("Giriş başarılı, hoş geldin!");
    router.push("/");
  } catch (err: any) {
    toast.error(err?.message || "Beklenmeyen bir hata oluştu.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  max-width: 1120px;
  margin: 0 auto;
  min-height: 72vh;
  display: flex;
  align-items: center;
  transition: color 0.25s ease, background-color 0.25s ease;
}

.login-page--light {
  color: #111827;
}

.login-page--dark {
  color: #e5e7eb;
}

/* Grid kabuğu */
.login-shell {
  width: 100%;
}

/* SOL HERO ------------------------------------------------------------ */

.login-hero {
  padding: 2.5rem 0;
}

.login-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: radial-gradient(
    circle at left,
    rgba(56, 189, 248, 0.18),
    transparent 55%
  );
}

.login-badge .dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #22c55e;
  margin-right: 6px;
}

.login-title {
  margin-top: 1.5rem;
  font-size: 1.9rem;
  line-height: 1.3;
  font-weight: 800;
}

.login-title span {
  display: block;
  background: linear-gradient(120deg, #38bdf8, #a855f7);
  -webkit-background-clip: text;
  color: transparent;
}

.login-text {
  margin-top: 0.9rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.login-page--light .login-text {
  color: rgba(71, 85, 105, 0.95);
}

.login-page--dark .login-text {
  color: rgba(148, 163, 184, 0.95);
}

.login-list {
  margin-top: 1.1rem;
  list-style: none;
  padding: 0;
  font-size: 0.9rem;
}

.login-page--light .login-list {
  color: rgba(71, 85, 105, 0.95);
}

.login-page--dark .login-list {
  color: rgba(209, 213, 219, 0.95);
}

.login-list li {
  display: flex;
  align-items: center;
  margin-bottom: 0.35rem;
}

/* SAĞ LOGIN KARTI ------------------------------------------------------ */

.login-card {
  border-radius: 20px;
  padding: 1.9rem 2rem 1.8rem;
  backdrop-filter: blur(18px);
  transition: background-color 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease, transform 0.18s ease;
}

/* Light mod kart */
.login-page--light .login-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 22px 55px rgba(15, 23, 42, 0.12);
}

/* Dark mod kart */
.login-page--dark .login-card {
  background: radial-gradient(at top, #020617, #020617 65%);
  border: 1px solid rgba(148, 163, 184, 0.55);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.98);
}

/* Dark modda Vuetify’nin default siyah text’ini override et */
.login-page--dark .login-card,
.login-page--dark .login-card .v-field-label,
.login-page--dark .login-card .v-input,
.login-page--dark .login-card .text-body-1,
.login-page--dark .login-card .text-body-2,
.login-page--dark .login-card .text-subtitle-1,
.login-page--dark .login-card .text-subtitle-2,
.login-page--dark .login-card .text-caption {
  color: #e5e7eb !important;
}

.login-page--dark .login-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* header */
.login-card-header {
  margin-bottom: 0.5rem;
}

.login-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.8rem;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(148, 163, 184, 0.7);
}

.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #38bdf8;
  margin-right: 6px;
}

.login-card-title {
  margin-top: 0.8rem;
  font-size: 1.35rem;
  font-weight: 700;
}

.login-card-subtitle {
  margin-top: 0.3rem;
  font-size: 0.85rem;
}

.login-page--light .login-card-subtitle {
  color: rgba(71, 85, 105, 0.95);
}

.login-page--dark .login-card-subtitle {
  color: rgba(148, 163, 184, 0.95);
}

/* Button */
.login-submit-btn {
  border-radius: 999px;
  font-weight: 600;
}

/* footer link */
.login-footer {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 1.6rem;
}

.login-page--light .login-footer {
  color: rgba(71, 85, 105, 0.95);
}

.login-page--dark .login-footer {
  color: rgba(148, 163, 184, 0.95);
}

.login-link {
  font-weight: 600;
  text-decoration: none;
  color: #38bdf8;
}

.login-link:hover {
  text-decoration: underline;
}

/* responsive */
@media (max-width: 959px) {
  .login-page {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .login-card {
    margin-top: 0.5rem;
  }
}
</style>
