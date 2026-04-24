<template>
  <div class="flex h-full flex-col">
    <!-- Empty state -->
    <div v-if="!response && !error && !loading" class="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <div class="mb-4 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p class="text-sm font-semibold text-slate-500">Send a request to see the response</p>
      <p class="mt-1 text-xs text-slate-600">Use the Quick Test presets or enter a URL manually</p>
    </div>

    <!-- Loading -->
    <div v-else-if="loading" class="flex flex-1 flex-col items-center justify-center gap-4 py-16">
      <div class="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />
      <p class="text-sm text-slate-400">Sending request…</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="space-y-3">
      <div class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="text-sm font-semibold text-red-300">Request Failed</p>
          <p class="mt-0.5 text-xs text-red-400/80">{{ error.message }}</p>
        </div>
      </div>
      <div v-if="error.isCors" class="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-400/80">
        <p class="font-semibold text-amber-300">Possible CORS issue</p>
        <p class="mt-1">The target server may not allow requests from the browser. Try a public API or an API with CORS enabled.</p>
      </div>
    </div>

    <!-- Response -->
    <div v-else-if="response" class="flex flex-col gap-4">
      <!-- Status bar -->
      <div class="flex flex-wrap items-center gap-3 rounded-xl border px-4 py-2.5" :class="statusBarClass">
        <div class="flex items-center gap-2">
          <span class="text-lg font-extrabold tabular-nums" :class="statusCodeColor">{{ response.status }}</span>
          <span class="text-sm font-medium" :class="statusCodeColor">{{ response.statusText }}</span>
        </div>
        <div class="ml-auto flex items-center gap-3 text-xs text-slate-400">
          <span>{{ response.time }}ms</span>
          <span v-if="response.size">{{ response.size }}</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 rounded-xl border border-slate-700/50 bg-slate-900/60 p-1">
        <button
          v-for="tab in responseTabs"
          :key="tab.key"
          type="button"
          class="flex-1 rounded-lg py-1.5 text-xs font-semibold transition"
          :class="activeTab === tab.key
            ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 shadow shadow-cyan-500/20'
            : 'text-slate-500 hover:text-slate-300'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Body -->
      <div v-if="activeTab === 'body'" class="relative">
        <button
          type="button"
          class="absolute right-2 top-2 z-10 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
          @click="copyBody"
        >{{ copied ? 'Copied!' : 'Copy' }}</button>
        <pre class="max-h-[500px] overflow-auto rounded-xl border border-slate-700/50 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200"><code>{{ prettyBody }}</code></pre>
      </div>

      <!-- Headers -->
      <div v-else>
        <div class="max-h-[500px] overflow-auto rounded-xl border border-slate-700/50 bg-slate-950 p-2">
          <table class="w-full text-xs">
            <thead>
              <tr class="border-b border-slate-800">
                <th class="py-2 pl-3 pr-6 text-left font-semibold uppercase tracking-widest text-slate-500">Key</th>
                <th class="py-2 pr-3 text-left font-semibold uppercase tracking-widest text-slate-500">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(value, key) in response.headers"
                :key="key"
                class="border-b border-slate-800/50 last:border-0"
              >
                <td class="py-2 pl-3 pr-6 font-mono font-semibold text-cyan-400">{{ key }}</td>
                <td class="py-2 pr-3 font-mono text-slate-300 break-all">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  response: { type: Object, default: null },
  error: { type: Object, default: null },
  loading: { type: Boolean, default: false }
})

const activeTab = ref('body')
const copied = ref(false)
const responseTabs = [
  { key: 'body', label: 'Body' },
  { key: 'headers', label: 'Response Headers' }
]

const prettyBody = computed(() => {
  if (!props.response?.body) return ''
  try {
    return JSON.stringify(JSON.parse(props.response.body), null, 2)
  } catch {
    return props.response.body
  }
})

const statusCodeColor = computed(() => {
  const s = props.response?.status
  if (!s) return 'text-slate-400'
  if (s < 300) return 'text-emerald-400'
  if (s < 400) return 'text-amber-400'
  if (s < 500) return 'text-orange-400'
  return 'text-red-400'
})

const statusBarClass = computed(() => {
  const s = props.response?.status
  if (!s) return 'border-slate-700/50 bg-slate-900/40'
  if (s < 300) return 'border-emerald-500/20 bg-emerald-500/5'
  if (s < 400) return 'border-amber-500/20 bg-amber-500/5'
  if (s < 500) return 'border-orange-500/20 bg-orange-500/5'
  return 'border-red-500/20 bg-red-500/5'
})

async function copyBody() {
  if (!prettyBody.value) return
  try {
    await navigator.clipboard.writeText(prettyBody.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // clipboard not available
  }
}
</script>
