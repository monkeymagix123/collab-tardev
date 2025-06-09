// src/stores/notification.ts
import { defineStore } from 'pinia';
import { ref } from 'vue'; // 'watch' is not strictly needed here as timeouts are managed per notification

// Define the shape of a single notification
export interface Notification {
    id: string; // Unique ID for each notification instance
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    message: string;
    duration: number; // Duration in ms; 0 for indefinite
    timeoutId: ReturnType<typeof setTimeout> | null; // Stores the timeout ID for clearing
}

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref<Notification[]>([]); // Array to hold active notifications

    /**
     * Adds a new notification to the store.
     * @param options - Configuration for the notification.
     * @param options.type - The type of notification ('success', 'info', 'warning', 'error'). Defaults to 'success'.
     * @param options.title - The main title of the notification.
     * @param options.message - The detailed message of the notification.
     * @param options.duration - How long the notification should display in milliseconds. Defaults to 3000ms. Set to 0 for indefinite.
     */
    const addNotification = (options: {
        type?: 'success' | 'info' | 'warning' | 'error';
        title: string;
        message: string;
        duration?: number;
    }) => {
        // Generate a more robust unique ID
        const id = `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        const newNotification: Notification = {
            id,
            type: options.type || 'success', // Default to 'success' if not provided
            title: options.title,
            message: options.message,
            // Ensure duration defaults correctly; nullish coalescing is clean
            duration: options.duration ?? 3000,
            timeoutId: null, // Initialize as null
        };

        notifications.value.push(newNotification);

        // If duration is set (and not 0 for indefinite), set a timeout to remove it
        if (newNotification.duration > 0) {
            newNotification.timeoutId = setTimeout(() => {
                removeNotification(newNotification.id); // Use the notification's own ID
            }, newNotification.duration);
        }
    };

    /**
     * Removes a notification by its ID. Clears its associated timeout if one exists.
     * @param id - The unique ID of the notification to remove.
     */
    const removeNotification = (id: string) => {
        const index = notifications.value.findIndex(n => n.id === id);
        if (index !== -1) {
            const notificationToRemove = notifications.value[index];
            // Clear the timeout if it exists to prevent it from firing after manual removal
            if (notificationToRemove.timeoutId) {
                clearTimeout(notificationToRemove.timeoutId);
            }
            notifications.value.splice(index, 1); // Remove from the array
        }
    };

    /**
     * Clears all active notifications. Clears all associated timeouts.
     */
    const clearAllNotifications = () => {
        notifications.value.forEach(n => {
            if (n.timeoutId) {
                clearTimeout(n.timeoutId);
            }
        });
        notifications.value = []; // Empty the array
    };

    // Return the state and actions
    return {
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
    };
});