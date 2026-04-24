<template>
  <AppShell title="Focus Timer App">
    <div class="mx-auto max-w-4xl space-y-5 timer-font">
      <section class="rounded-[32px] border border-slate-300 bg-gradient-to-r from-slate-100 via-slate-50 to-cyan-50 p-6 shadow-md">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Pomodoro Style</p>
        <h2 class="mt-2 text-3xl font-extrabold text-slate-700">Focus & Break Time</h2>
        <p class="mt-2 text-sm text-slate-600">Atur durasi, jalankan sesi fokus, lalu jeda dengan ritme yang konsisten.</p>
      </section>

      <section v-if="isLoading" class="grid gap-5 lg:grid-cols-2">
        <div class="h-64 animate-pulse rounded-[28px] bg-slate-200" />
        <div class="h-64 animate-pulse rounded-[28px] bg-cyan-100" />
      </section>

      <section v-else class="grid gap-5 lg:grid-cols-2">
        <TimerDisplay
          :formatted-time="formattedTime"
          :status-text="statusText"
          :progress="progress"
          :is-celebrating="isCelebrating"
          :mode="state.mode"
        />

        <div class="space-y-4">
          <ModeSelector
            v-model="state.mode"
            :custom-minutes="state.customMinutes"
            @update:customMinutes="updateCustomMinutes"
          />

          <section class="rounded-[28px] border border-cyan-200 bg-white/90 p-4 shadow-sm">
            <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Input Waktu (Menit)</label>
            <input
              v-model.number="state.inputMinutes"
              type="number"
              min="1"
              max="180"
              class="w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-300"
              placeholder="contoh: 25"
            />
            <p class="mt-2 text-xs text-slate-500">Mode Focus/Break otomatis atur durasi default, Custom mengikuti nilai ini.</p>
          </section>

          <TimerControls :is-running="state.isRunning" @start="startTimer" @pause="pauseTimer" @reset="resetTimer" />
        </div>
      </section>
    </div>
  </AppShell>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import AppShell from '../components/apps/AppShell.vue'
import ModeSelector from '../components/timer/ModeSelector.vue'
import TimerDisplay from '../components/timer/TimerDisplay.vue'
import TimerControls from '../components/timer/TimerControls.vue'

const STORAGE_KEY = 'cute_timer_preferences'

const isLoading = ref(true)
const isCelebrating = ref(false)

const state = reactive({
  mode: 'focus',
  customMinutes: 15,
  inputMinutes: 25,
  durationSeconds: 25 * 60,
  remainingSeconds: 25 * 60,
  isRunning: false
})

let timerHandle = null

const applyDurationFromMode = () => {
  if (state.mode === 'focus') {
    state.inputMinutes = 25
  } else if (state.mode === 'break') {
    state.inputMinutes = 5
  } else {
    state.inputMinutes = Math.max(1, Number(state.customMinutes) || 1)
  }

  state.durationSeconds = Math.max(1, Number(state.inputMinutes) || 1) * 60
  state.remainingSeconds = state.durationSeconds
}

const formatTime = (seconds) => {
  const minute = Math.floor(seconds / 60)
  const second = seconds % 60
  return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

const formattedTime = computed(() => formatTime(state.remainingSeconds))

const statusText = computed(() => {
  if (state.mode === 'break') {
    return 'Istirahat dulu~'
  }

  return 'Fokus ya!'
})

const progress = computed(() => {
  if (!state.durationSeconds) {
    return 0
  }

  const pct = (state.remainingSeconds / state.durationSeconds) * 100
  return Math.max(0, Math.min(100, pct))
})

const clearTimer = () => {
  if (timerHandle) {
    clearInterval(timerHandle)
    timerHandle = null
  }
  state.isRunning = false
}

const celebrate = () => {
  isCelebrating.value = true
  setTimeout(() => {
    isCelebrating.value = false
  }, 2000)
}

const startTimer = () => {
  if (state.isRunning) {
    return
  }

  if (state.remainingSeconds <= 0) {
    applyDurationFromMode()
  }

  state.isRunning = true

  timerHandle = setInterval(() => {
    if (state.remainingSeconds <= 1) {
      state.remainingSeconds = 0
      clearTimer()
      celebrate()
      return
    }

    state.remainingSeconds -= 1
  }, 1000)
}

const pauseTimer = () => {
  clearTimer()
}

const resetTimer = () => {
  clearTimer()
  applyDurationFromMode()
}

const updateCustomMinutes = (value) => {
  state.customMinutes = Math.max(1, Number(value) || 1)

  if (state.mode === 'custom' && !state.isRunning) {
    state.inputMinutes = state.customMinutes
    state.durationSeconds = state.customMinutes * 60
    state.remainingSeconds = state.durationSeconds
  }
}

const loadPreferences = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    applyDurationFromMode()
    return
  }

  try {
    const parsed = JSON.parse(raw)
    state.mode = ['focus', 'break', 'custom'].includes(parsed.mode) ? parsed.mode : 'focus'
    state.customMinutes = Math.max(1, Number(parsed.customMinutes) || 15)
    applyDurationFromMode()
  } catch {
    applyDurationFromMode()
  }
}

watch(() => state.mode, () => {
  clearTimer()
  applyDurationFromMode()
})

watch(() => state.inputMinutes, (value) => {
  const fixed = Math.max(1, Number(value) || 1)

  if (fixed !== value) {
    state.inputMinutes = fixed
    return
  }

  if (!state.isRunning) {
    state.durationSeconds = fixed * 60
    state.remainingSeconds = state.durationSeconds
  }

  if (state.mode === 'custom') {
    state.customMinutes = fixed
  }
})

watch(
  () => [state.mode, state.customMinutes],
  () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        mode: state.mode,
        customMinutes: state.customMinutes
      })
    )
  },
  { deep: true }
)

onMounted(() => {
  loadPreferences()

  setTimeout(() => {
    isLoading.value = false
  }, 250)
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

.timer-font {
  font-family: 'Plus Jakarta Sans', 'Source Code Pro', sans-serif;
}
</style>
