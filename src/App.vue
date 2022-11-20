<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { canRender } = storeToRefs(configStore)
const { getConfig } = configStore
const { currentComponent } = storeToRefs(useComponentStore())

onMounted(() => {
  getConfig()
})
</script>

<template>
  <Div
    width="100"
    paddingX="1"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    borderStyle="double"
  >
    <template v-if="canRender">
      <Header />
      <Div v-if="currentComponent === 'topic'" width="100" flexDirection="column">
        <Nodes />
        <Topics />
      </Div>
      <Detail v-else-if="currentComponent === 'detail'" />
    </template>
  </Div>
</template>
