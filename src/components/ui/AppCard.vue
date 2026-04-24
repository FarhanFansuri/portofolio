<template>
  <router-link
    :to="to"
    class="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
  >
    <div class="flex items-start gap-4">
      <div class="rounded-xl bg-slate-100 p-3 text-button-color transition group-hover:scale-105 dark:bg-slate-800">
        <component :is="icon" class="h-6 w-6" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-slate-800 dark:text-white">{{ title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    required: true
  },
  to: {
    type: String,
    required: true
  }
})
</script>
