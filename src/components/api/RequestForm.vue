<template>
  <div class="flex flex-col gap-5">
    <!-- URL + Method -->
    <div class="flex flex-col gap-2 sm:flex-row">
      <select
        :value="method"
        class="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2.5 text-sm font-bold outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 sm:w-32"
        :class="methodColors[method]"
        @change="emit('update:method', $event.target.value)"
      >
        <option v-for="m in METHODS" :key="m" :value="m">{{ m }}</option>
      </select>
      <input
        :value="url"
        type="url"
        class="flex-1 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2.5 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
        placeholder="https://jsonplaceholder.typicode.com/posts/1"
        @input="emit('update:url', $event.target.value)"
      />
    </div>

    <!-- Tabs: Headers / Body -->
    <div>
      <div class="flex gap-1 rounded-xl border border-slate-700/50 bg-slate-900/60 p-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="flex-1 rounded-lg py-1.5 text-xs font-semibold transition"
          :class="activeTab === tab.key
            ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 shadow shadow-cyan-500/20'
            : 'text-slate-500 hover:text-slate-300'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <span
            v-if="tab.key === 'headers' && headers.filter(h => h.key).length > 0"
            class="ml-1 rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-[10px] text-cyan-400"
          >{{ headers.filter(h => h.key).length }}</span>
        </button>
      </div>

      <!-- Headers Panel -->
      <div v-if="activeTab === 'headers'" class="mt-3">
        <HeaderInput
          :headers="headers"
          @update:headers="emit('update:headers', $event)"
        />
      </div>

      <!-- Body Panel -->
      <div v-else class="mt-3">
        <div class="mb-1.5 flex items-center justify-between">
          <label class="text-xs font-semibold uppercase tracking-widest text-slate-500">Request Body (JSON)</label>
          <span
            v-if="!isBodyEnabled"
            class="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500"
          >Disabled for {{ method }}</span>
        </div>
        <textarea
          :value="body"
          rows="10"
          :disabled="!isBodyEnabled"
          class="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2.5 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          placeholder='{"key": "value"}'
          @input="emit('update:body', $event.target.value)"
        />
      </div>
    </div>

    <!-- Quick URL shortcuts -->
    <div>
      <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">Quick Test</p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="preset in presets"
          :key="preset.url"
          type="button"
          class="rounded-lg border border-slate-700/70 bg-slate-800/50 px-2.5 py-1 text-[11px] font-mono text-slate-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
          @click="applyPreset(preset)"
        >
          {{ preset.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeaderInput from './HeaderInput.vue'

const props = defineProps({
  url: { type: String, default: '' },
  method: { type: String, default: 'GET' },
  headers: { type: Array, default: () => [] },
  body: { type: String, default: '' }
})

const emit = defineEmits(['update:url', 'update:method', 'update:headers', 'update:body'])

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const methodColors = {
  GET: 'text-emerald-400',
  POST: 'text-blue-400',
  PUT: 'text-amber-400',
  PATCH: 'text-purple-400',
  DELETE: 'text-red-400'
}

const tabs = [
  { key: 'headers', label: 'Headers' },
  { key: 'body', label: 'Body' }
]
const activeTab = ref('headers')

const isBodyEnabled = computed(() => ['POST', 'PUT', 'PATCH'].includes(props.method))

const presets = [
  { label: 'GET /posts/1', url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET', body: '' },
  { label: 'GET /users', url: 'https://jsonplaceholder.typicode.com/users', method: 'GET', body: '' },
  { label: 'POST /posts', url: 'https://jsonplaceholder.typicode.com/posts', method: 'POST', body: '{\n  "title": "Test Post",\n  "body": "Hello World",\n  "userId": 1\n}' },
  { label: 'GET /todos', url: 'https://jsonplaceholder.typicode.com/todos?_limit=5', method: 'GET', body: '' }
]

function applyPreset(preset) {
  emit('update:url', preset.url)
  emit('update:method', preset.method)
  emit('update:body', preset.body)
  if (preset.method === 'POST') activeTab.value = 'body'
}
</script>
