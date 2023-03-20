<script setup lang="ts">
const props = defineProps<{
  role: string
  content: string
}>()

let rawContent = JSON.stringify(props.content)

// remove useless string
rawContent = rawContent.slice(1)
rawContent = rawContent.slice(0, -1)

const textSplit = rawContent.split('\\n')
</script>

<template>
  <div
    :class="{
      'bg-slate-100': props.role !== 'user',
      'dark:bg-slate-600': props.role !== 'user'
    }"
  >
    <div
      flex="~ row"
      m-auto
      p-x-2
      font-sans
      lg:max-w-2xl
      md:max-w-2xl
      xl:max-w-3xl
      dark:text-white
    >
      <div flex="~ 1" min-w-14 justify-center p-y-6>
        <div
          v-if="props.role !== 'user'"
          i-tabler-brand-openai
          text-3xl
          text-emerald
          duration-200
          ease-in-out
          hover:text-black
          dark="hover:text-white"
        />

        <div
          v-else
          i-tabler-user
          text-3xl
          duration-200
          ease-in-out
          hover:text-emerald
        />
      </div>

      <div w-full text-justify leading-loose>
        <p v-for="(text, index) in textSplit" :key="index">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
