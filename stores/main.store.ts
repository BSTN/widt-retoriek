import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useMainStore = defineStore({
  id: 'myMainStore',
  state: () => ({ 
    version: 0, // 0,1,2,3,4,5,6,7
    userid: '',
    answers: {}
  }),
  actions: {
    reset() {
      this.version = Math.floor(Math.random() * 4)
      this.userid = nanoid()
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
      return true
    }
  }
})
