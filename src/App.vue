<template>
	<div class="flex h-screen p-4">
		<!-- Tabs -->
		<div
			class="w-48 bg-gradient-to-b from-blue-700 via-purple-700 to-blue-800 border-r border-white/20"
		>
			<ul>
				<li
					v-for="tab in tabs"
					:key="tab.name"
					:class="[
						'p-4 cursor-pointer',
						activeTab === tab.name
							? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold shadow-lg'
							: 'text-white/75 hover:text-white hover:bg-white/10',
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

		<NotificationContainer />
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import NotificationContainer from './components/NotificationContainer.vue';

	// Import the tab content components
	import Resources from './tabs/Resources.vue';
	import Science from './tabs/Science.vue';
	import Options from './tabs/Options.vue';

	// Define tab metadata
	interface TabItem {
		name: string;
		label: string;
		component: any;
	}

	const tabs: TabItem[] = [
		{ name: 'resources', label: 'Resources', component: Resources },
		{ name: 'science', label: 'Science', component: Science },
		{ name: 'options', label: 'Options', component: Options },
	];

	const activeTab = ref(tabs[0].name);

	const currentComponent = computed(() => {
		return tabs.find((tab) => tab.name === activeTab.value)?.component || null;
	});

	import { onMounted, onBeforeUnmount } from 'vue';
	import { handleGlobalKeyPress } from './utilities/keybindUtil';

	onMounted(() => {
		// Add the global keydown listener when the component is mounted
		document.addEventListener('keydown', handleGlobalKeyPress);
		console.log('Global keydown listener added.');
	});

	onBeforeUnmount(() => {
		// Remove the global keydown listener before the component is unmounted
		// This is crucial to prevent memory leaks and unintended behavior
		document.removeEventListener('keydown', handleGlobalKeyPress);
		console.log('Global keydown listener removed.');
	});
</script>

<style scoped>
	/* Optional styles */
</style>
