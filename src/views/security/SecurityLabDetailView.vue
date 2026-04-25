<template>
  <div v-if="!entry" class="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-4 py-12 text-slate-700 md:px-6">
    <div class="mx-auto max-w-2xl rounded-2xl border border-rose-200 bg-rose-50 p-6">
      <h1 class="text-2xl font-bold text-rose-700">Writeup Not Found</h1>
      <p class="mt-2 text-sm text-rose-600">Slug vulnerability tidak ditemukan.</p>
      <router-link
        :to="{ name: 'security-lab-home' }"
        class="mt-4 inline-flex rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
      >
        Back to Security Lab
      </router-link>
    </div>
  </div>

  <div
    v-else
    class="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100"
  >
    <Navbar :show-transition="true" :dark-mode-active="darkModeActive" @toggle-dark="toggleDark" />

    <div class="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 px-4 pb-12 pt-8 md:px-6 lg:grid-cols-[220px_minmax(0,1fr)_190px]">
      <aside
        class="fixed inset-y-0 left-0 z-40 w-[86%] max-w-[320px] border-r border-slate-300 bg-white/95 p-4 backdrop-blur transition-transform md:static md:translate-x-0 md:rounded-[28px] md:border md:bg-white/95 md:shadow-sm lg:sticky lg:top-[92px] lg:h-[calc(100vh-120px)] lg:self-start lg:overflow-y-auto dark:border-slate-700 dark:bg-slate-900/95"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      >
        <SecuritySidebar
          :sections="entry.sections"
          :active-section="activeSection"
          @navigate="sidebarOpen = false"
          @close="sidebarOpen = false"
        />
      </aside>

      <main class="min-w-0 space-y-7">
        <header class="rounded-[32px] border border-slate-300 bg-gradient-to-r from-slate-100 via-white to-cyan-50 p-5 shadow-md md:p-7 dark:border-slate-700 dark:bg-slate-900/90">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-cyan-300">Security Lab Writeup</p>
              <h1 class="mt-2 text-2xl font-extrabold leading-snug text-slate-700 md:text-3xl dark:text-white">{{ entry.title }}</h1>
            </div>

            <button
              type="button"
              class="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 md:hidden dark:border-slate-600 dark:text-slate-200"
              @click="sidebarOpen = !sidebarOpen"
            >
              {{ sidebarOpen ? 'Close Navigation' : 'Open Navigation' }}
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="rounded-full border border-cyan-200 bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-800 dark:border-cyan-500/40 dark:bg-cyan-900/45 dark:text-cyan-200">
              {{ entry.type }}
            </span>
            <span class="rounded-full border px-2.5 py-1 text-xs font-semibold" :class="difficultyClass">
              {{ entry.difficulty }}
            </span>
            <span
              v-for="tag in entry.tags"
              :key="tag"
              class="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs text-cyan-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              #{{ tag }}
            </span>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ entry.summary }}</p>

          <div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
            Dokumentasi ini hanya mencakup target legal (lab/simulasi) untuk tujuan edukasi dan defensive security.
          </div>
        </header>

        <article class="space-y-5">
          <section
            v-for="section in entry.sections"
            :id="section.id"
            :key="section.id"
            data-security-section
            class="scroll-mt-24 rounded-[28px] border border-slate-300 bg-white/95 p-5 shadow-sm md:p-6 dark:border-slate-700 dark:bg-slate-900/85"
          >
            <h2 class="text-xl font-bold text-slate-700 dark:text-white">{{ section.title }}</h2>

            <div class="mt-4 space-y-4">
              <template v-for="(block, index) in section.blocks" :key="`${section.id}-${index}`">
                <p v-if="block.kind === 'paragraph'" class="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {{ block.text }}
                </p>

                <ul
                  v-else-if="block.kind === 'list' && !block.ordered"
                  class="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600 dark:text-slate-300"
                >
                  <li v-for="item in block.items" :key="item">{{ item }}</li>
                </ul>

                <ol
                  v-else-if="block.kind === 'list' && block.ordered"
                  class="list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600 dark:text-slate-300"
                >
                  <li v-for="item in block.items" :key="item">{{ item }}</li>
                </ol>

                <CodeBlock
                  v-else-if="block.kind === 'code'"
                  :code="block.code"
                  :language="block.language"
                />

                <div
                  v-else-if="block.kind === 'alert'"
                  class="rounded-xl border px-4 py-3 text-sm"
                  :class="block.level === 'warning'
                    ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
                    : 'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200'"
                >
                  {{ block.text }}
                </div>

                <ul
                  v-else-if="block.kind === 'references'"
                  class="space-y-2 text-sm"
                >
                  <li v-for="refItem in block.items" :key="refItem.href">
                    <a
                      :href="refItem.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-cyan-700 underline decoration-cyan-300 underline-offset-2 hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-200"
                    >
                      {{ refItem.label }}
                    </a>
                  </li>
                </ul>
              </template>
            </div>
          </section>
        </article>
      </main>

      <aside class="hidden lg:block lg:self-start">
        <div class="sticky top-[92px] max-h-[calc(100vh-120px)] overflow-y-auto rounded-[28px] border border-slate-300 bg-white/95 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/85">
          <p class="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-cyan-300">On this page</p>
          <nav class="mt-3 space-y-1" aria-label="Table of contents">
            <a
              v-for="section in entry.sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="block rounded-lg px-2.5 py-2 text-sm transition"
              :class="activeSection === section.id
                ? 'bg-cyan-100 font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-900/45 dark:text-cyan-200 dark:ring-cyan-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'"
            >
              {{ section.title }}
            </a>
          </nav>
        </div>
      </aside>
    </div>

    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-[1px] md:hidden"
      @click="sidebarOpen = false"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import CodeBlock from '@/components/security/CodeBlock.vue'
import SecuritySidebar from '@/components/security/SecuritySidebar.vue'
import { findVulnerabilityBySlug } from '@/data/security/vulnerabilities'

const route = useRoute()

const darkModeActive = ref(false)
const sidebarOpen = ref(false)
const activeSection = ref('overview')

const entry = computed(() => findVulnerabilityBySlug(route.params.slug))

const difficultyClass = computed(() => {
  if (!entry.value) return ''
  if (entry.value.difficulty === 'Easy') {
    return 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200'
  }

  if (entry.value.difficulty === 'Medium') {
    return 'border-amber-400/40 bg-amber-500/15 text-amber-200'
  }

  return 'border-rose-400/40 bg-rose-500/15 text-rose-200'
})

let observer = null

watch(
  () => route.params.slug,
  async () => {
    sidebarOpen.value = false
    await nextTick()
    setupScrollSpy()
  },
  { immediate: true }
)

onMounted(() => {
  useDark()
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

function setupScrollSpy() {
  if (observer) observer.disconnect()

  const sections = document.querySelectorAll('[data-security-section]')
  if (!sections.length) return

  activeSection.value = sections[0].id

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entryData) => entryData.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible.length) {
        activeSection.value = visible[0].target.id
      }
    },
    {
      rootMargin: '-22% 0px -65% 0px',
      threshold: [0.2, 0.5, 1],
    }
  )

  sections.forEach((sectionEl) => observer.observe(sectionEl))
}

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
