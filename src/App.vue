<template>
    <div class="flex h-screen p-4">
        <!-- Tabs -->
        <div class="w-48 bg-gradient-to-b from-blue-700 via-purple-700 to-blue-800 border-r border-white/20">
        <ul>
            <li
            v-for="tab in tabs"
            :key="tab.name"
            :class="[
                'p-4 cursor-pointer',
                activeTab === tab.name ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold shadow-lg' : 'text-white/75 hover:text-white hover:bg-white/10'
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
        { name: 'tab2', label: 'peak', component: Resources },
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