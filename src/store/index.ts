import { defineStore } from 'pinia'
import { type Message } from '@/types/Message'
import { type MessageList } from '@/types/MessageList'

export const useMessageListStore = defineStore('messageList', () => {
  const currentIndex = ref<number | null>(null)
  const allMessageList = ref<MessageList[]>([])

  function addNewMessageList(message: Message): void {
    currentIndex.value = allMessageList.value.length

    const title: string = message.content.substring(0, 10)

    allMessageList.value.push({
      title,
      message: []
    })

    allMessageList.value.at(currentIndex.value)?.message.push(message)
  }

  function syncToStorage(): void {
    localStorage.setItem('allMessageList', JSON.stringify(allMessageList.value))
  }

  function clearAllMessageList(): void {
    allMessageList.value = []
    currentIndex.value = null
    localStorage.removeItem('allMessageList')
  }

  return {
    currentIndex,
    allMessageList,
    syncToStorage,
    addNewMessageList,
    clearAllMessageList
  }
})
