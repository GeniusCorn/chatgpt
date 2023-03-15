<script setup lang="ts">
const props = defineProps<{
  role: string
  content: string
}>()
</script>

<template>
  <div
    flex="~ row"
    :class="{ 'bg-slate-100': props.role !== 'user' }"
    p-x-60
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
      <p>{{ props.content }}</p>
    </div>
  </div>
</template>

<style scoped></style>
