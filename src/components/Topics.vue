<script setup lang="ts">
const topicStore = useTopicStore()
const componentStore = useComponentStore()

const { topics } = topicStore
const { list, activeIndex } = toRefs(topics)
const { setComponent } = componentStore

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
  setComponent('detail')
})
</script>

<template>
  <Div flexDirection="column" alignItems="flex-start" width="100">
    <Div v-for="item in list" :key="item.id">
      <Span :color="item.isSelect ? 'yellow' : ''">{{ item.isSelect ? '> ' : '' }}{{ item.title }}</Span>
    </Div>
  </Div>
</template>
