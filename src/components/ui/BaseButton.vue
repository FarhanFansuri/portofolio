<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition duration-200',
      variantClass,
      disabled ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5'
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const variantClass = computed(() => {
  if (props.variant === 'ghost') {
    return 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500'
  }

  if (props.variant === 'danger') {
    return 'bg-rose-600 text-white hover:bg-rose-700'
  }

  return 'bg-button-color text-white hover:brightness-110'
})
</script>
