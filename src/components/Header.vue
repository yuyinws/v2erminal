<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const { userName, isLogin } = storeToRefs(userStore)
const { getUserInfo } = userStore
const { currentComponent } = storeToRefs(useComponentStore())

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <Div width="100" justifyContent="space-between">
    <Span bold>
      v2erminal
    </Span>
    <Span v-if="currentComponent === 'topic'" bold>
      切换节点[← →] 切换帖子[↑ ↓] 查看帖子[Enter] 翻页[P N]
    </Span>
    <Span v-if="currentComponent === 'detail'" bold>
      返回[Q] 翻页[P N]
    </Span>
    <Span v-if="isLogin" color="green">
      {{ userName }}
    </Span>
    <Span v-else color="red">
      未登录
    </Span>
  </Div>
</template>
