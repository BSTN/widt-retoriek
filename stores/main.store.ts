import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import info from '@/repos/BSTN-widt-retoriek-content/.info.json'

export const useMainStore = defineStore({
  id: 'myMainStore',
  state: () => ({ 
    userid: '',
    answers: {
      _version: info.hash
    }
  }),
  actions: {
    init() {
      this.answers._version = info.hash
    },
    reset() {
      this.userid = nanoid()
      this.answers = {
        _version: info.hash
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