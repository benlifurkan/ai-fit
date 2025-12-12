# 👕 AI-Fit  
### Yapay Zekâ (AI) ve Artırılmış Gerçeklik (AR) Destekli Kişiselleştirilmiş Kıyafet Deneme ve Öneri Sistemi

AI-Fit, online kıyafet alışverişlerinde yaşanan **beden uyumsuzluğu**, **yanlış ürün seçimi** ve **yüksek iade oranı** problemlerine çözüm üretmek amacıyla geliştirilmiş,  
**yapay zekâ destekli öneri sistemi** ve **artırılmış gerçeklik (AR) sanal deneme** özelliklerini bir araya getiren modern bir web uygulamasıdır.

Bu proje, üniversite **final projesi** kapsamında geliştirilmiş olup; gerçek hayatta kullanılabilecek ölçeklenebilir bir mimari hedeflenmiştir.

---

## 🚀 Temel Özellikler

- 👤 **Kullanıcı Profili**
  - Boy, kilo, vücut tipi, ten rengi gibi fiziksel özelliklerin girilmesi
- 🤖 **Yapay Zekâ Destekli Ürün Önerileri**
  - Kullanıcının fiziksel özellikleri ve tercihleri doğrultusunda kişiselleştirilmiş ürün önerileri
- 🕶️ **AR (Artırılmış Gerçeklik) Sanal Deneme**
  - Kullanıcının kendi fotoğrafı üzerinde kıyafetleri sanal olarak deneyebilmesi
- ❤️ **Favoriler Sistemi**
  - Kullanıcıların beğendiği ürünleri favorilere ekleyebilmesi
- 🛒 **Sepet Sistemi**
  - Ürünlerin sepete eklenmesi ve yönetilmesi
- 🧑‍💼 **Admin Paneli**
  - Kullanıcıların favori ve tüketim alışkanlıklarının analizi
- 🌗 **Dark / Light Tema Desteği**
- 🔐 **Temel Güvenlik ve Gizlilik Yapısı**

---

## 🧠 Projenin Çözdüğü Problem

Online giyim alışverişlerinde kullanıcılar, ürünün üzerlerinde nasıl duracağını göremediği için:
- Yanlış beden seçimi
- Memnuniyetsizlik
- Yüksek iade oranları

gibi sorunlarla karşılaşmaktadır.

**AI-Fit**, bu problemi:
- Yapay zekâ ile **kişiselleştirilmiş öneriler**
- AR ile **satın almadan önce sanal deneme**

yaklaşımıyla minimize etmeyi hedefler.

---

## 🛠️ Kullanılan Teknolojiler

### Frontend
- **Vue.js 3**
- **TypeScript**
- **Vuetify**
- **Tailwind CSS**
- **Vite**

### Backend
- **Node.js**
- **Express.js**
- **Cloudflare Workers & KV**
- **Multer (Dosya yükleme)**

### Yapay Zekâ & AR
- **Replicate AI**
- Görsel işleme ve ölçekleme tabanlı sanal deneme mantığı

---

## 📁 Proje Yapısı

```text
ai-fit/
├─ src/
│  ├─ views/           # Sayfalar (Home, Login, Admin, Recommendation vb.)
│  ├─ components/      # Yeniden kullanılabilir bileşenler
│  ├─ stores/          # Pinia state yönetimi
│  ├─ assets/          # Stil ve görseller
│  └─ router/          # Vue Router
│
├─ server/
│  └─ index.cjs        # Express backend
│
├─ public/
├─ .env.example
├─ package.json
└─ README.md
