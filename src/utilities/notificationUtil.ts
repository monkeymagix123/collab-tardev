import { useNotificationStore } from '../stores/notifications';

export const NotifUtil = {
	showSuccess: () => {
		const notificationsStore = useNotificationStore();
		notificationsStore.addNotification({
			title: 'Success!',
			message: 'Your operation was completed successfully.',
			type: 'success',
			duration: 3000,
		});
	},

	showSuccessNotif(s: string = 'Game saved!') {
		const notificationsStore = useNotificationStore();
		notificationsStore.addNotification({
			title: s,
			message: '',
			type: 'success',
			duration: 3000, // 3 seconds
		});
	},

	showError: () => {
		const notificationsStore = useNotificationStore();
		notificationsStore.addNotification({
			title: 'Error!',
			message: 'Something went wrong. Please try again.',
			type: 'error',
			duration: 5000,
		});
	},

	showFailedNotif(s: string = 'Game saved!') {
		const notificationsStore = useNotificationStore();
		notificationsStore.addNotification({
			title: s,
			message: '',
			type: 'error',
			duration: 3000, // 3 seconds
		});
	},

	showWarning: () => {
		const notificationsStore = useNotificationStore();
		notificationsStore.addNotification({
			title: 'Warning!',
			message: 'Some data might be incomplete.',
			type: 'warning',
			duration: 4000,
		});
	},

	showInfo: () => {
		const notificationsStore = useNotificationStore();
		notificationsStore.addNotification({
			title: 'Information',
			message: 'This is a piece of information that requires your attention.',
			type: 'info',
			duration: 0, // Indefinite, requires manual close
		});
	},
};
