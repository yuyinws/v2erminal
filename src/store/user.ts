import { $fetch } from 'ohmyfetch'
import { defineStore } from 'pinia'
import { fetchOptions } from '@/fetch'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userName = ref('')
  async function getUserInfo() {
    try {
      const { result } = await $fetch('member', fetchOptions)
      isLogin.value = true
      userName.value = result.username
    }
    catch (error) {
      console.log(error)
    }
  }
  return {
    isLogin,
    userName,
    getUserInfo,
  }
})
