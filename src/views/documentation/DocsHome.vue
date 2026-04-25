<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
    <Navbar :show-transition="true" :dark-mode-active="darkModeActive" @toggle-dark="toggleDark" />

    <section class="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 md:px-8 md:pt-12">
      <div class="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">Documentation Center</p>
        <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Personal IT Documentation</h1>
        <p class="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Pusat dokumentasi pembelajaran IT dengan format seperti docs developer modern. Pilih kategori untuk masuk ke materi terstruktur dari konsep dasar sampai praktik lanjutan.
        </p>

        <div class="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            v-model.trim="query"
            type="text"
            placeholder="Search category, tag, atau topik"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-sky-900"
          >
          <router-link
            to="/apps"
            class="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Back to Apps
          </router-link>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DocsCard
          v-for="category in filteredCategories"
          :key="category.slug"
          :title="category.title"
          :description="category.description"
          :icon="category.icon"
          :to="{ name: 'documentation-detail', params: { category: category.slug } }"
        />
      </div>

      <div v-if="!filteredCategories.length" class="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
        Tidak ada kategori yang cocok dengan kata kunci tersebut.
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import DocsCard from '@/components/docs/DocsCard.vue'
import { docsCatalog } from '@/data/docs/docsContent'

const query = ref('')
const darkModeActive = ref(false)

const filteredCategories = computed(() => {
  const keyword = query.value.toLowerCase()
  if (!keyword) return docsCatalog

  return docsCatalog.filter(category => {
    const haystack = [
      category.title,
      category.description,
      ...(category.tags ?? []),
      ...category.documents.map(doc => doc.title)
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(keyword)
  })
})

onMounted(() => {
  useDark()
})

function useDark() {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.remove('bg-white')
    document.documentElement.classList.add('dark', 'bg-slate-900')
    darkModeActive.value = true
  } else {
    document.documentElement.classList.remove('dark', 'bg-slate-900')
    document.documentElement.classList.add('bg-white')
    darkModeActive.value = false
  }
}

function toggleDark() {
  localStorage.theme = darkModeActive.value ? 'light' : 'dark'
  useDark()
}
</script>
