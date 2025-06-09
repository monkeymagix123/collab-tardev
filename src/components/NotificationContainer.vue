<template>
	<div class="fixed bottom-4 right-4 z-[9999] pointer-events-none">
		<div class="flex flex-col items-end">
			<NotificationItem
				v-for="notification in notificationsStore.notifications"
				:key="notification.id"
				:notification="notification"
				class="pointer-events-auto"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useNotificationStore } from '../stores/notifications'; // Adjust path
	import NotificationItem from './NotificationItem.vue';

	const notificationsStore = useNotificationStore();
</script>
