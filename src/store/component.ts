import { defineStore } from 'pinia'
import type { Component } from '@/type'

export const useComponentStore = defineStore('component', () => {
  const currentComponent = ref<Component>('topic')
  function setComponent(component: Component) {
    currentComponent.value = component
  }
  return {
    currentComponent,
    setComponent,
  }
})
