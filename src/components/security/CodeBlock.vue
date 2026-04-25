<template>
  <div class="group relative">
    <div class="mb-2 flex items-center justify-between">
      <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-cyan-300">{{ languageLabel }}</span>
      <button
        type="button"
        class="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        @click="copyCode"
      >
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>

    <pre class="overflow-x-auto rounded-2xl border border-slate-300 bg-slate-900 p-4 text-sm text-slate-100 shadow-sm dark:border-slate-700"><code class="font-mono" v-html="highlightedCode" /></pre>
  </div>
</template>

<script setup>
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-http'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism-tomorrow.css'
import { computed, ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'javascript',
  },
})

const copied = ref(false)

const languageLabel = computed(() => props.language.toUpperCase())

const highlightedCode = computed(() => {
  const lang = props.language.toLowerCase()
  const grammar = Prism.languages[lang] ?? Prism.languages.javascript
  return Prism.highlight(props.code, grammar, lang)
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch (error) {
    copied.value = false
  }
}
</script>
