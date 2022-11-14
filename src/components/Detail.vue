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
  console.log(detail.page, detail.total)
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
    <Div width="100" flexDirection="column" borderStyle="round" marginBottom="1">
      <Div width="100" marginTop="1">
        <Span>
          《{{ detail.title }}》
        </Span>
      </Div>
      <Div width="100" marginY="2">
        <Span>
          {{ detail.content }}
        </Span>
      </Div>
    </Div>
    <Div v-for="(i) in detail.replies" :key="i.id" width="100">
      <Span>
        {{ `#${i.index + 1}  ` }}{{ i.content }}
      </Span>
    </Div>
    <Div justifyContent="flex-end" width="100" marginTop="1">
      <Span bold color="white">[P]</Span>
      <Span>{{ ` ${detail.page}/${detail.total} ` }}</Span>
      <Span bold color="white">[N]</Span>
    </Div>
  </Div>
</template>
