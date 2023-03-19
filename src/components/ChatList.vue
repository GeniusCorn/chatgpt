<script setup lang="ts">
import { useChatListStore } from '@/store/chat'

const chatList = useChatListStore()

onMounted(() => {
  chatList.getAllChatListFromStorage()
})

const isEditing = ref<boolean>(false)
const editTitleText = ref<string>('')

function createNewChat() {
  if (isEditing.value === true) {
    return
  }

  chatList.currentChatListIndex = null
}

function changeChat(index: number) {
  if (isEditing.value === true) {
    return
  }

  chatList.currentChatListIndex = index
}

function startEditing() {
  editTitleText.value = chatList.allChatList.at(
    chatList.currentChatListIndex as number
  )?.title as string

  isEditing.value = true
}

function finishEditing() {
  isEditing.value = false

  chatList.allChatList[chatList.currentChatListIndex as number].title =
    editTitleText.value

  chatList.saveAllChatListToStorage()

  editTitleText.value = ''
}
</script>

<template>
  <div flex="~ col" gap-2>
    <div
      flex="~ row"
      min-h-8
      cursor-pointer
      items-center
      gap-2
      border-slate-600
      rounded-lg
      border-solid
      p-2
      transition
      duration-200
      ease-in-out
      hover:bg-slate-600
      @click="createNewChat"
    >
      <div i-tabler-plus flex-none />

      <div truncate>New Chat</div>
    </div>

    <div flex="~ col" h-full w-full gap-2>
      <div
        v-for="(message, index) in chatList.allChatList"
        :key="index"
        flex="~ row"
        border="~ solid"
        min-h-8
        cursor-pointer
        items-center
        justify-between
        gap-2
        rounded-lg
        p-2
        transition
        duration-200
        ease-in-out
        hover:bg-slate-600
        :class="{
          'border-emerald-400': chatList.currentChatListIndex === index,
          'border-gray-900': chatList.currentChatListIndex !== index
        }"
        @click="changeChat(index)"
      >
        <div v-if="isEditing && chatList.currentChatListIndex === index">
          <input
            v-model="editTitleText"
            w-full
            type="text"
            @keyup.enter="finishEditing"
          />
        </div>
        <template v-else>
          <div i-tabler-message flex-none />

          <div w-full truncate>{{ message.title }}</div>
        </template>

        <div
          v-if="chatList.currentChatListIndex === index"
          flex="~ row"
          items-center
          gap-2
        >
          <template v-if="!isEditing">
            <div
              i-tabler-edit-circle
              transition
              duration-200
              ease-in-out
              hover:text-emerald-400
              @click="startEditing"
            />

            <div
              i-tabler-trash
              transition
              duration-200
              ease-in-out
              hover:text-emerald-400
              @click.stop="chatList.removeChatList(index)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
