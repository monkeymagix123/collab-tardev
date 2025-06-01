<template>
  <div class="flex h-screen">
    <!-- Tabs -->
    <div class="w-48 bg-gray-100 border-r">
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab.name"
          :class="[
            'p-4 cursor-pointer',
            activeTab === tab.name ? 'bg-white font-bold' : 'hover:bg-gray-200'
          ]"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div class="flex-1 p-6">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue'

    // Import the tab content components
    // import TabOne from './tabs/TabOne.vue'
    // import TabTwo from './tabs/TabTwo.vue'
    // import TabThree from './tabs/TabThree.vue'
    import Resources from './tabs/Resources.vue'

    // Define tab metadata
    interface TabItem {
    name: string
    label: string
    component: any
    }

    const tabs: TabItem[] = [
    { name: 'tab1', label: 'Resources', component: Resources },
    ]

    const activeTab = ref('tab1')

    const currentComponent = computed(() => {
    return tabs.find(tab => tab.name === activeTab.value)?.component || null
    })
</script>

<!-- <style scoped>
/* Optional styles */
</style> -->
<style src="./assets/tailwind.css"></style>