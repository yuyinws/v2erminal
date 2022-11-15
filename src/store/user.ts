import { $fetch } from 'ohmyfetch'
import { defineStore } from 'pinia'
import { fetchOptions } from '@/utils'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userName = ref('')
  async function getUserInfo() {
    try {
      const _fetchOptions = await fetchOptions()
      const { result } = await $fetch('member', _fetchOptions)
      isLogin.value = true
      userName.value = result.username
    }
    catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  return {
    isLogin,
    userName,
    getUserInfo,
  }
})
