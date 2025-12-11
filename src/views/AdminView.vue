<template>
  <div
    :class="['admin-page', isDark ? 'admin-page--dark' : 'admin-page--light']"
  >
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold mb-1">Admin Paneli</h1>
        <p class="text-body-2 text-medium-emphasis">
          Kullanıcıları yönet, favori ve satın alma alışkanlıklarını analiz et.
        </p>
      </div>

      <v-chip
        v-if="me"
        color="primary"
        variant="flat"
        class="text-body-2"
        prepend-icon="mdi-account-plus"
      >
        {{ me.name || me.email }} • Admin
      </v-chip>
    </div>

    <!-- Yetkisiz ise -->
    <template v-if="!isAdmin">
      <v-container class="py-10">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card elevation="8" class="unauth-card rounded-xl pa-6 pa-md-8">
              <!-- Üst ikon + halo -->
              <div class="d-flex justify-center mb-6">
                <div class="icon-halo">
                  <v-icon size="56" color="error">
                    mdi-shield-lock-outline
                  </v-icon>
                </div>
              </div>

              <!-- Başlık / açıklama -->
              <div class="text-center">
                <h2 class="text-h5 text-md-h4 font-weight-bold mb-2">
                  Yetkisiz Erişim
                </h2>
                <p class="text-body-1 unauth-text mb-6 text-medium-emphasis">
                  Bu alan sadece <strong>Admin</strong> rolüne sahip
                  kullanıcılar içindir. Devam edebilmek için admin yetkili bir
                  hesapla giriş yapmalısın.
                </p>
              </div>

              <!-- Bilgi chipleri -->
              <div class="d-flex flex-wrap justify-center ga-2 mb-6">
                <v-chip
                  color="error"
                  variant="tonal"
                  prepend-icon="mdi-account-cancel-outline"
                  class="font-weight-medium unauth-chip"
                >
                  Admin yetkisi gerekli
                </v-chip>
                <v-chip
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-lock-outline"
                  class="font-weight-medium unauth-chip"
                >
                  Güvenlik koruması aktif
                </v-chip>
              </div>

              <!-- Aksiyonlar -->
              <div
                class="action-area d-flex flex-column flex-sm-row justify-center ga-3"
              >
                <v-btn
                  class="btn-glass small-btn"
                  prepend-icon="mdi-login-variant"
                  to="/login"
                >
                  Admin hesabıyla giriş yap
                </v-btn>

                <v-btn
                  class="btn-outline-modern small-btn"
                  prepend-icon="mdi-arrow-left"
                  to="/"
                >
                  Ana sayfaya dön
                </v-btn>
              </div>

              <!-- Alt küçük not -->
              <div class="text-center mt-6 text-caption unauth-note">
                Eğer admin olduğunu düşünüyorsan, oturumu kapatıp tekrar giriş
                yapmayı dene.
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- Admin ise -->
    <template v-else>
      <!-- Özet kartlar -->
      <v-row class="mb-4" dense align="stretch">
        <v-col cols="12" sm="3">
          <v-card class="pa-4 h-100 admin-stat-card" elevation="2">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="text-caption text-medium-emphasis">
                Toplam Kullanıcı
              </span>
              <v-icon size="18">mdi-account-multiple</v-icon>
            </div>
            <div class="text-h5 font-weight-bold mb-1">{{ users.length }}</div>
            <div class="text-caption text-medium-emphasis">
              {{ adminCount }} admin • {{ users.length - adminCount }} normal
              kullanıcı
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="3">
          <v-card class="pa-4 h-100 admin-stat-card" elevation="2">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="text-caption text-medium-emphasis">
                Favori Kayıtları
              </span>
              <v-icon size="18">mdi-heart-multiple</v-icon>
            </div>
            <div class="text-h5 font-weight-bold mb-1">
              {{ favorites.length }}
            </div>
            <div class="text-caption text-medium-emphasis">
              {{ uniqueFavoriteUsersCount }} farklı kullanıcı favori eklemiş
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="3">
          <v-card class="pa-4 h-100 admin-stat-card" elevation="2">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="text-caption text-medium-emphasis">
                Ürün Çeşitliliği
              </span>
              <v-icon size="18">mdi-tshirt-crew</v-icon>
            </div>
            <div class="text-h5 font-weight-bold mb-1">
              {{ products.length }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Öneri, favori ve satın alma analizleri için kullanılabilir.
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="3">
          <v-card class="pa-4 h-100 admin-stat-card" elevation="2">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="text-caption text-medium-emphasis">
                Satın Alım Özeti
              </span>
              <v-icon size="18">mdi-cart-check</v-icon>
            </div>
            <div class="text-h6 font-weight-bold mb-1">
              {{ totalOrders }} sipariş
            </div>
            <div class="text-caption text-medium-emphasis">
              Toplam ciro: <strong>{{ formatPrice(totalRevenue) }}</strong>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Ana içerik: Tabs + içerikler -->
      <v-card elevation="2" class="rounded-lg admin-main-card">
        <v-tabs
          v-model="activeTab"
          color="primary"
          bg-color="transparent"
          class="px-4 pt-2"
        >
          <v-tab value="users">
            <v-icon size="18" class="mr-2">mdi-account-group</v-icon>
            Kullanıcılar
          </v-tab>
          <v-tab value="favorites">
            <v-icon size="18" class="mr-2">mdi-heart</v-icon>
            Favori Ürünler
          </v-tab>
          <v-tab value="orders">
            <v-icon size="18" class="mr-2">mdi-cart-check</v-icon>
            Satın Alımlar
          </v-tab>
          <v-tab value="forms">
            <v-icon size="18" class="mr-2">mdi-email-fast-outline</v-icon>
            İletişim Formları
          </v-tab>
        </v-tabs>

        <v-divider class="mt-1" />

        <v-window v-model="activeTab">
          <!-- Kullanıcılar sekmesi -->
          <v-window-item value="users">
            <div class="pa-4 admin-section">
              <!-- Başlık + mini istatistikler -->
              <div
                class="admin-section-header d-flex flex-column flex-md-row justify-space-between ga-3 mb-4"
              >
                <div>
                  <div class="d-flex align-center ga-2 mb-1">
                    <div class="section-icon">
                      <v-icon size="20">mdi-account-cog-outline</v-icon>
                    </div>
                    <span class="text-subtitle-1 font-weight-semibold">
                      Kullanıcı Yönetimi
                    </span>
                  </div>
                  <p class="text-caption text-medium-emphasis mb-0">
                    Rol atamalarını yönet, fiziksel profil durumlarını ve temel
                    metrikleri tek ekrandan takip et.
                  </p>
                </div>

                <div class="d-flex flex-wrap ga-2 admin-mini-stats justify-end">
                  <div class="mini-stat-pill">
                    <span class="mini-stat-label">Toplam kullanıcı</span>
                    <span class="mini-stat-value">{{ users.length }}</span>
                  </div>
                  <div class="mini-stat-pill">
                    <span class="mini-stat-label">Admin</span>
                    <span class="mini-stat-value">{{ adminCount }}</span>
                  </div>
                  <div class="mini-stat-pill">
                    <span class="mini-stat-label">Eksik profil</span>
                    <span class="mini-stat-value">
                      {{ incompleteProfileCount }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Toolbar -->
              <div
                class="admin-section-toolbar d-flex flex-column flex-md-row ga-3 mb-4"
              >
                <div class="d-flex align-center ga-3 flex-grow-1">
                  <v-text-field
                    v-model="userSearch"
                    density="compact"
                    variant="outlined"
                    hide-details
                    placeholder="İsim veya e-posta ara..."
                    prepend-inner-icon="mdi-magnify"
                    class="flex-grow-1"
                  />
                </div>

                <div class="d-flex align-center justify-end ga-2">
                  <v-btn-toggle
                    v-model="userRoleFilter"
                    class="user-role-toggle"
                    density="comfortable"
                    divided
                    mandatory
                  >
                    <v-btn value="all" size="small">Tümü</v-btn>
                    <v-btn value="admin" size="small">
                      <v-icon size="14" class="mr-1"
                        >mdi-shield-check-outline</v-icon
                      >
                      Adminler
                    </v-btn>
                    <v-btn value="user" size="small">
                      <v-icon size="14" class="mr-1"
                        >mdi-account-outline</v-icon
                      >
                      Normal
                    </v-btn>
                  </v-btn-toggle>

                  <v-btn
                    size="small"
                    variant="text"
                    icon
                    @click="refreshUsers"
                    :loading="loadingUsers"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Tablo -->
              <v-table
                density="compact"
                class="rounded-lg elevation-1 admin-table admin-table--users"
              >
                <thead>
                  <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Kullanıcı</th>
                    <th class="text-left">Rol</th>
                    <th class="text-left">Boy / Kilo</th>
                    <th class="text-left">Fiziksel Özellikler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="u in filteredUsers" :key="u.id" class="admin-row">
                    <td class="text-caption text-no-wrap">
                      <span class="row-id-pill">#{{ u.id }}</span>
                    </td>

                    <td>
                      <div class="d-flex align-center">
                        <div class="user-avatar-pill mr-3">
                          <span>
                            {{
                              (u.name || u.email || "?").charAt(0).toUpperCase()
                            }}
                          </span>
                        </div>
                        <div>
                          <div class="text-body-2 font-weight-medium">
                            {{ u.name || "İsimsiz kullanıcı" }}
                          </div>
                          <div class="text-caption text-medium-emphasis">
                            {{ u.email }}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <!-- Giriş yapan admin ise chip -->
                      <template v-if="me && me.id === u.id">
                        <v-chip
                          size="small"
                          color="primary"
                          variant="flat"
                          class="font-weight-medium"
                          prepend-icon="mdi-account-plus"
                        >
                          Admin (sen)
                        </v-chip>
                      </template>

                      <!-- Diğer kullanıcılar için rol dropdown -->
                      <template v-else>
                        <v-select
                          v-model="u.role"
                          :items="roleOptions"
                          density="compact"
                          hide-details
                          variant="outlined"
                          class="role-select"
                          style="max-width: 150px"
                          @update:model-value="(val) => changeRole(u, val)"
                        />
                      </template>
                    </td>

                    <td class="text-caption">
                      <div class="d-flex flex-column">
                        <span
                          v-if="u.height || u.weight"
                          class="font-weight-500"
                          >{{ u.height || "?" }} cm /
                          {{ u.weight || "?" }} kg</span
                        >
                        <span
                          v-if="!u.height || !u.weight"
                          class="text-caption text-medium-emphasis"
                        >
                          Eksik bilgi
                        </span>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex flex-wrap ga-1">
                        <v-chip
                          v-if="u.bodyType"
                          size="x-small"
                          variant="outlined"
                          class="attribute-chip"
                        >
                          {{ u.bodyType }}
                        </v-chip>
                        <v-chip
                          v-if="u.skinTone"
                          size="x-small"
                          variant="outlined"
                          class="attribute-chip"
                        >
                          Ten: {{ u.skinTone }}
                        </v-chip>
                        <v-chip
                          v-if="u.hairColor"
                          size="x-small"
                          variant="outlined"
                          class="attribute-chip"
                        >
                          Saç: {{ u.hairColor }}
                        </v-chip>
                        <span
                          v-if="!u.bodyType && !u.skinTone && !u.hairColor"
                          class="text-caption text-medium-emphasis"
                        >
                          -
                        </span>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="!loadingUsers && filteredUsers.length === 0">
                    <td colspan="5" class="text-center py-4 text-caption">
                      Filtreye uyan kullanıcı bulunamadı.
                    </td>
                  </tr>

                  <tr v-if="loadingUsers">
                    <td colspan="5" class="text-center py-4 text-caption">
                      Kullanıcılar yükleniyor...
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-window-item>

          <!-- Favoriler sekmesi -->
          <v-window-item value="favorites">
            <div class="pa-4 admin-section">
              <!-- Başlık + mini istatistikler -->
              <div
                class="admin-section-header d-flex flex-column flex-md-row justify-space-between ga-3 mb-4"
              >
                <div>
                  <div class="d-flex align-center ga-2 mb-1">
                    <div class="section-icon section-icon--accent">
                      <v-icon size="20">mdi-heart-multiple-outline</v-icon>
                    </div>
                    <span class="text-subtitle-1 font-weight-semibold">
                      Kullanıcı Favorileri
                    </span>
                  </div>
                  <p class="text-caption text-medium-emphasis mb-0">
                    AI-Fit içerisinde kullanıcıların en çok ilgi gösterdiği
                    ürünleri ve favori davranışlarını takip et.
                  </p>
                </div>

                <div class="d-flex flex-wrap ga-2 admin-mini-stats justify-end">
                  <div class="mini-stat-pill">
                    <span class="mini-stat-label">Toplam favori</span>
                    <span class="mini-stat-value">{{ favorites.length }}</span>
                  </div>
                  <div class="mini-stat-pill">
                    <span class="mini-stat-label">Favori yapan kullanıcı</span>
                    <span class="mini-stat-value">
                      {{ uniqueFavoriteUsersCount }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Toolbar -->
              <div
                class="admin-section-toolbar d-flex flex-column flex-md-row ga-3 mb-4"
              >
                <div class="d-flex align-center ga-3 flex-grow-1">
                  <v-text-field
                    v-model="favoriteSearch"
                    density="compact"
                    variant="outlined"
                    hide-details
                    placeholder="Kullanıcı veya ürün ara..."
                    prepend-inner-icon="mdi-magnify"
                    class="flex-grow-1"
                  />
                </div>

                <div class="d-flex align-center justify-end ga-2">
                  <v-btn
                    size="small"
                    variant="text"
                    icon
                    @click="refreshFavorites"
                    :loading="loadingFavorites"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Tablo -->
              <v-table
                density="compact"
                class="rounded-lg elevation-1 admin-table admin-table--favorites"
              >
                <thead>
                  <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Kullanıcı</th>
                    <th class="text-left">Ürün</th>
                    <th class="text-left">Görsel</th>
                    <th class="text-left">Favori Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="f in filteredFavoritesWithDetails"
                    :key="f.id"
                    class="admin-row"
                  >
                    <td class="text-caption text-no-wrap">
                      <span class="row-id-pill row-id-pill--secondary"
                        >#{{ f.id }}</span
                      >
                    </td>

                    <!-- Kullanıcı bilgisi -->
                    <td>
                      <div v-if="f.user" class="d-flex align-center">
                        <div
                          class="user-avatar-pill mr-3 user-avatar-pill--soft"
                        >
                          <span>
                            {{
                              (f.user.name || f.user.email || "?")
                                .charAt(0)
                                .toUpperCase()
                            }}
                          </span>
                        </div>
                        <div>
                          <div class="text-body-2 font-weight-medium">
                            {{ f.user.name || "-" }}
                          </div>
                          <div class="text-caption text-medium-emphasis">
                            ID: {{ f.user.id }} • {{ f.user.email }}
                          </div>
                        </div>
                      </div>
                      <span v-else class="text-caption">-</span>
                    </td>

                    <!-- Ürün bilgisi -->
                    <td>
                      <div v-if="f.product">
                        <div class="text-body-2 font-weight-medium">
                          {{ f.product.name }}
                        </div>
                        <div class="d-flex align-center ga-1 mt-1">
                          <v-chip
                            size="x-small"
                            variant="outlined"
                            class="attribute-chip"
                            prepend-icon="mdi-tag-outline"
                          >
                            {{ f.product.category }}
                          </v-chip>
                          <span
                            class="text-caption text-medium-emphasis text-no-wrap"
                          >
                            ID: {{ f.product.id }}
                          </span>
                        </div>
                      </div>
                      <span v-else class="text-caption">-</span>
                    </td>

                    <!-- Ürün görseli -->
                    <td>
                      <div v-if="f.product" class="favorite-image-wrapper">
                        <v-img
                          :src="f.product.imageUrl"
                          width="80"
                          height="72"
                          cover
                          class="rounded-lg border favorite-image"
                        />
                      </div>
                      <span v-else class="text-caption">-</span>
                    </td>

                    <!-- Tarih -->
                    <td class="text-caption">
                      <div class="d-flex flex-column">
                        <span>{{ formatDateTime(f.createdAt) }}</span>
                      </div>
                    </td>
                  </tr>

                  <tr
                    v-if="
                      !loadingFavorites &&
                      filteredFavoritesWithDetails.length === 0
                    "
                  >
                    <td colspan="5" class="text-center py-4 text-caption">
                      Henüz favori kaydı yok veya filtreye uyan sonuç
                      bulunamadı.
                    </td>
                  </tr>

                  <tr v-if="loadingFavorites">
                    <td colspan="5" class="text-center py-4 text-caption">
                      Favoriler yükleniyor...
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-window-item>

          <!-- Satın alımlar sekmesi -->
          <v-window-item value="orders">
            <div class="pa-4 admin-section">
              <!-- Başlık -->
              <div
                class="admin-section-header d-flex flex-column flex-md-row justify-space-between ga-3 mb-4"
              >
                <div>
                  <div class="d-flex align-center ga-2 mb-1">
                    <div class="section-icon section-icon--success">
                      <v-icon size="20">mdi-finance</v-icon>
                    </div>
                    <span class="text-subtitle-1 font-weight-semibold">
                      Satın Alma Analitiği
                    </span>
                  </div>
                  <p class="text-caption text-medium-emphasis mb-0">
                    Kullanıcıların sepet davranışlarını, sipariş adetlerini ve
                    ciroyu detaylı olarak inceleyebilirsin.
                  </p>
                </div>
              </div>

              <!-- Küçük istatistik kartlar -->
              <v-row class="mb-4" dense>
                <v-col cols="12" md="4">
                  <v-card
                    class="pa-3 h-100 admin-stat-card orders-stat-card"
                    elevation="1"
                  >
                    <div class="d-flex align-center justify-space-between mb-1">
                      <span class="text-caption text-medium-emphasis">
                        Toplam Sipariş
                      </span>
                      <v-icon size="18">mdi-cart-outline</v-icon>
                    </div>
                    <div class="text-h6 font-weight-bold">
                      {{ totalOrders }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      {{ uniqueOrderUsersCount }} farklı kullanıcı sipariş
                      oluşturdu.
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card
                    class="pa-3 h-100 admin-stat-card orders-stat-card"
                    elevation="1"
                  >
                    <div class="d-flex align-center justify-space-between mb-1">
                      <span class="text-caption text-medium-emphasis">
                        Toplam Ciro
                      </span>
                      <v-icon size="18">mdi-currency-try</v-icon>
                    </div>
                    <div class="text-h6 font-weight-bold">
                      {{ formatPrice(totalRevenue) }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      AR sonrası tamamlanan siparişlerin toplam değeri.
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card
                    class="pa-3 h-100 admin-stat-card orders-stat-card"
                    elevation="1"
                  >
                    <div class="d-flex align-center justify-space-between mb-1">
                      <span class="text-caption text-medium-emphasis">
                        En Çok Satan Ürün
                      </span>
                      <v-icon size="18">mdi-star-circle-outline</v-icon>
                    </div>
                    <div
                      v-if="bestSellingProduct"
                      class="text-caption text-medium-emphasis"
                    >
                      <div class="text-body-2 font-weight-medium mb-1">
                        {{ bestSellingProduct.product.name }}
                      </div>
                      <div>
                        Toplam
                        <strong>{{ bestSellingProduct.quantity }}</strong> adet
                        satıldı.
                      </div>
                    </div>
                    <div
                      v-else
                      class="text-caption text-medium-emphasis font-italic"
                    >
                      Henüz satış verisi bulunmuyor.
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Toolbar -->
              <div
                class="admin-section-toolbar d-flex flex-column flex-md-row ga-3 mb-4"
              >
                <div class="d-flex align-center ga-3 flex-grow-1">
                  <v-text-field
                    v-model="orderSearch"
                    density="compact"
                    variant="outlined"
                    hide-details
                    placeholder="Kullanıcı veya ürün ara..."
                    prepend-inner-icon="mdi-magnify"
                    class="flex-grow-1"
                  />
                </div>

                <div class="d-flex align-center justify-end ga-2">
                  <v-btn
                    size="small"
                    variant="text"
                    icon
                    @click="refreshOrders"
                    :loading="loadingOrders"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Tablo -->
              <v-table
                density="compact"
                class="rounded-lg elevation-1 admin-table admin-table--orders mb-4"
              >
                <thead>
                  <tr>
                    <th class="text-left">Sipariş ID</th>
                    <th class="text-left">Kullanıcı</th>
                    <th class="text-left">Ürünler</th>
                    <th class="text-left">Toplam Tutar</th>
                    <th class="text-left">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="o in filteredOrdersWithDetails"
                    :key="o.id"
                    class="admin-row"
                  >
                    <td class="text-caption text-no-wrap">
                      <span class="row-id-pill row-id-pill--orders"
                        >#{{ o.id }}</span
                      >
                    </td>

                    <td>
                      <div v-if="o.user" class="d-flex align-center">
                        <div
                          class="user-avatar-pill mr-3 user-avatar-pill--orders"
                        >
                          <span>
                            {{
                              (o.user.name || o.user.email || "?")
                                .charAt(0)
                                .toUpperCase()
                            }}
                          </span>
                        </div>
                        <div>
                          <div class="text-body-2 font-weight-medium">
                            {{ o.user.name || "-" }}
                          </div>
                          <div class="text-caption text-medium-emphasis">
                            ID: {{ o.user.id }} • {{ o.user.email }}
                          </div>
                        </div>
                      </div>
                      <span v-else class="text-caption">-</span>
                    </td>

                    <td>
                      <div class="d-flex flex-wrap ga-1">
                        <v-chip
                          v-for="item in o.itemsDetailed"
                          :key="item.productId + '-' + item.quantity"
                          size="x-small"
                          variant="outlined"
                          class="text-caption product-chip"
                          prepend-icon="mdi-tshirt-v-outline"
                        >
                          <span v-if="item.product">
                            {{ item.product.name }} × {{ item.quantity }}
                          </span>
                          <span v-else>
                            Ürün #{{ item.productId }} × {{ item.quantity }}
                          </span>
                        </v-chip>
                      </div>
                    </td>

                    <td class="text-caption font-weight-medium">
                      <span class="amount-pill">
                        {{ formatPrice(o.total) }}
                      </span>
                    </td>

                    <td class="text-caption">
                      {{ formatDateTime(o.createdAt) }}
                    </td>
                  </tr>

                  <tr
                    v-if="
                      !loadingOrders && filteredOrdersWithDetails.length === 0
                    "
                  >
                    <td colspan="5" class="text-center py-4 text-caption">
                      Henüz tamamlanmış satın alım yok veya filtreye uyan sonuç
                      bulunamadı.
                    </td>
                  </tr>

                  <tr v-if="loadingOrders">
                    <td colspan="5" class="text-center py-4 text-caption">
                      Satın alımlar yükleniyor...
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <!-- İşverene rapor mesajı -->
              <v-alert
                variant="tonal"
                type="info"
                class="text-body-2 orders-summary-alert"
                border="start"
              >
                <template #title> Satın Alma Analizi Özeti </template>
                {{ analysisSummary }}
              </v-alert>
            </div>
          </v-window-item>

          <!-- İLETİŞİM FORMLARI sekmesi (aynı kaldı) -->
          <v-window-item value="forms">
            <div class="pa-4">
              <!-- Başlık + filtre barı -->
              <div
                class="d-flex flex-column flex-md-row justify-space-between ga-3 mb-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-medium mb-1">
                    İletişim Formları
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    Kullanıcıların iletişim sayfası üzerinden ilettiği
                    talepleri, geri bildirimleri ve iş birliği isteklerini
                    buradan takip edebilirsin.
                  </div>
                </div>

                <div class="d-flex flex-wrap ga-2 justify-end">
                  <v-text-field
                    v-model="contactSearch"
                    density="compact"
                    variant="outlined"
                    hide-details
                    placeholder="İsim, e-posta veya mesaj ara..."
                    prepend-inner-icon="mdi-magnify"
                    style="max-width: 260px"
                  />
                  <v-select
                    v-model="contactStatusFilter"
                    :items="[
                      { title: 'Tümü', value: 'all' },
                      { title: 'Yeni', value: 'new' },
                      { title: 'İşleniyor', value: 'in_progress' },
                      { title: 'Tamamlandı', value: 'done' },
                    ]"
                    density="compact"
                    variant="outlined"
                    hide-details
                    style="max-width: 160px"
                    prepend-inner-icon="mdi-filter-variant"
                  />
                  <v-select
                    v-model="contactTopicFilter"
                    :items="[
                      { title: 'Tüm konular', value: 'all' },
                      ...contactTopicOptions.map((t) => ({
                        title: getTopicLabel(t),
                        value: t,
                      })),
                    ]"
                    density="compact"
                    variant="outlined"
                    hide-details
                    style="max-width: 180px"
                  />
                  <v-btn
                    size="small"
                    variant="text"
                    icon
                    @click="fetchContactForms"
                    :loading="loadingForms"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Küçük özet kartlar -->
              <v-row class="mb-4" dense>
                <v-col cols="12" md="4">
                  <v-card
                    class="pa-4 h-100 admin-stat-card contact-stat-card"
                    elevation="1"
                  >
                    <div class="d-flex align-center justify-space-between mb-2">
                      <span class="text-caption text-medium-emphasis">
                        Toplam form
                      </span>
                      <v-icon size="18">mdi-email-multiple-outline</v-icon>
                    </div>
                    <div class="text-h5 font-weight-bold mb-1">
                      {{ totalContactForms }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      Sistem genelinde kayıtlı iletişim talebi.
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card
                    class="pa-4 h-100 admin-stat-card contact-stat-card"
                    elevation="1"
                  >
                    <div class="d-flex align-center justify-space-between mb-2">
                      <span class="text-caption text-medium-emphasis">
                        Yeni yanıt bekleyenler
                      </span>
                      <v-icon size="18">mdi-bell-ring-outline</v-icon>
                    </div>
                    <div class="text-h5 font-weight-bold mb-1">
                      {{ newContactFormsCount }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      Durumu <strong>Yeni</strong> olan talepler.
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card
                    class="pa-4 h-100 admin-stat-card contact-stat-card"
                    elevation="1"
                  >
                    <div class="d-flex align-center justify-space-between mb-2">
                      <span class="text-caption text-medium-emphasis">
                        En son gelen form
                      </span>
                      <v-icon size="18">mdi-timeline-clock-outline</v-icon>
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      <span v-if="filteredContactForms.length > 0">
                        {{
                          formatDateTime(
                            filteredContactForms[0]?.createdAt || ""
                          )
                        }}
                      </span>
                      <span v-else>-</span>
                    </div>
                    <div class="text-caption text-medium-emphasis mt-1">
                      İletişim trafiğini buradan takip edebilirsin.
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Form kartları listesi -->
              <div
                v-if="!loadingForms && filteredContactForms.length === 0"
                class="text-center py-8 text-caption text-medium-emphasis"
              >
                Şu anda görüntülenecek iletişim formu yok veya filtreye uyan
                sonuç bulunamadı.
              </div>

              <div v-if="loadingForms" class="text-center py-8 text-caption">
                İletişim formları yükleniyor...
              </div>

              <v-row
                v-if="!loadingForms && filteredContactForms.length"
                class="admin-forms-grid"
              >
                <v-col
                  v-for="f in filteredContactForms"
                  :key="f.id"
                  cols="12"
                  md="6"
                >
                  <v-card
                    class="contact-form-card rounded-xl pa-4"
                    elevation="2"
                  >
                    <!-- Header -->
                    <div class="d-flex align-start justify-space-between mb-3">
                      <div class="d-flex align-start">
                        <div class="contact-avatar mr-3">
                          <span>
                            {{ f.name?.charAt(0)?.toUpperCase() || "?" }}
                          </span>
                        </div>
                        <div>
                          <div class="text-body-2 font-weight-medium">
                            {{ f.name || "İsimsiz kullanıcı" }}
                          </div>
                          <div class="text-caption text-medium-emphasis">
                            {{ f.email }}
                          </div>
                          <div
                            v-if="f.company"
                            class="text-caption text-medium-emphasis mt-1"
                          >
                            {{ f.company }}
                          </div>
                        </div>
                      </div>

                      <div class="text-right">
                        <v-chip
                          size="x-small"
                          :color="getFormStatusMeta(f.status).color"
                          variant="tonal"
                          class="mb-1 font-weight-medium"
                        >
                          {{ getFormStatusMeta(f.status).label }}
                        </v-chip>
                        <div class="text-caption text-medium-emphasis">
                          {{ formatDateTime(f.createdAt) }}
                        </div>
                      </div>
                    </div>

                    <!-- Konu + topic -->
                    <div class="d-flex flex-wrap align-center ga-2 mb-3">
                      <v-chip
                        size="x-small"
                        variant="outlined"
                        prepend-icon="mdi-tag-outline"
                        class="text-caption"
                      >
                        {{ getTopicLabel(f.topic) }}
                      </v-chip>
                      <span
                        v-if="f.subject"
                        class="text-caption contact-form-subject"
                      >
                        {{ f.subject }}
                      </span>
                    </div>

                    <!-- Mesaj içeriği -->
                    <div
                      class="contact-form-message text-body-2 text-medium-emphasis mb-3"
                    >
                      {{ f.message }}
                    </div>

                    <!-- Alt bilgi -->
                    <div
                      class="d-flex justify-space-between align-center text-caption mt-1"
                    >
                      <div class="d-flex flex-column">
                        <span v-if="f.userId">
                          Kullanıcı ID: <strong>{{ f.userId }}</strong>
                        </span>
                        <span v-if="f.userEmail && f.userEmail !== f.email">
                          Hesap e-postası: <strong>{{ f.userEmail }}</strong>
                        </span>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { currentUser } from "@/stores/auth";
import { products, type Product } from "@/data/products";
import { toast } from "vue-sonner";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  height?: string | null;
  weight?: string | null;
  bodyType?: string | null;
  skinTone?: string | null;
  hairColor?: string | null;
}

interface AdminFavorite {
  id: number;
  userId: number;
  productId: number | null;
  createdAt: string;
}

interface AdminOrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

interface AdminOrder {
  id: number;
  userId: number;
  createdAt: string;
  totalAmount?: number; // opsiyonel, yoksa items üzerinden hesaplanacak
  items: AdminOrderItem[];
}

interface AdminContactForm {
  id: number;
  name: string;
  email: string;
  topic: string;
  company?: string;
  message: string;
  subject?: string;
  userId?: number | null;
  userEmail?: string | null;
  status?: "new" | "in_progress" | "done";
  createdAt: string;
}

const me = computed(() => currentUser.value);
const isAdmin = computed(() => me.value?.role === "admin");

const users = ref<AdminUser[]>([]);
const favorites = ref<AdminFavorite[]>([]);
const orders = ref<AdminOrder[]>([]);

// İLETİŞİM FORMLARI
const contactForms = ref<AdminContactForm[]>([]);
const loadingForms = ref(false);
const contactSearch = ref("");
const contactStatusFilter = ref<"all" | "new" | "in_progress" | "done">("all");
const contactTopicFilter = ref<string | "all">("all");

const roleOptions = ["user", "admin"];

const activeTab = ref<"users" | "favorites" | "orders" | "forms">("users");

// Loading & search
const loadingUsers = ref(false);
const loadingFavorites = ref(false);
const loadingOrders = ref(false);

const userSearch = ref("");
const favoriteSearch = ref("");
const orderSearch = ref("");

// Kullanıcı rol filtresi
const userRoleFilter = ref<"all" | "admin" | "user">("all");

// Toast helper'lar
const setError = (msg: string) => {
  toast.error(msg);
};

const setSuccess = (msg: string) => {
  toast.success(msg);
};

// Özetler
const adminCount = computed(
  () => users.value.filter((u) => u.role === "admin").length
);

const incompleteProfileCount = computed(
  () =>
    users.value.filter(
      (u) =>
        !u.height || !u.weight || !u.bodyType || !u.skinTone || !u.hairColor
    ).length
);

const uniqueFavoriteUsersCount = computed(() => {
  const ids = new Set(favorites.value.map((f) => f.userId));
  return ids.size;
});

// Sipariş toplamı helper
const getOrderTotal = (o: AdminOrder): number => {
  if (typeof o.totalAmount === "number") return o.totalAmount;
  return o.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};

const totalOrders = computed(() => orders.value.length);

const totalRevenue = computed(() =>
  orders.value.reduce((sum, o) => sum + getOrderTotal(o), 0)
);

const uniqueOrderUsersCount = computed(() => {
  const ids = new Set(orders.value.map((o) => o.userId));
  return ids.size;
});

// Ürün satış miktarları
const productSalesMap = computed(() => {
  const map: Record<number, number> = {};
  for (const o of orders.value) {
    for (const item of o.items) {
      map[item.productId] = (map[item.productId] || 0) + item.quantity;
    }
  }
  return map;
});

const bestSellingProduct = computed(() => {
  const map = productSalesMap.value;
  let bestId: number | null = null;
  let bestQty = 0;

  for (const [pid, qty] of Object.entries(map)) {
    const q = Number(qty);
    if (q > bestQty) {
      bestQty = q;
      bestId = Number(pid);
    }
  }

  if (!bestId) return null;
  const product = products.find((p: Product) => p.id === bestId) || null;
  if (!product) return null;

  return { product, quantity: bestQty };
});

// İşverene rapor metni
const analysisSummary = computed(() => {
  if (!totalOrders.value) {
    return "Henüz tamamlanmış bir satın alma bulunmuyor. Kullanıcıları alışverişe yönlendirmek için AR deneme sonrası kampanya ve bildirim akışlarını öne çıkarmak faydalı olacaktır.";
  }

  const revenueText = formatPrice(totalRevenue.value);
  const parts: string[] = [];

  parts.push(
    `Sistem üzerinde toplam ${totalOrders.value} adet sipariş oluşturulmuş ve yaklaşık ${revenueText} tutarında ciro üretilmiştir.`
  );
  parts.push(
    `${uniqueOrderUsersCount.value} farklı kullanıcı en az bir kez satın alma gerçekleştirmiştir.`
  );

  if (bestSellingProduct.value) {
    const b = bestSellingProduct.value;
    parts.push(
      `En çok tercih edilen ürün, ${b.quantity} adet ile “${b.product.name}” olmuştur. Bu ürünün benzerleri öne çıkarılarak kampanya kurgulanması önerilir.`
    );
  }

  parts.push(
    "Kullanıcıların önemli bir kısmı ürünü sepete eklemeden önce AR denemesi yapmaktadır. AR akışı sonrası sepete ekleme ve sepet tamamlama adımlarına odaklanan banner, e-posta veya push bildirimleri ile dönüşüm oranı artırılabilir."
  );

  return parts.join(" ");
});

// Filtrelenmiş kullanıcı listesi
const filteredUsers = computed(() => {
  const term = userSearch.value.trim().toLowerCase();
  let list = [...users.value];

  if (term) {
    list = list.filter((u) => {
      return (
        u.name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term)
      );
    });
  }

  if (userRoleFilter.value !== "all") {
    list = list.filter((u) => u.role === userRoleFilter.value);
  }

  return list;
});

// Favoriler + kullanıcı & ürün detayları
const favoritesWithDetails = computed(() =>
  favorites.value.map((f) => {
    const user = users.value.find((u) => u.id === f.userId) || null;
    const product = products.find((p: Product) => p.id === f.productId) || null;

    return {
      ...f,
      user,
      product,
    };
  })
);

const filteredFavoritesWithDetails = computed(() => {
  const term = favoriteSearch.value.trim().toLowerCase();
  if (!term) return favoritesWithDetails.value;

  return favoritesWithDetails.value.filter((f) => {
    const userText = `${f.user?.name || ""} ${
      f.user?.email || ""
    }`.toLowerCase();
    const productText = `${f.product?.name || ""} ${
      f.product?.category || ""
    }`.toLowerCase();
    return userText.includes(term) || productText.includes(term);
  });
});

// Siparişler + detay
const ordersWithDetails = computed(() =>
  orders.value.map((o) => {
    const user = users.value.find((u) => u.id === o.userId) || null;

    const itemsDetailed = o.items.map((item) => {
      const product =
        products.find((p: Product) => p.id === item.productId) || null;
      return { ...item, product };
    });

    return {
      ...o,
      user,
      itemsDetailed,
      total: getOrderTotal(o),
    };
  })
);

const filteredOrdersWithDetails = computed(() => {
  const term = orderSearch.value.trim().toLowerCase();
  if (!term) return ordersWithDetails.value;

  return ordersWithDetails.value.filter((o) => {
    const userText = `${o.user?.name || ""} ${
      o.user?.email || ""
    }`.toLowerCase();

    const productText = o.itemsDetailed
      .map((i) => i.product?.name || "")
      .join(" ")
      .toLowerCase();

    return userText.includes(term) || productText.includes(term);
  });
});

// API çağrıları
const fetchUsers = async () => {
  if (!isAdmin.value) return;
  loadingUsers.value = true;
  try {
    const res = await fetch("/api/users");
    const data = await res.json();
    users.value = (data.users || []) as AdminUser[];
  } catch (e: any) {
    console.error(e);
    setError("Kullanıcı listesi alınırken hata oluştu.");
  } finally {
    loadingUsers.value = false;
  }
};

const fetchFavorites = async () => {
  if (!isAdmin.value) return;
  loadingFavorites.value = true;
  try {
    const res = await fetch("/api/admin/favorites");
    const data = await res.json();
    favorites.value = (data.favorites || []) as AdminFavorite[];
  } catch (e: any) {
    console.error(e);
    setError("Kullanıcı favorileri alınırken hata oluştu.");
  } finally {
    loadingFavorites.value = false;
  }
};

const fetchOrders = async () => {
  if (!isAdmin.value) return;
  loadingOrders.value = true;
  try {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    orders.value = (data.orders || []) as AdminOrder[];
  } catch (e: any) {
    console.error(e);
    setError("Satın alımlar alınırken hata oluştu.");
  } finally {
    loadingOrders.value = false;
  }
};

const refreshUsers = () => {
  fetchUsers();
};

const refreshFavorites = () => {
  fetchFavorites();
};

const refreshOrders = () => {
  fetchOrders();
};

const changeRole = async (user: AdminUser, newRole: string) => {
  try {
    const res = await fetch(`/api/users/${user.id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Rol güncellenemedi.");
    }
    setSuccess(`Kullanıcının rolü '${newRole}' olarak güncellendi.`);
  } catch (e: any) {
    console.error(e);
    setError(e.message || "Rol güncellenirken hata oluştu.");
  }
};

const formatDateTime = (iso: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("tr-TR");
};

const formatPrice = (price: number) => {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  });
};

// İletişim formları için helper'lar
const topicLabelMap: Record<string, string> = {
  support: "Teknik destek",
  partnership: "İş birliği / entegrasyon",
  feedback: "Ürün geri bildirimi",
  bug: "Hata / bug bildirimi",
  other: "Diğer",
};

const getTopicLabel = (topic: string | null | undefined) =>
  topic ? topicLabelMap[topic] || topic : "Diğer";

const getFormStatusMeta = (status?: string) => {
  const s = (status as AdminContactForm["status"]) || "new";
  switch (s) {
    case "in_progress":
      return { label: "İşleniyor", color: "warning" };
    case "done":
      return { label: "Tamamlandı", color: "success" };
    case "new":
    default:
      return { label: "Yeni", color: "error" };
  }
};

// İletişim formları computed'ları
const totalContactForms = computed(() => contactForms.value.length);
const newContactFormsCount = computed(
  () => contactForms.value.filter((f) => (f.status || "new") === "new").length
);

const contactTopicOptions = computed(() => {
  const set = new Set<string>();
  contactForms.value.forEach((f) => {
    if (f.topic) set.add(f.topic);
  });
  return Array.from(set);
});

const filteredContactForms = computed(() => {
  let list = [...contactForms.value];

  const term = contactSearch.value.trim().toLowerCase();
  if (term) {
    list = list.filter((f) => {
      const text = [
        f.name,
        f.email,
        f.subject,
        f.company,
        f.message,
        f.userEmail,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(term);
    });
  }

  if (contactStatusFilter.value !== "all") {
    list = list.filter(
      (f) => (f.status || "new") === contactStatusFilter.value
    );
  }

  if (contactTopicFilter.value !== "all") {
    list = list.filter((f) => f.topic === contactTopicFilter.value);
  }

  // en yeni en üstte
  list.sort((a, b) => {
    const da = new Date(a.createdAt || 0).getTime();
    const db = new Date(b.createdAt || 0).getTime();
    return db - da;
  });

  return list;
});

// İletişim formlarını çek
const fetchContactForms = async () => {
  if (!isAdmin.value) return;
  loadingForms.value = true;
  try {
    const res = await fetch("/api/admin/forms");

    // Response'un JSON olup olmadığını kontrol et
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Beklenmeyen response tipi:", text.substring(0, 200));
      throw new Error("Sunucudan JSON yanıt alınamadı. Endpoint mevcut mu?");
    }

    const data = await res.json();
    if (!res.ok || data.ok === false) {
      throw new Error(data.message || "Formlar alınamadı.");
    }
    contactForms.value = (data.forms || []) as AdminContactForm[];
  } catch (e: any) {
    console.error("fetchContactForms hatası:", e);
    setError(e?.message || "İletişim formları alınırken hata oluştu.");
  } finally {
    loadingForms.value = false;
  }
};

onMounted(() => {
  fetchUsers();
  fetchFavorites();
  fetchOrders();
  fetchContactForms();
});
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* THEME ROOT ----------------------------------------------------------- */
.admin-page--light {
  color: #0f172a;
}

.admin-page--dark {
  color: #e5e7eb;
}

.admin-page--dark .text-medium-emphasis {
  color: #9ca3af !important;
}

/* Genel border helper */
.border {
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.admin-page--dark .border {
  border-color: rgba(148, 163, 184, 0.35);
}

/* YETKİSİZ CARD -------------------------------------------------------- */
.unauth-card {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(6px);
  transition: background 0.25s ease, border 0.25s ease, box-shadow 0.25s ease;
}

/* Light theme unauthorized card */
.admin-page--light .unauth-card {
  background: radial-gradient(
      1200px circle at -10% -20%,
      rgba(25, 118, 210, 0.1),
      transparent 45%
    ),
    radial-gradient(
      900px circle at 110% 0%,
      rgba(244, 67, 54, 0.1),
      transparent 40%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.98),
      rgba(250, 250, 250, 0.98)
    );
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
}

/* Dark theme unauthorized card */
.admin-page--dark .unauth-card {
  background: radial-gradient(
      1100px circle at -10% -10%,
      rgba(59, 130, 246, 0.18),
      transparent 50%
    ),
    radial-gradient(
      900px circle at 110% 0%,
      rgba(239, 68, 68, 0.16),
      transparent 55%
    ),
    linear-gradient(180deg, #020617, #020617);
  border: 1px solid rgba(148, 163, 184, 0.55);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.95);
}

.unauth-card::after {
  content: "";
  position: absolute;
  inset: auto -30% -50% auto;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(244, 67, 54, 0.12), transparent 60%);
  transform: rotate(12deg);
  pointer-events: none;
}

.admin-page--dark .unauth-card::after {
  background: radial-gradient(
    circle,
    rgba(56, 189, 248, 0.25),
    transparent 60%
  );
}

.icon-halo {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: radial-gradient(
      circle at 30% 20%,
      rgba(244, 67, 54, 0.18),
      transparent 55%
    ),
    radial-gradient(
      circle at 70% 80%,
      rgba(25, 118, 210, 0.18),
      transparent 60%
    ),
    rgba(0, 0, 0, 0.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.admin-page--dark .icon-halo {
  background: radial-gradient(
      circle at 30% 20%,
      rgba(248, 113, 113, 0.32),
      transparent 55%
    ),
    radial-gradient(
      circle at 70% 80%,
      rgba(59, 130, 246, 0.28),
      transparent 60%
    ),
    rgba(15, 23, 42, 0.9);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px rgba(148, 163, 184, 0.32);
}

/* Küçültülmüş ortak buton boyutu */
.small-btn {
  padding: 6px 18px !important;
  font-size: 0.85rem !important;
  border-radius: 12px !important;
  min-height: 38px !important;
}

/* Glass Button (Gradient Border) */
.btn-glass {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(10px) saturate(160%);
  position: relative;
  font-weight: 600;
  border: none !important;
  transition: 0.2s ease;
}

.btn-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: rgba(255, 255, 255, 0.5);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

/* Hover efekti (çok abartılı değil, yumuşak) */
.btn-glass:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(41, 98, 255, 0.18),
    0 0 6px rgba(255, 23, 68, 0.18);
}

/* Dark mode glass button tweak */
.admin-page--dark .btn-glass {
  background: rgba(15, 23, 42, 0.9) !important;
  color: #e5e7eb !important;
}

.admin-page--dark .btn-glass::before {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.8),
    rgba(248, 113, 113, 0.8)
  );
}

/* Dark mode glass button içindeki ikon rengi */
.admin-page--dark .btn-glass :deep(.v-icon) {
  color: #e5e7eb !important;
}

/* Outline Modern */
.btn-outline-modern {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  transition: 0.2s ease;
}

.btn-outline-modern:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.admin-page--dark .btn-outline-modern {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(148, 163, 184, 0.6) !important;
  color: #e5e7eb !important;
}

.admin-page--dark .btn-outline-modern:hover {
  background: rgba(30, 64, 175, 0.9);
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.9);
}

/* Aksiyon alanı */
.action-area {
  margin-top: 12px;
}

/* ADMIN CARDS / TABLES -------------------------------------------------- */
.admin-stat-card,
.admin-main-card {
  transition: background-color 0.22s ease, border-color 0.22s ease,
    box-shadow 0.22s ease;
}

/* Light */
.admin-page--light .admin-stat-card,
.admin-page--light .admin-main-card {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

/* Dark */
.admin-page--dark .admin-stat-card,
.admin-page--dark .admin-main-card {
  background-color: #020617; /* slate-950 */
  border: 1px solid rgba(51, 65, 85, 0.9);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.9);
}

/* Tables */
.admin-table {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.admin-page--light .admin-table {
  background: #ffffff;
}

.admin-page--dark .admin-table {
  background: #020617;
  border: 1px solid rgba(31, 41, 55, 0.9);
}

.admin-page--dark .admin-table thead {
  background: rgba(15, 23, 42, 0.96);
}

.admin-page--dark .admin-table th {
  color: #e5e7eb;
  border-bottom-color: rgba(55, 65, 81, 0.9) !important;
}

.admin-page--dark .admin-table td {
  border-bottom-color: rgba(31, 41, 55, 0.9) !important;
}

.admin-page--dark .admin-table tbody tr:hover {
  background: rgba(30, 64, 175, 0.24);
}

/* DARK MODE – tipografi renk fixleri */
.admin-page--dark .text-h4,
.admin-page--dark .text-h5,
.admin-page--dark .text-subtitle-1,
.admin-page--dark .text-body-1,
.admin-page--dark .text-body-2 {
  color: #e5e7eb !important; /* slate-200 civarı */
}

/* Zaten eklemiştin ama tamamlayalım */
.admin-page--dark .text-medium-emphasis {
  color: #9ca3af !important; /* slate-400 */
}

/* DARK MODE – tablo içi yazılar */
.admin-page--dark .admin-table th,
.admin-page--dark .admin-table td {
  color: #e5e7eb !important;
}

/* Tablo içindeki ikinci satır bilgilerini biraz kısalım */
.admin-page--dark .admin-table td .text-medium-emphasis {
  color: #9ca3af !important;
}

/* DARK MODE – küçük chip ve ikonların daha okunur olması için */
.admin-page--dark :deep(.v-chip) {
  color: #e5e7eb !important;
}

.admin-page--dark :deep(.v-icon) {
  color: #e5e7eb !important;
}

/* === DARK MODE – Üst sekme başlıkları (KULLANICILAR / FAVORİ ÜRÜNLER / SATIN ALIMLAR) === */
.admin-page--dark :deep(.v-tabs) {
  color: #e5e7eb;
}

.admin-page--dark :deep(.v-tab) {
  color: #e5e7eb !important; /* pasif sekme rengi */
  font-weight: 600;
}

.admin-page--dark :deep(.v-tab--selected) {
  color: #60a5fa !important; /* aktif sekme: mavi ton */
}

/* Hover’da hafif aydınlansın */
.admin-page--dark :deep(.v-tab:hover) {
  color: #bfdbfe !important; /* açık mavi */
}

/* === DARK MODE – Arama kutusu (placeholder + ikonlar) === */
.admin-page--dark :deep(.v-text-field .v-field__input) {
  color: #e5e7eb !important; /* yazılan metin */
}

.admin-page--dark :deep(.v-text-field .v-field__input::placeholder) {
  color: #9ca3af !important; /* placeholder rengi */
}

.admin-page--dark :deep(.v-text-field .v-icon) {
  color: #9ca3af !important; /* büyüteç ve refresh ikonları */
}

/* Çerçeve rengi ve arka plan */
.admin-page--dark :deep(.v-text-field .v-field__outline) {
  border-color: rgba(148, 163, 184, 0.7) !important;
}

.admin-page--dark :deep(.v-text-field .v-field) {
  background-color: #020617 !important; /* slate-950 */
}

/* === DARK MODE – Unauthorized text kesin override ================== */

/* Ana açıklama paragrafı */
.admin-page--dark :deep(.unauth-card .unauth-text.text-medium-emphasis) {
  color: #e5e7eb !important; /* başlıkla uyumlu, açık gri/beyaz */
}

/* En alttaki küçük not */
.admin-page--dark :deep(.unauth-card .unauth-note.text-medium-emphasis) {
  color: #a0aec0 !important; /* biraz daha soluk gri */
}

/* Chipler de koyu kalıyorsa: */
.admin-page--dark :deep(.unauth-card .unauth-chip) {
  color: #e5e7eb !important;
}

/* Unauthorized metin renkleri */
.admin-page--dark .unauth-text {
  color: #e5e7eb; /* ana açıklama: neredeyse beyaz */
}

.admin-page--dark .unauth-note {
  color: #94a3b8; /* alttaki not: biraz daha soluk gri */
}

.admin-page--dark .btn-glass:hover {
  color: #ffffff !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.35);
}

/* İLETİŞİM FORM KARTLARI ------------------------------------------ */

.admin-forms-grid {
  row-gap: 16px;
}

.contact-form-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.35);
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.admin-page--dark .contact-form-card {
  border-color: rgba(51, 65, 85, 0.9);
  background: #020617;
}

.contact-form-card::before {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(
    circle at top left,
    rgba(59, 130, 246, 0.12),
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.contact-form-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.18);
  border-color: rgba(59, 130, 246, 0.65);
}

.admin-page--dark .contact-form-card:hover {
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
}

.contact-form-card:hover::before {
  opacity: 1;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  background: radial-gradient(circle, #4f46e5, #0ea5e9);
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.5);
}

.admin-page--dark .contact-avatar {
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.9);
}

.contact-form-subject {
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Çok satırlı mesaj için line-clamp */
.contact-form-message {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* İletişim istatistik kartını biraz yumuşat */
.contact-stat-card {
  border-radius: 18px;
}

/* === YENİ: ADMIN SECTION LAYOUT (Users / Favorites / Orders) ======= */

.admin-section {
  position: relative;
}

.admin-section-header .section-icon {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 0, #60a5fa, #2563eb);
  color: #eff6ff;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.4);
}

.section-icon--accent {
  background: radial-gradient(circle at 30% 0, #fb7185, #ec4899);
  box-shadow: 0 6px 18px rgba(236, 72, 153, 0.4);
}

.section-icon--success {
  background: radial-gradient(circle at 30% 0, #4ade80, #22c55e);
  box-shadow: 0 6px 18px rgba(34, 197, 94, 0.4);
}

.admin-page--dark .admin-section-header .section-icon {
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.9);
}

.admin-section-toolbar {
  border-radius: 14px;
  padding: 10px 12px;
  background: rgba(148, 163, 184, 0.08);
}

.admin-page--dark .admin-section-toolbar {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(30, 64, 175, 0.7);
}

/* Mini istatistik pill'leri */
.admin-mini-stats {
  max-width: 100%;
}

.mini-stat-pill {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: rgba(248, 250, 252, 0.9);
  display: flex;
  flex-direction: column;
  min-width: 110px;
}

.mini-stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7280;
}

.mini-stat-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
}

.admin-page--dark .mini-stat-pill {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(55, 65, 81, 0.9);
}

.admin-page--dark .mini-stat-label {
  color: #9ca3af;
}

.admin-page--dark .mini-stat-value {
  color: #f9fafb;
}

/* User role toggle */
.user-role-toggle :deep(.v-btn) {
  text-transform: none;
  font-weight: 500;
  font-size: 0.8rem;
}

/* Tablo satırları */
.admin-table .admin-row {
  transition: background-color 0.16s ease, transform 0.12s ease,
    box-shadow 0.12s ease;
}

.admin-page--light .admin-table .admin-row:hover {
  background: linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.06),
    rgba(59, 130, 246, 0)
  );
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
}

.admin-page--dark .admin-table .admin-row:hover {
  background: linear-gradient(
    90deg,
    rgba(37, 99, 235, 0.22),
    rgba(15, 23, 42, 0.8)
  );
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.8);
}

/* ID pill */
.row-id-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  background: rgba(59, 130, 246, 0.06);
  color: #1d4ed8;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.row-id-pill--secondary {
  background: rgba(236, 72, 153, 0.06);
  color: #db2777;
  border-color: rgba(236, 72, 153, 0.32);
}

.row-id-pill--orders {
  background: rgba(34, 197, 94, 0.06);
  color: #15803d;
  border-color: rgba(34, 197, 94, 0.32);
}

.admin-page--dark .row-id-pill {
  background: rgba(30, 64, 175, 0.5);
  color: #e5e7eb;
  border-color: rgba(129, 140, 248, 0.8);
}

.admin-page--dark .row-id-pill--secondary {
  background: rgba(190, 24, 93, 0.55);
}

.admin-page--dark .row-id-pill--orders {
  background: rgba(22, 163, 74, 0.6);
}

/* Kullanıcı avatar pill */
.user-avatar-pill {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  background: radial-gradient(circle at 30% 0, #4f46e5, #0ea5e9);
  color: #ffffff;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.45);
}

.user-avatar-pill--soft {
  background: radial-gradient(circle at 30% 0, #fb7185, #ec4899);
}

.user-avatar-pill--orders {
  background: radial-gradient(circle at 30% 0, #22c55e, #16a34a);
}

.admin-page--dark .user-avatar-pill,
.admin-page--dark .user-avatar-pill--soft,
.admin-page--dark .user-avatar-pill--orders {
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.85);
}

/* Fiziksel özellik chipleri */
.attribute-chip {
  font-size: 0.7rem;
  border-radius: 999px;
}

/* Rol select */
.role-select :deep(.v-field) {
  border-radius: 999px;
}

/* Favori görsel alanı */
.favorite-image-wrapper {
  padding: 3px;
  border-radius: 12px;
  background: radial-gradient(
    circle at top left,
    rgba(236, 72, 153, 0.15),
    transparent 60%
  );
}

.favorite-image {
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.2);
}

.admin-page--dark .favorite-image-wrapper {
  background: radial-gradient(
    circle at top left,
    rgba(236, 72, 153, 0.3),
    transparent 65%
  );
}

/* Orders cards */
.orders-stat-card {
  border-radius: 16px;
}

/* Ürün chipleri */
.product-chip {
  border-radius: 999px;
}

/* Tutar pill */
.amount-pill {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.06);
  border: 1px solid rgba(34, 197, 94, 0.32);
  font-weight: 600;
}

.admin-page--dark .amount-pill {
  background: rgba(21, 128, 61, 0.6);
  border-color: rgba(74, 222, 128, 0.7);
  color: #ecfdf5;
}

/* Orders summary alert */
.orders-summary-alert {
  border-radius: 16px;
  margin-top: 4px;
}

.admin-page--dark .orders-summary-alert {
  background-color: rgba(15, 23, 42, 0.95) !important;
}
</style>
