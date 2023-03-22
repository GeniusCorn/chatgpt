<script setup lang="ts">
const props = defineProps<{
  role: string
  content: string
}>()

const rawContent = JSON.stringify(props.content)

const textSplit: string = generateText(rawContent)

function generateText(raw: string) {
  let result: any

  // remove useless string
  const temp = raw.slice(1)
  result = temp.slice(0, -1)

  // split by line break
  result = result.split('\\n')

  // remove empty
  for (let i = 0; i < result.length; i += 1) {
    if (result[i].length === 0) {
      if (i === 0) {
        result.shift()
        result.shift()
      } else {
        result.splice(i, 1)
      }
    }
  }

  // replace escaped characters
  for (let i = 0; i < result.length; i += 1) {
    result[i] = result[i].replaceAll('\\"', '"')
  }

  return result
}
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
      max-w-xl
      p-x-4
      font-sans
      lg:max-w-3xl
      lg:p-x-2
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
