<script lang="ts">
	import { CATEGORY_ORDER, type RulesCategory } from '../_utils/consts';
	import type { Rule } from '../_utils/types';

	import WeaponInfoTable from './weaponInfoTable.svelte';

	type Props = {
		ref?: Record<string, HTMLElement>;
		category: RulesCategory;
		ruleset: Rule[];
	};

	const { ref = $bindable({}), category, ruleset }: Props = $props();
</script>

{#each ruleset as rule, index (rule.name)}
	<div bind:this={ref[`4_${CATEGORY_ORDER[category]}_${index}`]}>
		{#if index === 0}
			<h2 class="pb-3 pt-6 text-3xl font-bold capitalize">
				{category}
			</h2>
		{/if}
		<div class="flex flex-col gap-2 pb-3">
			<h3 class="text-2xl">{rule.name}</h3>
			{#if ['ranged', 'melee'].includes(category)}
				<WeaponInfoTable {rule} />
			{:else if rule.description}
				<p class="text-xl text-neutral-600">{rule.description}</p>
			{/if}
		</div>
	</div>
{/each}
