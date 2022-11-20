import { ofetch } from 'ofetch'
import { defineStore } from 'pinia'
import { replaceContent } from '@/utils'
import type { Detail, Topics } from '@/type'

export const useTopicStore = defineStore('topic', () => {
  const componentStore = useComponentStore()
  const configStore = useConfigStore()
  const { setComponent } = componentStore
  const { fetchOptions } = configStore
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
      const { result } = await ofetch(`nodes/${node}/topics?p=${topics.page}`, fetchOptions())
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
      console.log(error)
      process.exit(1)
    }
  }

  async function getDetail(topicId: number, total: number) {
    try {
      const topicDetail = await ofetch(`topics/${topicId}`, fetchOptions())
      detail.title = topicDetail.result.title
      detail.content = replaceContent(topicDetail.result.content)
      detail.total = total ? Math.ceil(total / 20) ? Math.ceil(total / 20) : 1 : 1
      detail.page = 1
      setComponent('detail')
    }
    catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  async function getReplies(topicId: number) {
    try {
      const replies = await ofetch(`topics/${topicId}/replies?p=${detail.page}`, fetchOptions())
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
      process.exit(1)
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
