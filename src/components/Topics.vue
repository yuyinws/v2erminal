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
  <Div flexDirection="column" alignItems="flex-start" width="100" borderStyle="single">
    <Div v-for="item in list" :key="item.id" width="100" justifyContent="space-between">
      <Div width="80">
        <Span :color="item.isSelect ? 'yellow' : ''">{{ item.isSelect ? '> ' : '' }}{{ item.title }}</Span>
      </Div>
      <Div>
        <Div>
          <Span :color="item.isSelect ? 'yellow' : ''">{{ dayjs(item.created * 1000).format('YYYY-MM-DD') }}</Span>
        </Div>
        <Div width="10" marginLeft="5">
          <Span :color="item.isSelect ? 'yellow' : ''">{{ item.replies }}</Span>
        </Div>
      </Div>
    </Div>

    <Div justifyContent="flex-end" width="100" marginTop="1">
      <Span color="white" bold>[P]</Span>
      <Span>{{ ` ${topics.page} ` }}</Span>
      <Span color="white" bold>[N]</Span>
    </Div>
  </Div>
</template>
