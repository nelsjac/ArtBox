<script>
    import { onMount } from "svelte";
    import { browser } from "$app/env";
    import {
        goto
    } from '$app/navigation';
	import images from './images.js'
    import Skeleton from 'svelte-skeleton/Skeleton.svelte'

    let offset = 0;
	let MacyComponent;
    let macy;

	if (browser) {
		onMount(async () => {
		MacyComponent = (await import("svelte-macy")).Macy;
		});
	}
    let options = {
		columns: 4,
		trueOrder: true,
		margin: 10,
		mobileFirst: true,
		breakAt: {},
	};

    let arts = [];
    // async function fetchRandomArts() {
    //     arts = await fetch(`https://search.artsmia.org/random/art?size=10&q=image:valid%20classification:Paintings`)
    // }

    onMount(async () => {
        const res = await fetch(`https://search.artsmia.org/random/art?size=12&q=image:valid classification: Paintings restricted:0`);
        arts =  await res.json();
    });

</script>


<main class="bg-stone-100 dark:bg-stone-800"  >
        <!-- {#await arts}
        <p>...waiting</p>
        {:then arts} -->
                <!-- <svelte:component class="" this={MacyComponent} bind:macy options={options}> -->
                    <!-- {#each arts as art} -->
                        <!-- <a class="flex-1" href={`/objects/${art._source.id}`}>
                            <img class="hover:opacity-75 flex-1" src={`https://0.api.artsmia.org/400/${art._source.id}.jpg`} alt={art._source.title}>
                        </a> -->
                    <!-- {/each} -->
                <!-- </svelte:component> -->
                <div class="flex justify-center ">
                    <div class="flex-initial w-9/12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {#each arts as art}
                            <a class=" bg-stone-100 dark:bg-stone-800 " href={`/objects/${art._source.id}`}>
                                <img class=" transition ease-in-out duration-300 object-contain h-96 w-96 hover:scale-110" src={`https://0.api.artsmia.org/800/${art._source.id}.jpg`} alt={art._source.title}>
                            </a>
                        {:else}
                            <!-- this block renders when photos.length === 0 -->
                                    {#each Array(12) as x}
                                        <Skeleton class="object-contain h-96 w-96" height="400" width="400">
                                            <rect width="400" height="400" x="108" y="19" rx="5" ry="5" />
                                        </Skeleton>
                                    {/each}
                                
                        {/each}
                    </div>
                </div>


        <!-- {:catch error}
            <p style="color: red">{error.message}</p>
        {/await} -->

    <!-- <div class="  " > -->


        <!-- <Macy bind:macy={macy} options={options}>
            {#each arts.slice(0, 10) as art}
                <img src={`https://0.api.artsmia.org/400/${art._source.id}.jpg`} alt={art._source.title} />
            {/each}
        </Macy> -->
    <!-- </div> -->
</main>
<style>
    /* .arts {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 8px;
	}
    figure, img {
		width: 200px;
		margin: 0;
	} */
    * {
        padding:0px;
        margin:0px;
        border:0px;
        /* padding: 10px;
        margin: 10px;
        border: 10px; */
    }

</style>