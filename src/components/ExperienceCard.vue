<template>
    <div class="relative pl-8 sm:pl-10">
        <span class="absolute left-0 top-8 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow dark:border-slate-900"></span>

        <article class="flex flex-col rounded-2xl border border-slate-200 bg-white/95 p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/95">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Career Step</p>
                    <h3 class="mt-2 text-xl font-extrabold text-slate-800 dark:text-slate-100">
                        {{ experience.position }}
                        <a :href="experience.company.link" class="hover:text-link-color">@{{ experience.company.name }}</a>
                    </h3>
                </div>

                <p class="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">{{ experience.duration }}</p>
            </div>

            <div v-for="(section, sectionIndex) in experience.content" :key="sectionIndex" class="pt-4 text-slate-600 dark:text-slate-300">
                <span v-if="section.sectionHeader && section.sectionHeader.length > 0" class="flex flex-wrap justify-between gap-2 font-extrabold text-slate-700 dark:text-slate-100">
                    <h4>{{ section.sectionHeader[0] }}</h4>
                    <span v-for="(headerPiece, headerIndex) in section.sectionHeader.slice(1)" :key="headerIndex">{{ headerPiece }}</span>
                </span>
                <ul class="space-y-3 pl-1 pt-4">
                    <li v-for="(bulletPoint, bulletIndex) in section.bulletPoints" :key="bulletIndex" class="flex items-start gap-3">
                        <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
                        <span>{{ bulletPoint }}</span>
                    </li>
                </ul>
            </div>

            <div class="mt-5 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span v-for="(hashtag, hashtagIndex) in experience.hashtags" :key="hashtagIndex" class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-900">#{{ hashtag }}</span>
            </div>
        </article>
    </div>
</template>

<script setup>

const props = defineProps({
    experience: Object,
})

</script>