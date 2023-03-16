<script setup lang="ts"></script>

<template>
  <div h-screen w-screen flex="~ row">
    <!-- left -->
    <div
      flex="~ col"
      box-border
      w-60
      justify-between
      bg-gray-900
      p-4
      text-white
    >
      <ChatList />

      <Menu />
    </div>

    <!-- right -->
    <div
      flex="~ 1 col"
      relative
      h-full
      w-full
      justify-end
      gap-4
      overflow-hidden
    >
      <Main />

      <InputBox />

      <Footer />
    </div>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: home
</route>
