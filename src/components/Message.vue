<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const props = defineProps<{
  role: string
  content: string
}>()

const md: MarkdownIt = new MarkdownIt({
  linkify: true,

  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }

    return '' // use external default escaping
  }
})

const text = computed(() => md.render(props.content))
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
        <div v-html="text" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hljs {
  background-color: beige;
}
</style>
