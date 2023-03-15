import { defineStore } from 'pinia'
import { type Message } from '@/types/Message'

export const useMessageListStore = defineStore('messageList', () => {
  const message = ref<Message[]>([])

  return { message }
})
