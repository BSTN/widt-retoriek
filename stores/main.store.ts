import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import info from '@/repos/BSTN-widt-retoriek-content/.info.json'

export const useMainStore = defineStore({
  id: 'myMainStore',
  state: () => ({ 
    userid: '',
    answers: {
      _github_content: info.hash,
      _github_app: '',
      _random: -1
    }
  }),
  actions: {
    async init() {
      this.answers._github_content = info.hash
      this.setGithubSha()
      if (this.answers._random === -1) {
        await this.setRandomVersion()
      }
    },
    async reset() {
      this.userid = nanoid()
      this.answers = {
        _github_content: info.hash,
        _github_app: '',
        _random: -1
      }
      this.setGithubSha()
      await this.setRandomVersion()
    },
    setGithubSha() {
      const runtimeConfig = useRuntimeConfig()
      const VERCEL_GIT_COMMIT_SHA = runtimeConfig.public.VERCEL_GIT_COMMIT_SHA
      this.answers._github_app = VERCEL_GIT_COMMIT_SHA
    },
    async setRandomVersion() {
      const runtimeConfig = useRuntimeConfig()
      const API = runtimeConfig.public.API
      const { random } = await fetch(API + '/random').then(x => x.json())
      this.answers._random = Math.round((Math.random() * 8))
    },
    save(reference: string, value: any) {
      this.answers[reference] = value
    },
    saveToggle(reference: string, value: any) {
      if (!(reference in this.answers) || !Array.isArray(this.answers[reference])) { this.answers[reference] = [] }
      if (this.answers[reference].indexOf(value) > -1) { this.answers[reference].splice(this.answers[reference].indexOf(value), 1)}
      else { this.answers[reference].push(value) }
    },
    async finish() {
      const runtimeConfig = useRuntimeConfig()
      const API = runtimeConfig.public.API

        await fetch(API + '/save', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: this.userid, answers: this.answers })
        })

        this.reset()
    }
  },
  persist: {
    storage: persistedState.localStorage,
  }
})