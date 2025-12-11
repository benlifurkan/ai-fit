// src/composables/useFavorites.ts
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { currentUser } from "@/stores/auth";
import { toast } from "vue-sonner"; // 🔥 eklendi

const favoriteProductIds = ref<number[]>([]);
const isLoaded = ref(false);

export function useFavorites() {
  const router = useRouter();
  const user = computed(() => currentUser.value);

  const loadFavorites = async () => {
    if (!user.value) {
      favoriteProductIds.value = [];
      isLoaded.value = true;
      return;
    }

    try {
      const res = await fetch(
        `/api/favorites?userId=${encodeURIComponent(user.value.id)}`
      );
      if (!res.ok) {
        console.error("Favoriler yüklenemedi:", await res.text());
        isLoaded.value = true;
        toast.error("Favoriler yüklenirken bir hata oluştu."); // opsiyonel
        return;
      }

      const data = await res.json();
      favoriteProductIds.value = data.favorites || [];
      isLoaded.value = true;
    } catch (e) {
      console.error("Favoriler yüklenirken hata:", e);
      isLoaded.value = true;
      toast.error("Favoriler yüklenirken bir hata oluştu.");
    }
  };

  const isFavorite = (productId: number) => {
    return favoriteProductIds.value.includes(productId);
  };

  const toggleFavorite = async (productId: number) => {
    if (!user.value) {
      router.push({ name: "login" });
      toast("Favorilere eklemek için önce giriş yapmalısın.");
      return;
    }

    const wasFavorite = isFavorite(productId); // 🔥 önceki durumu hatırla

    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.value.id,
          productId,
        }),
      });

      if (!res.ok) {
        console.error("Favori güncellenemedi:", await res.text());
        toast.error("Favori güncellenirken bir hata oluştu.");
        return;
      }

      const data = await res.json();
      favoriteProductIds.value = data.favorites || [];

      // 🔥 Kullanıcıya anlık geri bildirim
    } catch (e) {
      console.error("Favori toggle hata:", e);
      toast.error("Favori güncellenirken bir hata oluştu.");
    }
  };

  onMounted(() => {
    loadFavorites();
  });

  watch(
    () => user.value?.id,
    () => {
      loadFavorites();
    }
  );

  return {
    user,
    favoriteProductIds,
    isFavorite,
    toggleFavorite,
    loadFavorites,
    isLoaded,
  };
}
