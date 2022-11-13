import { $fetch } from 'ohmyfetch'
import { defineStore } from 'pinia'
import { fetchOptions } from '@/fetch/index'
import type { Topics } from '@/type'

export const useTopicStore = defineStore('topic', () => {
  const topics: Topics = reactive({
    list: [],
    activeIndex: 0,
    page: 1,
  })

  async function _getTopics(node: string) {
    try {
      const { result } = await $fetch(`nodes/${node}/topics?p=${topics.page}`, fetchOptions)
      topics.list = result.map((item: any, index: number) => {
        let isSelect = false
        if (index === 0)
          isSelect = true
        return {
          isSelect,
          ...item,
        }
      })
    }
    catch (error) {
      console.log('🚀 ~ file: topic.ts ~ line 13 ~ _getTopics ~ error', error)
    }
  }

  return {
    _getTopics,
    topics,
  }
})
