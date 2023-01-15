<script>
	export let options;
	export let offset;
	export let macy;
</script>

<details>
	<summary><strong>Options</strong></summary>
	<label>columns <input type="number" bind:value={options.columns} /></label>
	<label>trueOrder <input type='checkbox' bind:checked={options.trueOrder} /></label>
	<label>margin <input type="number" bind:value={options.margin} /></label>
	<label>mobileFirst <input type='checkbox' bind:checked={options.mobileFirst} /></label>
</details>
<hr />
<details>
	<summary><strong>Add + Remove Items</strong></summary>
	<p>Showing {15 + offset}/30</p>
	<button on:click={() => {offset = offset - 1}}>Remove Item</button>
	<button on:click={() => {offset = offset + 1}}>Add Item</button>
</details>
<hr />
<details>
	<summary><strong>Methods</strong></summary>
	<button on:click={() => {macy.recalculate()}}>recalculate</button>
	<button on:click={() => {macy.reInit()}}>reInit</button>
	<button on:click={() => {macy.remove()}}>remove</button>
</details>
<hr />

