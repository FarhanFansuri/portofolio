<template>
  <div>
    <h2 class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">On this page</h2>

    <ul class="space-y-1.5">
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="block rounded px-2 py-1 text-sm transition"
          :class="[
            item.level === 'h3' ? 'ml-3' : '',
            activeId === item.id
              ? 'bg-sky-100 font-semibold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          ]"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>

    <p v-if="!items.length" class="text-sm text-slate-500 dark:text-slate-400">
      Heading belum tersedia.
    </p>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  activeId: {
    type: String,
    default: ''
  }
})
</script>
