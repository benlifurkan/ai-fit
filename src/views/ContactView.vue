<template>
  <div class="contact-wrapper">
    <!-- Arka plan blob'ları -->
    <div class="contact-bg-layer blob-1" />
    <div class="contact-bg-layer blob-2" />
    <div class="contact-bg-layer blob-3" />

    <v-container fluid class="py-10 py-md-14">
      <v-row justify="center">
        <v-col cols="12" xl="10">
          <!-- HERO -->
          <v-card
            class="contact-hero-card rounded-3xl pa-6 pa-md-8 mb-8"
            elevation="12"
          >
            <div
              class="d-flex flex-column flex-lg-row align-start justify-space-between gap-8"
            >
              <!-- Sol: Başlık & açıklama -->
              <div class="hero-left">
                <div class="d-inline-flex align-center mb-3 hero-pill">
                  <v-icon size="18" class="mr-2">mdi-hand-wave-outline</v-icon>
                  <span class="text-caption font-weight-medium">
                    AI-Fit ile iletişime geç
                  </span>
                </div>

                <h1 class="text-h4 text-md-h3 text-lg-h2 font-weight-bold mb-3">
                  Bir fikrin, <span class="gradient-text">sorun</span> ya da
                  <span class="gradient-text">önerin</span> mi var?
                </h1>

                <p class="text-body-1 text-medium-emphasis mb-4 mb-md-6">
                  AI-Fit deneyimini birlikte şekillendirelim. Teknik bir
                  problem, iş birliği talebi veya ürünle ilgili geri
                  bildirimlerin için yanındayız.
                </p>

                <div class="d-flex flex-wrap gap-4 mb-4 mb-md-6">
                  <div class="info-chip d-flex align-center">
                    <v-icon size="18" class="mr-2">mdi-clock-outline</v-icon>
                    <span class="text-caption text-medium-emphasis">
                      Ortalama dönüş süresi:
                      <strong>15–30 dakika</strong>
                    </span>
                  </div>
                  <div class="info-chip d-flex align-center">
                    <v-icon size="18" class="mr-2"
                      >mdi-shield-check-outline</v-icon
                    >
                    <span class="text-caption text-medium-emphasis">
                      Gizlilik odaklı iletişim
                    </span>
                  </div>
                </div>

                <!-- Hızlı iletişim kutuları -->
                <v-row class="quick-cards" dense>
                  <v-col cols="12" sm="6" md="4">
                    <v-card class="quick-card rounded-2xl pa-4" elevation="8">
                      <div class="d-flex align-center mb-2">
                        <v-icon size="20" class="mr-2">mdi-bug-outline</v-icon>
                        <span class="text-subtitle-2 font-weight-semibold"
                          >Teknik destek</span
                        >
                      </div>
                      <p class="text-caption text-medium-emphasis mb-1">
                        Hata, bug, performans sorunu veya ekran görüntüsü ile
                        bildireceğin konular.
                      </p>
                      <span class="badge badge-soft">Önerilen kanal: form</span>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-card class="quick-card rounded-2xl pa-4" elevation="8">
                      <div class="d-flex align-center mb-2">
                        <v-icon size="20" class="mr-2"
                          >mdi-handshake-outline</v-icon
                        >
                        <span class="text-subtitle-2 font-weight-semibold"
                          >İş birliği</span
                        >
                      </div>
                      <p class="text-caption text-medium-emphasis mb-1">
                        Mağaza entegrasyonu, proje sunumu veya kurumsal kullanım
                        talepleri.
                      </p>
                      <span class="badge badge-soft"
                        >Önerilen kanal: e-posta</span
                      >
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-card class="quick-card rounded-2xl pa-4" elevation="8">
                      <div class="d-flex align-center mb-2">
                        <v-icon size="20" class="mr-2"
                          >mdi-message-arrow-left-outline</v-icon
                        >
                        <span class="text-subtitle-2 font-weight-semibold"
                          >Geri bildirim</span
                        >
                      </div>
                      <p class="text-caption text-medium-emphasis mb-1">
                        Tasarım, kullanım deneyimi ve yeni özellik fikirlerin
                        için.
                      </p>
                      <span class="badge badge-soft">Önerilen kanal: form</span>
                    </v-card>
                  </v-col>
                </v-row>
              </div>

              <!-- Sağ: İletişim formu -->
              <div class="hero-right w-100 w-lg-auto">
                <v-card
                  class="form-card rounded-3xl pa-5 pa-md-6"
                  elevation="12"
                >
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div>
                      <div class="text-subtitle-2 font-weight-semibold mb-1">
                        İletişim formu
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        Formu doldur; sana geri dönüş yapalım.
                      </div>
                    </div>
                    <div class="form-status text-right">
                      <span class="status-dot mr-1" />
                      <span class="text-caption text-medium-emphasis">
                        Aktif
                      </span>
                    </div>
                  </div>

                  <v-form ref="formRef" @submit.prevent="handleSubmit">
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.name"
                          label="Ad Soyad"
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                          :rules="[rules.required]"
                          autocomplete="name"
                        />
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.email"
                          label="E-posta"
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                          :rules="[rules.required, rules.email]"
                          autocomplete="email"
                        />
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.topic"
                          :items="topics"
                          item-title="label"
                          item-value="value"
                          label="Konu"
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                          :rules="[rules.required]"
                        />
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.company"
                          label="Kurum / Mağaza (opsiyonel)"
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                        />
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          v-model="form.message"
                          label="Mesajın"
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                          auto-grow
                          rows="4"
                          :rules="[rules.required, rules.minMessage]"
                          counter="1000"
                        />
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="form.subject"
                          label="Özet başlık (opsiyonel)"
                          hint="Örnek: 'Beden önerisi ekranında hata mesajı alıyorum'"
                          persistent-hint
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                        />
                      </v-col>
                    </v-row>

                    <div
                      class="d-flex flex-column flex-sm-row align-sm-center justify-space-between gap-3 mt-8"
                    >
                      <div class="text-caption text-medium-emphasis">
                        “Gönder”e bastığında, en kısa sürede sana e-posta veya
                        tercih ettiğin kanal üzerinden ulaşacağız.
                      </div>

                      <v-btn
                        color="primary"
                        type="submit"
                        :loading="submitting"
                        :disabled="submitting"
                        prepend-icon="mdi-send"
                        class="px-6"
                      >
                        Gönder
                      </v-btn>
                    </div>
                  </v-form>
                </v-card>
              </div>
            </div>
          </v-card>

          <!-- Alt kısım: İletişim kanalları + info -->
          <v-row>
            <v-col cols="12" md="6" lg="4">
              <v-card class="channel-card rounded-3xl pa-5" elevation="10">
                <div class="icon-circle mb-3">
                  <v-icon size="24">mdi-email-edit-outline</v-icon>
                </div>
                <h2 class="text-subtitle-1 font-weight-semibold mb-1">
                  E-posta
                </h2>
                <p class="text-body-2 text-medium-emphasis mb-3">
                  Daha detaylı, doküman içeren veya iş birliği odaklı
                  iletişimler için e-posta kullanabilirsin.
                </p>
                <div class="text-body-2 font-weight-medium mb-1">
                  support@ai-fit.com
                </div>
                <div class="text-caption text-medium-emphasis">
                  <v-icon size="14" class="mr-1"
                    >mdi-information-outline</v-icon
                  >
                  Kurumsal partnerlik için konu başlığına “Partnership”
                  ekleyebilirsin.
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <v-card class="channel-card rounded-3xl pa-5" elevation="10">
                <div class="icon-circle mb-3">
                  <v-icon size="24">mdi-whatsapp</v-icon>
                </div>
                <h2 class="text-subtitle-1 font-weight-semibold mb-1">
                  WhatsApp destek
                </h2>
                <p class="text-body-2 text-medium-emphasis mb-3">
                  Anlık soruların, hızlı çözümler ve kısa geri bildirimler için
                  WhatsApp hattını kullanabilirsin.
                </p>
                <div class="text-body-2 font-weight-medium mb-1">
                  +90 (555) 000 00 00
                </div>
                <div class="text-caption text-medium-emphasis">
                  <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon>
                  Hafta içi ve hafta sonu: 09.00 – 22.00 (TSİ)
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="12" lg="4">
              <v-card class="channel-card rounded-3xl pa-5" elevation="10">
                <div class="icon-circle mb-3">
                  <v-icon size="24">mdi-map-marker-radius-outline</v-icon>
                </div>
                <h2 class="text-subtitle-1 font-weight-semibold mb-1">
                  Konum & proje durumu
                </h2>
                <p class="text-body-2 text-medium-emphasis mb-3">
                  AI-Fit şu an geliştirici aşamasındadır. Entegrasyon ve pilot
                  kullanım için bizimle iletişime geçebilirsin.
                </p>
                <div class="text-body-2 font-weight-medium mb-1">
                  Konum: Türkiye • Uzaktan geliştirme
                </div>
                <div class="text-caption text-medium-emphasis">
                  <v-icon size="14" class="mr-1">mdi-progress-clock</v-icon>
                  Proje durumu: MVP & entegrasyon aşaması
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { VForm } from "vuetify/components";
import { currentUser } from "@/stores/auth";
import { toast } from "vue-sonner";

interface ContactForm {
  name: string;
  email: string;
  topic: string | null;
  company: string;
  message: string;
  subject: string;
}

const me = computed(() => currentUser.value);

const formRef = ref<VForm | null>(null);

const form = ref<ContactForm>({
  name: "",
  email: "",
  topic: null,
  company: "",
  message: "",
  subject: "",
});

const topics = [
  { label: "Teknik destek", value: "support" },
  { label: "İş birliği / entegrasyon", value: "partnership" },
  { label: "Ürün geri bildirimi", value: "feedback" },
  { label: "Hata / bug bildirimi", value: "bug" },
  { label: "Diğer", value: "other" },
];

const submitting = ref(false);

const rules = {
  required: (value: string | null) =>
    (value !== null && value !== "" && !!String(value).trim()) ||
    "Bu alan zorunludur.",
  email: (value: string) =>
    !value ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    "Lütfen geçerli bir e-posta gir.",
  minMessage: (value: string) =>
    !value || value.trim().length >= 20 || "Mesajın en az 20 karakter olmalı.",
  mustAgree: (value: boolean) =>
    !!value || "Devam edebilmek için bu kutuyu onaylaman gerekiyor.",
};

const resetForm = () => {
  form.value = {
    name: "",
    email: "",
    topic: null,
    company: "",
    message: "",
    subject: "",
  };
  formRef.value?.resetValidation();
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();
  if (!valid) {
    toast.error("Lütfen zorunlu alanları kontrol et.");
    return;
  }

  submitting.value = true;

  try {
    const payload = {
      ...form.value,
      userId: me.value?.id ?? null,
      userEmail: me.value?.email ?? null,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Response'un JSON olup olmadığını kontrol et
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Beklenmeyen response tipi:", text.substring(0, 200));

      if (res.status === 404) {
        throw new Error(
          "Backend sunucusu çalışmıyor olabilir. Lütfen server'ın çalıştığından emin olun."
        );
      }

      throw new Error("Sunucudan beklenmeyen yanıt alındı.");
    }

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.message || "Form gönderilemedi.");
    }

    toast.success(
      "Mesajın başarıyla gönderildi. En kısa sürede dönüş yapacağız."
    );
    resetForm();
  } catch (error: any) {
    console.error("Form gönderme hatası:", error);
    toast.error(
      error?.message || "Bir hata oluştu. Lütfen daha sonra tekrar dene."
    );
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.contact-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ARKA PLAN BLOBLAR */
.contact-bg-layer {
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

.blob-2 {
  width: 340px;
  height: 340px;
  bottom: -130px;
  left: -80px;
  background: radial-gradient(circle, #22c55e, #0ea5e9);
}

.blob-3 {
  width: 260px;
  height: 260px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, #f97316, #facc15);
  opacity: 0.4;
}

body.theme-dark .contact-bg-layer {
  opacity: 0.25;
}

/* HERO */
.contact-hero-card {
  position: relative;
  z-index: 1;
  overflow: hidden;
  backdrop-filter: blur(24px);
  background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.03),
      rgba(15, 23, 42, 0.1)
    ),
    radial-gradient(circle at top left, #e0f2fe, #eef2ff, #f9fafb);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

body.theme-dark .contact-hero-card {
  background: linear-gradient(
      140deg,
      rgba(15, 23, 42, 0.95),
      rgba(15, 23, 42, 0.98)
    ),
    radial-gradient(circle at top left, #020617, #1e293b);
  border-color: rgba(51, 65, 85, 0.9);
}

.hero-pill {
  background: rgba(15, 23, 42, 0.06);
  border-radius: 999px;
  padding: 6px 14px;
}

body.theme-dark .hero-pill {
  background: rgba(148, 163, 184, 0.2);
}

.gradient-text {
  background: linear-gradient(120deg, #4f46e5, #0ea5e9, #22c55e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* INFO CHIPLER */
.info-chip {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.04);
}

body.theme-dark .info-chip {
  background: rgba(15, 23, 42, 0.7);
}

/* QUICK CARDS */
.quick-card {
  backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(248, 250, 252, 0.96);
}

body.theme-dark .quick-card {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(51, 65, 85, 0.9);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
}

.badge-soft {
  background: rgba(59, 130, 246, 0.1);
  color: #1d4ed8;
}

body.theme-dark .badge-soft {
  background: rgba(59, 130, 246, 0.15);
  color: #bfdbfe;
}

/* FORM KARTI */
.form-card {
  backdrop-filter: blur(20px);
  background: rgba(248, 250, 252, 0.97);
  border: 1px solid rgba(148, 163, 184, 0.5);
}

body.theme-dark .form-card {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(51, 65, 85, 0.95);
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #10b981;
}

/* INPUTLAR */
.form-card :deep(.v-field) {
  border-radius: 16px;
}

/* ALT KANAL KARTLARI */
.channel-card {
  position: relative;
  z-index: 1;
  backdrop-filter: blur(14px);
  background: rgba(248, 250, 252, 0.97);
  border: 1px solid rgba(148, 163, 184, 0.4);
  transition: all 0.18s ease-out;
}

body.theme-dark .channel-card {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(51, 65, 85, 0.95);
}

.channel-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
}

body.theme-dark .channel-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
  color: white;
}
</style>
