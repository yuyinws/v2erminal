import { defineStore } from 'pinia'
import type { Node } from '@/type'

const originNodes = [
  {
    name: '问与答',
    code: 'qna',
  },
  {
    name: '酷工作',
    code: 'jobs',
  },
  {
    name: '分享发现',
    code: 'share',
  },
  {
    name: '分享创造',
    code: 'create',
  },
  {
    name: 'Apple',
    code: 'apple',
  },
  {
    name: 'macOS',
    code: 'macos',
  },
  {
    name: 'Python',
    code: 'python',
  },
  {
    name: 'iPhone',
    code: 'iphone',
  },
  {
    name: 'Android',
    code: 'android',
  },
]

export const useNodeStore = defineStore('node', () => {
  const activeIndex = ref(0)
  const nodes = ref<Node[]>([])

  if (nodes.value.length === 0) {
    nodes.value = originNodes.map((item, index) => {
      let isSelect = false
      if (index === 0)
        isSelect = true

      return {
        isSelect,
        ...item,
      }
    })
  }
  return {
    nodes,
    activeIndex,
  }
})
