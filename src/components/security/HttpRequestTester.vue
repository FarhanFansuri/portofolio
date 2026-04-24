<template>
  <section class="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-6 shadow-[0_20px_60px_-25px_rgba(34,211,238,0.8)]">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h3 class="text-lg font-bold text-slate-100">HTTP Request Tester</h3>
      <span class="rounded-xl border border-cyan-300/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-2.5 py-1 text-xs font-semibold text-cyan-100">Basic</span>
    </div>

    <div class="mt-4 space-y-4">
      <div class="grid gap-3 md:grid-cols-[1fr_140px]">
        <input
          v-model.trim="state.url"
          type="url"
          class="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          placeholder="https://api.example.com/resource"
        />
        <select
          v-model="state.method"
          class="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
        >
          <option v-for="method in methods" :key="method" :value="method">{{ method }}</option>
        </select>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Headers (JSON)</label>
          <textarea
            v-model="state.headersInput"
            rows="6"
            class="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 font-mono text-xs text-slate-200 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            placeholder='{"Content-Type": "application/json"}'
          />
        </div>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Body</label>
          <textarea
            v-model="state.bodyInput"
            rows="6"
            class="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 font-mono text-xs text-slate-200 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            placeholder='{"key": "value"}'
          />
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="state.loading"
          @click="sendRequest"
        >
          {{ state.loading ? 'Sending...' : 'Send Request' }}
        </button>
        <button
          type="button"
          class="rounded-2xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-cyan-500/60 hover:bg-slate-800"
          @click="resetResponse"
        >
          Clear Response
        </button>
      </div>

      <p class="rounded-xl border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
        Catatan: Browser menerapkan CORS. Sebagian request lintas domain mungkin diblokir.
      </p>

      <p v-if="state.error" class="rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">{{ state.error }}</p>

      <div v-if="state.response" class="space-y-3">
        <div class="rounded-2xl border border-cyan-500/20 bg-slate-900/90 p-3">
          <p class="text-xs uppercase tracking-[0.12em] text-slate-400">Status</p>
          <p class="mt-1 font-mono text-sm text-cyan-200">{{ state.response.status }} {{ state.response.statusText }}</p>
        </div>

        <div class="rounded-2xl border border-cyan-500/20 bg-slate-900/90 p-3">
          <p class="text-xs uppercase tracking-[0.12em] text-slate-400">Response Headers</p>
          <pre class="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-200">{{ state.response.headers }}</pre>
        </div>

        <div class="rounded-2xl border border-cyan-500/20 bg-slate-900/90 p-3">
          <p class="text-xs uppercase tracking-[0.12em] text-slate-400">Response Body</p>
          <pre class="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-200">{{ state.response.body }}</pre>
        </div>
      </div>

      <div v-else class="rounded-2xl border border-dashed border-cyan-500/30 bg-slate-900/60 p-4 text-sm text-slate-400">
        Response akan tampil di sini setelah request dijalankan.
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const methods = ['GET', 'POST', 'PUT', 'DELETE']

const state = reactive({
  url: '',
  method: 'GET',
  headersInput: '{\n  "Content-Type": "application/json"\n}',
  bodyInput: '{\n  "sample": true\n}',
  loading: false,
  error: '',
  response: null
})

const safeJsonParse = (value, fallback = {}) => {
  if (!value?.trim()) {
    return fallback
  }

  return JSON.parse(value)
}

const normalizeBody = (rawBody, headers) => {
  if (!rawBody?.trim()) {
    return undefined
  }

  const contentType = String(headers['Content-Type'] || headers['content-type'] || '')
  if (contentType.includes('application/json')) {
    const parsed = safeJsonParse(rawBody, {})
    return JSON.stringify(parsed)
  }

  return rawBody
}

const resetResponse = () => {
  state.error = ''
  state.response = null
}

const sendRequest = async () => {
  state.error = ''
  state.response = null

  if (!state.url) {
    state.error = 'URL wajib diisi.'
    return
  }

  state.loading = true

  try {
    const headers = safeJsonParse(state.headersInput, {})
    const options = {
      method: state.method,
      headers
    }

    if (state.method !== 'GET') {
      options.body = normalizeBody(state.bodyInput, headers)
    }

    const res = await fetch(state.url, options)
    const headerMap = Object.fromEntries(res.headers.entries())
    const text = await res.text()

    let formattedBody = text
    try {
      const asJson = JSON.parse(text)
      formattedBody = JSON.stringify(asJson, null, 2)
    } catch {
      // keep text as-is when response is not JSON
    }

    state.response = {
      status: res.status,
      statusText: res.statusText,
      headers: JSON.stringify(headerMap, null, 2),
      body: formattedBody || '(empty body)'
    }
  } catch (error) {
    state.error = error instanceof Error ? error.message : 'Request gagal diproses.'
  } finally {
    state.loading = false
  }
}
</script>
