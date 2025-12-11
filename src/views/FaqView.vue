<template>
  <div class="faq-wrapper">
    <!-- Arka plan süsleri -->
    <div class="faq-bg-layer bg-blob blob-1" />
    <div class="faq-bg-layer bg-blob blob-2" />
    <div class="faq-bg-layer bg-blob blob-3" />

    <v-container fluid class="py-10 py-md-14">
      <v-row justify="center">
        <v-col cols="12" xl="10">
          <!-- HERO + METRİKLER -->
          <v-card
            class="faq-hero-card rounded-3xl pa-6 pa-md-8 mb-8"
            elevation="12"
          >
            <div
              class="d-flex flex-column flex-lg-row align-start justify-space-between gap-8"
            >
              <!-- Sol: Başlık + Arama -->
              <div class="hero-left">
                <div class="d-inline-flex align-center mb-3 hero-pill">
                  <v-icon size="18" class="mr-2">mdi-face-agent</v-icon>
                  <span class="text-caption font-weight-medium">
                    AI-Fit Yardım Merkezi
                  </span>
                </div>

                <h1 class="text-h4 text-md-h3 text-lg-h2 font-weight-bold mb-3">
                  Sormadan önce bak,
                  <span class="gradient-text">cevabı burada.</span>
                </h1>

                <p class="text-body-1 text-medium-emphasis mb-4 mb-md-6">
                  Beden seçimi, yapay zekâ önerileri, sanal deneme (AR),
                  güvenlik ve daha fazlası. Hepsi tek sayfada, net ve anlaşılır
                  cevaplarla.
                </p>

                <!-- Arama -->
                <v-text-field
                  v-model="searchQuery"
                  variant="solo-filled"
                  density="comfortable"
                  class="faq-search mb-4 mb-md-5"
                  rounded="xl"
                  prepend-inner-icon="mdi-magnify"
                  placeholder="Örnek: Sanal deneme nasıl çalışıyor?"
                  hide-details
                  clearable
                />

                <!-- Hızlı kısayollar -->
                <div class="d-flex flex-wrap gap-2 quick-shortcuts">
                  <v-chip
                    v-for="shortcut in shortcuts"
                    :key="shortcut.id"
                    size="small"
                    pill
                    class="shortcut-chip"
                    variant="tonal"
                    @click="handleShortcut(shortcut)"
                  >
                    <v-icon size="16" class="mr-1">
                      {{ shortcut.icon }}
                    </v-icon>
                    {{ shortcut.label }}
                  </v-chip>
                </div>
              </div>

              <!-- Sağ: Metrik kartları -->
              <div class="hero-right d-flex flex-column gap-3 w-100 w-lg-auto">
                <v-card class="metric-card rounded-2xl px-5 py-4" elevation="8">
                  <div class="d-flex align-center justify-space-between mb-3">
                    <div>
                      <div class="text-caption text-medium-emphasis mb-1">
                        Toplam cevaplanan soru
                      </div>
                      <div class="d-flex align-baseline">
                        <span class="text-h4 font-weight-bold mr-1">
                          {{ totalFaqCount }}
                        </span>
                        <span class="text-caption text-medium-emphasis">
                          aktif başlık
                        </span>
                      </div>
                    </div>
                    <div class="metric-icon">
                      <v-icon size="32">mdi-chat-question-outline</v-icon>
                    </div>
                  </div>
                  <v-progress-linear
                    :model-value="92"
                    height="6"
                    rounded
                    class="mb-1"
                  />
                  <div class="text-caption text-medium-emphasis">
                    Kullanıcıların sorularının yaklaşık %90’ı bu sayfada
                    cevaplanıyor.
                  </div>
                </v-card>

                <v-card class="metric-card rounded-2xl px-5 py-4" elevation="6">
                  <div class="d-flex align-center mb-2">
                    <v-icon size="22" class="mr-2"
                      >mdi-shield-check-outline</v-icon
                    >
                    <span class="text-subtitle-2 font-weight-medium">
                      Güvenli ve şeffaf
                    </span>
                  </div>
                  <p class="text-caption text-medium-emphasis mb-3">
                    AI-Fit; kişisel verilerini, yalnızca sana daha iyi deneyim
                    sunmak için kullanır. Detaylar ilgili gizlilik metinlerinde
                    açıkça paylaşılacaktır.
                  </p>
                  <div
                    class="d-flex align-center text-caption text-medium-emphasis"
                  >
                    <v-icon size="16" class="mr-1">mdi-lock</v-icon>
                    Gizlilik odaklı mimari
                  </div>
                </v-card>
              </div>
            </div>
          </v-card>

          <!-- Kategoriler + filtre barı -->
          <v-card
            class="rounded-2xl px-4 px-md-6 py-3 py-md-4 mb-6 category-bar"
            elevation="8"
          >
            <div
              class="d-flex flex-column flex-md-row align-md-center justify-space-between gap-3"
            >
              <div class="d-flex flex-row-reverse flex-md-row gap-2">
                <v-btn
                  size="small"
                  variant="text"
                  class="text-caption"
                  prepend-icon="mdi-refresh"
                  @click="resetFilters"
                >
                  Filtreleri sıfırla
                </v-btn>

                <div class="category-scroll d-flex gap-2 flex-grow-1">
                  <v-chip
                    v-for="category in categoriesWithAll"
                    :key="category.id"
                    size="small"
                    :color="
                      selectedCategory === category.id ? 'primary' : undefined
                    "
                    :variant="
                      selectedCategory === category.id ? 'flat' : 'outlined'
                    "
                    class="text-body-2"
                    @click="selectedCategory = category.id"
                  >
                    <v-icon v-if="category.icon" size="16" class="mr-1">
                      {{ category.icon }}
                    </v-icon>
                    {{ category.label }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-card>

          <!-- Ana içerik -->
          <v-row>
            <!-- SSS LİSTESİ -->
            <v-col cols="12" md="8" lg="8">
              <div
                v-if="filteredFaqs.length === 0"
                class="empty-state pa-6 pa-md-8 rounded-2xl text-center"
              >
                <v-icon size="42" class="mb-3"
                  >mdi-emoticon-confused-outline</v-icon
                >
                <div class="text-subtitle-1 font-weight-medium mb-1">
                  Burada henüz bir şey yok.
                </div>
                <div class="text-body-2 text-medium-emphasis mb-4">
                  Arama terimini biraz daha genel yazmayı deneyebilir veya
                  kategorileri değiştirerek farklı sorulara göz atabilirsin.
                </div>
                <v-btn variant="outlined" size="small" @click="resetFilters">
                  Tüm soruları göster
                </v-btn>
              </div>

              <template v-else>
                <div
                  v-for="category in groupedFaqs"
                  :key="category.id"
                  class="mb-6 mb-md-8"
                >
                  <div class="d-flex align-center mb-2">
                    <div class="category-icon-wrapper mr-2">
                      <v-icon size="18">{{ category.icon }}</v-icon>
                    </div>
                    <div>
                      <h2 class="text-subtitle-1 font-weight-semibold mb-0">
                        {{ category.label }}
                      </h2>
                      <p class="text-caption text-medium-emphasis mb-0">
                        {{ category.faqs.length }} soru
                      </p>
                    </div>
                  </div>

                  <v-expansion-panels
                    v-model="expandedPanels[category.id]"
                    density="comfortable"
                    class="faq-panels rounded-2xl"
                    multiple
                  >
                    <v-expansion-panel
                      v-for="faq in category.faqs"
                      :key="faq.id"
                      :data-faq-id="faq.id"
                    >
                      <v-expansion-panel-title
                        expand-icon="mdi-chevron-down"
                        collapse-icon="mdi-chevron-up"
                      >
                        <div class="d-flex align-center">
                          <span class="bullet mr-3" />
                          <span class="text-body-1 font-weight-medium">
                            {{ faq.question }}
                          </span>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <div class="faq-answer-content">
                          <p class="text-body-2 text-medium-emphasis">
                            {{ faq.answer }}
                          </p>
                        </div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </template>
            </v-col>

            <!-- YARDIM / DESTEK SİDEBAR -->
            <v-col cols="12" md="4" lg="4">
              <div class="sidebar-wrapper">
                <v-card
                  class="help-card rounded-3xl pa-5 pa-md-6 mb-4"
                  elevation="10"
                >
                  <div class="d-flex align-center mb-3">
                    <div class="help-avatar mr-3">
                      <v-icon size="26">mdi-headset</v-icon>
                    </div>
                    <div>
                      <div class="text-subtitle-2 font-weight-semibold">
                        Hâlâ kafana takılanlar mı var?
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        Sana özel destek ekibimiz burada.
                      </div>
                    </div>
                  </div>

                  <p class="text-body-2 text-medium-emphasis mb-4">
                    Teknik bir hata, öneri veya iş birliği talebin varsa, bize
                    detaylı mesaj yazman çözümü hızlandırır.
                  </p>

                  <div class="d-flex flex-column gap-2 mb-3">
                    <v-btn
                      color="primary"
                      block
                      variant="flat"
                      prepend-icon="mdi-message-text-outline"
                    >
                      Bize Yaz
                    </v-btn>
                    <v-btn
                      color="primary"
                      block
                      variant="outlined"
                      prepend-icon="mdi-whatsapp"
                    >
                      WhatsApp Destek
                    </v-btn>
                  </div>

                  <v-divider class="my-3" />

                  <div class="text-caption text-medium-emphasis mb-1">
                    Çalışma saatleri: 09.00 – 22.00 (TSİ)
                  </div>
                  <div
                    class="text-caption text-medium-emphasis d-flex align-center"
                  >
                    <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                    Genelde <strong class="mx-1">15–30 dk</strong> içinde dönüş.
                  </div>
                </v-card>

                <!-- En çok sorulanlar -->
                <v-card
                  class="top-faq-card rounded-3xl pa-4 mb-4"
                  elevation="8"
                >
                  <div class="d-flex align-center mb-2">
                    <v-icon size="20" class="mr-2">mdi-fire</v-icon>
                    <span class="text-subtitle-2 font-weight-semibold">
                      En çok sorulanlar
                    </span>
                  </div>

                  <v-list density="compact" nav class="top-faq-list">
                    <v-list-item
                      v-for="faq in mostPopularFaqs"
                      :key="faq.id"
                      class="top-faq-item"
                      @click="focusFaq(faq)"
                    >
                      <template #prepend>
                        <v-icon size="16" class="mr-1"
                          >mdi-chevron-right</v-icon
                        >
                      </template>
                      <v-list-item-title class="text-body-2">
                        {{ faq.question }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
                <v-card class="rounded-3xl pa-4 top-faq-card" elevation="8">
                  <div class="d-flex align-center mb-2">
                    <v-icon size="20" class="mr-2 text-red-500"
                      >mdi-star-shooting</v-icon
                    >
                    <span class="text-subtitle-2 font-weight-semibold">
                      Öne Çıkan Özellikler
                    </span>
                  </div>

                  <v-list density="compact" nav>
                    <v-list-item>
                      <template #prepend
                        ><v-icon size="18" class="mr-2"
                          >mdi-tshirt-crew</v-icon
                        ></template
                      >
                      <v-list-item-title class="text-body-2"
                        >AR ile gerçekçi tişört önizleme</v-list-item-title
                      >
                    </v-list-item>

                    <v-list-item>
                      <template #prepend
                        ><v-icon size="18" class="mr-2"
                          >mdi-brain</v-icon
                        ></template
                      >
                      <v-list-item-title class="text-body-2"
                        >AI tabanlı stil ve beden öneri
                        motoru</v-list-item-title
                      >
                    </v-list-item>

                    <v-list-item>
                      <template #prepend
                        ><v-icon size="18" class="mr-2"
                          >mdi-heart-outline</v-icon
                        ></template
                      >
                      <v-list-item-title class="text-body-2"
                        >Favorilere ekle – sonra karşılaştır</v-list-item-title
                      >
                    </v-list-item>

                    <v-list-item>
                      <template #prepend
                        ><v-icon size="18" class="mr-2"
                          >mdi-lightning-bolt</v-icon
                        ></template
                      >
                      <v-list-item-title class="text-body-2"
                        >Hızlı deneme & hızlı satın alma
                        akışı</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";

interface Category {
  id: string;
  label: string;
  icon?: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
  categoryId: string;
  popularity?: number; // En çok sorulanları seçmek için
}

interface Shortcut {
  id: string;
  label: string;
  icon: string;
  query?: string;
  categoryId?: string;
}

const categories = ref<Category[]>([
  { id: "general", label: "Genel", icon: "mdi-information-outline" },
  { id: "size", label: "Beden & Ölçü", icon: "mdi-ruler" },
  { id: "ai", label: "Yapay Zekâ & Öneriler", icon: "mdi-brain" },
  { id: "ar", label: "Sanal Deneme (AR)", icon: "mdi-cellphone-nfc" },
  {
    id: "account",
    label: "Hesap & Güvenlik",
    icon: "mdi-shield-check-outline",
  },
  { id: "order", label: "Sipariş & İade", icon: "mdi-cart-outline" },
]);

const faqs = ref<Faq[]>([
  // GENEL
  {
    id: 1,
    categoryId: "general",
    question: "AI-Fit nedir?",
    answer:
      "AI-Fit; beden ölçülerin, fiziksel özelliklerin ve tarz tercihlerine göre sana en uygun kıyafetleri öneren; ayrıca artırılmış gerçeklik (AR) ile sanal deneme yapmanı sağlayan akıllı bir alışveriş asistanıdır.",
    popularity: 100,
  },
  {
    id: 2,
    categoryId: "general",
    question: "AI-Fit’i kullanmak ücretli mi?",
    answer:
      "AI-Fit öneri ve sanal deneme modülü, entegre olduğumuz mağazalarda alışveriş sürecinin bir parçası olarak sunulur. Projenin canlıya alınacağı modele göre ücretlendirme mağaza tarafında veya tamamen ücretsiz olabilir.",
    popularity: 80,
  },
  {
    id: 3,
    categoryId: "general",
    question: "Hangi cihazlardan AI-Fit’e erişebilirim?",
    answer:
      "AI-Fit; modern web tarayıcıları üzerinden bilgisayar, tablet ve akıllı telefonlarda çalışacak şekilde tasarlanmıştır. AR özelliği için kamera ve sensör desteği olan cihazlara ihtiyaç duyulur.",
    popularity: 60,
  },

  // BEDEN & ÖLÇÜ
  {
    id: 4,
    categoryId: "size",
    question: "Bedenimi ve ölçülerimi nasıl girmeliyim?",
    answer:
      "Profil bölümünden boy, kilo, vücut tipi ve istersen göğüs-bel-kalça gibi detaylı ölçülerini girebilirsin. Ölçüleri girerken mezura kullanman ve son 1–2 hafta içindeki değerleri baz alman doğruluğu artırır.",
    popularity: 90,
  },
  {
    id: 5,
    categoryId: "size",
    question: "Yanlış ölçü girersem ne olur?",
    answer:
      "Önerilen beden ve ürünler ölçülerine göre hesaplandığı için yanlış bilgiler, yanlış beden önerilerine yol açabilir. Profilini istediğin zaman güncelleyebilir, ölçülerini düzelttikten sonra önerileri yenileyebilirsin.",
    popularity: 70,
  },
  {
    id: 6,
    categoryId: "size",
    question: "Klasik S-M-L bedenleriyle AI-Fit beden önerileri uyuşuyor mu?",
    answer:
      "AI-Fit; marka ve kalıp farklılıklarını da dikkate alarak beden önerir. Yani her ürün için tek bir S-M-L değil, ürünün kalıbına göre kişiselleştirilmiş beden tavsiyesi üretir.",
    popularity: 65,
  },

  // YAPAY ZEKÂ & ÖNERİLER
  {
    id: 7,
    categoryId: "ai",
    question: "Kıyafet önerileri nasıl çalışıyor?",
    answer:
      "Sistem; beden ölçülerin, vücut tipin, cilt tonu, saç rengi gibi fiziksel özelliklerinle birlikte favorilediğin ürünler ve geçmiş tercihlerini analiz eder. Bu veriler ışığında, makine öğrenmesi modelleriyle sana en uygun ürünleri sıralar.",
    popularity: 95,
  },
  {
    id: 8,
    categoryId: "ai",
    question: "Öneriler ne kadar doğru?",
    answer:
      "Önerilerin doğruluğu, girdiğin verilerin güncelliği ve doğruluğuyla doğru orantılıdır. AI-Fit, zamanla senin beğenilerine alışarak daha tutarlı ve kişisel öneriler üretir.",
    popularity: 75,
  },
  {
    id: 9,
    categoryId: "ai",
    question: "AI-Fit hangi verilerimi kullanıyor?",
    answer:
      "Temel olarak beden ölçülerin, fiziksel özelliklerin, favori ürünlerin, sepete eklediklerin ve gezinme alışkanlıkların kullanılır. Bu veriler, sadece sana daha doğru sonuç sunmak için analiz edilir.",
    popularity: 68,
  },

  // SANAL DENEME (AR)
  {
    id: 10,
    categoryId: "ar",
    question: "Sanal deneme (AR) özelliği nasıl çalışıyor?",
    answer:
      "Kamera erişimine izin verdiğinde, seçtiğin ürün vücudun üzerine orantılı şekilde yerleştirilerek ekranda gerçek zamanlı bir önizleme oluşturulur. Böylece ürünün renk ve duruşunu kendi üzerinde görebilirsin.",
    popularity: 88,
  },
  {
    id: 11,
    categoryId: "ar",
    question: "AR özelliği tüm cihazlarda çalışır mı?",
    answer:
      "AR deneyimi için kamera, hareket sensörleri ve desteklenen bir tarayıcı gerekir. Eski cihazlarda veya desteklemeyen tarayıcılarda klasik ürün önizleme ekranına yönlendirilirsin.",
    popularity: 62,
  },
  {
    id: 12,
    categoryId: "ar",
    question: "Yüzüm veya vücudumun gerçek görüntüsü kaydediliyor mu?",
    answer:
      "Sanal deneme esnasında kamera görüntün gerçek zamanlı işlenir, kalıcı olarak kaydedilmez. Projenin canlıya alınacağı sürümde, gizlilik politikası detaylı şekilde paylaşılacaktır.",
    popularity: 70,
  },

  // HESAP & GÜVENLİK
  {
    id: 13,
    categoryId: "account",
    question: "Kişisel verilerim nasıl korunuyor?",
    answer:
      "AI-Fit’teki veriler, yetkisiz erişime karşı korunacak şekilde modern güvenlik standartları dikkate alınarak tasarlanır. Canlı sistemde, şifreli bağlantı (HTTPS) ve ek güvenlik katmanları kullanılacaktır.",
    popularity: 77,
  },
  {
    id: 14,
    categoryId: "account",
    question: "Hesabımı veya verilerimi silebilir miyim?",
    answer:
      "Canlı sisteme geçildiğinde, profil ayarlarından hesabını ve verilerini talep üzerine tamamen silebileceğin bir mekanizma sunulacaktır.",
    popularity: 55,
  },
  {
    id: 15,
    categoryId: "account",
    question: "Giriş bilgilerim üçüncü kişilerle paylaşılır mı?",
    answer:
      "Hayır. Giriş bilgilerinin ve kişisel verilerinin üçüncü kişilerle paylaşılması, gizlilik odaklı mimari çerçevesinde açık rızan olmadan mümkün değildir.",
    popularity: 60,
  },

  // SİPARİŞ & İADE
  {
    id: 16,
    categoryId: "order",
    question: "AI-Fit üzerinden direkt sipariş verebiliyor muyum?",
    answer:
      "AI-Fit, temel olarak sana en uygun ürünü bulmana yardım eden bir tavsiye ve sanal deneme katmanıdır. Sipariş süreci, entegre olunan e-ticaret platformu üzerinden tamamlanır.",
    popularity: 72,
  },
  {
    id: 17,
    categoryId: "order",
    question: "Bedenim yine de uymazsa iade edebilir miyim?",
    answer:
      "İade ve değişim koşulları, satın aldığın mağazanın politikalarına göre belirlenir. AI-Fit doğru bedeni bulmanda yardımcı olur; nihai iade süreci mağaza üzerinden yürütülür.",
    popularity: 85,
  },
  {
    id: 18,
    categoryId: "order",
    question: "AI-Fit kullanarak aldığım ürünler için ek bir garanti var mı?",
    answer:
      "AI-Fit, öneri ve sanal deneme desteği sunar; ürünle ilgili garanti süreci yine satıcı firmanın şartlarına tabidir.",
    popularity: 50,
  },
]);

const searchQuery = ref("");
const selectedCategory = ref<string>("all");

const shortcuts = ref<Shortcut[]>([
  {
    id: "size",
    label: "Doğru beden nasıl seçilir?",
    icon: "mdi-ruler",
    categoryId: "size",
  },
  {
    id: "ar",
    label: "Sanal deneme (AR)",
    icon: "mdi-cellphone-nfc",
    categoryId: "ar",
  },
  {
    id: "ai",
    label: "Yapay zekâ önerileri",
    icon: "mdi-brain",
    categoryId: "ai",
  },
  {
    id: "privacy",
    label: "Veri & gizlilik",
    icon: "mdi-shield-lock-outline",
    categoryId: "account",
    query: "veri",
  },
]);

const categoriesWithAll = computed(() => [
  { id: "all", label: "Tümü", icon: "mdi-layers-triple-outline" },
  ...categories.value,
]);

const filteredFaqs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return faqs.value.filter((faq) => {
    const matchCategory =
      selectedCategory.value === "all" ||
      faq.categoryId === selectedCategory.value;

    const matchSearch =
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);

    return matchCategory && matchSearch;
  });
});

// Her kategori için başlangıçta tüm paneller kapalı ([])
const expandedPanels = ref<Record<string, number[]>>(
  categories.value.reduce((acc, category) => {
    acc[category.id] = [];
    return acc;
  }, {} as Record<string, number[]>)
);

const groupedFaqs = computed(() => {
  return categories.value
    .map((category) => ({
      ...category,
      faqs: filteredFaqs.value.filter((faq) => faq.categoryId === category.id),
    }))
    .filter((group) => group.faqs.length > 0);
});

const totalFaqCount = computed(() => filteredFaqs.value.length);

const activeCategoryLabel = computed(() => {
  if (selectedCategory.value === "all") return "Tüm kategoriler";
  const cat = categories.value.find((c) => c.id === selectedCategory.value);
  return cat ? cat.label : "Tüm kategoriler";
});

const mostPopularFaqs = computed(() => {
  return [...faqs.value]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 4);
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
};

const handleShortcut = (shortcut: Shortcut) => {
  if (shortcut.categoryId) {
    selectedCategory.value = shortcut.categoryId;
  }
  if (shortcut.query) {
    searchQuery.value = shortcut.query;
  }
};

const focusFaq = (faq: Faq) => {
  // İlgili kategoriye geç
  selectedCategory.value = faq.categoryId;
  // Aramayı temizle ki liste filtrelenmesin
  searchQuery.value = "";

  nextTick(() => {
    // O kategorideki faqların sırasını bul
    const category = groupedFaqs.value.find((g) => g.id === faq.categoryId);
    if (category) {
      const index = category.faqs.findIndex((f) => f.id === faq.id);
      if (index !== -1) {
        // Sadece o paneli açık yap
        expandedPanels.value[faq.categoryId] = [index];
      }
    }

    const el = document.querySelector(
      `[data-faq-id="${faq.id}"]`
    ) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
};
</script>

<style scoped>
.faq-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ARKA PLAN BLOBLAR */
.faq-bg-layer {
  position: absolute;
  border-radius: 999px;
  filter: blur(60px);
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
}

.blob-1 {
  width: 420px;
  height: 420px;
  top: -120px;
  right: -120px;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
}

.blob-3 {
  width: 260px;
  height: 260px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, #f97316, #facc15);
  opacity: 0.45;
}

body.theme-dark .blob-1,
body.theme-dark .blob-2,
body.theme-dark .blob-3 {
  opacity: 0.28;
}

/* HERO */
.faq-hero-card {
  position: relative;
  z-index: 1;
  overflow: hidden;
  backdrop-filter: blur(24px);
  background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.03),
      rgba(15, 23, 42, 0.08)
    ),
    radial-gradient(circle at top left, #e0f2fe, #eef2ff, #f9fafb);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

body.theme-dark .faq-hero-card {
  background: linear-gradient(
      140deg,
      rgba(15, 23, 42, 0.9),
      rgba(15, 23, 42, 0.95)
    ),
    radial-gradient(circle at top left, #1e293b, #020617);
  border-color: rgba(51, 65, 85, 0.9);
}

.hero-pill {
  background: rgba(15, 23, 42, 0.05);
  border-radius: 999px;
  padding: 6px 14px;
}

body.theme-dark .hero-pill {
  background: rgba(148, 163, 184, 0.18);
}

.gradient-text {
  background: linear-gradient(120deg, #4f46e5, #0ea5e9, #22c55e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.faq-search :deep(.v-field) {
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
}

/* Light modda placeholder rengi */
body.theme-light .faq-search :deep(.v-field__input::placeholder) {
  color: rgba(71, 85, 105, 0.7) !important;
  opacity: 1 !important;
}

body.theme-light .faq-search :deep(.v-field__input::-webkit-input-placeholder) {
  color: rgba(71, 85, 105, 0.7) !important;
  opacity: 1 !important;
}

body.theme-light .faq-search :deep(.v-field__input::-moz-placeholder) {
  color: rgba(71, 85, 105, 0.7) !important;
  opacity: 1 !important;
}

/* Dark modda placeholder rengi */
body.theme-dark .faq-search :deep(.v-field__input::placeholder) {
  color: rgba(148, 163, 184, 0.7) !important;
  opacity: 1 !important;
}

/* METRİK KARTLAR */
.metric-card {
  backdrop-filter: blur(14px);
  border: 1px solid rgba(148, 163, 184, 0.25);
}

body.theme-dark .metric-card {
  background: rgba(15, 23, 42, 0.92);
  border-color: rgba(51, 65, 85, 0.9);
}

.metric-icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
  color: white;
}

/* KATEGORİ BAR */
.category-bar {
  position: relative;
  z-index: 1;
  backdrop-filter: blur(16px);
  background: rgba(248, 250, 252, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.4);
}

body.theme-dark .category-bar {
  background: rgba(15, 23, 42, 0.92);
  border-color: rgba(51, 65, 85, 0.9);
}

.category-scroll {
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 2px;
}

.category-scroll::-webkit-scrollbar {
  height: 4px;
}

/* QUICK SHORTCUTS */
.quick-shortcuts .shortcut-chip {
  backdrop-filter: blur(10px);
}

/* EMPTY STATE */
.empty-state {
  position: relative;
  border: 1px dashed rgba(148, 163, 184, 0.7);
  background: rgba(248, 250, 252, 0.96);
}

body.theme-dark .empty-state {
  background: rgba(15, 23, 42, 0.94);
  border-color: rgba(75, 85, 99, 0.9);
}

/* FAQ PANELS */
.faq-panels :deep(.v-expansion-panel) {
  border-radius: 18px !important;
  margin-bottom: 10px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(255, 255, 255, 0.96);
  overflow: hidden;
}

body.theme-dark .faq-panels :deep(.v-expansion-panel) {
  background: rgba(15, 23, 42, 0.98);
  border-color: rgba(51, 65, 85, 0.95);
}

.faq-panels :deep(.v-expansion-panel:hover) {
  transform: translateY(-1px);
  transition: all 0.16s ease-out;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
}

body.theme-dark .faq-panels :deep(.v-expansion-panel:hover) {
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.65);
}

.faq-panels :deep(.v-expansion-panel-title__overlay) {
  background-color: transparent;
}

/* BAŞLIK İÇİ PADDING */
.faq-panels :deep(.v-expansion-panel-title) {
  min-height: 0;
  padding: 18px 24px;
  font-size: 0.95rem;
}

/* CEVAP METNİ İÇİN PADDING */
.faq-panels :deep(.v-expansion-panel-text__wrapper),
.faq-panels :deep(.v-expansion-panel-text) {
  padding: 0 !important;
}

.faq-answer-content {
  padding: 20px 24px 24px 24px;
  line-height: 1.75;
}

.faq-answer-content p {
  margin: 0;
  color: inherit;
}

/* Nokta ile yazı arasını biraz açalım */
.bullet {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
  margin-left: 2px;
  margin-right: 10px;
}

.bullet {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
}

/* KATEGORİ BAŞLIĞI */
.category-icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  color: #1d4ed8;
}

body.theme-dark .category-icon-wrapper {
  background: rgba(59, 130, 246, 0.18);
  color: #bfdbfe;
}

/* SİDEBAR */
.sidebar-wrapper {
  position: static;
}

@media (min-width: 960px) {
  .sidebar-wrapper {
    position: sticky;
    top: 110px;
  }
}

.help-card {
  backdrop-filter: blur(18px);
  background: rgba(248, 250, 252, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.5);
}

body.theme-dark .help-card {
  background: rgba(15, 23, 42, 0.96);
  border-color: rgba(51, 65, 85, 0.95);
}

.help-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
  color: white;
}

/* TOP FAQ CARD */
.top-faq-card {
  backdrop-filter: blur(14px);
  margin-top: 8px;
  background: rgba(248, 250, 252, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.4);
}

body.theme-dark .top-faq-card {
  background: rgba(15, 23, 42, 0.96);
  border-color: rgba(51, 65, 85, 0.95);
}

/* POPULAR FAQ CARD - Görsel Header */
.popular-faq-card {
  backdrop-filter: blur(14px);
  background: rgba(248, 250, 252, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.4);
  overflow: hidden;
  position: relative;
}

body.theme-dark .popular-faq-card {
  background: rgba(15, 23, 42, 0.96);
  border-color: rgba(51, 65, 85, 0.95);
}

.popular-faq-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
}

.popular-faq-image {
  position: relative;
  flex-shrink: 0;
}

.popular-faq-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f97316, #ef4444, #ec4899);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.popular-faq-card:hover .popular-faq-icon-wrapper {
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.5);
}

.popular-faq-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.3), transparent);
  filter: blur(20px);
  z-index: 1;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.popular-faq-header-text {
  flex: 1;
  min-width: 0;
}

body.theme-dark .popular-faq-icon-wrapper {
  background: linear-gradient(135deg, #f97316, #ef4444, #ec4899);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);
}

body.theme-dark .popular-faq-card:hover .popular-faq-icon-wrapper {
  box-shadow: 0 12px 32px rgba(249, 115, 22, 0.6);
}

.top-faq-list :deep(.v-list-item) {
  border-radius: 999px;
  padding-inline: 10px !important;
}

.top-faq-item {
  cursor: pointer;
}

.top-faq-item:hover {
  background-color: rgba(148, 163, 184, 0.16);
}

body.theme-dark .top-faq-item:hover {
  background-color: rgba(75, 85, 99, 0.5);
}
</style>
