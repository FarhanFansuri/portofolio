<template>
  <AppShell title="E-commerce App">
    <section class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">Produk</h2>
          <input
            v-model.trim="keyword"
            type="text"
            placeholder="Cari produk"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-button-color dark:border-slate-700 dark:bg-slate-950 sm:w-64"
          />
        </div>

        <div v-if="error" class="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{{ error }}</div>

        <div v-if="loading" class="grid gap-4 sm:grid-cols-2">
          <div v-for="n in 4" :key="n" class="h-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div v-else-if="filteredProducts.length === 0" class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
          Produk tidak ditemukan.
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2">
          <button
            v-for="product in filteredProducts"
            :key="product.id"
            class="rounded-xl border border-slate-200 p-3 text-left transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700"
            @click="selectedProduct = product"
          >
            <img :src="product.image" :alt="product.name" class="h-36 w-full rounded-lg object-cover" />
            <h3 class="mt-3 font-semibold text-slate-800 dark:text-slate-100">{{ product.name }}</h3>
            <p class="text-sm text-slate-500">{{ product.category }}</p>
            <p class="mt-1 font-bold text-button-color">{{ formatCurrency(product.price) }}</p>
          </button>
        </div>
      </article>

      <aside class="space-y-6">
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">Detail Produk</h3>

          <div v-if="!selectedProduct" class="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700">
            Pilih produk untuk melihat detail.
          </div>

          <div v-else class="mt-4 space-y-3">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" class="h-36 w-full rounded-lg object-cover" />
            <h4 class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ selectedProduct.name }}</h4>
            <p class="text-sm text-slate-600 dark:text-slate-300">{{ selectedProduct.description }}</p>
            <p class="font-bold text-button-color">{{ formatCurrency(selectedProduct.price) }}</p>
            <BaseButton @click="addSelectedToCart">Tambah ke Keranjang</BaseButton>
          </div>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-bold text-slate-800 dark:text-white">Keranjang ({{ cartStore.cartCount }})</h3>
            <BaseButton variant="ghost" @click="cartStore.clearCart">Clear</BaseButton>
          </div>

          <div v-if="cartStore.items.length === 0" class="rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500 dark:border-slate-700">
            Keranjang masih kosong.
          </div>

          <ul v-else class="space-y-3">
            <li
              v-for="item in cartStore.items"
              :key="item.id"
              class="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
            >
              <p class="font-semibold text-slate-700 dark:text-slate-100">{{ item.name }}</p>
              <p class="text-sm text-slate-500">{{ formatCurrency(item.price) }}</p>
              <div class="mt-2 flex items-center gap-2">
                <button class="h-8 w-8 rounded-lg border border-slate-300" @click="cartStore.updateQty(item.id, item.qty - 1)">-</button>
                <span class="min-w-[2rem] text-center text-sm">{{ item.qty }}</span>
                <button class="h-8 w-8 rounded-lg border border-slate-300" @click="cartStore.updateQty(item.id, item.qty + 1)">+</button>
                <BaseButton variant="danger" @click="cartStore.removeFromCart(item.id)">Hapus</BaseButton>
              </div>
            </li>
          </ul>

          <div class="mt-4 rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
            Total: {{ formatCurrency(cartStore.cartTotal) }}
          </div>
        </article>
      </aside>
    </section>
  </AppShell>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AppShell from '../../components/apps/AppShell.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import { products } from '../../data/products'
import { useCartStore } from '../../stores/cartStore'

const loading = ref(true)
const error = ref('')
const keyword = ref('')
const allProducts = ref([])
const selectedProduct = ref(null)
const cartStore = useCartStore()

const filteredProducts = computed(() => {
  const key = keyword.value.toLowerCase()
  return allProducts.value.filter((product) => {
    const name = product.name.toLowerCase()
    const category = product.category.toLowerCase()
    return name.includes(key) || category.includes(key)
  })
})

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)

const addSelectedToCart = () => {
  if (!selectedProduct.value) {
    error.value = 'Pilih produk terlebih dahulu.'
    return
  }

  error.value = ''
  cartStore.addToCart(selectedProduct.value)
}

onMounted(() => {
  try {
    cartStore.hydrate()

    setTimeout(() => {
      allProducts.value = products
      selectedProduct.value = products[0] ?? null
      loading.value = false
    }, 350)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Gagal memuat produk'
    loading.value = false
  }
})
</script>
