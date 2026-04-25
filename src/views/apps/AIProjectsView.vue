<template>
  <AppShell title="AI Projects">
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Collection</p>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-white">AI Project List</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Daftar project terkait AI dalam format card panjang. Saat ini masih menggunakan data dummy.
          </p>
        </div>
        <router-link
          to="/apps"
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Back to Portfolio
        </router-link>
      </div>

      <div class="space-y-4">
        <article
          v-for="project in aiProjects"
          :key="project.title"
          class="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50"
        >
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">{{ project.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ project.description }}</p>
          <div class="mt-4">
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-500/20 dark:text-cyan-300"
            >
              View project link
            </a>
          </div>
        </article>
      </div>
    </section>
  </AppShell>
</template>

<script setup>
import AppShell from '@/components/apps/AppShell.vue'
import { aiProjects } from '@/data/aiProjects'
</script>