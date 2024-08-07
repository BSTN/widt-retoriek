// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteYaml from '@modyfi/vite-plugin-yaml';
import ViteMarkdown from 'vite-plugin-markdown';
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

let contentConfiguration = {
  github: {
        prefix: "/",
        driver: 'github',
        repo: 'BSTN/widt-retoriek-content',
        branch: 'main',
      }
}
if (process.env.local) {
  contentConfiguration = {
    content: {
        driver: 'fs',
        base: resolve(__dirname,  '../widt-retoriek-content')
      }
  }
}

// start config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  content: {
    sources: contentConfiguration
  },

  runtimeConfig: {
   public: {
     API: process.env.API,
   }
  },
  
  image: {
    domains: ['raw.githubusercontent.com']
  },

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/less/ease.less";@import "@/less/animations.less"; @import "@/less/global.less";`
        }
      }
    },
    plugins: [
      ViteYaml(),
      svgLoader(),
      ViteMarkdown({mode: ['html']})
    ]
  },

  modules: ["@nuxt/content", "@nuxt/image", '@pinia/nuxt']
})