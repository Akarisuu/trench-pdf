<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	type Props = HTMLInputAttributes & { files?: FileList | null; element?: HTMLInputElement };

	let {
		class: className,
		value = $bindable(),
		files = $bindable(),
		element = $bindable(),
		type,
		...restProps
	}: Props = $props();

	let _class = $derived(
		cn(
			'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)
	);
</script>

{#if type === 'file'}
	<input {...restProps} class={_class} type="file" bind:files bind:this={element} />
{:else}
	<input {...restProps} class={_class} bind:value bind:this={element} />
{/if}
