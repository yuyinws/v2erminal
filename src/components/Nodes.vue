<script setup lang="ts">
import { storeToRefs } from 'pinia'

const nodeStore = useNodeStore()
const topicStore = useTopicStore()

const { nodes, activeIndex } = storeToRefs(nodeStore)
const { _getTopics } = topicStore

onKeyData(['ArrowRight'], () => {
  const nodesLength = nodes.value.length
  if (activeIndex.value === nodesLength - 1)
    return

  nodes.value[activeIndex.value].isSelect = false
  activeIndex.value++
  nodes.value[activeIndex.value].isSelect = true

  _getTopics(nodes.value[activeIndex.value].code)
})

onKeyData(['ArrowLeft'], () => {
  if (activeIndex.value === 0)
    return

  nodes.value[activeIndex.value].isSelect = false
  activeIndex.value--
  nodes.value[activeIndex.value].isSelect = true

  _getTopics(nodes.value[activeIndex.value].code)
})

onMounted(() => {
  _getTopics(nodes.value[activeIndex.value].code)
})
</script>

<template>
  <Div width="100" justifyContent="center" marginY="1">
    <Div v-for="(node, index) in nodes" :key="index" marginRight="1">
      <Span :color="node.isSelect ? 'red' : ''">{{ node.name }}</Span>
    </Div>
  </Div>
</template>
