import { defineStore } from 'pinia'
import type { Node } from '@/type'

export const useNodeStore = defineStore('node', () => {
  const activeIndex = ref(0)
  const nodes = ref<Node[]>([
    {
      name: '分享发现',
      code: 'share',
      isSelect: true,
    },
    {
      name: '问与答',
      code: 'qna',
      isSelect: false,
    },
    {
      name: '分享创造',
      code: 'create',
      isSelect: false,
    },
  ])

  return {
    nodes,
    activeIndex,
  }
})
