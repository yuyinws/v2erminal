import { $fetch } from 'ohmyfetch'
import { defineStore } from 'pinia'
import { fetchOptions } from '@/fetch/index'
import type { Detail, Topics } from '@/type'
import { replaceContent } from '@/utils'

export const useTopicStore = defineStore('topic', () => {
  const componentStore = useComponentStore()
  const { setComponent } = componentStore
  const topics: Topics = reactive({
    list: [],
    activeIndex: 0,
    page: 1,
  })

  const detail: Detail = reactive({
    title: '',
    content: '',
    replies: null,
    allReplies: null,
    total: 0,
    page: 1,
  })

  async function getTopics(node: string) {
    try {
      const { result } = await $fetch(`nodes/${node}/topics?p=${topics.page}`, fetchOptions)
      topics.list = result.map((item: any, index: number) => {
        let isSelect = false
        if (index === 0)
          isSelect = true
        return {
          isSelect,
          id: item.id,
          replies: item.replies,
          title: replaceContent(item.title),
          created: item.created,
        }
      })
      topics.activeIndex = 0
    }
    catch (error) {
      console.log('🚀 ~ file: topic.ts ~ line 13 ~ getTopics ~ error', error)
    }
  }

  async function getDetail(topicId: number, total: number) {
    try {
      const topicDetail = await $fetch(`topics/${topicId}`, fetchOptions)
      detail.title = topicDetail.result.title
      detail.content = replaceContent(topicDetail.result.content)
      detail.total = total ? Math.floor(total / 10) ? Math.floor(total / 10) : 1 : 1
      setComponent('detail')
    }
    catch (error) {
      console.log(error)
    }
  }

  async function getReplies(topicId: number) {
    try {
      const replies = await $fetch(`topics/${topicId}/replies?p=${detail.page}`, fetchOptions)
      detail.replies = replies.result?.map((item: any, index: number) => {
        return {
          content: replaceContent(item.content),
          id: item.id,
          member: item.member,
          index,
        }
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  return {
    getTopics,
    topics,
    getDetail,
    detail,
    getReplies,
  }
})
