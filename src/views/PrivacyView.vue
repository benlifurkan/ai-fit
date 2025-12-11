<template>
  <div class="privacy-wrapper">
    <!-- Arka plan blob'ları -->
    <div class="privacy-bg-layer blob-1" />
    <div class="privacy-bg-layer blob-2" />
    <div class="privacy-bg-layer blob-3" />

    <v-container fluid class="py-10 py-md-14">
      <v-row justify="center">
        <v-col cols="12" xl="10">
          <!-- HERO -->
          <v-card
            class="privacy-hero-card rounded-3xl pa-6 pa-md-8 mb-8"
            elevation="12"
          >
            <div
              class="d-flex flex-column flex-lg-row align-start justify-space-between gap-8"
            >
              <div class="hero-left">
                <div class="d-inline-flex align-center mb-3 hero-pill">
                  <v-icon size="18" class="mr-2"
                    >mdi-shield-check-outline</v-icon
                  >
                  <span class="text-caption font-weight-medium">
                    AI-Fit • Gizlilik Politikası
                  </span>
                </div>

                <h1 class="text-h4 text-md-h3 text-lg-h2 font-weight-bold mb-3">
                  Verilerin senin,
                  <span class="gradient-text">kontrol de sende.</span>
                </h1>

                <p class="text-body-1 text-medium-emphasis mb-4 mb-md-6">
                  AI-Fit’i kullanırken hangi verilerin işlendiğini, bunların
                  hangi amaçlarla ve ne kadar süreyle saklandığını şeffaf
                  biçimde paylaşıyoruz. Aşağıda tüm detayları bulabilirsin.
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
                    <v-icon size="18" class="mr-2">mdi-gavel</v-icon>
                    <span class="text-caption text-medium-emphasis">
                      Gizlilik odaklı tasarım
                    </span>
                  </div>
                </div>
              </div>

              <div class="hero-right w-100 w-lg-auto">
                <v-card class="summary-card rounded-3xl pa-5" elevation="10">
                  <div class="d-flex align-center mb-3">
                    <div class="icon-circle mr-3">
                      <v-icon size="24">mdi-file-document-outline</v-icon>
                    </div>
                    <div>
                      <div class="text-subtitle-2 font-weight-semibold mb-1">
                        Kısa özet
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        Bu sayfa hukuki tavsiye yerine geçmez; AI-Fit projesinin
                        gizlilik yaklaşımını anlatır.
                      </div>
                    </div>
                  </div>

                  <ul class="text-caption text-medium-emphasis mb-0 pl-4">
                    <li class="mb-1">
                      Yalnızca hizmeti sunmak için gerekli verileri topluyoruz.
                    </li>
                    <li class="mb-1">
                      Verilerini asla izinsiz üçüncü taraflara satmıyoruz.
                    </li>
                    <li class="mb-1">
                      Talebin hâlinde verilerini silme / anonimleştirme hakkın
                      olacak.
                    </li>
                  </ul>
                </v-card>
              </div>
            </div>
          </v-card>

          <v-row>
            <!-- ANA METİN -->
            <v-col cols="12" md="8" lg="8">
              <!-- 1. Genel Bilgiler -->
              <section id="genel" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-3"
                  >
                    1. Genel bilgiler
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    Bu gizlilik politikası, AI-Fit projesi kapsamında işlenen
                    kişisel veriler hakkında seni bilgilendirmek amacıyla
                    hazırlanmıştır. AI-Fit; beden ölçülerin, fiziksel
                    özelliklerin ve kullanım alışkanlıkların üzerinden sana
                    kişiselleştirilmiş kıyafet önerileri ve sanal deneme (AR)
                    deneyimi sunar.
                  </p>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Buradaki açıklamalar; projenin canlıya alınacağı ortamda
                    yayınlanacak resmi metnin taslak niteliğindedir. Nihai
                    metin, ilgili mevzuata göre şekillenecek ve ayrıca
                    paylaşılacaktır.
                  </p>
                </v-card>
              </section>

              <!-- 2. Toplanan veri kategorileri -->
              <section id="veri-kategorileri" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    2. Toplanan veri kategorileri
                  </h2>

                  <p class="text-body-2 text-medium-emphasis mb-4">
                    AI-Fit, temel olarak aşağıdaki tipte verileri işler. Bu
                    verilerin kapsamı, sistemin hangi modüllerini kullandığına
                    göre değişebilir.
                  </p>

                  <v-expansion-panels
                    class="privacy-panels rounded-2xl"
                    multiple
                    density="comfortable"
                  >
                    <v-expansion-panel value="hesap">
                      <v-expansion-panel-title>
                        <div class="d-flex align-center">
                          <span class="bullet mr-2" />
                          <span class="text-body-2 font-weight-medium">
                            2.1. Hesap ve kimlik bilgileri
                          </span>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <ul class="text-body-2 text-medium-emphasis mb-0 pl-4">
                          <li>Ad-soyad, kullanıcı adı</li>
                          <li>E-posta adresi</li>
                          <li>Hesap oluşturma ve güncelleme zamanları</li>
                        </ul>
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="beden">
                      <v-expansion-panel-title>
                        <div class="d-flex align-center">
                          <span class="bullet mr-2" />
                          <span class="text-body-2 font-weight-medium">
                            2.2. Beden ve fiziksel özellik bilgileri
                          </span>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <ul class="text-body-2 text-medium-emphasis mb-0 pl-4">
                          <li>Boy, kilo, vücut tipi</li>
                          <li>
                            Opsiyonel ölçüler: göğüs-bel-kalça çevresi, omuz
                            genişliği vb.
                          </li>
                          <li>
                            Cilt tonu, saç rengi gibi görsel uyum için
                            kullanılan bilgiler
                          </li>
                        </ul>
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="kullanim">
                      <v-expansion-panel-title>
                        <div class="d-flex align-center">
                          <span class="bullet mr-2" />
                          <span class="text-body-2 font-weight-medium">
                            2.3. Kullanım ve tercih verileri
                          </span>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <ul class="text-body-2 text-medium-emphasis mb-0 pl-4">
                          <li>Görüntülediğin ürünler ve kategoriler</li>
                          <li>Favorilediğin ve sepete eklediğin ürünler</li>
                          <li>Öneri ekranlarındaki etkileşimlerin</li>
                        </ul>
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="teknik">
                      <v-expansion-panel-title>
                        <div class="d-flex align-center">
                          <span class="bullet mr-2" />
                          <span class="text-body-2 font-weight-medium">
                            2.4. Teknik veriler
                          </span>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <ul class="text-body-2 text-medium-emphasis mb-0 pl-4">
                          <li>Tarayıcı tipi, cihaz türü, işletim sistemi</li>
                          <li>Yaklaşık konum bilgisi (ülke / şehir düzeyi)</li>
                          <li>IP adresi (güvenlik ve loglama amaçlı)</li>
                        </ul>
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel value="ar">
                      <v-expansion-panel-title>
                        <div class="d-flex align-center">
                          <span class="bullet mr-2" />
                          <span class="text-body-2 font-weight-medium">
                            2.5. Sanal deneme (AR) verileri
                          </span>
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <p class="text-body-2 text-medium-emphasis mb-2">
                          AR modülü açıkken kamera erişimine izin verdiğinde,
                          cihazından gelen görüntü akışı gerçek zamanlı olarak
                          işlenir:
                        </p>
                        <ul class="text-body-2 text-medium-emphasis mb-0 pl-4">
                          <li>
                            Ürünlerin konumlandırılması için iskelet/poz
                            tahminine yönelik anlık işleme
                          </li>
                          <li>
                            Varsayılan taslakta; görüntü kayıtlarının kalıcı
                            olarak saklanmaması hedeflenmektedir.
                          </li>
                        </ul>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </section>

              <!-- 3. Amaçlar ve hukuki sebepler -->
              <section id="amaclar" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    3. Veriler hangi amaçlarla kullanılıyor?
                  </h2>

                  <p class="text-body-2 text-medium-emphasis mb-4">
                    AI-Fit kapsamında işlenen kişisel verilerin başlıca işleme
                    amaçları aşağıdaki gibidir:
                  </p>

                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          Hizmetin sunulması
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Bedenine ve tercihlerine uygun ürün önerileri
                          oluşturmak, sanal deneme modülünü çalıştırmak ve
                          hesabını yönetmek.
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          Kullanım analitiği
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Hangi ürünlerin, ekranların ve özelliklerin daha çok
                          ilgi gördüğünü analiz ederek sistemi iyileştirmek.
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          Güvenlik ve loglama
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Şüpheli oturumları tespit etmek, hataları incelemek ve
                          sistem güvenliğini sağlamak.
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="purpose-chip mb-3">
                        <h3 class="text-body-2 font-weight-semibold mb-1">
                          İletişim ve destek
                        </h3>
                        <p class="text-caption text-medium-emphasis mb-0">
                          Talep ve şikâyetlerine yanıt vermek, sistemle ilgili
                          bilgilendirme yapmak.
                        </p>
                      </div>
                    </v-col>
                  </v-row>

                  <v-alert
                    type="info"
                    variant="tonal"
                    class="mt-4"
                    density="comfortable"
                  >
                    <div class="text-caption text-medium-emphasis">
                      Nihai üretim ortamında; bu amaçların hangi hukuki
                      sebeplere (açık rıza, sözleşmenin ifası, meşru menfaat
                      vb.) dayandığı resmi metinde tek tek belirtilecektir.
                    </div>
                  </v-alert>
                </v-card>
              </section>

              <!-- 4. Saklama süreleri -->
              <section id="saklama" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    4. Veriler ne kadar süre saklanıyor?
                  </h2>

                  <p class="text-body-2 text-medium-emphasis mb-4">
                    Saklama süreleri, verinin türüne ve işlenme amacına göre
                    değişebilir. Taslak yaklaşım aşağıdaki gibidir:
                  </p>

                  <v-table density="compact" class="retention-table">
                    <thead>
                      <tr>
                        <th class="text-caption font-weight-medium">
                          Veri kategorisi
                        </th>
                        <th class="text-caption font-weight-medium">Örnek</th>
                        <th class="text-caption font-weight-medium">
                          Planlanan saklama süresi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-caption font-weight-medium">
                          Hesap bilgileri
                        </td>
                        <td class="text-caption">
                          Ad-soyad, e-posta, profil bilgileri
                        </td>
                        <td class="text-caption">
                          Hesap aktif olduğu sürece; hesap silme talebinde
                          bulunman hâlinde makul süre içinde silinir veya
                          anonimleştirilir.
                        </td>
                      </tr>
                      <tr>
                        <td class="text-caption font-weight-medium">
                          Beden & fiziksel veriler
                        </td>
                        <td class="text-caption">Boy, kilo, vücut tipi</td>
                        <td class="text-caption">
                          Profilinde tutmayı tercih ettiğin süre boyunca;
                          dilediğin zaman güncelleyebilir veya silebilirsin.
                        </td>
                      </tr>
                      <tr>
                        <td class="text-caption font-weight-medium">
                          Kullanım verileri
                        </td>
                        <td class="text-caption">
                          Favoriler, tıklamalar, öneri geçmişi
                        </td>
                        <td class="text-caption">
                          Analitik ve iyileştirme amaçları için
                          anonimleştirilerek veya toplulaştırılarak belirli
                          sürelerle saklanabilir.
                        </td>
                      </tr>
                      <tr>
                        <td class="text-caption font-weight-medium">
                          Log ve güvenlik verileri
                        </td>
                        <td class="text-caption">IP adresi, hata kayıtları</td>
                        <td class="text-caption">
                          Güvenlik ve mevzuat gereklilikleri çerçevesinde
                          sınırlı sürelerle saklanır.
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card>
              </section>

              <!-- 5. Hakların -->
              <section id="haklar" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    5. Hakların
                  </h2>

                  <p class="text-body-2 text-medium-emphasis mb-4">
                    Gizlilik odaklı tasarım kapsamında, kişisel verilerinle
                    ilgili olarak aşağıdaki haklara sahip olman
                    hedeflenmektedir:
                  </p>

                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                        <li>Hangi verilerin işlendiğini öğrenme</li>
                        <li>
                          Eksik veya hatalı işlenen verilerin düzeltilmesini
                          talep etme
                        </li>
                        <li>
                          İşleme amaçlarını ve bu amaçlara uygun kullanılıp
                          kullanılmadığını öğrenme
                        </li>
                      </ul>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                        <li>
                          Gerektiğinde verilerinin silinmesini veya
                          anonimleştirilmesini isteme
                        </li>
                        <li>
                          Otomatik işleme ile oluşturulan sonuçlara itiraz etme
                          (profil çıkarma vb.)
                        </li>
                        <li>Onayını geri çekme (açık rıza gereken hallerde)</li>
                      </ul>
                    </v-col>
                  </v-row>

                  <v-alert
                    type="info"
                    variant="tonal"
                    class="mt-2"
                    density="comfortable"
                  >
                    <div class="text-caption text-medium-emphasis">
                      Canlı sistemde; bu haklarını kullanmak için başvuru
                      adresi, e-posta ve süreç adımları ayrıca belirtilecektir.
                    </div>
                  </v-alert>
                </v-card>
              </section>

              <!-- 6. Çerezler ve üçüncü taraflar -->
              <section id="cerezler" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    6. Çerezler, üçüncü taraflar ve veri paylaşımı
                  </h2>

                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit; performans ölçümü, hata takibi ve güvenlik amaçları
                    için çerezler ve benzeri teknolojiler kullanabilir.
                  </p>

                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>
                      Zorunlu çerezler: Oturumunun korunması ve temel
                      fonksiyonların çalışması için gereklidir.
                    </li>
                    <li>
                      Analitik çerezler: Hangi sayfaların daha çok ziyaret
                      edildiğini anlamak için kullanılır; mümkün oldukça anonim
                      veya toplulaştırılmış veriler üzerinden çalışır.
                    </li>
                  </ul>

                  <p class="text-body-2 text-medium-emphasis mb-3">
                    Projenin mimarisine göre; barındırma hizmeti sağlayıcıları,
                    güvenlik servisleri veya analitik araçlar gibi sınırlı
                    üçüncü taraflarla veri paylaşımı söz konusu olabilir. Bu
                    durumda:
                  </p>

                  <ul class="text-body-2 text-medium-emphasis mb-0 pl-4">
                    <li>
                      Yalnızca hizmetin sunumu için gerekli veriler paylaşılır.
                    </li>
                    <li>
                      İlgili taraflarla veri işleme sözleşmeleri yapılması
                      hedeflenir.
                    </li>
                    <li>
                      Verilerin izinsiz satışına veya gereksiz aktarımına izin
                      verilmez.
                    </li>
                  </ul>
                </v-card>
              </section>

              <!-- 7. Güvenlik -->
              <section id="guvenlik" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    7. Güvenlik önlemleri
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    AI-Fit’teki verilerin güvenliği için teknik ve idari
                    önlemler planlanmaktadır. Örnek tedbirler:
                  </p>
                  <ul class="text-body-2 text-medium-emphasis mb-3 pl-4">
                    <li>Şifreli bağlantı (HTTPS) kullanımı</li>
                    <li>Erişim yetkilerinin rol bazlı kısıtlanması</li>
                    <li>Düzenli log kontrolü ve güvenlik izleme süreçleri</li>
                    <li>Yedekleme ve felaket kurtarma senaryoları</li>
                  </ul>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Hiçbir sistem %100 güvenlik garantisi veremese de, AI-Fit
                    altyapısında modern güvenlik standartlarına uyum hedeflenir.
                  </p>
                </v-card>
              </section>

              <!-- 8. Güncellemeler -->
              <section id="guncellemeler" class="mb-6 mb-md-8">
                <v-card
                  class="section-card rounded-3xl pa-5 pa-md-6"
                  elevation="10"
                >
                  <h2
                    class="text-subtitle-1 text-md-h6 font-weight-semibold mb-4"
                  >
                    8. Politika güncellemeleri
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-3">
                    Bu gizlilik politikası; projenin gelişimine, mevzuattaki
                    değişikliklere veya yeni özelliklere bağlı olarak zaman
                    içerisinde güncellenebilir.
                  </p>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    Önemli bir değişiklik yapılması hâlinde, canlı sistemde
                    kullanıcılara bilgilendirme yapılması ve son güncelleme
                    tarihinin bu sayfada açıkça gösterilmesi hedeflenmektedir.
                  </p>
                </v-card>
              </section>
            </v-col>

            <!-- Yan menü / içerik haritası -->
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
                      <v-list-item-subtitle
                        v-if="section.description"
                        class="text-caption text-medium-emphasis"
                      >
                        {{ section.description }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>

                <v-card class="hint-card rounded-3xl pa-4" elevation="8">
                  <div class="d-flex align-center mb-2">
                    <v-icon size="20" class="mr-2"
                      >mdi-help-circle-outline</v-icon
                    >
                    <span class="text-subtitle-2 font-weight-semibold">
                      Sorun mu var?
                    </span>
                  </div>
                  <p class="text-caption text-medium-emphasis mb-3">
                    Gizlilik politikasıyla ilgili soruların için
                    <strong>İletişim</strong> sayfası üzerinden bize
                    ulaşabilirsin.
                  </p>
                  <v-btn
                    variant="outlined"
                    size="small"
                    :to="{ name: 'contact' }"
                  >
                    İletişim sayfasına git
                  </v-btn>
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
  description?: string;
}

const lastUpdated = "2025"; // Canlıya alırken tam tarih formatı ile güncelleyebilirsin.

const sections = ref<TocSection[]>([
  {
    id: "genel",
    label: "1. Genel bilgiler",
    icon: "mdi-information-outline",
  },
  {
    id: "veri-kategorileri",
    label: "2. Toplanan veri kategorileri",
    icon: "mdi-database-outline",
  },
  {
    id: "amaclar",
    label: "3. Kullanım amaçları",
    icon: "mdi-target-variant",
  },
  {
    id: "saklama",
    label: "4. Saklama süreleri",
    icon: "mdi-timer-sand",
  },
  {
    id: "haklar",
    label: "5. Hakların",
    icon: "mdi-account-check-outline",
  },
  {
    id: "cerezler",
    label: "6. Çerezler & üçüncü taraflar",
    icon: "mdi-cookie-outline",
  },
  {
    id: "guvenlik",
    label: "7. Güvenlik",
    icon: "mdi-shield-lock-outline",
  },
  {
    id: "guncellemeler",
    label: "8. Güncellemeler",
    icon: "mdi-update",
  },
]);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const offset = window.scrollY + rect.top - 90; // app bar yüksekliğine göre
  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.privacy-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ARKA PLAN BLOBLAR */
.privacy-bg-layer {
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

body.theme-dark .privacy-bg-layer {
  opacity: 0.25;
}

/* HERO */
.privacy-hero-card {
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

body.theme-dark .privacy-hero-card {
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

/* EXPANSION PANELS */
.privacy-panels :deep(.v-expansion-panel) {
  border-radius: 18px !important;
  margin-bottom: 10px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(255, 255, 255, 0.96);
  overflow: hidden;
}

body.theme-dark .privacy-panels :deep(.v-expansion-panel) {
  background: rgba(15, 23, 42, 0.98);
  border-color: rgba(51, 65, 85, 0.95);
}

.privacy-panels :deep(.v-expansion-panel:hover) {
  transform: translateY(-1px);
  transition: all 0.16s ease-out;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
}

body.theme-dark .privacy-panels :deep(.v-expansion-panel:hover) {
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.65);
}

.privacy-panels :deep(.v-expansion-panel-title__overlay) {
  background-color: transparent;
}

.privacy-panels :deep(.v-expansion-panel-title) {
  min-height: 0;
  padding: 14px 22px;
}

.privacy-panels :deep(.v-expansion-panel-text__wrapper),
.privacy-panels :deep(.v-expansion-panel-text) {
  padding: 0 16px 12px 20px;
}

/* BULLET */
.bullet {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
  margin-right: 8px;
}

/* AMAÇ CHIPLERİ */
.purpose-chip {
  border-radius: 18px;
  padding: 10px 14px;
  background: rgba(15, 23, 42, 0.02);
}

body.theme-dark .purpose-chip {
  background: rgba(15, 23, 42, 0.75);
}

/* TABLO */
.retention-table {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.4);
}

.retention-table thead {
  background: rgba(15, 23, 42, 0.03);
}

body.theme-dark .retention-table thead {
  background: rgba(15, 23, 42, 0.9);
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
