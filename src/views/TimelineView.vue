<template>
  <div class="min-h-screen bg-white text-base dark:bg-slate-900 dark:text-slate-300 md:text-xl">
    <Navbar :show-transition="true" :dark-mode-active="darkModeActive" @toggle-dark="toggleDark" />

    <main class="mx-auto w-full max-w-5xl px-5 pb-16 pt-6 sm:px-8">
      <section class="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-5 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Journey</p>
        <h1 class="mt-1 text-3xl font-extrabold text-slate-800 dark:text-white">Timeline</h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Perjalanan pendidikan, project, pengalaman, dan perkembangan personal secara berurutan.
        </p>

        <form class="mt-5 grid gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/70" @submit.prevent="submitEvent">
          <p class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ state.editingId ? 'Edit Event' : 'Tambah Event Baru' }}</p>

          <input
            v-model.trim="form.title"
            type="text"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
            placeholder="Judul event"
          />

          <input
            v-model.trim="form.date"
            type="text"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
            placeholder="Tanggal (YYYY atau YYYY-MM)"
          />

          <select
            v-model="form.category"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="education">Education</option>
            <option value="project">Project</option>
            <option value="experience">Experience</option>
            <option value="personal">Personal</option>
          </select>

          <textarea
            v-model.trim="form.description"
            rows="3"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
            placeholder="Deskripsi singkat"
          />

          <label class="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <input v-model="form.important" type="checkbox" />
            Tandai sebagai event penting
          </label>

          <div class="flex flex-wrap gap-2">
            <button
              type="submit"
              class="rounded-xl bg-button-color px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {{ state.editingId ? 'Simpan Perubahan' : 'Tambah Event' }}
            </button>
            <button
              v-if="state.editingId"
              type="button"
              class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              @click="resetForm"
            >
              Batal Edit
            </button>
          </div>

          <p v-if="state.formError" class="text-sm font-medium text-rose-700">{{ state.formError }}</p>
        </form>

        <div class="mt-5">
          <TimelineFilter v-model="state.activeCategory" :options="filterOptions" />
        </div>
      </section>

      <section class="relative pl-5 sm:pl-8">
        <div class="absolute left-[10px] top-0 h-full w-[2px] bg-slate-200 dark:bg-slate-700 sm:left-[15px]" />

        <div v-if="filteredEvents.length === 0" class="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
          Tidak ada event pada kategori ini.
        </div>

        <div v-else class="space-y-4">
          <TimelineItem
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
            :expanded="state.expandedId === event.id"
            @toggle="toggleExpand"
            @edit="startEdit"
            @delete="removeEvent"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import TimelineFilter from '../components/timeline/TimelineFilter.vue'
import TimelineItem from '../components/timeline/TimelineItem.vue'
import { timelineEvents } from '../data/timelineEvents'

const STORAGE_KEY = 'portfolio_timeline_events'
const darkModeActive = ref(false)
const events = ref([])

const initialForm = () => ({
  title: '',
  date: '',
  category: 'education',
  description: '',
  important: false
})

const form = reactive(initialForm())

const state = reactive({
  activeCategory: 'all',
  expandedId: null,
  editingId: null,
  formError: ''
})

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Education', value: 'education' },
  { label: 'Project', value: 'project' },
  { label: 'Experience', value: 'experience' },
  { label: 'Personal', value: 'personal' }
]

const parseEventDate = (value) => {
  if (!value) {
    return 0
  }

  if (/^\d{4}$/.test(value)) {
    return new Date(Number(value), 0, 1).getTime()
  }

  const normalized = /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value
  const stamp = new Date(normalized).getTime()
  return Number.isNaN(stamp) ? 0 : stamp
}

const sortedEvents = computed(() =>
  [...events.value].sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date))
)

const filteredEvents = computed(() => {
  if (state.activeCategory === 'all') {
    return sortedEvents.value
  }

  return sortedEvents.value.filter((event) => event.category === state.activeCategory)
})

const toggleExpand = (eventId) => {
  state.expandedId = state.expandedId === eventId ? null : eventId
}

const isValidDate = (value) => /^\d{4}$|^\d{4}-\d{2}$/.test(value)

const resetForm = () => {
  Object.assign(form, initialForm())
  state.editingId = null
  state.formError = ''
}

const submitEvent = () => {
  state.formError = ''

  if (!form.title || !form.date || !form.description) {
    state.formError = 'Judul, tanggal, dan deskripsi wajib diisi.'
    return
  }

  if (!isValidDate(form.date)) {
    state.formError = 'Format tanggal harus YYYY atau YYYY-MM.'
    return
  }

  if (state.editingId) {
    const index = events.value.findIndex((event) => event.id === state.editingId)
    if (index === -1) {
      state.formError = 'Event tidak ditemukan.'
      return
    }

    events.value[index] = {
      ...events.value[index],
      title: form.title,
      date: form.date,
      category: form.category,
      description: form.description,
      important: form.important
    }
  } else {
    const maxId = events.value.reduce((acc, item) => Math.max(acc, Number(item.id) || 0), 0)
    events.value.push({
      id: maxId + 1,
      title: form.title,
      date: form.date,
      category: form.category,
      description: form.description,
      important: form.important
    })
  }

  resetForm()
}

const startEdit = (eventId) => {
  const item = events.value.find((event) => event.id === eventId)
  if (!item) {
    return
  }

  state.editingId = item.id
  state.expandedId = item.id
  state.formError = ''

  form.title = item.title
  form.date = item.date
  form.category = item.category
  form.description = item.description
  form.important = !!item.important
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const removeEvent = (eventId) => {
  events.value = events.value.filter((event) => event.id !== eventId)

  if (state.expandedId === eventId) {
    state.expandedId = null
  }

  if (state.editingId === eventId) {
    resetForm()
  }
}

const hydrateEvents = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    events.value = [...timelineEvents]
    return
  }

  try {
    const parsed = JSON.parse(raw)
    events.value = Array.isArray(parsed) ? parsed : [...timelineEvents]
  } catch {
    events.value = [...timelineEvents]
  }
}

watch(events, (value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}, { deep: true })

const useDark = () => {
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

const toggleDark = () => {
  if (darkModeActive.value) {
    localStorage.theme = 'light'
  } else {
    localStorage.theme = 'dark'
  }

  useDark()
}

onMounted(() => {
  useDark()
  hydrateEvents()
})
</script>
