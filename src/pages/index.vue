<script setup lang="ts"></script>

<template>
  <div h-screen w-screen flex="~ col" lg="flex flex-row">
    <!-- left -->
    <div
      flex="~ row"
      lg:flex="~ col"
      box-border
      justify-between
      bg-gray-900
      p-4
      text-white
      lg:w-60
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
      dark:bg-slate-800
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
