<template>
  <section class="relative overflow-hidden rounded-[32px] border border-cyan-200 bg-gradient-to-br from-slate-100 via-slate-50 to-cyan-50 p-6 shadow-md">
    <div class="absolute right-4 top-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500" :class="isCelebrating ? 'animate-pulse' : ''">{{ modeLabel }}</div>

    <p class="text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Focus Timer</p>
    <h2 class="mt-2 text-center text-5xl font-extrabold text-slate-700 sm:text-6xl">{{ formattedTime }}</h2>
    <p class="mt-2 text-center text-base font-semibold text-cyan-800">{{ statusText }}</p>

    <div class="mt-6">
      <div class="h-4 overflow-hidden rounded-full bg-white/80">
        <div
          class="h-full rounded-full bg-gradient-to-r from-cyan-300 to-slate-500 transition-all duration-700 ease-linear"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <p class="mt-2 text-center text-xs font-semibold text-slate-500">Progress {{ Math.round(progress) }}%</p>
    </div>

    <div v-if="isCelebrating" class="pointer-events-none absolute inset-0">
      <span class="sparkle left-[12%] top-[18%]" />
      <span class="sparkle left-[40%] top-[10%]" />
      <span class="sparkle left-[75%] top-[20%]" />
      <span class="sparkle left-[20%] top-[72%]" />
      <span class="sparkle left-[70%] top-[75%]" />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  formattedTime: {
    type: String,
    required: true
  },
  statusText: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  isCelebrating: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    required: true
  }
})

const modeLabel = computed(() => {
  if (props.mode === 'break') {
    return 'BREAK'
  }

  if (props.mode === 'custom') {
    return 'CUSTOM'
  }

  return 'FOCUS'
})
</script>

<style scoped>
.sparkle {
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgb(34 211 238), rgb(100 116 139));
  animation: floatPop 1.4s ease-in-out infinite;
}

.sparkle:nth-child(2) {
  animation-delay: 0.2s;
}

.sparkle:nth-child(3) {
  animation-delay: 0.35s;
}

.sparkle:nth-child(4) {
  animation-delay: 0.55s;
}

.sparkle:nth-child(5) {
  animation-delay: 0.75s;
}

@keyframes floatPop {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.8);
  }
  35% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-16px) scale(1.15);
  }
}
</style>
