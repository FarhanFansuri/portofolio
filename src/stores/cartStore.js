import { defineStore } from 'pinia'

const STORAGE_KEY = 'porto_apps_cart'

const parseCart = (payload) => {
  if (!payload) {
    return []
  }

  try {
    const data = JSON.parse(payload)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    cartCount: (state) => state.items.reduce((total, item) => total + item.qty, 0),
    cartTotal: (state) => state.items.reduce((total, item) => total + item.price * item.qty, 0)
  },
  actions: {
    hydrate() {
      this.items = parseCart(localStorage.getItem(STORAGE_KEY))
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id)

      if (existing) {
        existing.qty += 1
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        })
      }

      this.persist()
    },
    updateQty(productId, qty) {
      const item = this.items.find((cartItem) => cartItem.id === productId)
      if (!item) {
        return
      }

      if (qty <= 0) {
        this.removeFromCart(productId)
        return
      }

      item.qty = qty
      this.persist()
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
      this.persist()
    },
    clearCart() {
      this.items = []
      this.persist()
    }
  }
})
