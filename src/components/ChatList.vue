<script setup lang="ts"></script>

<template>
  <div flex="~ col" gap-2>
    <div
      flex="~ row"
      box-border
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
    >
      <div i-tabler-plus flex-none />

      <div truncate>New Chat</div>
    </div>

    <div flex="~ col" h-full w-full>
      <div
        flex="~ row"
        border="~ solid gray-900"
        cursor-pointer
        items-center
        gap-2
        rounded-lg
        p-2
        transition
        duration-200
        ease-in-out
        hover:bg-slate-600
      >
        <div i-tabler-message flex-none />

        <div truncate>Title</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
