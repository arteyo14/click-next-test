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
    apiUrl: process.env.API_BASE,
    jwtSecret: process.env.JWT_SECRET,
  },
  plugins: ["plugins/sweetalert2.ts", "plugins/bootstrap.client.ts"],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
});
