<template>
  <div v-if="!category" class="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 md:px-8">
    <div class="mx-auto max-w-2xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900 dark:bg-rose-900/20 dark:text-rose-300">
      <h1 class="text-2xl font-bold">Category not found</h1>
      <p class="mt-2 text-sm">Kategori dokumentasi tidak ditemukan.</p>
      <router-link to="/documentation" class="mt-4 inline-flex rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white">Back to docs home</router-link>
    </div>
  </div>

  <DocsLayout
    v-else
    :title="currentDoc?.title ?? category.title"
    :sidebar-open="sidebarOpen"
    @toggle-sidebar="sidebarOpen = !sidebarOpen"
    @close-sidebar="sidebarOpen = false"
  >
    <template #breadcrumbs>
      <router-link to="/" class="hover:text-sky-600 dark:hover:text-sky-400">Home</router-link>
      <span>/</span>
      <router-link to="/documentation" class="hover:text-sky-600 dark:hover:text-sky-400">Documentation</router-link>
      <span>/</span>
      <span class="truncate text-slate-700 dark:text-slate-200">{{ category.title }}</span>
    </template>

    <template #header-actions>
      <router-link
        to="/documentation"
        class="hidden rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 md:inline-flex dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        All categories
      </router-link>

      <button
        type="button"
        class="inline-flex rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        @click="toggleDark"
      >
        <SunIcon v-if="!darkModeActive" class="h-5 w-5" />
        <MoonIcon v-else class="h-5 w-5" />
      </button>
    </template>

    <template #sidebar>
      <Sidebar
        :category-slug="category.slug"
        :groups="filteredGroups"
        :active-doc="currentDoc?.slug ?? ''"
        :search-query="searchQuery"
        @update:search-query="searchQuery = $event"
        @navigate="sidebarOpen = false"
      />
    </template>

    <template #main>
      <article v-if="currentDoc" class="mx-auto max-w-3xl space-y-8 pb-12">
        <header class="space-y-3 border-b border-slate-200 pb-6 dark:border-slate-800">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">{{ category.title }}</p>
          <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{{ currentDoc.title }}</h1>
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ currentDoc.description }}</p>
        </header>

        <section class="space-y-6">
          <template v-for="(block, index) in renderedBlocks" :key="`${block.type}-${index}`">
            <h2
              v-if="block.type === 'h2'"
              :id="block.id"
              data-doc-heading
              class="scroll-mt-24 text-2xl font-bold text-slate-900 dark:text-white"
            >
              {{ block.text }}
            </h2>

            <h3
              v-else-if="block.type === 'h3'"
              :id="block.id"
              data-doc-heading
              class="scroll-mt-24 text-xl font-semibold text-slate-800 dark:text-slate-100"
            >
              {{ block.text }}
            </h3>

            <p v-else-if="block.type === 'paragraph'" class="text-base leading-8 text-slate-700 dark:text-slate-300">
              {{ block.text }}
            </p>

            <ul v-else-if="block.type === 'list' && !block.ordered" class="list-disc space-y-2 pl-6 text-base leading-7 text-slate-700 dark:text-slate-300">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>

            <ol v-else-if="block.type === 'list' && block.ordered" class="list-decimal space-y-2 pl-6 text-base leading-7 text-slate-700 dark:text-slate-300">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ol>

            <CodeSnippet v-else-if="block.type === 'code'" :language="block.language" :code="block.code" />

            <blockquote
              v-else-if="block.type === 'blockquote'"
              class="rounded-r-xl border-l-4 border-sky-500 bg-sky-50 px-4 py-3 text-sm leading-7 text-sky-900 dark:border-sky-400 dark:bg-sky-900/20 dark:text-sky-100"
            >
              {{ block.text }}
            </blockquote>
          </template>
        </section>
      </article>
    </template>

    <template #toc>
      <TableOfContents :items="tocItems" :active-id="activeHeading" />
    </template>
  </DocsLayout>
</template>

<script setup>
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CodeSnippet from '@/components/docs/CodeSnippet.vue'
import DocsLayout from '@/components/docs/DocsLayout.vue'
import Sidebar from '@/components/docs/Sidebar.vue'
import TableOfContents from '@/components/docs/TableOfContents.vue'
import { docsBySlug, findDoc } from '@/data/docs/docsContent'

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(false)
const searchQuery = ref('')
const activeHeading = ref('')
const darkModeActive = ref(false)

const category = computed(() => docsBySlug[route.params.category])
const currentDoc = computed(() => findDoc(route.params.category, route.params.doc))

const filteredGroups = computed(() => {
  if (!category.value) return []

  const keyword = searchQuery.value.toLowerCase().trim()
  const docs = !keyword
    ? category.value.documents
    : category.value.documents.filter(doc => {
      const haystack = [doc.title, doc.description].join(' ').toLowerCase()
      return haystack.includes(keyword)
    })

  const grouped = docs.reduce((acc, doc) => {
    if (!acc[doc.group]) {
      acc[doc.group] = []
    }

    acc[doc.group].push(doc)
    return acc
  }, {})

  return Object.entries(grouped).map(([title, items]) => ({ title, items }))
})

const renderedBlocks = computed(() => {
  if (!currentDoc.value) return []

  const headingCount = {}

  return currentDoc.value.content.map(block => {
    if (block.type !== 'h2' && block.type !== 'h3') {
      return block
    }

    const base = slugify(block.text)
    headingCount[base] = (headingCount[base] ?? 0) + 1
    const count = headingCount[base]

    return {
      ...block,
      id: count === 1 ? base : `${base}-${count}`
    }
  })
})

const tocItems = computed(() => {
  return renderedBlocks.value
    .filter(block => block.type === 'h2' || block.type === 'h3')
    .map(block => ({
      id: block.id,
      text: block.text,
      level: block.type
    }))
})

let observer = null

watch(
  () => [route.params.category, route.params.doc],
  async () => {
    searchQuery.value = ''

    if (category.value && !route.params.doc) {
      router.replace({
        name: 'documentation-detail',
        params: {
          category: category.value.slug,
          doc: category.value.documents[0]?.slug
        }
      })
      return
    }

    if (category.value && !currentDoc.value) {
      router.replace({
        name: 'documentation-detail',
        params: {
          category: category.value.slug,
          doc: category.value.documents[0]?.slug
        }
      })
      return
    }

    await nextTick()
    setupScrollSpy()
  },
  { immediate: true }
)

watch(renderedBlocks, async () => {
  await nextTick()
  setupScrollSpy()
})

onMounted(() => {
  useDark()
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function setupScrollSpy() {
  if (observer) observer.disconnect()

  const headingElements = document.querySelectorAll('[data-doc-heading]')
  if (!headingElements.length) return

  activeHeading.value = headingElements[0].id

  observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible.length) {
        activeHeading.value = visible[0].target.id
      }
    },
    {
      rootMargin: '-25% 0px -65% 0px',
      threshold: [0.1, 0.4, 1]
    }
  )

  headingElements.forEach(element => observer.observe(element))
}

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
