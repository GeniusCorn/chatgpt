<script setup lang="ts"></script>

<template>
  <div h-screen w-screen flex>
    <!-- left -->
    <div w-60 bg-gray-900></div>

    <!-- right -->
    <div flex="~ 1 col" relative h-full w-full items-stretch bg-gray>
      <div flex="1" overflow-hidden></div>

      <div absolute bottom-0 left-0 w-full>
        <textarea />
        <div>发送</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: home
</route>
