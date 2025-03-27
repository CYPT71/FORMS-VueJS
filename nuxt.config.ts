// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  srcDir: './src', // Indique à Nuxt d'utiliser src/

  nitro: {
    static: true,
  },
  alias: {
    "@/": "./src"
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false, // Désactive les noms du style <RecursiveFormQuestionBlock />
    }
  ],
  
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  compatibilityDate: '2025-03-27',
})
