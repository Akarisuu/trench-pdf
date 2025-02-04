<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTdAttributes> = $props();
</script>

<td
	bind:this={ref}
	class={cn('border-x p-3 align-middle text-xl [&:has([role=checkbox])]:pr-0', className)}
	{...restProps}
>
	{@render children?.()}
</td>
