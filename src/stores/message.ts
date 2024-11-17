import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: []
  }),
  actions: {
    sendMessage(message: string) {
      this.messages.push(message)
    }
  }
}) 