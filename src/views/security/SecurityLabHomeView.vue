<template>
  <div class="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
    <Navbar :show-transition="true" :dark-mode-active="darkModeActive" @toggle-dark="toggleDark" />

    <section class="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 md:px-6 md:pt-12">
      <header class="rounded-[32px] border border-slate-300 bg-gradient-to-r from-slate-100 via-white to-cyan-50 p-6 shadow-md md:p-8">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Security Research Portfolio</p>
        <h1 class="mt-3 text-3xl font-extrabold leading-tight text-slate-700 md:text-4xl">Security Lab</h1>
        <p class="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 md:text-base">
          Dokumentasi pembelajaran penetration testing secara etis pada target legal seperti DVWA, OWASP Juice Shop, dan lab simulasi pribadi.
          Fokus pada analisis vulnerability, eksploitasi terkontrol, impact, dan mitigasi profesional.
        </p>

        <div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p class="font-semibold">Ethical Notice</p>
          <p class="mt-1 text-amber-700">
            Seluruh writeup hanya untuk edukasi dan security research legal. Tidak menampilkan data sensitif, kredensial asli, atau target nyata tanpa izin.
          </p>
        </div>
      </header>

      <section class="mt-8 grid gap-3 rounded-[28px] border border-slate-300 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label for="security-search" class="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Search</label>
          <input
            id="security-search"
            v-model.trim="query"
            type="text"
            placeholder="Cari title, tag, atau deskripsi"
            class="w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
        </div>

        <div>
          <label for="security-type" class="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Type</label>
          <select
            id="security-type"
            v-model="selectedType"
            class="w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">All Types</option>
            <option v-for="type in vulnerabilityTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div>
          <label for="security-difficulty" class="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Difficulty</label>
          <select
            id="security-difficulty"
            v-model="selectedDifficulty"
            class="w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">All Levels</option>
            <option v-for="level in difficultyLevels" :key="level" :value="level">{{ level }}</option>
          </select>
        </div>

        <div>
          <label for="security-tag" class="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Tag</label>
          <select
            id="security-tag"
            v-model="selectedTag"
            class="w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="all">All Tags</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </section>

      <section class="mt-8">
        <div class="mb-3 flex flex-wrap gap-2">
          <span class="rounded-full border border-cyan-200 bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-800 dark:border-cyan-400/40 dark:bg-cyan-900/40 dark:text-cyan-200">
            {{ filteredCases.length }} Writeups
          </span>
          <span
            v-if="selectedType !== 'all'"
            class="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            Type: {{ selectedType }}
          </span>
          <span
            v-if="selectedDifficulty !== 'all'"
            class="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            Level: {{ selectedDifficulty }}
          </span>
          <span
            v-if="selectedTag !== 'all'"
            class="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            Tag: {{ selectedTag }}
          </span>
        </div>

        <div v-if="filteredCases.length" class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <SecurityCard v-for="item in filteredCases" :key="item.slug" :item="item" />
        </div>

        <div v-else class="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
          Tidak ada writeup yang cocok dengan filter saat ini.
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import SecurityCard from '@/components/security/SecurityCard.vue'
import {
  allTags,
  difficultyLevels,
  vulnerabilityCases,
  vulnerabilityTypes,
} from '@/data/security/vulnerabilities'

const query = ref('')
const selectedType = ref('all')
const selectedDifficulty = ref('all')
const selectedTag = ref('all')
const darkModeActive = ref(false)

const filteredCases = computed(() => {
  const keyword = query.value.toLowerCase().trim()

  return vulnerabilityCases.filter((item) => {
    const matchType = selectedType.value === 'all' || item.type === selectedType.value
    const matchDifficulty =
      selectedDifficulty.value === 'all' || item.difficulty === selectedDifficulty.value
    const matchTag = selectedTag.value === 'all' || item.tags.includes(selectedTag.value)

    const haystack = [item.title, item.type, item.summary, ...item.tags].join(' ').toLowerCase()
    const matchKeyword = !keyword || haystack.includes(keyword)

    return matchType && matchDifficulty && matchTag && matchKeyword
  })
})

onMounted(() => {
  useDark()
})

function useDark() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
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
