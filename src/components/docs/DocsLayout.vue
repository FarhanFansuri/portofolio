<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div class="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div class="min-w-0">
          <nav class="flex items-center gap-2 overflow-x-auto text-xs text-slate-500 dark:text-slate-400">
            <slot name="breadcrumbs" />
          </nav>
          <h1 class="truncate text-lg font-bold text-slate-900 dark:text-white">{{ title }}</h1>
        </div>

        <div class="flex items-center gap-2">
          <slot name="header-actions" />
          <button
            type="button"
            class="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            @click="$emit('toggle-sidebar')"
          >
            Navigation
          </button>
        </div>
      </div>
    </header>

    <div class="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-0 md:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_260px]">
      <aside
        class="fixed inset-y-0 left-0 z-40 w-[86%] max-w-[320px] border-r border-slate-200 bg-white/95 px-4 py-6 backdrop-blur transition-transform md:static md:w-auto md:max-w-none md:border-r md:bg-white/85 md:translate-x-0 md:overflow-y-auto xl:sticky xl:top-[68px] xl:h-[calc(100vh-68px)] dark:border-slate-800 dark:bg-slate-900/95 md:dark:bg-slate-900/70"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      >
        <slot name="sidebar" />
      </aside>

      <main class="min-h-[calc(100vh-68px)] px-4 py-8 md:px-8">
        <slot name="main" />
      </main>

      <aside class="hidden border-l border-slate-200 px-4 py-8 xl:sticky xl:top-[68px] xl:block xl:h-[calc(100vh-68px)] xl:overflow-y-auto dark:border-slate-800">
        <slot name="toc" />
      </aside>
    </div>

    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-20 bg-slate-900/30 backdrop-blur-[1px] md:hidden"
      @click="$emit('close-sidebar')"
    />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Documentation'
  },
  sidebarOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-sidebar', 'close-sidebar'])
</script>
