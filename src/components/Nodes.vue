<script setup lang="ts">
import { storeToRefs } from 'pinia'

const nodeStore = useNodeStore()
const topicStore = useTopicStore()

const { nodes, activeIndex } = storeToRefs(nodeStore)
const { getTopics, topics } = topicStore

onKeyData(['ArrowRight'], () => {
  const nodesLength = nodes.value.length
  if (activeIndex.value === nodesLength - 1)
    return

  nodes.value[activeIndex.value].isSelect = false
  activeIndex.value++
  nodes.value[activeIndex.value].isSelect = true

  getTopics(nodes.value[activeIndex.value].code)
  topics.page = 1
})

onKeyData(['ArrowLeft'], () => {
  if (activeIndex.value === 0)
    return

  nodes.value[activeIndex.value].isSelect = false
  activeIndex.value--
  nodes.value[activeIndex.value].isSelect = true

  getTopics(nodes.value[activeIndex.value].code)
  topics.page = 1
})
</script>

<template>
  <Div width="100" justifyContent="center" marginY="1" borderStyle="classic" paddingX="1">
    <Div v-for="(node, index) in nodes" :key="index" marginRight="1" width="20">
      <Span :bold="node.isSelect" :color="node.isSelect ? 'blue' : ''">{{ node.name }}</Span>
    </Div>
  </Div>
</template>
