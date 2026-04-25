<template>
  <div class="group relative">
    <button
      type="button"
      class="absolute right-3 top-3 rounded-md border border-slate-600 bg-slate-800/80 px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-700"
      @click="copyCode"
    >
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
    <pre class="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm"><code class="font-mono" v-html="highlightedCode" /></pre>
  </div>
</template>

<script setup>
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism-tomorrow.css'
import { computed, ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  }
})

const copied = ref(false)

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
    }, 1500)
  } catch (error) {
    copied.value = false
  }
}
</script>
