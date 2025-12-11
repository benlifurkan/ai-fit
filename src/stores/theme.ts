// src/stores/theme.ts
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export type ThemeName = "light" | "dark";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<ThemeName>(
    (localStorage.getItem("theme") as ThemeName) || "dark" // varsayılan dark yapıyorum
  );

  const isDark = computed(() => theme.value === "dark");

  function setTheme(next: ThemeName) {
    theme.value = next;
  }

  function toggleTheme() {
    theme.value = isDark.value ? "light" : "dark";
  }

  // Body sınıflarını ve localStorage'ı senkron tut
  watch(
    theme,
    (value) => {
      localStorage.setItem("theme", value);
      document.body.classList.toggle("theme-dark", value === "dark");
      document.body.classList.toggle("theme-light", value === "light");
    },
    { immediate: true }
  );

  return { theme, isDark, setTheme, toggleTheme };
});
