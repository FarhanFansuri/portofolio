<template>
  <div class="space-y-4">
    <div>
      <label for="docs-search" class="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Search docs</label>
      <input
        id="docs-search"
        :value="searchQuery"
        type="text"
        placeholder="Cari topik atau materi"
        class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-sky-900"
        @input="$emit('update:searchQuery', $event.target.value)"
      >
    </div>

    <nav class="space-y-4" aria-label="Documentation navigation">
      <section v-for="group in groups" :key="group.title" class="space-y-2">
        <h2 class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{{ group.title }}</h2>
        <ul class="space-y-1">
          <li v-for="item in group.items" :key="item.slug">
            <router-link
              :to="{ name: 'documentation-detail', params: { category: categorySlug, doc: item.slug } }"
              class="block rounded-lg px-2 py-1.5 text-sm transition"
              :class="item.slug === activeDoc
                ? 'bg-sky-100 font-semibold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'"
              @click="$emit('navigate')"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </section>
    </nav>

    <p v-if="!groups.length" class="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
      Tidak ada materi yang cocok dengan pencarian.
    </p>
  </div>
</template>

<script setup>
defineProps({
  categorySlug: {
    type: String,
    required: true
  },
  groups: {
    type: Array,
    default: () => []
  },
  activeDoc: {
    type: String,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

defineEmits(['update:searchQuery', 'navigate'])
</script>
