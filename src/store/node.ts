import { defineStore } from 'pinia'
import type { Node } from '@/type'
import { getConfig } from '@/utils'

export const useNodeStore = defineStore('node', () => {
  const activeIndex = ref(0)
  const nodes = ref<Node[]>([])

  const topicStore = useTopicStore()
  const { getTopics } = topicStore

  if (nodes.value.length === 0) {
    getConfig().then((res) => {
      nodes.value = res.nodes!.map((item, index) => {
        let isSelect = false
        if (index === 0)
          isSelect = true

        return {
          isSelect,
          ...item,
        }
      })
      getTopics(nodes.value[activeIndex.value].code)
    })
  }
  return {
    nodes,
    activeIndex,
  }
})
