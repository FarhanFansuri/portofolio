<template>
  <aside class="space-y-5 rounded-[28px] border border-slate-300 bg-white/95 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/90">
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-cyan-300">Security Report</p>
        <h2 class="mt-1 text-base font-bold text-slate-700 dark:text-white">Sections</h2>
      </div>
      <button
        type="button"
        class="inline-flex rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 md:hidden dark:border-slate-600 dark:text-slate-100"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>

    <nav class="space-y-1" aria-label="Writeup section navigation">
      <a
        v-for="section in sections"
        :key="section.id"
        :href="`#${section.id}`"
        class="block rounded-lg px-3 py-2 text-sm transition"
        :class="activeSection === section.id
          ? 'bg-cyan-100 font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-900/45 dark:text-cyan-200 dark:ring-cyan-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'"
        @click="$emit('navigate')"
      >
        {{ section.title }}
      </a>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
  activeSection: {
    type: String,
    default: '',
  },
})

defineEmits(['navigate', 'close'])
</script>
