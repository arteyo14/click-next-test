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
  ],
  plugins: ["plugins/sweetalert2.ts", "plugins/bootstrap.client.ts"],
});
