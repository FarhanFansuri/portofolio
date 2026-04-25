<template>
  <router-link
    :to="{ name: 'security-lab-detail', params: { slug: item.slug } }"
    class="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-300 bg-white/95 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90"
  >
    <div class="absolute right-0 top-0 h-24 w-24 -translate-y-6 translate-x-6 rounded-full bg-cyan-100/60 blur-2xl dark:bg-cyan-300/15" />

    <div class="flex items-center justify-between gap-3">
      <span class="inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]" :class="difficultyClass">
        {{ item.difficulty }}
      </span>
      <span class="rounded-md bg-cyan-100 px-2 py-1 text-[11px] font-semibold text-cyan-800 dark:bg-cyan-900/45 dark:text-cyan-200">
        {{ item.type }}
      </span>
    </div>

    <h3 class="mt-4 min-h-[56px] text-lg font-extrabold leading-snug text-slate-700 dark:text-white">
      {{ item.title }}
    </h3>

    <p class="summary-clamp mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
      {{ item.summary }}
    </p>

    <div class="mt-4 flex min-h-[56px] flex-wrap gap-2">
      <span
        v-for="tag in item.tags"
        :key="tag"
        class="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs text-cyan-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
      >
        #{{ tag }}
      </span>
    </div>

    <div class="mt-4 inline-flex items-center text-sm font-bold text-cyan-700 transition group-hover:text-cyan-900 dark:text-cyan-300 dark:group-hover:text-cyan-200">
      Read Writeup
      <span class="ml-2 transition group-hover:translate-x-1">→</span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const difficultyClass = computed(() => {
  if (props.item.difficulty === 'Easy') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-200'
  }

  if (props.item.difficulty === 'Medium') {
    return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/15 dark:text-amber-200'
  }

  return 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/40 dark:bg-rose-500/15 dark:text-rose-200'
})
</script>

<style scoped>
.summary-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
