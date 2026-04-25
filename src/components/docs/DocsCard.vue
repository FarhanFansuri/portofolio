<template>
  <router-link
    :to="to"
    class="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
  >
    <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
      <component :is="iconComponent" class="h-5 w-5" />
    </div>
    <h3 class="text-xl font-bold text-slate-800 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
      {{ title }}
    </h3>
    <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ description }}</p>
    <div class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">Open category</div>
  </router-link>
</template>

<script setup>
import {
  CircleStackIcon,
  GlobeAltIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'DocumentTextIcon'
  },
  to: {
    type: [String, Object],
    required: true
  }
})

const iconMap = {
  GlobeAltIcon,
  ServerStackIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  DocumentTextIcon
}

const iconComponent = computed(() => iconMap[props.icon] ?? DocumentTextIcon)
</script>
