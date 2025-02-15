// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteYaml from '@modyfi/vite-plugin-yaml';
import ViteMarkdown from 'vite-plugin-markdown';
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

const localRepository = resolve(__dirname, '../widt-retoriek-content')

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      htmlAttrs: {
        lang: 'nl'
      }
    },
  },
  content: {
    sources: {
      content: {
        driver: 'fs',
        base: process.env.local ? localRepository : './repos/BSTN-widt-retoriek-content'
      }
    }
  },
  image: {
    dir: process.env.local ? localRepository : 'repos/BSTN-widt-retoriek-content',
  },

  runtimeConfig: {
   public: {
      API: process.env.API,
      VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA
   }
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

  modules: ["@nuxt/content", "@nuxt/image", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', ['./modules/github.module', {repositories:[{
    owner: 'BSTN',
    repo: 'widt-retoriek-content',
    local: localRepository
  }]}]]
})