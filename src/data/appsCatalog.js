import { CheckCircleIcon, BanknotesIcon, ShoppingBagIcon, CalendarDaysIcon, ClockIcon, ShieldCheckIcon, CommandLineIcon } from '@heroicons/vue/24/outline'

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
  },
  {
    title: 'Timeline',
    description: 'Lihat perjalanan pendidikan, project, pengalaman, dan milestone personal secara terurut.',
    icon: CalendarDaysIcon,
    route: '/timeline'
  },
  {
    title: 'Focus Timer',
    description: 'Timer bergaya pomodoro untuk fokus dan istirahat dengan kontrol sederhana.',
    icon: ClockIcon,
    route: '/apps/timer'
  },
  {
    title: 'Security Toolkit',
    description: 'Toolkit edukatif untuk basic web security testing secara aman.',
    icon: ShieldCheckIcon,
    route: '/apps/security'
  },
  {
    title: 'API Playground',
    description: 'Test HTTP request interaktif langsung dari browser — GET, POST, PUT, DELETE dengan response viewer.',
    icon: CommandLineIcon,
    route: '/apps/api'
  }
]
