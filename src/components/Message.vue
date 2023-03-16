<script setup lang="ts">
const props = defineProps<{
  role: string
  content: string
}>()

let rawContent = JSON.stringify(props.content)

rawContent = rawContent.slice(1)
rawContent = rawContent.slice(0, -1)

let textSplit: string[]

if (props.role === 'user') {
  textSplit = rawContent.split('\\n')
} else {
  textSplit = rawContent.split('\\n\\n')
}
</script>

<template>
  <div
    flex="~ row"
    :class="{ 'bg-slate-100': props.role !== 'user' }"
    p-x-94
    font-sans
  >
    <div flex="~ 1" min-w-14 justify-center p-y-6>
      <div
        v-if="props.role !== 'user'"
        i-tabler-brand-openai
        text-3xl
        text-emerald
      />

      <div v-else i-tabler-user text-3xl />
    </div>

    <div w-full text-justify leading-loose>
      <p v-for="(text, index) in textSplit" :key="index">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped></style>
