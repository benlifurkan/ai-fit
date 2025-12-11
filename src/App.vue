<template>
  <v-app :class="isDark ? 'theme-dark-app' : 'theme-light-app'">
    <!-- 🔥 Toast'ı her sayfadan bağımsız, direkt html seviyesine teleport et -->
    <Teleport to="html">
      <Toaster
        :theme="isDark ? 'dark' : 'light'"
        position="bottom-right"
        rich-colors
        close-button
        expand
        :duration="3000"
      />
    </Teleport>
    <v-main
      :class="['app-main', isDark ? 'app-main--dark' : 'app-main--light']"
    >
      <!-- BÜTÜN LAYOUT BURADA -->
      <div class="layout-root">
        <!-- 🔝 STICKY NAVBAR -->
        <header
          id="app-navbar"
          class="app-navbar backdrop-blur-xl"
          :class="isDark ? 'app-navbar--dark' : 'app-navbar--light'"
        >
          <v-container
            class="d-flex align-center justify-space-between max-w-7xl mx-auto"
          >
            <!-- Logo / Brand -->
            <div class="d-flex align-center gap-2">
              <v-img
                src="/aifit-logo.png"
                type="fit"
                target="_blank"
                alt="AI-Fit"
                height="100"
                width="100"
                @click="router.push('/')"
              />
            </div>

            <!-- Menü + Kullanıcı + Sepet -->
            <div class="d-flex align-center ga-3">
              <v-btn
                variant="text"
                to="/"
                class="app-navbar-btn text-capitalize"
              >
                Ana Sayfa
              </v-btn>

              <v-btn
                variant="text"
                to="/recommendations"
                class="app-navbar-btn text-capitalize"
              >
                Öneriler
              </v-btn>
              <v-btn
                variant="text"
                to="/try-on"
                class="app-navbar-btn text-capitalize"
              >
                AR Deneme
              </v-btn>

              <v-divider vertical class="mx-2 app-navbar-divider" />

              <!-- Kullanıcı Menüsü -->
              <v-menu content-class="user-menu-content" offset-y>
                <template #activator="{ props }">
                  <v-btn v-bind="props" icon class="app-navbar-icon">
                    <v-icon>mdi-account-circle</v-icon>
                  </v-btn>
                </template>

                <v-list min-width="260" class="user-menu-list pa-0">
                  <!-- ✅ GİRİŞ YAPILMIŞSA -->
                  <template v-if="isLoggedIn">
                    <!-- Mini profil header -->
                    <div class="user-menu-header d-flex align-center px-4 py-3">
                      <v-avatar size="40" class="user-menu-avatar mr-3">
                        <!-- Eğer ileride user.photoUrl gelirse direkt onu kullanabilirsin 
                        <v-img
                          :src="currentUser?.photoUrl"
                          v-if="currentUser?.photoUrl"
                        /> -->
                        <span>
                          {{ userInitials }}
                        </span>
                      </v-avatar>

                      <div class="d-flex flex-column">
                        <span class="text-body-2 font-weight-medium">
                          {{ userDisplayName }}
                        </span>
                        <span class="text-caption user-menu-email">
                          {{ currentUser?.email }}
                        </span>
                      </div>
                    </div>

                    <v-divider class="my-1" />

                    <v-list-item to="/profile">
                      <template #prepend>
                        <v-icon size="18" class="mr-2">mdi-account</v-icon>
                      </template>
                      <v-list-item-title>Bilgilerim</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/history">
                      <template #prepend>
                        <v-icon size="18" class="mr-2">mdi-camera-burst</v-icon>
                      </template>
                      <v-list-item-title
                        >Geçmiş AR Denemelerim</v-list-item-title
                      >
                    </v-list-item>

                    <v-list-item to="/favorites">
                      <template #prepend>
                        <v-icon size="18" class="mr-2">mdi-heart</v-icon>
                      </template>
                      <v-list-item-title>Favorilerim</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="isAdmin" to="/admin">
                      <template #prepend>
                        <v-icon size="18" class="mr-2"
                          >mdi-shield-account</v-icon
                        >
                      </template>
                      <v-list-item-title>Admin Paneli</v-list-item-title>
                    </v-list-item>

                    <v-divider class="my-1" />

                    <!-- 🔴 Premium logout -->
                    <v-list-item class="user-menu-logout" @click="handleLogout">
                      <template #prepend>
                        <div class="user-menu-logout-icon">
                          <v-icon size="18">mdi-logout</v-icon>
                        </div>
                      </template>
                      <v-list-item-title>Çıkış</v-list-item-title>
                    </v-list-item>
                  </template>

                  <!-- 🚪 GİRİŞ YOKSA -->
                  <template v-else>
                    <v-list-item to="/login">
                      <template #prepend>
                        <v-icon size="18" class="mr-2">mdi-login</v-icon>
                      </template>
                      <v-list-item-title>Giriş Yap</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/register">
                      <template #prepend>
                        <v-icon size="18" class="mr-2">mdi-account-plus</v-icon>
                      </template>
                      <v-list-item-title>Kayıt Ol</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>

              <!-- Sepet Butonu + Badge -->
              <v-badge
                v-if="cartCount > 0"
                :content="cartCount"
                color="red"
                overlap
                offset-x="4"
                offset-y="4"
              >
                <v-btn
                  icon
                  variant="text"
                  to="/shopping"
                  class="app-navbar-icon"
                >
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-badge>

              <!-- Sepet boşken sade ikon -->
              <v-btn
                v-else
                icon
                variant="text"
                to="/shopping"
                class="app-navbar-icon"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>

              <!-- Theme Toggle -->
              <v-btn icon variant="text" @click="toggleTheme">
                <v-icon v-if="isDark">mdi-white-balance-sunny</v-icon>
                <v-icon v-else>mdi-weather-night</v-icon>
              </v-btn>
            </div>
          </v-container>
        </header>

        <!-- ANA İÇERİK -->
        <v-container class="py-8 max-w-7xl mx-auto">
          <router-view />
        </v-container>

        <!-- FOOTER -->
        <footer
          :class="[
            'app-footer relative mt-6 overflow-hidden',
            isDark ? 'app-footer--dark' : 'app-footer--light',
          ]"
        >
          <!-- Arka plandaki soft glow efektleri -->
          <div class="pointer-events-none absolute inset-0 opacity-60">
            <div
              class="absolute -top-32 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/22 blur-3xl"
            ></div>
            <div
              class="absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl"
            ></div>
          </div>

          <!-- Neon çizgi -->
          <div
            :class="[
              'relative h-[3px] w-full app-footer-neon',
              isDark ? 'app-footer-neon--dark' : 'app-footer-neon--light',
            ]"
          ></div>

          <div class="relative max-w-7xl mx-auto px-6 py-10 space-y-10">
            <!-- Üst CTA / Badge alanı -->
            <div
              :class="[
                'flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl px-5 py-4 backdrop-blur-xl app-footer-cta',
                isDark ? 'app-footer-cta--dark' : 'app-footer-cta--light',
              ]"
            >
              <div class="space-y-1.5">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] app-footer-badge',
                    isDark
                      ? 'app-footer-badge--dark'
                      : 'app-footer-badge--light',
                  ]"
                >
                  <span
                    class="inline-block h-[6px] w-[6px] rounded-full bg-emerald-400 mr-2"
                  ></span>
                  AI · AR Powered Fit Engine
                </span>
                <h2
                  :class="[
                    'text-lg md:text-xl font-semibold app-footer-title',
                    isDark
                      ? 'app-footer-title--dark'
                      : 'app-footer-title--light',
                  ]"
                >
                  Stilini tahmin etmiyoruz,
                  <span :class="isDark ? 'text-cyan-300' : 'text-blue-600'"
                    >hesaplıyoruz.</span
                  >
                </h2>
                <p
                  :class="[
                    'text-xs md:text-sm app-footer-text',
                    isDark ? 'app-footer-text--dark' : 'app-footer-text--light',
                  ]"
                >
                  Vücut ölçülerin, stil tercihlerin ve önceki seçimlerinden
                  öğrenen akıllı bir öneri motoru ile
                  <span class="text-sky-300">“üstüme yakışır mı?”</span> sorusu
                  tarihe karışıyor.
                </p>
              </div>

              <div class="flex flex-col items-start md:items-end gap-2">
                <p
                  class="text-[11px] uppercase tracking-[0.15em] text-slate-400"
                >
                  Bugün önerilen kombin sayısı
                </p>
                <div class="flex items-baseline gap-1">
                  <span
                    :class="[
                      'text-2xl md:text-3xl font-bold app-footer-number',
                      isDark
                        ? 'app-footer-number--dark'
                        : 'app-footer-number--light',
                    ]"
                  >
                    1.284
                  </span>
                  <span
                    :class="[
                      'text-[11px] app-footer-label',
                      isDark
                        ? 'app-footer-label--dark'
                        : 'app-footer-label--light',
                    ]"
                    >kombin</span
                  >
                </div>
                <a
                  href="/recommendations"
                  class="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-fuchsia-500/40 transition-transform hover:-translate-y-[1px]"
                >
                  Sana özel önerileri gör
                  <span class="ml-1 text-base">↗</span>
                </a>
              </div>
            </div>

            <!-- Ana grid içerik -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12"
            >
              <!-- Brand -->
              <div class="space-y-3">
                <div>
                  <div class="flex items-center gap-2">
                    <h3
                      :class="[
                        'text-2xl font-extrabold tracking-[0.28em] app-footer-brand-title',
                        isDark
                          ? 'app-footer-brand-title--dark'
                          : 'app-footer-brand-title--light',
                      ]"
                    >
                      AI-FIT
                    </h3>
                  </div>
                  <p
                    class="mb-4"
                    :class="[
                      'mt-2 text-sm leading-relaxed app-footer-brand-text',
                      isDark
                        ? 'app-footer-brand-text--dark'
                        : 'app-footer-brand-text--light',
                    ]"
                  >
                    AI ve AR destekli kişisel kıyafet öneri platformu. ⚡
                    <br />
                    <span
                      :class="[
                        isDark
                          ? 'app-footer-brand-text--dark'
                          : 'app-footer-brand-text--light',
                      ]"
                    >
                      Tarzını bul, üstünde gör, güvenle sipariş ver.
                    </span>
                  </p>
                </div>
                <div class="flex flex-wrap gap-2 pt-1">
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] app-footer-chip',
                      isDark
                        ? 'app-footer-chip--dark'
                        : 'app-footer-chip--light',
                    ]"
                  >
                    <span
                      class="mr-1 h-[6px] w-[6px] rounded-full bg-emerald-400"
                    ></span>
                    Beta • v0.1
                  </span>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] app-footer-chip',
                      isDark
                        ? 'app-footer-chip--dark'
                        : 'app-footer-chip--light',
                    ]"
                  >
                    AR Try-On destekli
                  </span>
                </div>
              </div>

              <!-- Keşfet -->
              <div>
                <h4
                  :class="[
                    'text-sm font-semibold tracking-[0.18em] uppercase app-footer-section-title',
                    isDark
                      ? 'app-footer-section-title--dark'
                      : 'app-footer-section-title--light',
                  ]"
                >
                  Keşfet
                </h4>
                <ul class="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      href="/"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        class="h-[3px] w-[3px] rounded-full bg-slate-500"
                      ></span>
                      Ana Sayfa
                    </a>
                  </li>
                  <li>
                    <a
                      href="/recommendations"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      Öneriler
                    </a>
                  </li>
                  <li>
                    <a
                      href="/try-on"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      AR Try-On
                    </a>
                  </li>
                  <li>
                    <a
                      href="/favorites"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      Favorilerim
                    </a>
                  </li>
                  <li>
                    <a
                      href="/shopping"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      Sepetim
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Destek -->
              <div>
                <h4
                  :class="[
                    'text-sm font-semibold tracking-[0.18em] uppercase app-footer-section-title',
                    isDark
                      ? 'app-footer-section-title--dark'
                      : 'app-footer-section-title--light',
                  ]"
                >
                  Destek
                </h4>
                <ul class="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      href="/faq"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      Sık Sorulan Sorular
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      İletişim
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      Gizlilik Politikası
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      :class="[
                        'inline-flex items-center gap-1 hover:translate-x-[2px] transition-all app-footer-link',
                        isDark
                          ? 'app-footer-link--dark'
                          : 'app-footer-link--light',
                      ]"
                    >
                      <span
                        :class="[
                          'h-[3px] w-[3px] rounded-full app-footer-dot',
                          isDark
                            ? 'app-footer-dot--dark'
                            : 'app-footer-dot--light',
                        ]"
                      ></span>
                      Kullanım Şartları
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Sosyal & mini newsletter -->
              <div class="space-y-4">
                <h4
                  :class="[
                    'text-sm font-semibold tracking-[0.18em] uppercase app-footer-section-title',
                    isDark
                      ? 'app-footer-section-title--dark'
                      : 'app-footer-section-title--light',
                  ]"
                >
                  Topluluk & Güncellemeler
                </h4>

                <div class="flex gap-3 text-xl mt-1 mb-1">
                  <a
                    href="#"
                    :class="[
                      'flex h-9 w-9 items-center justify-center rounded-full opacity-80 transition hover:opacity-100 hover:-translate-y-[1px] app-footer-social',
                      isDark
                        ? 'app-footer-social--dark'
                        : 'app-footer-social--light',
                    ]"
                  >
                    <i class="mdi mdi-instagram"></i>
                  </a>
                  <a
                    href="#"
                    :class="[
                      'flex h-9 w-9 items-center justify-center rounded-full opacity-80 transition hover:opacity-100 hover:-translate-y-[1px] app-footer-social',
                      isDark
                        ? 'app-footer-social--dark'
                        : 'app-footer-social--light',
                    ]"
                  >
                    <i class="mdi mdi-twitter"></i>
                  </a>
                  <a
                    href="#"
                    :class="[
                      'flex h-9 w-9 items-center justify-center rounded-full opacity-80 transition hover:opacity-100 hover:-translate-y-[1px] app-footer-social',
                      isDark
                        ? 'app-footer-social--dark'
                        : 'app-footer-social--light',
                    ]"
                  >
                    <i class="mdi mdi-facebook"></i>
                  </a>
                </div>

                <div class="space-y-2">
                  <p
                    :class="[
                      'text-xs app-footer-newsletter-text',
                      isDark
                        ? 'app-footer-newsletter-text--dark'
                        : 'app-footer-newsletter-text--light',
                    ]"
                  >
                    Yeni özellikler ve AI-Fit güncellemeleri geldiğinde ilk sen
                    haberdar ol.
                  </p>
                  <div
                    :class="[
                      'flex items-center gap-2 rounded-full px-3 py-1.5 mt-4 app-footer-newsletter-input',
                      isDark
                        ? 'app-footer-newsletter-input--dark'
                        : 'app-footer-newsletter-input--light',
                    ]"
                  >
                    <i
                      :class="[
                        'mdi mdi-email-outline text-base app-footer-newsletter-icon',
                        isDark
                          ? 'app-footer-newsletter-icon--dark'
                          : 'app-footer-newsletter-icon--light',
                      ]"
                    ></i>
                    <input
                      type="email"
                      placeholder="E-posta adresin"
                      :class="[
                        'w-full bg-transparent text-xs focus:outline-none app-footer-newsletter-field',
                        isDark
                          ? 'app-footer-newsletter-field--dark'
                          : 'app-footer-newsletter-field--light',
                      ]"
                    />
                    <button
                      type="button"
                      :class="[
                        'rounded-full px-3 py-1 text-[11px] font-semibold transition app-footer-newsletter-btn',
                        isDark
                          ? 'app-footer-newsletter-btn--dark'
                          : 'app-footer-newsletter-btn--light',
                      ]"
                    >
                      Katıl
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alt telif bandı -->
            <div
              :class="[
                'border-t pt-4 pb-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] app-footer-copyright mt-4',
                isDark
                  ? 'app-footer-copyright--dark'
                  : 'app-footer-copyright--light',
              ]"
            >
              <p :class="[isDark ? 'text-slate-400' : 'text-slate-600']">
                © {{ new Date().getFullYear() }} AI-Fit — All Rights Reserved.
              </p>
              <p
                :class="[
                  'text-[10px]',
                  isDark ? 'text-slate-500' : 'text-slate-500',
                ]"
              >
                "Yanlış beden" iade sayısını azaltmak için tasarlanmış yapay
                zekâ destekli deneyim.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { currentUser, setUser } from "@/stores/auth";
import { Toaster, toast } from "vue-sonner";
import { useCart } from "@/stores/cart";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);
const toggleTheme = () => themeStore.toggleTheme();

const router = useRouter();

const isLoggedIn = computed(() => !!currentUser.value);
const userDisplayName = computed(
  () => currentUser.value?.name || currentUser.value?.email || "Kullanıcı"
);
const isAdmin = computed(() => currentUser.value?.role === "admin");

// 🛒 Sepet store'u
const { cartItems } = useCart();
const cartCount = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
); // badge'de kullanılacak

const handleLogout = () => {
  setUser(null);
  router.push("/");

  toast.success("Çıkış yapıldı", {
    description: "Tekrar görüşmek üzere. 👋",
    duration: 2500,
  });
};

const userInitials = computed(() => {
  const u = currentUser.value;
  if (!u) return "AI";

  const source = (u.name || u.email || "").trim();
  if (!source) return "AI";

  const parts = source.split(/\s+/);
  if (parts.length === 1) {
    return parts[0]?.charAt(0).toUpperCase() || "?";
  }
  return (
    (parts[0]?.charAt(0) || "").toUpperCase() +
    (parts[1]?.charAt(0) || "").toUpperCase()
  );
});

// Toast'lar vue-sonner tarafından otomatik yönetiliyor
</script>

<style scoped>
.icon {
  margin-right: 10px;
  height: 40px;
  width: auto;
  object-fit: contain;
}

/* Tema bazlı arka plan / yazı rengi */
.theme-dark-app {
  background-color: #020617; /* slate-950 */
  color: #e5e7eb;
}

.theme-light-app {
  background-color: #f9fafb; /* açık gri */
  color: #0f172a;
}

/* ================= NAVBAR ================= */
.app-navbar--dark {
  background: rgba(2, 6, 23, 0.95) !important;
  color: #e5e7eb !important;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3) !important;
}

.app-navbar--light {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #0f172a !important;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2) !important;
}

.app-navbar-btn {
  transition: color 0.2s ease;
}

.app-navbar--dark .app-navbar-btn {
  color: #e5e7eb !important;
}

.app-navbar--dark .app-navbar-btn:hover {
  color: #38bdf8 !important;
}

.app-navbar--light .app-navbar-btn {
  color: #0f172a !important;
}

.app-navbar--light .app-navbar-btn:hover {
  color: #2563eb !important;
}

.app-navbar-icon {
  transition: color 0.2s ease;
}

.app-navbar--dark .app-navbar-icon {
  color: #e5e7eb !important;
}

.app-navbar--light .app-navbar-icon {
  color: #0f172a !important;
}

.app-navbar-divider {
  border-color: rgba(148, 163, 184, 0.4) !important;
}

.layout-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* NAVBAR – sticky */
.app-navbar {
  position: sticky;
  top: 0;
  z-index: 2000;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

/* Navbar altındaki container bar'ı doldursun */
.app-navbar .v-container {
  height: 100%;
  display: flex;
  align-items: center;
}

/* İçerik navbara yapışmasın diye ufak boşluk */
.app-main {
  /* sticky olduğu için ekstra padding-top çok gerekmiyor */
}

/* ================= MAIN ================= */

/*
.app-main {
  padding-top: 80px !important;
} */

.app-main--dark {
  background: linear-gradient(to bottom, #020617, #020617, #0f172a) !important;
  color: #e5e7eb !important;
}

.app-main--light {
  background: linear-gradient(to bottom, #f9fafb, #f9fafb, #f3f4f6) !important;
  color: #0f172a !important;
}

/* Vuetify v-main override */
.app-main--dark :deep(.v-main__wrap) {
  background: linear-gradient(to bottom, #020617, #020617, #0f172a) !important;
}

.app-main--light :deep(.v-main__wrap) {
  background: linear-gradient(to bottom, #f9fafb, #f9fafb, #f3f4f6) !important;
}

/* ================= FOOTER ================= */
.app-footer--dark {
  background: #020617 !important;
  color: #e5e7eb !important;
  border-top: 1px solid rgba(148, 163, 184, 0.3) !important;
}

.app-footer--light {
  background: #ffffff !important;
  color: #0f172a !important;
  border-top: 1px solid rgba(148, 163, 184, 0.2) !important;
}

.app-footer-cta--dark {
  border: 1px solid rgba(148, 163, 184, 0.4) !important;
  background: rgba(15, 23, 42, 0.7) !important;
}

.app-footer-cta--light {
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  background: rgba(249, 250, 251, 0.8) !important;
}

.app-footer-badge--dark {
  border: 1px solid rgba(148, 163, 184, 0.4) !important;
  background: rgba(2, 6, 23, 0.7) !important;
  color: rgba(203, 213, 225, 0.8) !important;
}

.app-footer-badge--light {
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  color: rgba(71, 85, 105, 0.9) !important;
}

.app-footer-title--dark {
  color: #f9fafb !important;
}

.app-footer-title--light {
  color: #111827 !important;
}

.app-footer-text--dark {
  color: rgba(203, 213, 225, 0.9) !important;
}

.app-footer-text--light {
  color: rgba(71, 85, 105, 0.9) !important;
}

.app-footer-number--dark {
  color: #38bdf8 !important;
  text-shadow: 0 0 12px rgba(34, 211, 238, 0.5) !important;
}

.app-footer-number--light {
  color: #2563eb !important;
}

.app-footer-label--dark {
  color: rgba(148, 163, 184, 1) !important;
}

.app-footer-label--light {
  color: rgba(100, 116, 139, 1) !important;
}

.app-footer-brand-title--dark {
  color: #f9fafb !important;
}

.app-footer-brand-title--light {
  color: #111827 !important;
}

.app-footer-brand-text--dark {
  color: rgba(203, 213, 225, 0.9) !important;
}

.app-footer-brand-text--light {
  color: rgba(71, 85, 105, 0.9) !important;
}

.app-footer-chip--dark {
  border: 1px solid rgba(148, 163, 184, 0.4) !important;
  background: rgba(15, 23, 42, 0.8) !important;
  color: rgba(203, 213, 225, 0.9) !important;
}

.app-footer-chip--light {
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  background: rgba(249, 250, 251, 0.9) !important;
  color: rgba(71, 85, 105, 0.9) !important;
}

.app-footer-section-title--dark {
  color: #f9fafb !important;
}

.app-footer-section-title--light {
  color: #111827 !important;
}

.app-footer-link--dark {
  color: rgba(203, 213, 225, 1) !important;
}

.app-footer-link--dark:hover {
  color: #ffffff !important;
}

.app-footer-link--light {
  color: rgba(71, 85, 105, 1) !important;
}

.app-footer-link--light:hover {
  color: #0f172a !important;
}

.app-footer-dot--dark {
  background: rgba(148, 163, 184, 0.6) !important;
}

.app-footer-dot--light {
  background: rgba(100, 116, 139, 0.6) !important;
}

.app-footer-social--dark {
  border: 1px solid rgba(148, 163, 184, 0.4) !important;
  background: rgba(15, 23, 42, 0.8) !important;
  color: #e5e7eb !important;
}

.app-footer-social--dark:hover {
  box-shadow: 0 0 18px rgba(129, 140, 248, 0.7) !important;
  border-color: #818cf8 !important;
}

.app-footer-social--light {
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  background: rgba(249, 250, 251, 0.9) !important;
  color: #0f172a !important;
}

.app-footer-social--light:hover {
  box-shadow: 0 0 18px rgba(37, 99, 235, 0.4) !important;
  border-color: #2563eb !important;
}

.app-footer-newsletter-text--dark {
  color: rgba(203, 213, 225, 0.9) !important;
}

.app-footer-newsletter-text--light {
  color: rgba(71, 85, 105, 0.9) !important;
}

.app-footer-newsletter-input--dark {
  border: 1px solid rgba(148, 163, 184, 0.4) !important;
  background: rgba(15, 23, 42, 0.8) !important;
}

.app-footer-newsletter-input--light {
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  background: rgba(249, 250, 251, 0.9) !important;
}

.app-footer-newsletter-icon--dark {
  color: rgba(148, 163, 184, 1) !important;
}

.app-footer-newsletter-icon--light {
  color: rgba(100, 116, 139, 1) !important;
}

.app-footer-newsletter-field--dark {
  color: #e5e7eb !important;
}

.app-footer-newsletter-field--dark::placeholder {
  color: rgba(148, 163, 184, 0.6) !important;
}

.app-footer-newsletter-field--light {
  color: #0f172a !important;
}

.app-footer-newsletter-field--light::placeholder {
  color: rgba(100, 116, 139, 0.6) !important;
}

.app-footer-newsletter-btn--dark {
  background: rgba(148, 163, 184, 0.2) !important;
  color: #e5e7eb !important;
}

.app-footer-newsletter-btn--dark:hover {
  background: rgba(148, 163, 184, 0.3) !important;
}

.app-footer-newsletter-btn--light {
  background: #e5e7eb !important;
  color: #0f172a !important;
}

.app-footer-newsletter-btn--light:hover {
  background: #d1d5db !important;
}

.app-footer-copyright--dark {
  border-top-color: rgba(148, 163, 184, 0.4) !important;
}

.app-footer-copyright--light {
  border-top-color: rgba(148, 163, 184, 0.2) !important;
}

.app-footer-neon--dark {
  background: linear-gradient(to right, #d946ef, #6366f1, #22d3ee) !important;
}

.app-footer-neon--light {
  background: linear-gradient(to right, #ec4899, #4f46e5, #06b6d4) !important;
}

/* NAVBAR yüksekliği ve padding kaldırıldı - global style'da ayarlanacak */
</style>

<style>
body {
  margin: 0;
}

/* USER DROPDOWN – sadece kullanıcı menüsüne özel */
.user-menu-content {
  border-radius: 14px !important;
  overflow: hidden;
  backdrop-filter: blur(14px);
  padding: 0; /* içteki v-list tam otursun */
  transition: background-color 0.25s, border 0.25s, box-shadow 0.25s;
}

/* === LIGHT MODE === */
body.theme-light .user-menu-content {
  /* overlay */
  background: transparent !important;
  border: none;
  box-shadow: none;
}

/* asıl görünen kutu: v-list */
body.theme-light .user-menu-content .v-list {
  background: #ffffff !important;
  border-radius: 14px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
  color: #0f172a !important;
}

body.theme-light .user-menu-content .v-list-item-title,
body.theme-light .user-menu-content .v-list-item-subtitle {
  color: #0f172a !important;
  opacity: 0.95 !important;
}

body.theme-light .user-menu-content .v-icon {
  color: #4b5563 !important; /* slate-600 */
}

/* === DARK MODE === */
body.theme-dark .user-menu-content {
  /* overlay */
  background: transparent !important;
  border: none;
  box-shadow: none;
}

body.theme-dark .user-menu-content .v-list {
  background: rgba(15, 23, 42, 0.97) !important; /* slate-900 cam efekti */
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.45); /* slate-400 */
  box-shadow: 0 18px 55px rgba(15, 23, 42, 0.9);
  color: #e5e7eb !important;
}

body.theme-dark .user-menu-content .v-list-item-title,
body.theme-dark .user-menu-content .v-list-item-subtitle {
  color: #e5e7eb !important;
  opacity: 0.96 !important;
}

body.theme-dark .user-menu-content .v-icon {
  color: #9ca3af !important;
}

/* Hover efektleri */
.user-menu-content .v-list-item:hover {
  background-color: rgba(15, 23, 42, 0.04);
}

body.theme-dark .user-menu-content .v-list-item:hover {
  background-color: rgba(148, 163, 184, 0.12);
}

/* Üstteki "Oturum açıldı" item’i hafif nefes alsın */
.user-menu-content .v-list-item:first-child {
  padding-top: 10px;
}

.user-menu-content .v-list-item-subtitle {
  opacity: 0.9;
}

/* ============ PREMIUM USER MENU ============ */

/* Header alanı */
.user-menu-header {
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
}

.user-menu-avatar {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
}

/* light / dark avatar glow */
body.theme-light .user-menu-avatar {
  background: radial-gradient(circle at 0% 0%, #e0f2fe, #e5e7eb);
  color: #0f172a;
}

body.theme-dark .user-menu-avatar {
  background: radial-gradient(circle at 0% 0%, #22d3ee, #4f46e5);
  color: #0b1120;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.85),
    0 0 18px rgba(56, 189, 248, 0.55);
}

.user-menu-email {
  opacity: 0.75;
}

/* Logout item – kırmızı gradient hover */
.user-menu-logout {
  margin: 4px 8px 8px;
  border-radius: 999px;
  padding-inline: 10px !important;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}

.user-menu-logout .v-list-item-title {
  font-weight: 500;
}

/* içteki ikon için yuvarlak chip */
.user-menu-logout-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  border-radius: 999px;
  background: rgba(248, 113, 113, 0.1);
  margin-right: 6px;
  transition: background 0.2s;
}

/* light */
body.theme-light .user-menu-logout {
  color: #b91c1c !important;
}
body.theme-light .user-menu-logout:hover {
  background: linear-gradient(90deg, #fee2e2, #fecaca);
  box-shadow: 0 10px 25px rgba(248, 113, 113, 0.35);
  transform: translateY(-1px);
}
body.theme-light .user-menu-logout:hover .user-menu-logout-icon {
  background: rgba(248, 113, 113, 0.22);
}

/* dark */
body.theme-dark .user-menu-logout {
  color: #fecaca !important;
}
body.theme-dark .user-menu-logout:hover {
  background: linear-gradient(90deg, #542a2a, #be3b5c);
  box-shadow: 0 12px 32px rgba(248, 113, 113, 0.7);
  transform: translateY(-1px);
}
body.theme-dark .user-menu-logout:hover .user-menu-logout-icon {
  background: rgba(254, 226, 226, 0.16);
}
</style>
