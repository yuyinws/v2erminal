<script setup lang="ts">
const componentStore = useComponentStore()
const topicStore = useTopicStore()
const { setComponent } = componentStore
const { detail, getReplies, topics } = topicStore
const { list, activeIndex } = toRefs(topics)

onKeyData(['q'], () => {
  setComponent('topic')
})

onKeyData(['n'], () => {
  if (detail.page < detail.total) {
    detail.page++
    getReplies(list.value[activeIndex.value].id)
  }
})

onKeyData(['p'], () => {
  if (detail.page > 1) {
    detail.page--
    getReplies(list.value[activeIndex.value].id)
  }
})
</script>

<template>
  <Div flexDirection="column" justifyContent="start" width="100">
    <Div width="100" flexDirection="column" borderStyle="classic" paddingX="1">
      <Div width="100" marginBottom="1" justifyContent="center">
        <Span bold>
          「{{ detail.title }}」
        </Span>
      </Div>
      <Div width="100">
        <Span>
          {{ detail.content }}
        </Span>
      </Div>
    </Div>
    <Div borderStyle="single" width="100" flexDirection="column" paddingX="1">
      <Div v-for="(i) in detail.replies" :key="i.id" width="100">
        <Span>
          {{ `#${i.index + 1}  ` }}{{ i.content }}
        </Span>
      </Div>
      <Div justifyContent="flex-end" width="100" marginTop="1">
        <Span bold>[P]</Span>
        <Span>{{ ` ${detail.page}/${detail.total} ` }}</Span>
        <Span bold>[N]</Span>
      </Div>
    </Div>
  </Div>
</template>
