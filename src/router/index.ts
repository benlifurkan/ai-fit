// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import RecommendationView from "../views/RecommendationView.vue";
import TryOnView from "../views/TryOnView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import HistoryView from "@/views/HistoryView.vue";
import AdminView from "@/views/AdminView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import ShoppingView from "@/views/ShoppingView.vue";
import FaqView from "@/views/FaqView.vue";
import ContactView from "../views/ContactView.vue";
import PrivacyView from "../views/PrivacyView.vue";
import TermsView from "../views/TermsView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/recommendations",
    name: "recommendations",
    component: RecommendationView,
  },
  { path: "/try-on", name: "try-on", component: TryOnView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/profile", name: "profile", component: ProfileView },
  { path: "/history", name: "history", component: HistoryView },
  { path: "/admin", name: "admin", component: AdminView },
  { path: "/favorites", name: "favorites", component: FavoritesView },
  { path: "/shopping", name: "shopping", component: ShoppingView },
  { path: "/faq", name: "faq", component: FaqView },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/privacy", name: "privacy", component: PrivacyView },
  { path: "/terms", name: "terms", component: TermsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
