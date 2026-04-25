<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-8">
    <div class="mx-auto w-full max-w-6xl">
      <header class="mb-8 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Porto Apps</p>
            <h1 class="text-2xl font-extrabold text-slate-800 dark:text-white">{{ title }}</h1>
          </div>
          <div class="flex flex-wrap items-center gap-2 text-sm">
            <router-link to="/" class="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Home</router-link>
            <router-link to="/apps/todo" class="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Todo</router-link>
            <router-link to="/apps/finance" class="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Finance</router-link>
            <router-link to="/apps/ecommerce" class="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">E-commerce</router-link>
            <router-link to="/apps/timer" class="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Timer</router-link>
            <router-link to="/apps/security" class="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Security</router-link>
            <router-link to="/apps/api" class="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">API</router-link>
            <router-link to="/apps/ai-projects" class="rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-3 py-2 font-semibold text-cyan-700 transition hover:bg-cyan-500/20 dark:text-cyan-300">AI Project</router-link>
          </div>
        </div>
      </header>

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
