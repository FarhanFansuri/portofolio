<template>
    <div class="relative pl-8 sm:pl-10">
        <span class="absolute left-0 top-8 h-3 w-3 rounded-full border-2 border-white shadow dark:border-slate-900" :class="isCurrent ? 'bg-amber-500 ring-4 ring-amber-100 dark:ring-amber-500/20 live-dot' : 'bg-emerald-500'"></span>

        <article class="flex flex-col rounded-2xl border bg-white/95 p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800/95" :class="isCurrent ? 'border-amber-300 shadow-amber-100/80 dark:border-amber-500/40 dark:shadow-amber-500/10 live-card' : 'border-slate-200 dark:border-slate-700'">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <div class="flex flex-wrap items-center gap-2">
                        <p class="text-xs font-semibold uppercase tracking-[0.2em]" :class="isCurrent ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'">Career Step</p>
                        <span v-if="isCurrent" class="live-badge inline-flex items-center gap-2 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                            <span class="live-badge__pulse h-2 w-2 rounded-full bg-rose-500"></span>
                            Active Job
                        </span>
                    </div>
                    <h3 class="mt-2 text-xl font-extrabold text-slate-800 dark:text-slate-100">
                        {{ experience.position }}
                        <a :href="experience.company.link" class="hover:text-link-color">@{{ experience.company.name }}</a>
                    </h3>
                </div>

                <p class="rounded-lg px-3 py-1 text-sm font-semibold" :class="isCurrent ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200'">{{ experience.duration }}</p>
            </div>

            <div v-for="(section, sectionIndex) in experience.content" :key="sectionIndex" class="pt-4 text-slate-600 dark:text-slate-300">
                <span v-if="section.sectionHeader && section.sectionHeader.length > 0" class="flex flex-wrap justify-between gap-2 font-extrabold text-slate-700 dark:text-slate-100">
                    <h4>{{ section.sectionHeader[0] }}</h4>
                    <span v-for="(headerPiece, headerIndex) in section.sectionHeader.slice(1)" :key="headerIndex">{{ headerPiece }}</span>
                </span>
                <ul class="space-y-3 pl-1 pt-4">
                    <li v-for="(bulletPoint, bulletIndex) in section.bulletPoints" :key="bulletIndex" class="flex items-start gap-3">
                        <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full" :class="isCurrent ? 'bg-amber-500' : 'bg-emerald-500'"></span>
                        <span>{{ bulletPoint }}</span>
                    </li>
                </ul>
            </div>

            <div class="mt-5 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span v-for="(hashtag, hashtagIndex) in experience.hashtags" :key="hashtagIndex" class="rounded-full px-3 py-1" :class="isCurrent ? 'bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200' : 'bg-slate-100 dark:bg-slate-900'">#{{ hashtag }}</span>
            </div>
        </article>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    experience: Object,
})

const isCurrent = computed(() => Boolean(props.experience?.current))

</script>

<style scoped>
.live-card {
    animation: live-card-glow 2.8s ease-in-out infinite;
}

.live-dot {
    animation: live-dot-pulse 1.8s ease-out infinite;
}

.live-badge__pulse {
    animation: live-dot-pulse 1.4s ease-out infinite;
}

@keyframes live-card-glow {
    0%, 100% {
        box-shadow: 0 10px 30px rgba(251, 191, 36, 0.12);
    }
    50% {
        box-shadow: 0 14px 38px rgba(251, 191, 36, 0.26);
    }
}

@keyframes live-dot-pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.45);
    }
    70% {
        transform: scale(1.08);
        box-shadow: 0 0 0 10px rgba(244, 63, 94, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(244, 63, 94, 0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .live-card,
    .live-dot,
    .live-badge__pulse {
        animation: none;
    }
}
</style>