<!-- eslint-disable vue/require-toggle-inside-transition -->
<template>
	<transition
		enter-active-class="transition ease-out duration-300 transform"
		enter-from-class="opacity-0 translate-x-full"
		enter-to-class="opacity-100 translate-x-0"
		leave-active-class="transition ease-in duration-200 transform"
		leave-from-class="opacity-100 translate-x-0"
		leave-to-class="opacity-0 translate-x-full"
	>
		<div
			:class="notificationClasses"
			class="w-full max-w-sm mx-auto mt-2 p-4 rounded-lg shadow-lg flex items-center space-x-3 cursor-pointer"
			@click="dismiss"
		>
			<svg
				v-if="iconPath"
				class="h-6 w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					:d="iconPath"
				></path>
			</svg>
			<div>
				<p class="font-semibold">{{ notification.title }}</p>
				<p class="text-sm">{{ notification.message }}</p>
			</div>
			<button @click="dismiss" class="ml-auto text-white hover:opacity-80">
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>
		</div>
	</transition>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import {
		useNotificationStore,
		type Notification,
	} from '../stores/notifications'; // Adjust path and import type

	const props = defineProps<{
		notification: Notification;
	}>();

	const notificationsStore = useNotificationStore();

	// Computed property for dynamic Tailwind classes based on notification type
	const notificationClasses = computed(() => {
		const baseClasses = ['text-white'];
		switch (props.notification.type) {
			case 'success':
				baseClasses.push('bg-green-500');
				break;
			case 'error':
				baseClasses.push('bg-red-500');
				break;
			case 'warning':
				baseClasses.push('bg-yellow-500');
				break;
			case 'info':
				baseClasses.push('bg-blue-500');
				break;
			default:
				baseClasses.push('bg-gray-700'); // Default fallback
		}
		return baseClasses.join(' ');
	});

	// Computed property for dynamic SVG icon paths
	const iconPath = computed(() => {
		switch (props.notification.type) {
			case 'success':
				return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'; // Checkmark
			case 'error':
				return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'; // X-circle
			case 'warning':
				return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'; // Exclamation triangle
			case 'info':
				return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // Info circle
			default:
				return ''; // No icon
		}
	});

	const dismiss = () => {
		notificationsStore.removeNotification(props.notification.id);
	};
</script>
