<template>
  <section class="rounded-[28px] border border-slate-300 bg-white/90 p-4 shadow-sm">
    <p class="text-sm font-bold text-slate-700">Mode</p>

    <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
      <button
        v-for="mode in modeOptions"
        :key="mode.value"
        type="button"
        class="rounded-2xl px-4 py-2 text-sm font-bold transition duration-200"
        :class="modelValue === mode.value
          ? 'bg-cyan-200 text-cyan-900 shadow'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
        @click="$emit('update:modelValue', mode.value)"
      >
        {{ mode.label }}
      </button>
    </div>

    <div class="mt-3">
      <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Custom Minutes</label>
      <input
        type="number"
        min="1"
        max="180"
        :value="customMinutes"
        class="w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-300"
        placeholder="Masukkan menit"
        @input="$emit('update:customMinutes', Number($event.target.value))"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  customMinutes: {
    type: Number,
    required: true
  }
})

defineEmits(['update:modelValue', 'update:customMinutes'])

const modeOptions = [
  { label: 'Focus 25', value: 'focus' },
  { label: 'Break 5', value: 'break' },
  { label: 'Custom', value: 'custom' }
]
</script>
