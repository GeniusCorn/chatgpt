<script setup lang="ts">
import http from '@/utils/http'

import { useChatListStore } from '@/store/chat'
import { Message } from '@/types/Message'

const chatList = useChatListStore()

const input = ref<string>('')
const inputBox = ref<HTMLElement | null>(null)

const loading = ref<boolean>(false)

const time = ref<number>(1)
const timer = ref<any>(null)

let controller = new AbortController()

async function sendMessage() {
  if (chatList.allChatList.length > 4) {
    alert('Only supports the creation of up to five chat lists.')
    return
  }

  if (isLoading()) {
    return
  }

  if (inputBox.value) {
    input.value = inputBox.value.innerText
  }

  if (isInputBoxEmpty()) {
    alert('Please enter content.')

    return
  }

  loading.value = true

  const message: Message = {
    role: 'user',
    content: input.value
  }

  clearInputBox()

  if (chatList.currentChatListIndex === null) {
    chatList.createNewChatList(message)
  } else {
    chatList.allChatList
      .at(chatList.currentChatListIndex)
      ?.message.push(message)
  }

  timer.value = setInterval(() => {
    time.value += 1
  }, 1000)

  controller = new AbortController()

  const res = await http.post(
    '/chat',
    {
      message: chatList.allChatList.at(chatList.currentChatListIndex as number)
        ?.message
    },
    { signal: controller.signal }
  )

  if (res.data.code === 0) {
    chatList.allChatList
      .at(chatList.currentChatListIndex as number)
      ?.message.push(res.data.data.choices[0].message)

    chatList.saveAllChatListToStorage()
  } else if (res.data.code === 1) {
    chatList.removeLastMessageFromAChatList(
      chatList.currentChatListIndex as number
    )

    alert(res.data.message)
  } else {
    chatList.removeLastMessageFromAChatList(
      chatList.currentChatListIndex as number
    )

    alert('Network Error, please try again later.')
  }

  clearTimer()
  loading.value = false
}

function isInputBoxEmpty() {
  const str = input.value.trim()

  if (!str) {
    return true
  }

  return false
}

function isLoading() {
  if (loading.value === true) {
    return true
  }

  return false
}

function clearInputBox() {
  input.value = ''

  if (inputBox.value) {
    inputBox.value.innerText = ''
  }
}

function clearTimer() {
  clearInterval(timer.value)
  time.value = 1
}

function handleStop() {
  if (loading.value) {
    controller.abort()
    loading.value = false

    chatList.removeLastMessageFromAChatList(
      chatList.currentChatListIndex as number
    )

    clearTimer()
  }
}

onUnmounted(() => {
  handleStop()
})
</script>

<template>
  <div flex="~" min-w-full justify-center>
    <div
      flex="~ row"
      box-border
      w-xs
      justify-center
      gap-4
      p-x-8
      p-y-4
      lg:w-3xl
      lg:p-x-4
    >
      <div relative box-border h-full min-w-full>
        <div
          ref="inputBox"
          :disabled="loading"
          contenteditable
          box-border
          max-h-xs
          min-w-full
          overflow-y-auto
          rounded-lg
          bg-slate-50
          p-4
          font-sans
          text-base
          outline-none
          drop-shadow-xl
          dark="bg-slate-700 text-white"
        />

        <div
          v-if="loading"
          flex="~ col"
          absolute
          inset-0
          h-full
          w-full
          items-center
          justify-center
          dark:text-white
        >
          <div>AI is thinking... [{{ time }}s]</div>
          <div
            cursor-pointer
            text-sm
            text-gray-4
            transition
            duration-200
            ease-in-out
            hover:underline
            hover:opacity-50
            @click="handleStop"
          >
            Stop
          </div>
        </div>
      </div>

      <div
        flex="~"
        relative
        box-border
        min-w-20
        flex-none
        items-center
        justify-center
        border
        rounded-lg
        bg-emerald-400
        drop-shadow-xl
        transition
        duration-200
        ease-in-out
        :class="{
          'hover:bg-emerald-500': !loading,
          'hover:opacity-100': !loading,
          'hover:drop-shadow-2xl': !loading,
          'cursor-pointer': !loading
        }"
        @click="sendMessage"
      >
        <div
          v-if="loading"
          i-tabler-reload
          text-2xl
          text-white
          class="loading"
        />

        <div v-else i-tabler-send text-2xl text-white />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  animation: rotation 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
