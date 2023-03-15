<script setup lang="ts"></script>

<template>
  <div flex="~ row" w-full items-center justify-center gap-4 p-y-4>
    <textarea
      rows="1"
      border-black="/10"
      min-h-24
      w-full
      resize-none
      overflow-y-auto
      border
      rounded-lg
      p-4
      font-sans
      text-xl
      outline-none
      drop-shadow-xl
      focus-visible:ring-0
      focus:ring-0
    />

    <div
      flex="~"
      h-full
      w-20
      cursor-pointer
      items-center
      justify-center
      border
      rounded-lg
      bg-emerald-400
      drop-shadow-xl
      transition
      duration-200
      ease-in-out
      hover:bg-emerald-500
      hover:opacity-100
      hover:drop-shadow-2xl
    >
      <div i-tabler-send text-2xl text-white />
    </div>
  </div>
</template>

<style scoped></style>
