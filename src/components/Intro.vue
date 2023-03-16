<script setup lang="ts"></script>

<template>
  <div flex="~ col" items-center justify-center gap-4 dark:text-white>
    <div text-3xl font-bold>ChatGPT</div>

    <div grid="~ cols-3" gap-4>
      <div flex="~ col" items-center gap-2>
        <div i-tabler-box text-3xl />
        <div>Examples</div>

        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          "Explain quantum computing in simple terms"
        </div>
        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          "Got any creative ideas for a 10 year old's birthday?"
        </div>
        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          "How do I make an HTTP request in JavaScript?"
        </div>
      </div>

      <div flex="~ col" items-center gap-2>
        <div i-tabler-bulb text-3xl />
        <div>Capabilities</div>

        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          Remembers what user said earlier in the conversation
        </div>
        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          Allows user to provide follow-up corrections
        </div>
        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          Trained to decline inappropriate requests
        </div>
      </div>

      <div flex="~ col" items-center gap-2>
        <div i-tabler-alert-triangle text-3xl />
        <div>Limitations</div>

        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          May occasionally generate incorrect information
        </div>
        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          May occasionally produce harmful instructions or biased content
        </div>
        <div box-border w-64 rounded-lg bg-slate-100 p-4 dark:bg-slate-600>
          Limited knowledge of world and events after 2021
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
