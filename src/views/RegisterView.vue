<template>
  <div
    class="register-page"
    :class="isDark ? 'register-page--dark' : 'register-page--light'"
  >
    <v-row class="register-shell" align="stretch" justify="center" no-gutters>
      <!-- SOL – Benefit / onboarding alanı (md ve üzeri) -->
      <v-col cols="12" md="6" class="hidden-md-and-down pr-6">
        <div class="register-hero">
          <div class="register-badge">
            <span class="dot"></span>
            AI · AR Powered Fit Profile
          </div>

          <h1 class="register-title">
            Birkaç bilgi ile
            <span>“tam sana göre”</span>
            t-shirt önerileri almaya başla.
          </h1>

          <p class="register-text">
            AI-Fit hesabını oluşturduğunda; beden ölçülerin, stil tercihlerin ve
            AI Try-On sonuçların güvenle saklanır. Böylece her girişinde
            <strong>yeniden beden seçmekle uğraşmaz</strong>, doğrudan sana uyan
            kombinlere gidersin.
          </p>

          <ul class="register-list">
            <li>
              <v-icon size="18" class="mr-2">mdi-ruler</v-icon>
              Boy & kilo bilgine göre akıllı beden önerileri
            </li>
            <li>
              <v-icon size="18" class="mr-2">mdi-palette</v-icon>
              Ten ve saç rengine uyumlu renk kombinleri
            </li>
            <li>
              <v-icon size="18" class="mr-2">mdi-camera-retake</v-icon>
              Fotoğrafla AI Try-On geçmişi ve favori kombinlerin
            </li>
          </ul>
        </div>
      </v-col>

      <!-- SAĞ – Kayıt kartı -->
      <v-col cols="12" md="6">
        <v-card class="register-card" elevation="6">
          <div class="register-card-header">
            <div class="register-chip">
              <span class="chip-dot"></span>
              Yeni hesap oluştur
            </div>
            <h2 class="register-card-title">AI-Fit’e katıl 💫</h2>
            <p class="register-card-subtitle">
              Temel bilgiler zorunlu, fiziksel özellikler ise
              <strong>öneri kalitesini artırmak için</strong> isteğe bağlıdır.
            </p>
          </div>

          <v-form @submit.prevent="handleRegister" class="mt-4">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="firstName"
                  label="İsim"
                  prepend-icon="mdi-account"
                  required
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastName"
                  label="Soyisim"
                  prepend-icon="mdi-account"
                  required
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="E-posta"
                  prepend-icon="mdi-email-outline"
                  type="email"
                  autocomplete="email"
                  required
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Şifre"
                  prepend-icon="mdi-lock-outline"
                  type="password"
                  autocomplete="new-password"
                  required
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="height"
                  label="Boy (cm)"
                  prepend-icon="mdi-human-male-height"
                  type="number"
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="weight"
                  label="Kilo (kg)"
                  prepend-icon="mdi-scale-bathroom"
                  type="number"
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  v-model="bodyType"
                  :items="bodyTypeOptions"
                  label="Vücut Tipi"
                  prepend-icon="mdi-human"
                  clearable
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  v-model="skinTone"
                  :items="skinToneOptions"
                  label="Ten Rengi"
                  prepend-icon="mdi-palette"
                  clearable
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  v-model="hairColor"
                  :items="hairColorOptions"
                  label="Saç Rengi"
                  prepend-icon="mdi-hair-dryer"
                  clearable
                  density="comfortable"
                  variant="outlined"
                />
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              color="primary"
              class="mt-4 register-submit-btn"
              :loading="loading"
              block
            >
              <v-icon start>mdi-account-plus</v-icon>
              Kayıt Ol
            </v-btn>
          </v-form>

          <div class="register-footer text-caption mt-5">
            <span>Zaten hesabın var mı?</span>
            <RouterLink to="/login" class="register-link">
              Giriş yap
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

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const height = ref(""); // cm
const weight = ref(""); // kg
const bodyType = ref<string | null>(null);
const skinTone = ref<string | null>(null);
const hairColor = ref<string | null>(null);

const loading = ref(false);

const bodyTypeOptions = ["Zayıf", "Atletik", "Orta", "Kilolu", "Kaslı"];
const skinToneOptions = ["Açık", "Buğday", "Esmer", "Koyu"];
const hairColorOptions = [
  "Siyah",
  "Kahverengi",
  "Sarı",
  "Kumral",
  "Kızıl",
  "Gri",
];

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const handleRegister = async () => {
  loading.value = true;

  try {
    if (
      !firstName.value ||
      !lastName.value ||
      !email.value ||
      !password.value
    ) {
      toast.error("İsim, soyisim, e-posta ve şifre zorunludur.");
      loading.value = false;
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        height: height.value,
        weight: weight.value,
        bodyType: bodyType.value,
        skinTone: skinTone.value,
        hairColor: hairColor.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Kayıt sırasında hata oluştu.");
    }

    setUser(data.user);
    toast.success("Kayıt başarılı, hoş geldin!");
    router.push("/");
  } catch (err: any) {
    toast.error(err?.message || "Beklenmeyen bir hata oluştu.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-page {
  max-width: 1120px;
  margin: 0 auto;
  min-height: 72vh;
  display: flex;
  align-items: center;
  transition: color 0.25s ease, background-color 0.25s ease;
}

.register-page--light {
  color: #111827;
}

.register-page--dark {
  color: #e5e7eb;
}

.register-shell {
  width: 100%;
}

/* SOL HERO ------------------------------------------------------------ */

.register-hero {
  padding: 2.5rem 0;
}

.register-badge {
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

.register-badge .dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #22c55e;
  margin-right: 6px;
}

.register-title {
  margin-top: 1.5rem;
  font-size: 1.9rem;
  line-height: 1.3;
  font-weight: 800;
}

.register-title span {
  display: block;
  background: linear-gradient(120deg, #38bdf8, #a855f7);
  -webkit-background-clip: text;
  color: transparent;
}

.register-text {
  margin-top: 0.9rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.register-page--light .register-text {
  color: rgba(71, 85, 105, 0.95);
}

.register-page--dark .register-text {
  color: rgba(148, 163, 184, 0.95);
}

.register-list {
  margin-top: 1.1rem;
  list-style: none;
  padding: 0;
  font-size: 0.9rem;
}

.register-page--light .register-list {
  color: rgba(71, 85, 105, 0.95);
}

.register-page--dark .register-list {
  color: rgba(209, 213, 219, 0.95);
}

.register-list li {
  display: flex;
  align-items: center;
  margin-bottom: 0.35rem;
}

/* SAĞ KART ------------------------------------------------------------ */

.register-card {
  border-radius: 20px;
  padding: 1.9rem 2rem 1.8rem;
  backdrop-filter: blur(18px);
  transition: background-color 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease, transform 0.18s ease;
}

/* Light mod */
.register-page--light .register-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 22px 55px rgba(15, 23, 42, 0.12);
}

/* Dark mod */
.register-page--dark .register-card {
  background: radial-gradient(at top, #020617, #020617 65%);
  border: 1px solid rgba(148, 163, 184, 0.55);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.98);
}

/* Dark modda Vuetify text override */
.register-page--dark .register-card,
.register-page--dark .register-card .v-field-label,
.register-page--dark .register-card .v-input,
.register-page--dark .register-card .text-body-1,
.register-page--dark .register-card .text-body-2,
.register-page--dark .register-card .text-subtitle-1,
.register-page--dark .register-card .text-subtitle-2,
.register-page--dark .register-card .text-caption {
  color: #e5e7eb !important;
}

.register-page--dark .register-card .text-medium-emphasis {
  color: #9ca3af !important;
}

/* header */
.register-card-header {
  margin-bottom: 0.5rem;
}

.register-chip {
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

.register-card-title {
  margin-top: 0.8rem;
  font-size: 1.35rem;
  font-weight: 700;
}

.register-card-subtitle {
  margin-top: 0.3rem;
  font-size: 0.85rem;
}

.register-page--light .register-card-subtitle {
  color: rgba(71, 85, 105, 0.95);
}

.register-page--dark .register-card-subtitle {
  color: rgba(148, 163, 184, 0.95);
}

/* button */
.register-submit-btn {
  border-radius: 999px;
  font-weight: 600;
}

/* footer */
.register-footer {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 1.6rem;
}

.register-page--light .register-footer {
  color: rgba(71, 85, 105, 0.95);
}

.register-page--dark .register-footer {
  color: rgba(148, 163, 184, 0.95);
}

.register-link {
  font-weight: 600;
  text-decoration: none;
  color: #38bdf8;
}

.register-link:hover {
  text-decoration: underline;
}

/* responsive */
@media (max-width: 959px) {
  .register-page {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .register-card {
    margin-top: 0.5rem;
  }
}
</style>
