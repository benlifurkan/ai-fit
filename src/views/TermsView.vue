<template>
  <div class="terms-wrapper">
    <!-- Arka plan blob'ları -->
    <div class="terms-bg-layer blob-1" />
    <div class="terms-bg-layer blob-2" />
    <div class="terms-bg-layer blob-3" />

    <v-container fluid class="py-10 py-md-14">
      <v-row justify="center">
        <v-col cols="12" xl="10">
          <!-- HERO -->
          <v-card
            class="terms-hero-card rounded-3xl pa-6 pa-md-8 mb-8"
            elevation="12"
          >
            <div
              class="d-flex flex-column flex-lg-row align-start justify-space-between gap-8"
            >
              <div class="hero-left">
                <div class="d-inline-flex align-center mb-3 hero-pill">
                  <v-icon size="18" class="mr-2">mdi-scale-balance</v-icon>
                  <span class="text-caption font-weight-medium">
                    AI-Fit • Kullanım Şartları
                  </span>
                </div>

                <h1 class="text-h4 text-md-h3 text-lg-h2 font-weight-bold mb-3">
                  Hizmeti kullanırken,
                  <span class="gradient-text"
                    >kuralları birlikte yazıyoruz.</span
                  >
                </h1>

                <p class="text-body-1 text-medium-emphasis mb-4 mb-md-6">
                  Bu sayfa, AI-Fit’i nasıl kullanman gerektiğini, hangi
                  sorumlulukları üstlendiğimizi ve senden neler beklediğimizi
                  özetler. Uygulamayı kullanmaya devam ederek bu şartları kabul
                  etmiş sayılırsın.
                </p>

                <div class="d-flex flex-wrap gap-4">
                  <div class="info-chip d-flex align-center">
                    <v-icon size="18" class="mr-2">mdi-calendar-clock</v-icon>
                    <span class="text-caption text-medium-emphasis">
                      Son güncelleme:
                      <strong>{{ lastUpdated }}</strong>
                    </span>
                  </div>
                  <div class="info-chip d-flex align-center">
                    <v-icon size="18" class="mr-2"
                      >mdi-file-document-check-outline</v-icon
                    >
                    <span class="text-caption text-medium-emphasis">
                      Taslak niteliğindedir; canlı sistemde resmî metinle
                      güncellenecektir.
                    </span>
                  </div>
                </div>
              </div>

              <div class="hero-right w-100 w-lg-auto">
                <v-card class="summary-card rounded-3xl pa-5" elevation="10">
                  <div class="d-flex align-center mb-3">
                    <div class="icon-circle mr-3">
                      <v-icon size="24">mdi-alert-decagram-outline</v-icon>
                    </div>
                    <div>
                      <div class="text-subtitle-2 font-weight-semibold mb-1">
                        Hızlı maddeler
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        Kısaca ne diyorsun, neye “evet” diyorsun:
                      </div>
                    </div>
                  </div>

                  <ul class="text-caption text-medium-emphasis mb-0 pl-4">
                    <li class="mb-1">
                      AI-Fit, nihai karar verici değil; sana yardımcı bir öneri
                      ve önizleme aracıdır.
                    </li>
                    <li class="mb-1">
                      Hesabını ve giriş bilgilerini güvenli tutmaktan sen
                      sorumlusun.
                    </li>
                    <li class="mb-1">
                      Uygulamayı kötüye kullanmamak, hukuka ve dürüstlük
                      kurallarına uygun davranmakla yükümlüsün.
                    </li>
                  </ul>
                </v-card>
              </div>
            </div>
          </v-card>

          <v-row>
            <!-- ANA METİN -->
            <v-col cols="12" md="8" lg="8">
              <!-- 1. Giriş ve kabul -->
              <section id="giris" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-3"
                  >
                    1. Giriş ve şartların kabulü
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit; kişiselleştirilmiş kıyafet önerileri sunan ve sanal
                    deneme (AR) imkânı sağlayan bir dijital hizmet tasarımıdır.
                    Bu kullanım şartları, uygulamaya eriştiğin anda geçerli olur
                    ve hizmeti kullanmaya devam ettiğin sürece seni ve hizmet
                    sağlayıcıyı bağlar.
                  </p>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    AI-Fit’e erişmen veya kullanman; bu sayfada yer alan
                    şartları okuduğun, anladığın ve kabul ettiğin anlamına
                    gelir. Şartları kabul etmiyorsan, hizmeti kullanmamalısın.
                  </p>
                </v-card>
              </section>

              <!-- 2. Tanımlar -->
              <section id="tanimlar" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    2. Tanımlar
                  </h2>

                  <v-table density="compact" class="terms-table">
                    <thead>
                      <tr>
                        <th class="text-caption font-weight-medium">Terim</th>
                        <th class="text-caption font-weight-medium">
                          Açıklama
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-caption font-weight-medium">AI-Fit</td>
                        <td class="text-caption">
                          Kıyafet önerisi ve sanal deneme odaklı geliştirilen
                          yapay zekâ destekli sistem.
                        </td>
                      </tr>
                      <tr>
                        <td class="text-caption font-weight-medium">
                          Kullanıcı
                        </td>
                        <td class="text-caption">
                          AI-Fit’e erişen veya kullanan gerçek kişiyi ifade
                          eder.
                        </td>
                      </tr>
                      <tr>
                        <td class="text-caption font-weight-medium">Hesap</td>
                        <td class="text-caption">
                          Kullanıcının AI-Fit üzerinde oluşturduğu, giriş
                          bilgileri ve profilinin yer aldığı kullanıcı hesabı.
                        </td>
                      </tr>
                      <tr>
                        <td class="text-caption font-weight-medium">İçerik</td>
                        <td class="text-caption">
                          Uygulama içinde sunulan metin, görsel, tasarım, AR
                          deneyimi ve diğer tüm dijital unsurlar.
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card>
              </section>

              <!-- 3. Hizmetin kapsamı -->
              <section id="kapsam" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    3. Hizmetin kapsamı
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit; kullanıcının beden ölçüleri, fiziksel özellikleri ve
                    kullanım alışkanlıkları üzerinden:
                  </p>
                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>Ürün ve beden önerileri üretir,</li>
                    <li>
                      Seçili ürünleri sanal deneme (AR) ekranında gösterir,
                    </li>
                    <li>
                      Favoriler, sepet ve benzeri etkileşimleri yönetmek için
                      yardımcı ara yüzler sunar.
                    </li>
                  </ul>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    AI-Fit doğrudan satış yapmaz; sipariş ve ödeme süreçleri,
                    entegre e-ticaret platformları üzerinden yürütülür. AI-Fit
                    bu platformların fiyatlandırma, teslimat, iade gibi
                    politikalarından sorumlu değildir.
                  </p>
                </v-card>
              </section>

              <!-- 4. Kullanım koşulları -->
              <section id="kullanim" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    4. Hizmetten yararlanma koşulları
                  </h2>

                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          Doğru bilgi verme
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Hesap oluştururken ve beden bilgilerini girerken
                          olabildiğince doğru ve güncel bilgi vermen beklenir.
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          Hesap güvenliği
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Giriş bilgilerini gizli tutmak, üçüncü kişilerle
                          paylaşmamak ve şüpheli erişimleri bildirmek senin
                          sorumluluğundadır.
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          Uygun yaş
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Hizmetin hangi yaş gruplarına açık olacağı, nihai
                          resmî metinde açıklanacaktır. Taslak olarak, reşit
                          olmayan kullanıcılar için yasal temsilci onayı
                          gerekebilir.
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          Geçici erişim kesintileri
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Bakım, güncelleme veya teknik sorunlar nedeniyle
                          hizmete erişim zaman zaman kesintiye uğrayabilir.
                        </p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </section>

              <!-- 5. Kullanıcı yükümlülükleri -->
              <section id="yukumlulukler" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    5. Kullanıcının yükümlülükleri
                  </h2>

                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit’i kullanırken aşağıdaki yükümlülüklere uygun
                    davranmayı taahhüt etmiş olursun:
                  </p>

                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>
                      Hizmeti yalnızca kişisel ve hukuka uygun amaçlarla
                      kullanmak,
                    </li>
                    <li>
                      Yanıltıcı, gerçeğe aykırı veya üçüncü kişilerin haklarını
                      ihlal eden bilgiler paylaşmamak,
                    </li>
                    <li>
                      Yazılım altyapısını zedeleyecek, tersine mühendislik
                      içerecek veya sistem güvenliğini tehdit edecek
                      davranışlardan kaçınmak,
                    </li>
                    <li>
                      AI-Fit veya bağlı sistemler hakkında izinsiz veri toplama
                      (scraping, bot vb.) faaliyetlerine girişmemek.
                    </li>
                  </ul>
                </v-card>
              </section>

              <!-- 6. Yasaklı davranışlar -->
              <section id="yasaklar" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    6. Yasaklı davranışlar
                  </h2>

                  <p class="text-body-2 text-medium-emphasis mb-3">
                    Aşağıdaki işlemler, açıkça yasaklanmıştır:
                  </p>

                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                        <li>
                          Hizmeti ticari kiralama veya satış amaçlı devretme
                        </li>
                        <li>Sisteme yetkisiz erişim denemeleri</li>
                        <li>
                          Zararlı yazılım, virüs, trojan vb. içeren içerik
                          gönderme
                        </li>
                      </ul>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                        <li>
                          AI-Fit arayüz ve çıktılarının yanıltıcı şekilde taklit
                          edilmesi
                        </li>
                        <li>
                          Diğer kullanıcıların verilerine izinsiz erişmeye
                          çalışma
                        </li>
                        <li>
                          Uygulama içi veya çevrimiçi mecralarda hakaret, nefret
                          söylemi vb. hukuka aykırı içerikler üretme
                        </li>
                      </ul>
                    </v-col>
                  </v-row>

                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Bu tür ihlallerin tespit edilmesi hâlinde hesapların askıya
                    alınması, engellenmesi ve gerekli görüldüğünde hukuki
                    yollara başvurulması söz konusu olabilir.
                  </p>
                </v-card>
              </section>

              <!-- 7. Fikri ve sınai haklar -->
              <section id="fikri-haklar" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    7. Fikri ve sınai mülkiyet hakları
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit’e ait yazılım kodları, tasarımlar, logo, marka,
                    arayüz öğeleri, metinler, görseller ve diğer tüm bileşenler
                    fikri ve sınai mülkiyet mevzuatı kapsamında korunmaktadır.
                  </p>
                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>
                      Bu unsurlar üzerinde sana devredilmiş bir mülkiyet hakkı
                      yoktur; yalnızca kişisel kullanım için sınırlı lisans
                      tanınır.
                    </li>
                    <li>
                      İzinsiz kopyalama, çoğaltma, dağıtma veya türev ürün
                      oluşturma işlemleri yasaktır.
                    </li>
                  </ul>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Kullanıcı olarak paylaştığın geri bildirim, fikir ve
                    öneriler üzerinde fikri hakların senden çıkmaz; ancak bu tür
                    önerilerin, AI-Fit’in geliştirilmesinde isim belirtmeksizin
                    kullanılabileceğini kabul etmiş olursun.
                  </p>
                </v-card>
              </section>

              <!-- 8. Sorumluluk reddi -->
              <section id="sorumluluk" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    8. Sorumluluk reddi ve sınırlamalar
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit, öneri ve önizleme sunan bir yardımcı sistemdir;
                    nihai kararın ve satın alma tercihinin sana ait olduğunu
                    unutma.
                  </p>
                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>
                      Önerilen beden veya ürünlerin her zaman %100 isabetli
                      olacağı garanti edilmez.
                    </li>
                    <li>
                      Entegre e-ticaret platformlarının stok, fiyat, teslimat,
                      iade süreçlerinden AI-Fit sorumlu değildir.
                    </li>
                    <li>
                      Makul güvenlik önlemlerine rağmen, internet altyapısından
                      kaynaklanan kesinti ve gecikmelerden AI-Fit sorumlu
                      tutulamaz.
                    </li>
                  </ul>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Bununla birlikte; kasıt veya ağır ihmal hâlleri haricinde,
                    dolaylı zararlardan sorumluluk doğmaması hedeflenmektedir.
                  </p>
                </v-card>
              </section>

              <!-- 9. Değişiklikler ve yürürlük -->
              <section id="degisiklikler" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    9. Şartlarda değişiklik yapılması
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit; hizmet kapsamı, mevzuat değişiklikleri veya teknik
                    gereklilikler nedeniyle bu kullanım şartlarını zaman zaman
                    güncelleyebilir.
                  </p>
                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>
                      Önemli değişiklikler yapıldığında, canlı sistemde
                      kullanıcılara bildirim yapılması hedeflenmektedir.
                    </li>
                    <li>
                      Değişikliklerden sonra hizmeti kullanmaya devam etmen,
                      güncellenmiş şartları kabul ettiğin anlamına gelir.
                    </li>
                  </ul>
                </v-card>
              </section>

              <!-- 10. İletişim -->
              <section id="iletisim" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    10. İletişim
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    Bu kullanım şartlarıyla ilgili soruların, yorumların veya
                    taleplerin için bizimle iletişime geçmek istersen:
                  </p>
                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>E-posta: <strong>support@ai-fit.com</strong></li>
                    <li>İletişim formu: Uygulamadaki “İletişim” sayfası</li>
                  </ul>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Canlı sistemde; bu sayfada ayrıca güncel şirket/kişi unvanı,
                    adresi ve resmî iletişim kanalları yer alacaktır.
                  </p>
                </v-card>
              </section>
            </v-col>

            <!-- SIDEBAR -->
            <v-col cols="12" md="4" lg="4">
              <div class="sidebar-wrapper">
                <v-card class="toc-card rounded-3xl pa-5 mb-4" elevation="10">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="22" class="mr-2"
                      >mdi-format-list-bulleted</v-icon
                    >
                    <span class="text-subtitle-2 font-weight-semibold">
                      Sayfa içeriği
                    </span>
                  </div>
                  <v-list density="compact" nav class="toc-list">
                    <v-list-item
                      v-for="section in sections"
                      :key="section.id"
                      class="toc-item"
                      @click="scrollTo(section.id)"
                    >
                      <template #prepend>
                        <v-icon size="16" class="mr-2">
                          {{ section.icon }}
                        </v-icon>
                      </template>
                      <v-list-item-title class="text-body-2">
                        {{ section.label }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>

                <v-card class="hint-card rounded-3xl pa-4" elevation="8">
                  <div class="d-flex align-center mb-2">
                    <v-icon size="20" class="mr-2">mdi-link-variant</v-icon>
                    <span class="text-subtitle-2 font-weight-semibold">
                      İlgili belgeler
                    </span>
                  </div>
                  <p class="text-caption text-medium-emphasis mb-2">
                    Gizlilik politikası ve iletişim sayfasını da inceleyerek
                    AI-Fit’in veriye ve iletişime yaklaşımını tam olarak
                    görebilirsin.
                  </p>
                  <div class="d-flex flex-wrap gap-2">
                    <v-btn
                      variant="outlined"
                      size="small"
                      :to="{ name: 'privacy' }"
                    >
                      Gizlilik
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      size="small"
                      :to="{ name: 'contact' }"
                    >
                      İletişim
                    </v-btn>
                  </div>
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
import { ref } from "vue";

interface TocSection {
  id: string;
  label: string;
  icon: string;
}

const lastUpdated = "2025"; // canlıya alırken tam tarih olarak düzenleyebilirsin

const sections = ref<TocSection[]>([
  { id: "giris", label: "1. Giriş ve kabul", icon: "mdi-information-outline" },
  { id: "tanimlar", label: "2. Tanımlar", icon: "mdi-book-outline" },
  {
    id: "kapsam",
    label: "3. Hizmetin kapsamı",
    icon: "mdi-application-outline",
  },
  {
    id: "kullanim",
    label: "4. Hizmetten yararlanma",
    icon: "mdi-account-arrow-right-outline",
  },
  {
    id: "yukumlulukler",
    label: "5. Kullanıcı yükümlülükleri",
    icon: "mdi-account-check-outline",
  },
  { id: "yasaklar", label: "6. Yasaklı davranışlar", icon: "mdi-block-helper" },
  {
    id: "fikri-haklar",
    label: "7. Fikri mülkiyet",
    icon: "mdi-lightbulb-on-outline",
  },
  {
    id: "sorumluluk",
    label: "8. Sorumluluk reddi",
    icon: "mdi-alert-circle-outline",
  },
  {
    id: "degisiklikler",
    label: "9. Değişiklikler",
    icon: "mdi-update",
  },
  { id: "iletisim", label: "10. İletişim", icon: "mdi-email-outline" },
]);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const offset = window.scrollY + rect.top - 90;
  window.scrollTo({ top: offset, behavior: "smooth" });
};
</script>

<style scoped>
.terms-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ARKA PLAN BLOBLAR */
.terms-bg-layer {
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

body.theme-dark .terms-bg-layer {
  opacity: 0.25;
}

/* HERO */
.terms-hero-card {
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

body.theme-dark .terms-hero-card {
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

/* HERO SUMMARY CARD */
.summary-card {
  backdrop-filter: blur(20px);
  background: rgba(248, 250, 252, 0.97);
  border: 1px solid rgba(148, 163, 184, 0.5);
}

body.theme-dark .summary-card {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(51, 65, 85, 0.95);
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

/* ANA SECTION KARTLAR */
.section-card {
  position: relative;
  z-index: 1;
  backdrop-filter: blur(16px);
  background: rgba(248, 250, 252, 0.97);
  border: 1px solid rgba(148, 163, 184, 0.4);
}

body.theme-dark .section-card {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(51, 65, 85, 0.95);
}

/* TABLO */
.terms-table {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.4);
}

.terms-table thead {
  background: rgba(15, 23, 42, 0.03);
}

body.theme-dark .terms-table thead {
  background: rgba(15, 23, 42, 0.9);
}

/* CHIP STYLE (kullanim kartları) */
.purpose-chip {
  border-radius: 18px;
  padding: 10px 14px;
  background: rgba(15, 23, 42, 0.02);
}

body.theme-dark .purpose-chip {
  background: rgba(15, 23, 42, 0.75);
}

/* SIDEBAR */
.sidebar-wrapper {
  position: static;
}

@media (min-width: 960px) {
  .sidebar-wrapper {
    position: sticky;
    top: 110px;
  }
}

.toc-card {
  backdrop-filter: blur(16px);
  background: rgba(248, 250, 252, 0.97);
  border: 1px solid rgba(148, 163, 184, 0.4);
}

body.theme-dark .toc-card {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(51, 65, 85, 0.95);
}

.toc-item {
  border-radius: 14px;
  cursor: pointer;
}

.toc-item:hover {
  background-color: rgba(148, 163, 184, 0.16);
}

body.theme-dark .toc-item:hover {
  background-color: rgba(75, 85, 99, 0.5);
}

.hint-card {
  backdrop-filter: blur(14px);
  background: rgba(248, 250, 252, 0.97);
  border: 1px solid rgba(148, 163, 184, 0.4);
}

body.theme-dark .hint-card {
  background: rgba(15, 23, 42, 0.97);
  border-color: rgba(51, 65, 85, 0.95);
}
</style>
