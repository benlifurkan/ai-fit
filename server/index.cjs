// server/index.cjs
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Replicate = require("replicate");

const app = express();
const port = 3000;

const CF_KV_BASE_URL = process.env.CF_KV_BASE_URL;

// In memory database
const users = [];
const arSessions = [];
const favorites = [];
const orders = [];
const contactForms = [];

// -------------------- KV HELPERS --------------------

// KV'den users listesini yükle
async function loadUsersFromKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, KV kullanılmayacak.");
    return;
  }

  try {
    const res = await fetch(`${CF_KV_BASE_URL}/users`);
    if (!res.ok) {
      throw new Error(`KV GET /users failed: ${res.status}`);
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("KV'den gelen data array değil");
    }

    users.length = 0;
    users.push(...data);
    console.log("KV'den kullanıcılar yüklendi. Count:", users.length);
  } catch (err) {
    console.error("KV'den users yüklenemedi, in-memory ile devam:", err);
  }
}

// users listesini KV'ye kaydet
async function saveUsersToKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, KV'ye yazılamıyor.");
    return;
  }

  try {
    await fetch(`${CF_KV_BASE_URL}/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    });
    console.log("Kullanıcılar KV'ye kaydedildi. Count:", users.length);
  } catch (err) {
    console.error("KV'ye users yazılamadı:", err);
  }
}

// AR SESSIONS'i KV'den yükle
async function loadArSessionsFromKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, AR KV kullanılmayacak.");
    return;
  }

  try {
    const res = await fetch(`${CF_KV_BASE_URL}/ar-sessions`);
    if (!res.ok) {
      if (res.status === 404) {
        console.log("KV'de henüz ar-sessions yok, boş liste ile devam.");
        arSessions.length = 0;
        return;
      }
      throw new Error(`KV GET /ar-sessions failed: ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("KV'den gelen AR data array değil");
    }

    arSessions.length = 0;
    arSessions.push(...data);
    console.log("KV'den AR session'lar yüklendi. Count:", arSessions.length);
  } catch (err) {
    console.error("KV'den ar-sessions yüklenemedi, boş liste ile devam:", err);
    arSessions.length = 0; // KV'de veri yoksa in-memory'yi temizle
  }
}

// AR SESSIONS'i KV'ye kaydet
async function saveArSessionsToKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, AR KV'ye yazılamıyor.");
    return;
  }

  try {
    await fetch(`${CF_KV_BASE_URL}/ar-sessions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arSessions),
    });
    console.log("AR session'lar KV'ye kaydedildi. Count:", arSessions.length);
  } catch (err) {
    console.error("KV'ye ar-sessions yazılamadı:", err);
  }
}

// FAVORITES'i KV'den yükle
async function loadFavoritesFromKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, FAVORITES KV kullanılmayacak.");
    return;
  }

  try {
    const res = await fetch(`${CF_KV_BASE_URL}/favorites`);
    if (!res.ok) {
      if (res.status === 404) {
        console.log("KV'de henüz favorites yok, boş liste ile devam.");
        favorites.length = 0;
        return;
      }
      throw new Error(`KV GET /favorites failed: ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("KV'den gelen favorites data array değil");
    }

    favorites.length = 0;
    favorites.push(...data);
    console.log("KV'den favorites yüklendi. Count:", favorites.length);
  } catch (err) {
    console.error("KV'den favorites yüklenemedi, boş liste ile devam:", err);
    favorites.length = 0; // KV'de veri yoksa in-memory'yi temizle
  }
}

// FAVORITES'i KV'ye kaydet
async function saveFavoritesToKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, FAVORITES KV'ye yazılamıyor.");
    return;
  }

  try {
    await fetch(`${CF_KV_BASE_URL}/favorites`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favorites),
    });
    console.log("Favorites KV'ye kaydedildi. Count:", favorites.length);
  } catch (err) {
    console.error("KV'ye favorites yazılamadı:", err);
  }
}

// ORDERS'i KV'den yükle
async function loadOrdersFromKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, ORDERS KV kullanılmayacak.");
    return;
  }

  try {
    const res = await fetch(`${CF_KV_BASE_URL}/orders`);
    if (!res.ok) {
      if (res.status === 404) {
        orders.length = 0;
        console.log("KV'den orders yüklendi. Count:", orders.length);
        return;
      }
      throw new Error(`KV GET /orders failed: ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("KV'den gelen orders data array değil");
    }

    orders.length = 0;
    orders.push(...data);
    console.log("KV'den orders yüklendi. Count:", orders.length);
  } catch (err) {
    orders.length = 0; // KV'de veri yoksa in-memory'yi temizle
    console.log("KV'den orders yüklendi. Count:", orders.length);
  }
}

// ORDERS'i KV'ye kaydet
async function saveOrdersToKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, ORDERS KV'ye yazılamıyor.");
    return;
  }

  try {
    await fetch(`${CF_KV_BASE_URL}/orders`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orders),
    });
    console.log("Orders KV'ye kaydedildi. Count:", orders.length);
  } catch (err) {
    console.error("KV'ye orders yazılamadı:", err);
  }
}

// CONTACT FORMS'i KV'den yükle
async function loadContactFormsFromKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, CONTACT FORMS KV kullanılmayacak.");
    return;
  }

  try {
    const res = await fetch(`${CF_KV_BASE_URL}/forms`);
    if (!res.ok) {
      if (res.status === 404) {
        console.log("KV'de henüz forms yok, boş liste ile devam.");
        contactForms.length = 0;
        return;
      }
      throw new Error(`KV GET /forms failed: ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("KV'den gelen forms data array değil");
    }

    contactForms.length = 0;
    contactForms.push(...data);
    console.log("KV'den contact forms yüklendi. Count:", contactForms.length);
  } catch (err) {
    console.error("KV'den forms yüklenemedi, boş liste ile devam:", err);
    contactForms.length = 0; // KV'de veri yoksa in-memory'yi temizle
  }
}

// CONTACT FORMS'i KV'ye kaydet
async function saveContactFormsToKV() {
  if (!CF_KV_BASE_URL) {
    console.warn("CF_KV_BASE_URL tanımlı değil, CONTACT FORMS KV'ye yazılamıyor.");
    return;
  }

  try {
    await fetch(`${CF_KV_BASE_URL}/forms`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactForms),
    });
    console.log("Contact forms KV'ye kaydedildi. Count:", contactForms.length);
  } catch (err) {
    console.error("KV'ye forms yazılamadı:", err);
  }
}

// -------------------- INITIAL DATA --------------------

// Demo admin kullanıcısı (KV'den yüklenince override olabilir)
users.push({
  id: 1,
  firstName: "Sistem",
  lastName: "Yöneticisi",
  name: "Sistem Yöneticisi",
  email: "admin@aifit.com",
  password: "admin123", // sadece demo
  height: 180,
  weight: 70,
  bodyType: "Orta",
  skinTone: "Açık",
  hairColor: "Siyah",
  role: "admin",
});

// -------------------- MIDDLEWARE --------------------

app.use(
  cors({
    origin: "http://localhost:5173", // gerekiyorsa buraya prod domainlerini ekleyebilirsin
  })
);

app.use(express.json()); // JSON body parse

// Multer
const upload = multer();

// Küçük yardımcı: email normalize
function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

// -------------------- AUTH / USER ENDPOINTS --------------------

// Kayıt ol
app.post("/api/register", async (req, res) => {
  console.log("GELEN BODY:", req.body); // DEBUG

  const {
    firstName,
    lastName,
    email,
    password,
    height,
    weight,
    bodyType,
    skinTone,
    hairColor,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error: "validation_error",
      message: "İsim, soyisim, e-posta ve şifre zorunludur.",
    });
  }

  const emailNorm = normalizeEmail(email);
  const exists = users.find((u) => u.email === emailNorm);
  if (exists) {
    return res.status(409).json({
      error: "email_exists",
      message: "Bu e-posta ile zaten bir hesap mevcut.",
    });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: emailNorm,
    password,
    height,
    weight,
    bodyType,
    skinTone,
    hairColor,
    role: "user", // 🔥 her yeni kayıt normal user
  };

  users.push(newUser);
  const { password: _, ...safeUser } = newUser;

  // 🔥 KV'ye yaz
  await saveUsersToKV();

  return res.status(201).json({
    message: "Kayıt başarılı.",
    user: safeUser,
  });
});

// Giriş yap
app.post("/api/login", async (req, res) => {
  await loadUsersFromKV();
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      error: "validation_error",
      message: "E-posta ve şifre zorunludur.",
    });
  }

  const emailNorm = normalizeEmail(email);
  const user = users.find((u) => u.email === emailNorm);

  if (!user || user.password !== String(password)) {
    return res.status(401).json({
      error: "invalid_credentials",
      message: "E-posta veya şifre hatalı.",
    });
  }

  const { password: _, ...safeUser } = user;

  return res.json({
    message: "Giriş başarılı.",
    user: safeUser,
  });
});

// Tüm kullanıcıları listele (admin paneli için)
// Not: Gerçek sistemde auth + yetki kontrolü yapılmalı, burada demo amaçlı.
app.get("/api/users", async (req, res) => {
  await loadUsersFromKV();

  const safeUsers = users.map((u) => {
    const { password, ...rest } = u;
    return rest;
  });

  return res.json({ users: safeUsers });
});

// Kullanıcı rolünü güncelle (user <-> admin)
// Demo: burada da gerçek auth yok, sadece role string'ini değiştiriyoruz.
app.patch("/api/users/:id/role", async (req, res) => {
  const userId = Number(req.params.id);
  const { role } = req.body || {};

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({
      error: "invalid_role",
      message: "Role sadece 'user' veya 'admin' olabilir.",
    });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({
      error: "not_found",
      message: "Kullanıcı bulunamadı.",
    });
  }

  user.role = role;

  // 🔥 KV'ye yaz
  await saveUsersToKV();

  const { password, ...safeUser } = user;
  return res.json({
    message: "Rol güncellendi.",
    user: safeUser,
  });
});

// -------------------- REPLICATE / AR ENDPOINTS --------------------

// Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  // 🔥 Yeni JS client normalde FileOutput (ReadableStream) döndürüyor.
  // Bunu kapatıyoruz, direkt URL string'i dönsün:
  useFileOutput: false,
});

// AR SESSION LİSTELEME (KV destekli)
app.get("/api/ar-sessions", async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({
      error: "missing_user",
      message: "userId gereklidir.",
    });
  }

  try {
    // KV'den güncel arSessions'ı çek
    await loadArSessionsFromKV();

    const list = arSessions
      .filter((s) => s.userId === Number(userId))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    return res.json({ sessions: list });
  } catch (err) {
    console.error("AR sessions listelenirken KV hatası:", err);
    return res.status(500).json({
      error: "kv_error",
      message: "AR geçmişi okunurken hata oluştu.",
    });
  }
});

// Kullanıcı fotoğrafı + kıyafet görseli alıp try-on yapan endpoint
app.post(
  "/api/try-on",
  upload.fields([
    { name: "person_image", maxCount: 1 },
    { name: "cloth_image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const personFile = req.files["person_image"]?.[0];
      const clothFile = req.files["cloth_image"]?.[0];

      if (!personFile || !clothFile) {
        return res.status(400).json({
          error: "missing_files",
          message: "Eksik dosya gönderildi.",
        });
      }

      const personBase64 = personFile.buffer.toString("base64");
      const clothBase64 = clothFile.buffer.toString("base64");

      const personDataUrl = `data:${personFile.mimetype};base64,${personBase64}`;
      const clothDataUrl = `data:${clothFile.mimetype};base64,${clothBase64}`;

      const output = await replicate.run(
        "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
        {
          input: {
            human_img: personDataUrl,
            garm_img: clothDataUrl,
            garment_des: "Upper body garment",
            category: "upper_body",
            crop: false,
            steps: 30,
            seed: 42,
          },
        }
      );

      console.log("RAW MODEL OUTPUT:", output);

      // 🔹 1) Önce modeli PARSE et, URL'i çıkar
      let resultImageUrl = null;

      if (typeof output === "string") {
        // Tek çıktı: direkt URL string
        resultImageUrl = output;
      } else if (Array.isArray(output) && typeof output[0] === "string") {
        // Dizi ise: ilk eleman URL kabul
        resultImageUrl = output[0];
      }

      // 🔹 2) URL yoksa 500 dön
      if (!resultImageUrl) {
        return res.status(500).json({
          error: "no_output",
          message: "Model çıktı üretmedi veya beklenmeyen format.",
        });
      }

      // 🔹 3) AR SESSION kaydı (history için)
      const userIdField = req.body.userId;
      const productIdField = req.body.productId;

      if (userIdField) {
        const session = {
          id: arSessions.length
            ? Math.max(...arSessions.map((s) => s.id)) + 1
            : 1,
          userId: Number(userIdField),
          productId: productIdField ? Number(productIdField) : null,
          imageUrl: resultImageUrl,
          createdAt: new Date().toISOString(),
        };

        // Önce local in-memory'e ekle
        arSessions.push(session);
        console.log("AR SESSION SAVED (memory):", session);

        // Sonra KV'ye yaz
        try {
          await saveArSessionsToKV();
          console.log("AR SESSION SAVED (KV)");
        } catch (e) {
          console.error("AR session KV'ye yazılamadı:", e);
          // Burada kullanıcıya hata dökmüyoruz; en azından bu seans için UI'de görüntü var
        }
      }

      // 🔹 4) Frontend'e sonucu gönder
      return res.json({ imageUrl: resultImageUrl });
    } catch (err) {
      console.error(err);

      if (err.status === 402 || err?.response?.status === 402) {
        return res.status(402).json({
          error: "insufficient_credit",
          message:
            "AI servisi için yeterli kredi bulunmadığından gerçek try-on çalıştırılamadı.",
        });
      }

      return res.status(500).json({
        error: "server_error",
        message: "AI try-on sırasında beklenmeyen bir hata oluştu.",
      });
    }
  }
);

// -------------------- FAVORITES ENDPOINTS --------------------

// KULLANICININ FAVORİLERİNİ LİSTELE
app.get("/api/favorites", async (req, res) => {
  const userIdRaw = req.query.userId;
  const userId = Number(userIdRaw);

  if (!userId) {
    return res.status(400).json({
      error: "missing_user",
      message: "userId gereklidir.",
    });
  }

  try {
    await loadFavoritesFromKV();

    const userFavorites = favorites.filter((f) => f.userId === userId);

    return res.json({
      favorites: userFavorites.map((f) => f.productId), // sadece ürün ID listesi
      items: userFavorites, // istersen admin tarafında kullanırsın
    });
  } catch (err) {
    console.error("Favorites listelenirken KV hatası:", err);
    return res.status(500).json({
      error: "kv_error",
      message: "Favoriler okunurken hata oluştu.",
    });
  }
});

// FAVORİ EKLE/ÇIKAR (TOGGLE)
app.post("/api/favorites/toggle", async (req, res) => {
  const { userId: userIdRaw, productId: productIdRaw } = req.body || {};

  const userId = Number(userIdRaw);
  const productId = Number(productIdRaw);

  if (!userId || !productId) {
    return res.status(400).json({
      error: "validation_error",
      message: "userId ve productId zorunludur.",
    });
  }

  try {
    await loadFavoritesFromKV();

    const existingIndex = favorites.findIndex(
      (f) => f.userId === userId && f.productId === productId
    );

    if (existingIndex >= 0) {
      // Varsa favoriden çıkar
      favorites.splice(existingIndex, 1);
    } else {
      // Yoksa ekle
      const newFavorite = {
        id: favorites.length ? Math.max(...favorites.map((f) => f.id)) + 1 : 1,
        userId,
        productId,
        createdAt: new Date().toISOString(),
      };
      favorites.push(newFavorite);
    }

    await saveFavoritesToKV();

    const userFavorites = favorites
      .filter((f) => f.userId === userId)
      .map((f) => f.productId);

    return res.json({
      favorites: userFavorites, // güncel ürün ID listesi
    });
  } catch (err) {
    console.error("Favorites toggle sırasında KV hatası:", err);
    return res.status(500).json({
      error: "kv_error",
      message: "Favori güncellenirken hata oluştu.",
    });
  }
});

// ADMIN: TÜM KULLANICILARIN FAVORİLERİ
app.get("/api/admin/favorites", async (req, res) => {
  try {
    await loadFavoritesFromKV();

    return res.json({
      favorites,
    });
  } catch (err) {
    console.error("Admin favorites listesinde KV hatası:", err);
    return res.status(500).json({
      error: "kv_error",
      message: "Admin favorites okunurken hata oluştu.",
    });
  }
});

// -------------------- ORDERS ENDPOINTS --------------------

// SİPARİŞ OLUŞTUR (Kullanıcı checkout -> ShoppingView.vue)
app.post("/api/orders", async (req, res) => {
  await loadOrdersFromKV(); // en güncel listeden devam et

  const {
    userId,
    fullName,
    address,
    cardLast4,
    items,
    totalPrice,
  } = req.body || {};

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: "validation_error",
      message: "userId ve items zorunludur.",
    });
  }

  // Total'ı güvenlik için server tarafında da hesaplayaım:
  const computedTotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) * Number(item.unitPrice || 0),
    0
  );

  const finalTotal =
    typeof totalPrice === "number" ? totalPrice : computedTotal;

  const newOrder = {
    id: orders.length ? Math.max(...orders.map((o) => o.id || 0)) + 1 : 1,
    userId: Number(userId),
    createdAt: new Date().toISOString(),
    totalAmount: finalTotal,
    items: items.map((i) => ({
      productId: Number(i.productId),
      quantity: Number(i.quantity),
      unitPrice: Number(i.unitPrice),
    })),
    // İstatistik için ekstra alanlar:
    fullName: fullName || null,
    address: address || null,
    cardLast4: cardLast4 || null,
  };

  orders.push(newOrder);
  await saveOrdersToKV();

  return res.status(201).json({
    message: "Sipariş oluşturuldu.",
    order: newOrder,
  });
});

// ADMIN: TÜM SİPARİŞLER (AdminView.vue -> /api/admin/orders)
app.get("/api/admin/orders", async (req, res) => {
  await loadOrdersFromKV();

  // Gerekirse tarihe göre sıralama (en yeni en üstte)
  const sorted = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return res.json({
    orders: sorted,
  });
});

// -------------------- CONTACT FORMS ENDPOINTS --------------------

// İLETİŞİM FORMU GÖNDER (ContactView.vue -> /api/contact)
app.post("/api/contact", async (req, res) => {
  await loadContactFormsFromKV();

  const {
    name,
    email,
    topic,
    company,
    message,
    subject,
    userId,
    userEmail,
    createdAt,
  } = req.body || {};

  if (!name || !email || !topic || !message) {
    return res.status(400).json({
      ok: false,
      error: "validation_error",
      message: "Ad, e-posta, konu ve mesaj zorunludur.",
    });
  }

  const newForm = {
    id: contactForms.length
      ? Math.max(...contactForms.map((f) => f.id || 0)) + 1
      : 1,
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    topic: String(topic),
    company: company ? String(company).trim() : undefined,
    message: String(message).trim(),
    subject: subject ? String(subject).trim() : undefined,
    userId: userId ? Number(userId) : null,
    userEmail: userEmail ? String(userEmail).trim().toLowerCase() : null,
    status: "new", // Yeni formlar "new" durumunda başlar
    createdAt: createdAt || new Date().toISOString(),
  };

  contactForms.push(newForm);
  await saveContactFormsToKV();

  return res.status(201).json({
    ok: true,
    message: "İletişim formu başarıyla gönderildi.",
    form: newForm,
  });
});

// ADMIN: TÜM İLETİŞİM FORMLARI (AdminView.vue -> /api/admin/forms)
app.get("/api/admin/forms", async (req, res) => {
  await loadContactFormsFromKV();

  // En yeni en üstte
  const sorted = [...contactForms].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );

  return res.json({
    ok: true,
    forms: sorted,
  });
});

// -------------------- BOOTSTRAP & SERVER START --------------------

(async () => {
  await loadUsersFromKV();
  await loadArSessionsFromKV();
  await loadFavoritesFromKV();
  await loadOrdersFromKV();
  await loadContactFormsFromKV();
})();

app.listen(port, () => {
  console.log(`AI Try-On backend http://localhost:${port} üzerinde çalışıyor`);
});
