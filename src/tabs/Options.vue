<template>
    <div class="h-full flex flex-col items-center justify-center">
        <h1 class="text-5xl font-bold mb-6 text-shadow-lg">Upgrades</h1>
        <p class="text-3xl mb-8">Coins: <span class="font-extrabold text-yellow-300 number-display">{{ game.getCoins() }}</span></p>

        <!-- <p class="text-3xl mb-8">Dimensions: <span class="font-extrabold text-yellow-300">{{ game.dimensions[0] }}</span></p> -->

        <YellowButton @click="() => { game.save(); showNotif() }">
            Save
        </YellowButton>

        <YellowButton @click="exportSave">
            Export
        </YellowButton>

        <Notification ref="notificationRef" />
    </div>
</template>

<script setup lang="ts">
    import game from '../setup';
    import YellowButton from '../components/YellowButton.vue';
    import { ref } from 'vue';
    import Notification from '../components/Notification.vue';
</script>

<script lang="ts">
    type NotificationInstance = InstanceType<typeof Notification>;

    const notificationRef = ref(null) as NotificationInstance;

    // function showDefaultNotification() {
    //     if (notificationRef.value) {
    //         notificationRef.value.showNotification(); // Uses default props
    //     }
    // };

    function showNotif(s: string = 'Game saved!') {
        if (notificationRef.value) {
            notificationRef.value.showNotification({
                title: s,
                message: '',
                duration: 3000 // 3 seconds
            });
        }
    };

    async function exportSave(): Promise<void> {
        try {
            const save = game.exportSave();
            navigator.clipboard.writeText(save);
        
            // show notification
            showNotif('Save copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showNotif('Failed to save');
        }
    }
</script>