import { defineStore } from 'pinia'
import type { Node } from '@/type'

export const useNodeStore = defineStore('node', () => {
  const activeIndex = ref(0)
  const nodes = ref<Node[]>([])

  const configStore = useConfigStore()
  const { config } = configStore

  const topicStore = useTopicStore()
  const { getTopics } = topicStore

  if (nodes.value.length === 0) {
    nodes.value = config.nodes!.map((item, index) => {
      let isSelect = false
      if (index === 0)
        isSelect = true

      return {
        isSelect,
        ...item,
      }
    })
    getTopics(nodes.value[activeIndex.value].code)
  }
  return {
    nodes,
    activeIndex,
  }
})
