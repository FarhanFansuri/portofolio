<template>
  <div ref="itemRef" class="relative pl-8 sm:pl-10">
    <span class="absolute left-0 top-8 h-3 w-3 rounded-full border-2 border-white shadow"
      :class="dotClass"
    />

    <article
      class="rounded-2xl border bg-white/95 p-4 shadow-sm transition-all duration-300 dark:bg-slate-900/90"
      :class="[
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        expanded ? 'border-button-color shadow-lg' : 'border-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700'
      ]"
    >
      <button type="button" class="w-full text-left" @click="$emit('toggle', event.id)">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="inline-flex rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wide" :class="badgeClass">
                {{ event.category }}
              </span>
              <span v-if="event.important" class="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700">Important</span>
            </div>
            <h3 class="mt-2 text-lg font-bold text-slate-800 dark:text-slate-100">{{ event.title }}</h3>
          </div>
          <p class="rounded-lg bg-slate-100 px-2 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ event.date }}</p>
        </div>

        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {{ expanded ? event.description : shortDescription }}
        </p>
      </button>

      <div class="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <button
          type="button"
          class="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="$emit('edit', event.id)"
        >
          Edit
        </button>
        <button
          type="button"
          class="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/20"
          @click="$emit('delete', event.id)"
        >
          Hapus
        </button>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onIntersect } from '../../composables/onIntersect'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  expanded: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle', 'edit', 'delete'])

const itemRef = ref({})
const visible = window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  ? onIntersect(itemRef, true, { threshold: 0.2 })
  : true

const colorMap = {
  education: {
    badge: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500'
  },
  project: {
    badge: 'bg-violet-100 text-violet-700',
    dot: 'bg-violet-500'
  },
  experience: {
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500'
  },
  personal: {
    badge: 'bg-orange-100 text-orange-700',
    dot: 'bg-orange-500'
  }
}

const badgeClass = computed(() => colorMap[props.event.category]?.badge ?? 'bg-slate-100 text-slate-700')
const dotClass = computed(() => colorMap[props.event.category]?.dot ?? 'bg-slate-500')

const shortDescription = computed(() => {
  if (!props.event.description) {
    return ''
  }

  return props.event.description.length > 90
    ? `${props.event.description.slice(0, 90)}...`
    : props.event.description
})
</script>
