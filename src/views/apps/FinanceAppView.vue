<template>
  <AppShell title="Finance Dashboard">
    <section class="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">Input Transaksi</h2>

        <div class="mt-4 space-y-3">
          <input
            v-model.trim="form.title"
            type="text"
            placeholder="Nama transaksi"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
          />

          <input
            v-model.number="form.amount"
            type="number"
            min="0"
            placeholder="Nominal"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
          />

          <div class="grid gap-3 sm:grid-cols-2">
            <select v-model="form.type" class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950">
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>

            <input
              v-model="form.date"
              type="date"
              class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <BaseButton @click="addTransaction">Tambah Transaksi</BaseButton>
        </div>

        <div v-if="error" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{{ error }}</div>

        <div class="mt-6 grid gap-3">
          <div class="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
            Total Pemasukan: {{ formatCurrency(totalIncome) }}
          </div>
          <div class="rounded-xl bg-rose-50 px-4 py-3 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
            Total Pengeluaran: {{ formatCurrency(totalExpense) }}
          </div>
          <div class="rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
            Saldo: {{ formatCurrency(balance) }}
          </div>
        </div>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">Daftar Transaksi</h3>
          <select v-model="activeFilter" class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950">
            <option value="all">Semua</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div v-if="loading" class="space-y-3">
          <div v-for="n in 4" :key="n" class="h-14 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
          Belum ada transaksi untuk filter ini.
        </div>

        <ul v-else class="space-y-3">
          <li
            v-for="tx in filteredTransactions"
            :key="tx.id"
            class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <div>
              <p class="font-semibold text-slate-700 dark:text-slate-100">{{ tx.title }}</p>
              <p class="text-xs text-slate-500">{{ tx.date }}</p>
            </div>
            <div class="flex items-center gap-2">
              <p :class="tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'" class="font-bold">
                {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(tx.amount) }}
              </p>
              <BaseButton variant="danger" @click="removeTransaction(tx.id)">Hapus</BaseButton>
            </div>
          </li>
        </ul>
      </article>
    </section>
  </AppShell>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import AppShell from '../../components/apps/AppShell.vue'
import BaseButton from '../../components/ui/BaseButton.vue'

const STORAGE_KEY = 'porto_apps_finance'

const loading = ref(true)
const error = ref('')
const activeFilter = ref('all')
const transactions = ref([])

const form = reactive({
  title: '',
  amount: null,
  type: 'income',
  date: new Date().toISOString().slice(0, 10)
})

const filteredTransactions = computed(() => {
  if (activeFilter.value === 'all') {
    return transactions.value
  }

  return transactions.value.filter((tx) => tx.type === activeFilter.value)
})

const totalIncome = computed(() =>
  transactions.value
    .filter((tx) => tx.type === 'income')
    .reduce((total, tx) => total + Number(tx.amount), 0)
)

const totalExpense = computed(() =>
  transactions.value
    .filter((tx) => tx.type === 'expense')
    .reduce((total, tx) => total + Number(tx.amount), 0)
)

const balance = computed(() => totalIncome.value - totalExpense.value)

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)

const hydrate = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    transactions.value = []
    return
  }

  try {
    const parsed = JSON.parse(raw)
    transactions.value = Array.isArray(parsed) ? parsed : []
  } catch {
    error.value = 'Data transaksi tidak valid. Penyimpanan direset.'
    transactions.value = []
  }
}

const persist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions.value))
}

const addTransaction = () => {
  error.value = ''

  if (!form.title || !form.amount || Number(form.amount) <= 0) {
    error.value = 'Nama transaksi dan nominal harus valid.'
    return
  }

  transactions.value.unshift({
    id: Date.now(),
    title: form.title,
    amount: Number(form.amount),
    type: form.type,
    date: form.date || new Date().toISOString().slice(0, 10)
  })

  form.title = ''
  form.amount = null
  form.type = 'income'
  form.date = new Date().toISOString().slice(0, 10)
}

const removeTransaction = (id) => {
  transactions.value = transactions.value.filter((tx) => tx.id !== id)
}

watch(transactions, persist, { deep: true })

onMounted(() => {
  setTimeout(() => {
    hydrate()
    loading.value = false
  }, 300)
})
</script>
