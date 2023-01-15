<script>
	// import { Macy } from 'svelte-macy'
	import Config from '../lib/components/Config.svelte';
	import images from './images.js'
	import { browser } from "$app/env";
  import { onMount } from "svelte";

	let MacyComponent;
	if (browser) {
		onMount(async () => {
		MacyComponent = (await import("svelte-macy")).Macy;
		});
	}

	let macy;
	let options = {
		columns: 4,
		trueOrder: false,
		margin: 20,
		mobileFirst: false,
		breakAt: {},
	};
	
	let offset = 40;
</script>

<!-- <Config bind:options={options} bind:offset={offset} macy={macy}/> -->
<div class="px-4">
	<svelte:component this={MacyComponent} bind:macy options={options}>
		{#each images as image}
			<img src={image} alt={image} />
		{/each}
	</svelte:component>
</div>


<!-- <Macy bind:macy={macy} options={options}>

</Macy> -->