import { CheckCircleIcon, BanknotesIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'

export const appsCatalog = [
  {
    title: 'Todo App',
    description: 'Kelola aktivitas harian dengan fitur tambah, edit, hapus, filter, dan status selesai.',
    icon: CheckCircleIcon,
    route: '/apps/todo'
  },
  {
    title: 'Finance Dashboard',
    description: 'Catat pemasukan dan pengeluaran, lalu pantau total saldo secara realtime.',
    icon: BanknotesIcon,
    route: '/apps/finance'
  },
  {
    title: 'E-commerce App',
    description: 'Lihat katalog produk, detail produk, lalu tambahkan barang ke keranjang.',
    icon: ShoppingBagIcon,
    route: '/apps/ecommerce'
  }
]
