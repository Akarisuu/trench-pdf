<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	type Props = {
		checked: boolean;
		label: string;
		id: string;
		disabled?: boolean;
	};

	let { checked = $bindable(), label, id, disabled = false }: Props = $props();
</script>

<div class="flex items-center space-x-2">
	<Checkbox {disabled} {id} bind:checked aria-labelledby="{id}-label" />
	<Label
		id="{id}-label"
		for={id}
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	>
		{label}
	</Label>
</div>
