<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getConfig } from './utils/config'

const { currentComponent } = storeToRefs(useComponentStore())

getConfig()
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
    <Header />
    <Div v-if="currentComponent === 'topic'" width="100" flexDirection="column">
      <Nodes />
      <Topics />
    </Div>
    <Detail v-else-if="currentComponent === 'detail'" />
  </Div>
</template>
