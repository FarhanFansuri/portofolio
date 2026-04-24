<template>
  <AppShell title="Todo App">
    <section class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Task Manager</h2>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Tambah, edit, tandai selesai, dan filter task harian.</p>

        <div class="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            v-model.trim="newTask"
            type="text"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
            placeholder="Contoh: Selesaikan desain landing page"
            @keyup.enter="addTask"
          />
          <BaseButton @click="addTask">Tambah</BaseButton>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <BaseButton
            v-for="item in filters"
            :key="item.value"
            :variant="filter === item.value ? 'primary' : 'ghost'"
            @click="filter = item.value"
          >
            {{ item.label }}
          </BaseButton>
        </div>

        <div v-if="error" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{{ error }}</div>

        <div v-if="loading" class="mt-5 space-y-3">
          <div v-for="n in 4" :key="n" class="h-14 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div v-else-if="filteredTasks.length === 0" class="mt-5 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
          Belum ada task di filter ini.
        </div>

        <TransitionGroup v-else name="todo" tag="ul" class="mt-5 space-y-3">
          <li
            v-for="task in filteredTasks"
            :key="task.id"
            class="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <div class="flex items-start justify-between gap-3">
              <label class="flex items-start gap-3">
                <input type="checkbox" :checked="task.completed" @change="toggleTask(task.id)" class="mt-1 h-4 w-4" />
                <span :class="task.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'">{{ task.title }}</span>
              </label>
              <div class="flex gap-2">
                <BaseButton variant="ghost" @click="startEdit(task)">Edit</BaseButton>
                <BaseButton variant="danger" @click="removeTask(task.id)">Hapus</BaseButton>
              </div>
            </div>

            <div v-if="editingId === task.id" class="flex flex-col gap-2 sm:flex-row">
              <input
                v-model.trim="editingTitle"
                type="text"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
                @keyup.enter="saveEdit"
              />
              <BaseButton @click="saveEdit">Simpan</BaseButton>
              <BaseButton variant="ghost" @click="cancelEdit">Batal</BaseButton>
            </div>
          </li>
        </TransitionGroup>
      </article>

      <aside class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 class="text-lg font-bold text-slate-800 dark:text-white">Ringkasan</h3>
        <ul class="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <li class="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">Total Task: {{ tasks.length }}</li>
          <li class="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">Aktif: {{ activeCount }}</li>
          <li class="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">Selesai: {{ doneCount }}</li>
        </ul>
      </aside>
    </section>
  </AppShell>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import AppShell from '../../components/apps/AppShell.vue'
import BaseButton from '../../components/ui/BaseButton.vue'

const STORAGE_KEY = 'porto_apps_todos'

const loading = ref(true)
const error = ref('')
const newTask = ref('')
const tasks = ref([])
const filter = ref('all')
const editingId = ref(null)
const editingTitle = ref('')

const filters = [
  { label: 'Semua', value: 'all' },
  { label: 'Aktif', value: 'active' },
  { label: 'Selesai', value: 'done' }
]

const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return tasks.value.filter((task) => !task.completed)
  }

  if (filter.value === 'done') {
    return tasks.value.filter((task) => task.completed)
  }

  return tasks.value
})

const activeCount = computed(() => tasks.value.filter((task) => !task.completed).length)
const doneCount = computed(() => tasks.value.filter((task) => task.completed).length)

const hydrate = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    tasks.value = []
    return
  }

  try {
    const parsed = JSON.parse(raw)
    tasks.value = Array.isArray(parsed) ? parsed : []
  } catch {
    error.value = 'Data todo tidak valid. Penyimpanan direset.'
    tasks.value = []
  }
}

const persist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
}

const addTask = () => {
  error.value = ''
  if (!newTask.value) {
    error.value = 'Judul task tidak boleh kosong.'
    return
  }

  tasks.value.unshift({
    id: Date.now(),
    title: newTask.value,
    completed: false
  })
  newTask.value = ''
}

const toggleTask = (taskId) => {
  const current = tasks.value.find((task) => task.id === taskId)
  if (!current) {
    return
  }

  current.completed = !current.completed
}

const removeTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)

  if (editingId.value === taskId) {
    cancelEdit()
  }
}

const startEdit = (task) => {
  editingId.value = task.id
  editingTitle.value = task.title
}

const saveEdit = () => {
  error.value = ''
  if (!editingTitle.value) {
    error.value = 'Judul task saat edit tidak boleh kosong.'
    return
  }

  const current = tasks.value.find((task) => task.id === editingId.value)
  if (!current) {
    cancelEdit()
    return
  }

  current.title = editingTitle.value
  cancelEdit()
}

const cancelEdit = () => {
  editingId.value = null
  editingTitle.value = ''
}

watch(tasks, persist, { deep: true })

onMounted(() => {
  setTimeout(() => {
    hydrate()
    loading.value = false
  }, 300)
})
</script>

<style scoped>
.todo-enter-active,
.todo-leave-active {
  transition: all 0.25s ease;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
