<template>
  <AppShell title="Security Toolkit">
    <div class="space-y-5">
      <section class="rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-900 via-slate-900 to-indigo-900 p-6 shadow-[0_20px_50px_-20px_rgba(6,182,212,0.55)]">
        <p class="text-xs uppercase tracking-[0.2em] text-cyan-200">Developer Security Tools</p>
        <h2 class="mt-2 text-3xl font-extrabold text-white">Security Toolkit</h2>
        <p class="mt-2 text-sm text-slate-300">
          Toolkit untuk pengujian web dasar secara aman dan edukatif. Gunakan hanya pada target yang kamu miliki izin aksesnya.
        </p>
      </section>

      <section class="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="rounded-2xl border px-3 py-2.5 text-sm font-semibold transition duration-200"
          :class="activeTab === tab.value
            ? 'border-cyan-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 shadow-[0_8px_30px_-15px_rgba(34,211,238,0.8)]'
            : 'border-slate-700 bg-slate-900/90 text-slate-300 hover:border-cyan-500/60 hover:text-cyan-100'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </section>

      <HttpRequestTester v-if="activeTab === 'http'" />

      <section v-else class="rounded-2xl border border-dashed border-cyan-500/40 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-slate-300">
        <h3 class="text-lg font-bold">{{ activeTabLabel }}</h3>
        <p class="mt-2 text-sm text-slate-400">Section ini disiapkan pada tahap berikutnya. Fokus saat ini: layout utama + HTTP Request Tester basic.</p>
      </section>
    </div>
  </AppShell>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppShell from '../components/apps/AppShell.vue'
import HttpRequestTester from '../components/security/HttpRequestTester.vue'

const activeTab = ref('http')

const tabs = [
  { label: 'HTTP Tester', value: 'http' },
  { label: 'Sanitization', value: 'sanitize' },
  { label: 'Password Strength', value: 'password' },
  { label: 'JWT Decoder', value: 'jwt' },
  { label: 'Checklist', value: 'checklist' }
]

const activeTabLabel = computed(() => tabs.find((tab) => tab.value === activeTab.value)?.label || '')
</script>
