<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
const topicStore = useTopicStore()
const nodeStore = useNodeStore()

const { topics, getDetail, getTopics, getReplies } = topicStore
const { list, activeIndex } = toRefs(topics)
const { nodes, activeIndex: activeNodeIndex } = storeToRefs(nodeStore)

onKeyData(['ArrowDown'], () => {
  const topicsLength = list.value.length
  if (activeIndex.value === topicsLength - 1)
    return

  list.value[activeIndex.value].isSelect = false
  activeIndex.value++
  list.value[activeIndex.value].isSelect = true
})

onKeyData(['ArrowUp'], () => {
  if (activeIndex.value === 0)
    return

  list.value[activeIndex.value].isSelect = false
  activeIndex.value--
  list.value[activeIndex.value].isSelect = true
})

onKeyData(['Enter'], () => {
  getDetail(list.value[activeIndex.value].id, list.value[activeIndex.value].replies)
  getReplies(list.value[activeIndex.value].id)
})

onKeyData(['n'], () => {
  topics.page++
  getTopics(nodes.value[activeNodeIndex.value].code)
})

onKeyData(['p'], () => {
  if (topics.page === 1)
    return

  topics.page--
  getTopics(nodes.value[activeNodeIndex.value].code)
})
</script>

<template>
  <Div flexDirection="column" alignItems="flex-start" width="100" borderStyle="single" paddingX="1">
    <Div v-for="item in list" :key="item.id" width="100" justifyContent="space-between">
      <Div>
        <Span :color="item.isSelect ? 'yellow' : ''" :bold="item.isSelect">{{ item.isSelect ? '> ' : '' }}{{ item.title }}</Span>
      </Div>
      <Div justifyContent="space-between" width="20">
        <Div>
          <Span :color="item.isSelect ? 'yellow' : ''" :bold="item.isSelect">{{ dayjs(item.created * 1000).format('YYYY-MM-DD') }}</Span>
        </Div>
          <Span :color="item.isSelect ? 'yellow' : ''" :bold="item.isSelect">{{ item.replies }}</Span>
        <Div marginLeft="5" marginRight="3">
        </Div>
      </Div>
    </Div>

    <Div justifyContent="flex-end" width="100" marginTop="1">
      <Span bold>[P]</Span>
      <Span>{{ ` ${topics.page} ` }}</Span>
      <Span bold>[N]</Span>
    </Div>
  </Div>
</template>
