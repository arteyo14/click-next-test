// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  css: ["~/assets/main.scss"],
  devtools: { enabled: true },
  ssr: false,
  components: [
    {
      path: "components",
      pathPrefix: false,
    },
  ],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "definePiniaStore"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_BASE || "http://localhost:3000/api",
      jwtSecret: process.env.JWT_SECRET,
      autoRefreshJwtInterval: process.env.AUTO_REFRESH_JWT_INTERVAL || "30", // 30 Minutes
      jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || "20", // 20 Minutes
    },
  },
  plugins: [
    "plugins/sweetalert2.ts",
    "plugins/bootstrap.client.ts",
    "plugins/vee-validate.ts",
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
});
