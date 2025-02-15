import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import info from '@/repos/BSTN-widt-retoriek-content/.info.json'
import reacties1 from '@/repos/BSTN-widt-retoriek-content/data/sub1reacties1-Migratie-Basis.yml'
import reacties2 from '@/repos/BSTN-widt-retoriek-content/data/sub1reacties2-Migratie-Subjectief.yml'
import reacties3 from '@/repos/BSTN-widt-retoriek-content/data/sub2reacties1-Klimaat-Basis.yml'
import reacties4 from '@/repos/BSTN-widt-retoriek-content/data/sub2reacties2-Klimaat-Subjectief.yml'

import shuffle from 'lodash/shuffle'
import chunk from 'lodash/chunk'

export const useMainStore = defineStore({
  id: 'myMainStore',
  state: () => ({ 
    userid: '',
    answers: {
      _github_content: info.hash,
      _github_app: '',
      _random: -1,
      _reacties1: [],
      _reacties2: []
    },
    names: []
  }),
  actions: {
    async init() {
      this.answers._github_content = info.hash
      this.setGithubSha()
      if (this.answers._random === -1) {
        await this.setRandomVersion()
      }
      this.setRandomNames()
    },
    async reset() {
      this.userid = nanoid()
      this.answers = {
        _github_content: info.hash,
        _github_app: '',
        _random: -1,
        _reacties1: [],
        _reacties2: []
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
      // random version
      const runtimeConfig = useRuntimeConfig()
      const API = runtimeConfig.public.API
      const { random } = await fetch(API + '/random').then(x => x.json())
      console.log({ randomVersion: random })
      this.answers._random = random
      // random reacties
      const reacties1shuffled = shuffle(reacties1)
      const reacties2shuffled = shuffle(reacties2)
      const reacties3shuffled = shuffle(reacties3)
      const reacties4shuffled = shuffle(reacties4)
      const chunks1 = chunk(reacties1shuffled, 4);
      // const chunks2 = chunk(reacties2shuffled, 4);
      const chunks2 = []
      for (let i in reacties2shuffled) {
        if (!chunks1[0].find(x => x.reference.replace('objectief','') === reacties2shuffled[i].reference.replace('subjectief', ''))) {
          chunks2.push(reacties2shuffled[i])
        }
        if (chunks2.length === 4) break;
      }

      const chunks3 = chunk(reacties3shuffled, 4);
      // const chunks4 = chunk(reacties4shuffled, 4);
      const chunks4 = []
      for (let i in reacties4shuffled) {
        if (!chunks3[0].find(x => x.reference.replace('objectief','') === reacties4shuffled[i].reference.replace('subjectief', ''))) {
          chunks4.push(reacties4shuffled[i])
        }
        if (chunks4.length === 4) break;
      }

      if (random == 1 || random == 2) {
        this.answers._reacties1 = shuffle(chunks1[0].map(x => x.reference).concat(chunks2.map(x => x.reference)))
        this.answers._reacties2 = shuffle(chunks3[0].map(x => x.reference).concat(chunks4.map(x => x.reference)))
      }
      if (random == 3 || random == 4) {
        this.answers._reacties1 = shuffle(chunks3[0].map(x => x.reference).concat(chunks4.map(x => x.reference)))
        this.answers._reacties2 = shuffle(chunks1[0].map(x => x.reference).concat(chunks2.map(x => x.reference)))
      }
      // console.log(this.answers._reacties1, this.answers._reacties2)
    },
    async setRandomNames() {
      for (let i = 0; i < 40; i++) {
        this.names.push(nanoid())
      }
    },
    save(reference: string, value: any) {
      this.answers[reference] = value
    },
    saveToggle(reference: string, value: any) {
      if (!(reference in this.answers) || !Array.isArray(this.answers[reference])) { this.answers[reference] = [] }
      if (this.answers[reference].indexOf(value) > -1) { this.answers[reference].splice(this.answers[reference].indexOf(value), 1)}
      else { this.answers[reference].push(value) }
    },
    async sendData() {
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
    },
    async finish() {
      await this.sendData()
      this.reset()
    }
  },
  persist: {
    storage: persistedState.localStorage,
  }
})