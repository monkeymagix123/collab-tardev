<template>
	<div class="h-full flex flex-col items-center">
		<h1 class="text-5xl font-bold mb-6 text-shadow-lg">Upgrades</h1>
		<p class="text-3xl mb-8">
			Coins:
			<span class="font-extrabold text-yellow-300 number-display">{{
				game.getCoins()
			}}</span>
		</p>

		<!-- <p class="text-3xl mb-8">Dimensions: <span class="font-extrabold text-yellow-300">{{ game.dimensions[0] }}</span></p> -->

		<YellowButton
			@click="
				() => {
					game.save();
					NotifUtil.showSuccessNotif();
				}
			"
		>
			Save
		</YellowButton>

		<YellowButton @click="exportSave"> Export </YellowButton>

		<!-- MAKE THIS BETTER!!! -->
		<YellowButton @click="game.reset"> Hard Reset </YellowButton>
	</div>
</template>

<script setup lang="ts">
	import game from '../setup';
	import YellowButton from '../components/YellowButton.vue';
	import { NotifUtil } from '../utilities/notificationUtil';

	async function exportSave(): Promise<void> {
		try {
			const save = game.exportSave();
			navigator.clipboard.writeText(save);

			// show notification
			NotifUtil.showSuccessNotif('Save copied to clipboard!');
		} catch (err) {
			console.error('Failed to copy text: ', err);
			NotifUtil.showFailedNotif('Failed to save');
		}
	}
</script>
