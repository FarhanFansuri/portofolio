<template>
  <AppShell title="Project Portfolio Apps">
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Collection</p>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Mini Apps Playground</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Pilih aplikasi untuk melihat implementasi fitur secara langsung.</p>
        </div>
      </div>

      <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in skeletonCount" :key="n" class="h-36 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div v-else-if="error" class="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
        <p class="font-semibold">Terjadi kendala saat memuat daftar apps.</p>
        <p class="text-sm">{{ error }}</p>
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AppCard
          v-for="app in catalog"
          :key="app.route"
          :title="app.title"
          :description="app.description"
          :icon="app.icon"
          :to="app.route"
        />
      </div>
    </section>
  </AppShell>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppShell from '../components/apps/AppShell.vue'
import AppCard from '../components/ui/AppCard.vue'
import { appsCatalog } from '../data/appsCatalog'

const loading = ref(true)
const error = ref('')
const catalog = ref([])
const skeletonCount = ref(appsCatalog.length)

onMounted(() => {
  try {
    setTimeout(() => {
      catalog.value = appsCatalog
      loading.value = false
    }, 450)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    loading.value = false
  }
})
</script>
