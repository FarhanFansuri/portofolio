<template>
  <section class="rounded-[28px] border border-slate-300 bg-white/90 p-4 shadow-sm">
    <p class="text-sm font-bold text-slate-700">Controls</p>

    <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
      <button
        type="button"
        class="rounded-2xl bg-cyan-200 px-4 py-3 text-base font-bold text-cyan-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isRunning"
        @click="$emit('start')"
      >
        Start
      </button>
      <button
        type="button"
        class="rounded-2xl bg-slate-300 px-4 py-3 text-base font-bold text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="!isRunning"
        @click="$emit('pause')"
      >
        Pause
      </button>
      <button
        type="button"
        class="rounded-2xl bg-amber-200 px-4 py-3 text-base font-bold text-amber-900 transition hover:brightness-105"
        @click="$emit('reset')"
      >
        Reset
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  isRunning: {
    type: Boolean,
    default: false
  }
})

defineEmits(['start', 'pause', 'reset'])
</script>
