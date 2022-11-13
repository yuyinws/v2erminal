<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { currentComponent } = storeToRefs(useComponentStore())
</script>

<template>
  <Div
    width="100"
    paddingX="1"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    borderColor="white"
    borderStyle="round"
  >
    <Header />
    <Div v-if="currentComponent === 'topic'" width="100" flexDirection="column">
      <Nodes />
      <Topics />
    </Div>
    <Detail v-else-if="currentComponent === 'detail'" />
  </Div>
</template>
