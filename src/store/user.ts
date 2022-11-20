import { ofetch } from 'ofetch'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userName = ref('')
  const configStore = useConfigStore()
  const { fetchOptions } = configStore
  async function getUserInfo() {
    try {
      const { result } = await ofetch('member', fetchOptions())
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
