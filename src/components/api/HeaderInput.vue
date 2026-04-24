<template>
  <div class="space-y-2">
    <div
      v-for="(header, index) in headers"
      :key="index"
      class="flex items-center gap-2"
    >
      <input
        v-model="header.key"
        type="text"
        class="flex-1 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
        placeholder="Header Key"
        @input="emit('update:headers', headers)"
      />
      <span class="text-slate-600">:</span>
      <input
        v-model="header.value"
        type="text"
        class="flex-1 rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
        placeholder="Header Value"
        @input="emit('update:headers', headers)"
      />
      <button
        type="button"
        class="flex-shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
        @click="removeHeader(index)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <button
      type="button"
      class="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
      @click="addHeader"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      Add Header
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:headers'])

function addHeader() {
  const updated = [...props.headers, { key: '', value: '' }]
  emit('update:headers', updated)
}

function removeHeader(index) {
  const updated = props.headers.filter((_, i) => i !== index)
  emit('update:headers', updated)
}
</script>
