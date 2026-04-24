<template>
  <AppShell title="API Playground">
    <div class="space-y-6">
      <!-- Hero -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-900 via-slate-900 to-indigo-900 px-6 py-8 shadow-[0_20px_50px_-20px_rgba(6,182,212,0.5)]">
        <div class="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">Porto Apps</p>
            <h2 class="text-2xl font-extrabold text-white">API Playground</h2>
            <p class="mt-1 max-w-md text-sm text-slate-400">Test HTTP requests interaktif langsung dari browser — layaknya Postman ringan.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <a
              href="https://jsonplaceholder.typicode.com"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
            >JSONPlaceholder ↗</a>
          </div>
        </div>
        <!-- bg deco -->
        <div class="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />
        <div class="pointer-events-none absolute -bottom-8 right-24 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl" />
      </div>

      <!-- History bar -->
      <div v-if="history.length" class="flex flex-wrap items-center gap-2">
        <span class="text-xs font-semibold uppercase tracking-widest text-slate-500">Recent:</span>
        <button
          v-for="(entry, i) in history.slice(0, 6)"
          :key="i"
          type="button"
          class="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 text-[11px] font-mono text-slate-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
          @click="loadHistory(entry)"
        >
          <span :class="methodColorClass(entry.method)" class="font-bold">{{ entry.method }}</span>
          <span class="max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">{{ entry.url }}</span>
        </button>
        <button
          type="button"
          class="ml-auto text-xs text-slate-600 transition hover:text-red-400"
          @click="clearHistory"
        >Clear</button>
      </div>

      <!-- Main 2-column layout -->
      <div class="grid gap-4 lg:grid-cols-2">
        <!-- Left: Request Builder -->
        <div class="flex flex-col gap-4 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-100">Request Builder</h3>
            <button
              type="button"
              class="rounded-lg border border-slate-700 px-2.5 py-1 text-xs text-slate-500 transition hover:border-slate-600 hover:text-slate-300"
              @click="resetForm"
            >Reset</button>
          </div>

          <RequestForm
            v-model:url="form.url"
            v-model:method="form.method"
            v-model:headers="form.headers"
            v-model:body="form.body"
          />

          <button
            type="button"
            class="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="loading || !form.url.trim()"
            @click="sendRequest"
          >
            <svg v-if="loading" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            {{ loading ? 'Sending…' : 'Send Request' }}
          </button>
        </div>

        <!-- Right: Response Viewer -->
        <div class="flex flex-col rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-5 shadow-lg">
          <h3 class="mb-4 text-sm font-bold text-slate-100">Response</h3>
          <ResponseViewer :response="response" :error="requestError" :loading="loading" />
        </div>
      </div>
    </div>
  </AppShell>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AppShell from '@/components/apps/AppShell.vue'
import RequestForm from '@/components/api/RequestForm.vue'
import ResponseViewer from '@/components/api/ResponseViewer.vue'

// ---------- form state ----------
const form = reactive({
  url: '',
  method: 'GET',
  headers: [],
  body: ''
})

const loading = ref(false)
const response = ref(null)
const requestError = ref(null)

// ---------- history ----------
const HISTORY_KEY = 'api_playground_history'
const history = ref(loadHistoryFromStorage())

function loadHistoryFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveHistory(entry) {
  const existing = history.value.filter(h => !(h.url === entry.url && h.method === entry.method))
  history.value = [entry, ...existing].slice(0, 20)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
}

function loadHistory(entry) {
  form.url = entry.url
  form.method = entry.method
  form.body = entry.body ?? ''
  form.headers = entry.headers ? [...entry.headers] : []
}

function clearHistory() {
  history.value = []
  localStorage.removeItem(HISTORY_KEY)
}

// ---------- reset ----------
function resetForm() {
  form.url = ''
  form.method = 'GET'
  form.headers = []
  form.body = ''
  response.value = null
  requestError.value = null
}

// ---------- send ----------
async function sendRequest() {
  const url = form.url.trim()
  if (!url) return

  loading.value = true
  response.value = null
  requestError.value = null

  const startTime = performance.now()

  try {
    // Build headers object from array
    const headersObj = {}
    for (const { key, value } of form.headers) {
      if (key.trim()) headersObj[key.trim()] = value
    }

    // Parse body
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(form.method) && form.body.trim()
    if (hasBody && !headersObj['Content-Type']) {
      headersObj['Content-Type'] = 'application/json'
    }

    const fetchOptions = {
      method: form.method,
      headers: headersObj
    }

    if (hasBody) {
      // Validate JSON body before sending
      try {
        JSON.parse(form.body)
      } catch {
        throw new Error('Request body is not valid JSON.')
      }
      fetchOptions.body = form.body
    }

    const res = await fetch(url, fetchOptions)
    const elapsed = Math.round(performance.now() - startTime)
    const bodyText = await res.text()

    // Collect response headers
    const responseHeaders = {}
    res.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    // Estimate size
    const bytes = new TextEncoder().encode(bodyText).length
    const size = bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`

    response.value = {
      status: res.status,
      statusText: res.statusText || httpStatusText(res.status),
      headers: responseHeaders,
      body: bodyText,
      time: elapsed,
      size
    }

    saveHistory({ url, method: form.method, body: form.body, headers: [...form.headers] })
  } catch (err) {
    const isCors = err instanceof TypeError && err.message.toLowerCase().includes('fetch')
    requestError.value = {
      message: err.message || 'Unknown error occurred.',
      isCors
    }
  } finally {
    loading.value = false
  }
}

function httpStatusText(code) {
  const map = {
    200: 'OK', 201: 'Created', 204: 'No Content',
    301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified',
    400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
    404: 'Not Found', 405: 'Method Not Allowed', 422: 'Unprocessable Entity',
    429: 'Too Many Requests', 500: 'Internal Server Error', 502: 'Bad Gateway',
    503: 'Service Unavailable'
  }
  return map[code] ?? ''
}

function methodColorClass(method) {
  const colors = {
    GET: 'text-emerald-400',
    POST: 'text-blue-400',
    PUT: 'text-amber-400',
    PATCH: 'text-purple-400',
    DELETE: 'text-red-400'
  }
  return colors[method] ?? 'text-slate-400'
}
</script>
