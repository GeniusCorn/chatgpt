import { defineStore } from 'pinia'
import { type Message } from '@/types/Message'
import { type ChatList } from '@/types/ChatList'

export const useChatListStore = defineStore('chatList', () => {
  const currentChatListIndex = ref<number | null>(null)
  const allChatList = ref<ChatList[]>([])

  function createNewChatList(message: Message): void {
    if (allChatList.value.length > 4) {
      alert('Only supports the creation of up to five chat lists.')
      return
    }

    currentChatListIndex.value = allChatList.value.length

    const title: string = message.content.substring(0, 20)

    allChatList.value.push({
      title,
      message: []
    })

    allChatList.value.at(currentChatListIndex.value)?.message.push(message)
  }

  function editChatListTitle(index: number, title: string): void {
    allChatList.value[index].title = title
  }

  function removeChatList(index: number): void {
    allChatList.value.splice(index, 1)
    currentChatListIndex.value = null
    saveAllChatListToStorage()
  }

  function getAllChatListFromStorage(): void {
    if (localStorage.getItem('allChatList') !== null) {
      allChatList.value = JSON.parse(
        localStorage.getItem('allChatList') as string
      )
    }
  }

  function saveAllChatListToStorage(): void {
    localStorage.setItem('allChatList', JSON.stringify(allChatList.value))
  }

  function clearAllChatList(): void {
    allChatList.value = []
    currentChatListIndex.value = null
    localStorage.removeItem('allChatList')
  }

  return {
    currentChatListIndex,
    allChatList,
    editChatListTitle,
    removeChatList,
    getAllChatListFromStorage,
    saveAllChatListToStorage,
    createNewChatList,
    clearAllChatList
  }
})
