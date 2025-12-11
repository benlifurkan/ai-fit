// src/data/products.ts
export type Category = "T-Shirt" | "Oversize" | "Basic" | "Graphic";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  tags: string[];
  imageUrl: string;
  fitFor?: {
    bodyTypes?: string[];
    skinTones?: string[];
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Essential Slim Fit Siyah T-Shirt",
    description:
      "Yumuşak dokulu kumaşı ve minimal tasarımıyla günlük stile sade bir şıklık katar. Slim fit kesimi sayesinde vücuda oturur ve her kombine kolayca uyum sağlar.",
    price: 349.9,
    category: "Basic",
    tags: ["basic", "siyah", "slim-fit", "pamuk", "günlük", "minimal"],
    imageUrl:
      "https://images.pexels.com/photos/1227699/pexels-photo-1227699.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta"],
      skinTones: ["Açık", "Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 2,
    name: "Relaxed Oversize Bej T-Shirt",
    description:
      "Geniş ve rahat kesimiyle oversize stil sevenler için ideal bir parça. Yumuşak bej tonu sayesinde hem casual hem de smart-casual kombinlerde kolayca kullanılabilir.",
    price: 449.9,
    category: "Oversize",
    tags: ["oversize", "bej", "rahat", "casual", "modern", "günlük"],
    imageUrl:
      "https://images.pexels.com/photos/6311576/pexels-photo-6311576.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Orta", "Kilolu", "Kaslı"],
      skinTones: ["Açık", "Buğday", "Esmer"],
    },
  },
  {
    id: 3,
    name: "Urban Minimal Oversize Hoodie",
    description:
      "Yumuşak iç yüzeyi ve rahat kesimiyle gün boyu konfor sunan oversize hoodie. Gri tonuyla şehir stiline minimal ama güçlü bir dokunuş katar.",
    price: 529.9,
    category: "Graphic",
    tags: ["hoodie", "oversize", "gri", "street", "urban", "rahat"],
    imageUrl:
      "https://images.pexels.com/photos/6311663/pexels-photo-6311663.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta", "Kaslı"],
      skinTones: ["Açık", "Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 4,
    name: "Classic Logo Detail Regular Fit",
    description:
      "Göğüs kısmındaki küçük logo detayıyla sade şıklık sunan regular fit t-shirt. Ofis sonrası arkadaş buluşmalarında da kullanılabilecek çok yönlü bir parçadır.",
    price: 399.9,
    category: "T-Shirt",
    tags: ["logo", "minimal", "regular-fit", "klasik", "çok yönlü", "günlük"],
    imageUrl:
      "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Orta", "Kaslı"],
      skinTones: ["Açık", "Buğday", "Esmer"],
    },
  },
  {
    id: 5,
    name: "Athletic Color Block Performance Tee",
    description:
      "Hızlı kuruyan ve esnek kumaşıyla antrenmanlara uygun performans t-shirt’ü. Color-block tasarımıyla spor kombinlere dinamik bir görünüm kazandırır.",
    price: 549.9,
    category: "T-Shirt",
    tags: [
      "sportif",
      "color-block",
      "performance",
      "aktif",
      "athletic",
      "spor",
    ],
    imageUrl:
      "https://images.pexels.com/photos/6311580/pexels-photo-6311580.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Atletik", "Kaslı"],
      skinTones: ["Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 6,
    name: "Vintage Wash Denim Blue Tee",
    description:
      "Yıkanmış denim mavi tonu ile vintage bir hava katan regular fit t-shirt. Günlük jean ve sneaker kombinleri için ideal zamansız bir parçadır.",
    price: 479.9,
    category: "T-Shirt",
    tags: ["vintage", "denim", "mavi", "retro", "yıkama", "casual"],
    imageUrl:
      "https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta"],
      skinTones: ["Açık", "Buğday", "Esmer"],
    },
  },
  {
    id: 7,
    name: "Soft Green Essential Casual Tee",
    description:
      "Yumuşak kumaşı ve rahat kalıbıyla her gün giyilebilecek basic yeşil t-shirt. Katmanlı kombinlerde iç parça olarak da tek başına da şık bir duruş sunar.",
    price: 369.9,
    category: "Basic",
    tags: ["basic", "yeşil", "casual", "soft", "essential", "günlük"],
    imageUrl:
      "https://images.pexels.com/photos/1887975/pexels-photo-1887975.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta", "Kaslı"],
      skinTones: ["Açık", "Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 8,
    name: "Bold Statement Print Oversize Tee",
    description:
      "Ön yüzündeki dikkat çekici baskısıyla sokak stiline cesur bir dokunuş katar. Oversize kalıbı sayesinde hem konforlu hem de iddialı bir görünüm sağlar.",
    price: 599.9,
    category: "Oversize",
    tags: ["oversize", "baskılı", "statement", "bold", "street", "tarz"],
    imageUrl: "https://i.imgur.com/wE2ive4.png",
    fitFor: {
      bodyTypes: ["Orta", "Kilolu", "Kaslı"],
      skinTones: ["Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 9,
    name: "Premium Organic Cotton White Tee",
    description:
      "Organik pamuk ipliklerinden üretilen bu beyaz t-shirt, yumuşak dokusuyla hassas ciltler için idealdir. Zamansız tasarımıyla kapsül gardıropların vazgeçilmez parçası olur.",
    price: 429.9,
    category: "Basic",
    tags: ["premium", "organik", "beyaz", "çevre dostu", "kaliteli", "basic"],
    imageUrl:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta"],
      skinTones: ["Açık", "Buğday", "Esmer"],
    },
  },
  {
    id: 10,
    name: "Textured Striped Classic Tee",
    description:
      "Dokulu çizgili kumaşıyla hem hafta içi hem hafta sonu kombinlerine şıklık katar. Smart-casual stil için chino pantolon ve loafer ile mükemmel uyum sağlar.",
    price: 449.9,
    category: "T-Shirt",
    tags: [
      "çizgili",
      "textured",
      "classic",
      "zarif",
      "çok yönlü",
      "smart-casual",
    ],
    imageUrl:
      "https://images.pexels.com/photos/1861907/pexels-photo-1861907.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Orta", "Kaslı"],
      skinTones: ["Açık", "Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 11,
    name: "Dark Navy Professional Fit Tee",
    description:
      "Lacivert tonu ve düzgün kesimiyle profesyonel görünümlü smart-casual kombinler için ideal. Blazer ceket altında ya da tek başına şık ve düzenli bir duruş sergiler.",
    price: 389.9,
    category: "T-Shirt",
    tags: ["lacivert", "profesyonel", "smart-casual", "iş", "şık", "klasik"],
    imageUrl:
      "https://images.pexels.com/photos/220139/pexels-photo-220139.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta"],
      skinTones: ["Açık", "Buğday", "Esmer"],
    },
  },
  {
    id: 12,
    name: "Eco-Friendly Natural Beige Tee",
    description:
      "Doğal bej tonu ve sürdürülebilir kumaş içeriği ile çevre dostu bir tercih sunar. Rahat kalıbı sayesinde hem evde hem dışarıda gün boyu konfor sağlar.",
    price: 459.9,
    category: "Basic",
    tags: ["bej", "eko", "doğal", "sürdürülebilir", "organik", "toprak tonu"],
    imageUrl: "https://i.imgur.com/MAy8YkJ.png",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta"],
      skinTones: ["Açık", "Buğday", "Esmer"],
    },
  },
  {
    id: 13,
    name: "Contemporary Minimalist Grey Tee",
    description:
      "Açık gri tonu ve sade kesimiyle modern minimalist gardıroplara hitap eder. Hafif kumaşı sayesinde tüm gün kullanımda bile konforlu bir his sunar.",
    price: 379.9,
    category: "Basic",
    tags: ["minimalist", "açık gri", "zamansız", "modern", "basic", "sade"],
    imageUrl:
      "https://images.pexels.com/photos/1484808/pexels-photo-1484808.jpeg?auto=compress&cs=tinysrgb&w=800",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta", "Kaslı"],
      skinTones: ["Açık", "Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 14,
    name: "Urban Street Oversize Black Tee",
    description:
      "Kalın dokulu kumaşı ve geniş oversize kesimiyle sokak stiline güçlü bir silüet kazandırır. Siyah rengiyle hem gece hem gündüz kombinlerinde güvenli bir tercihtir.",
    price: 499.9,
    category: "Oversize",
    tags: ["siyah", "oversize", "urban", "street", "dayanıklı", "tarz"],
    imageUrl: "https://i.imgur.com/Jc5B6c4.png",
    fitFor: {
      bodyTypes: ["Orta", "Kilolu", "Kaslı"],
      skinTones: ["Buğday", "Esmer", "Koyu"],
    },
  },
  {
    id: 15,
    name: "Typography Art Graphic Tee",
    description:
      "Ön yüzündeki tipografi baskısı ile sanat ve edebiyat dokunuşu taşıyan özel bir graphic t-shirt. Farklı olmayı sevenler için sınırlı koleksiyon hissi veren bir tasarımdır.",
    price: 579.9,
    category: "Graphic",
    tags: ["graphic", "typography", "sanat", "unique", "özel", "street"],
    imageUrl: "https://i.imgur.com/7dPHrWY.png",
    fitFor: {
      bodyTypes: ["Zayıf", "Atletik", "Orta"],
      skinTones: ["Açık", "Buğday", "Esmer"],
    },
  },
];
