<template>
    <main class="p-8">
      <p>This is the main content of your application.</p>
      <button
        @click="NotifUtil.showSuccess"
        class="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Show Success
      </button>
      <button
        @click="NotifUtil.showError"
        class="mt-4 ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Show Error
      </button>
      <button
        @click="NotifUtil.showWarning"
        class="mt-4 ml-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Show Warning
      </button>
      <button
        @click="NotifUtil.showInfo"
        class="mt-4 ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Show Info (Indefinite)
      </button>
    </main>

    <NotificationsContainer />
</template>

<script setup lang="ts">
    import NotificationContainer from '../components/NotificationContainer.vue';
    import { NotifUtil } from './notificationUtil';
</script>