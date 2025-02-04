<script lang="ts">
	import * as m from '$lib/i18n/messages';
	import { type ValidCompendiumData } from '$lib/schemas/compendium';

	import BasicInfoTable from './_components/basicInfoTable.svelte';
	import CategoryRules from './_components/categoryRules.svelte';
	import ModelInfoTable from './_components/modelInfoTable.svelte';
	import PdfForm from './_components/pdfForm.svelte';
	import {
		CATEGORY_ORDER,
		getRules,
		preventElementsSplitOnPage,
		sortChildrenByKeys,
		WEAPONS_CATEGORIES,
		type WeaponCategory,
		type GroupedRules
	} from './_utils';

	let files = $state<FileList>();
	let fileData = $state<ValidCompendiumData | undefined>();
	let pdfFormOptions = $state({
		separateWeapons: true
	});

	let listWrapperRef = $state<HTMLElement>();
	let rulesWrapperRef = $state<HTMLElement>();
	let ruleRefs = $state<Record<string, HTMLElement>>({});
	let listRefs = $state<Record<string, HTMLElement>>({});

	let rules = $derived(getRules(fileData?.members));
	let anyRulesDefined = $derived(Object.keys(rules).length > 0);
	let groupedRules = $derived.by(() => {
		const rulesList = Object.values(rules);
		const rulesByCategory = Object.groupBy(rulesList, (r) => r.category ?? '');
		const categoryRulesTuples = Object.entries(rulesByCategory) as GroupedRules;

		return categoryRulesTuples.sort(([a], [b]) => CATEGORY_ORDER[a] - CATEGORY_ORDER[b]);
	});

	$effect(() => {
		if (!listRefs) return;

		// Run in both cases. The if() check is here only to trigger $effect reactivity.
		if (pdfFormOptions.separateWeapons || !pdfFormOptions.separateWeapons) {
			const rulesChildren = sortChildrenByKeys(ruleRefs);
			const listChildren = sortChildrenByKeys(listRefs);

			if (listChildren.length > 0) preventElementsSplitOnPage(listChildren);
			if (rulesChildren.length > 0) preventElementsSplitOnPage(rulesChildren);
		}
	});
</script>

<svelte:head>
	<title>{m.home_metadata_title()}</title>
	<meta property="og:title" content={m.home_metadata_title()} />
	<meta name="description" content={m.home_metadata_descripition()} />
	<meta property="og:description" content={m.home_metadata_descripition()} />
	<meta property="og:type" content="website" />
</svelte:head>

<PdfForm
	bind:fileData
	bind:files
	bind:rulesWrapperRef
	bind:listWrapperRef
	bind:separateWeapons={pdfFormOptions.separateWeapons}
/>

<div class="h-0 w-[1400px] overflow-hidden">
	{#if fileData}
		<section bind:this={listWrapperRef} class="light">
			<BasicInfoTable {fileData} bind:ref={listRefs[`1`]} />

			{#each fileData.members as member, index (`${member.name}_${index}`)}
				{#if !member.reserve}
					<ModelInfoTable {member} bind:ref={listRefs[`2_${index}`]} />
				{/if}
			{/each}
			{#if anyRulesDefined}
				<h1 class="pb-4 text-4xl font-bold" bind:this={listRefs[`3`]}>
					{m.home_list_rules()}
				</h1>
				{#each groupedRules as [category, ruleset] (`${fileData.id}_${category}`)}
					{#if !pdfFormOptions.separateWeapons || !WEAPONS_CATEGORIES.includes(category as WeaponCategory)}
						<CategoryRules {category} {ruleset} bind:ref={listRefs} />
					{/if}
				{/each}
			{/if}
		</section>

		{#if pdfFormOptions.separateWeapons && anyRulesDefined}
			<section bind:this={rulesWrapperRef} class="light">
				{#each groupedRules as [category, ruleset] (`${fileData.id}_${category}`)}
					{#if WEAPONS_CATEGORIES.includes(category as WeaponCategory)}
						<CategoryRules {category} {ruleset} bind:ref={ruleRefs} />
					{/if}
				{/each}
			</section>
		{/if}
	{/if}
</div>
