// src/main.ts
import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

// Tailwind CSS
import "./assets/main.css";

// Custom CSS
import "./style.css";

// vue-sonner CSS (en sonda - bizim stillerimizden sonra yüklensin)
import "vue-sonner/style.css";

// 🔥 Tema store
import { useThemeStore } from "@/stores/theme";

const pinia = createPinia();

// localStorage'dan tema bilgisini oku (varsayılan: dark)
const savedTheme =
  (localStorage.getItem("theme") as "light" | "dark") || "dark";
const initialTheme = savedTheme === "dark" ? "dark" : "light";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: initialTheme,
    themes: {
      light: {
        colors: {
          primary: "#2563eb",
          secondary: "#6366f1",
          background: "#f9fafb",
          surface: "#ffffff",
          "surface-variant": "#f3f4f6",
          "on-surface": "#0f172a",
          "on-background": "#0f172a",
        },
      },
      dark: {
        colors: {
          primary: "#38bdf8",
          secondary: "#818cf8",
          background: "#020617",
          surface: "#0f172a",
          "surface-variant": "#1e293b",
          "on-surface": "#e5e7eb",
          "on-background": "#e5e7eb",
        },
      },
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);

// 🌙 / 🔆 Body'ye tema class'ını bas (pinia eklendikten sonra)
const themeStore = useThemeStore();

// ilk yüklemede ve her değişimde body class'larını ve Vuetify temasını güncelle
watch(
  () => themeStore.isDark,
  (isDark) => {
    const body = document.body;
    body.classList.toggle("theme-dark", isDark);
    body.classList.toggle("theme-light", !isDark);

    // Vuetify temasını güncelle
    const themeName = isDark ? "dark" : "light";
    // Vuetify 3.5+ için change metodu kullan
    try {
      if (typeof (vuetify.theme.global as any).change === "function") {
        (vuetify.theme.global as any).change(themeName);
      } else {
        // Fallback: Eski versiyonlar için
        (vuetify.theme.global as any).name.value = themeName;
      }
    } catch (e) {
      // Son çare fallback
      console.warn("Vuetify theme change failed:", e);
    }
  },
  { immediate: true }
);

app.mount("#app");
