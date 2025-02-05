<script lang="ts">
	import * as m from '$lib/i18n/messages';
	import { type ValidCompendiumData } from '$lib/schemas/compendium';

	import BasicInfoTable from './_components/basicInfoTable.svelte';
	import ModelInfoTable from './_components/modelInfoTable.svelte';
	import PdfForm from './_components/pdfForm.svelte';
	import RulesCategory from './_components/rulesCategory.svelte';
	import {
		CATEGORY_ORDER,
		getCategoryRulesKey,
		getEmptyRulesetCollection,
		getRules,
		isWeaponsCategory,
		preventElementsSplitOnPage,
		type GroupedRules,
		type RulesetCollections
	} from './_utils';

	let files = $state<FileList>();
	let fileData = $state<ValidCompendiumData | undefined>();
	let pdfFormOptions = $state({
		separateWeapons: true
	});

	let mainSheetWrapperRef = $state<HTMLElement>();
	let weaponsWrapperRef = $state<HTMLElement>();

	let { mainSheetRules, separateWeaponsRules } = $derived.by(() => {
		const rulesList = Object.values(getRules(fileData?.members));
		const rulesByCategory = Object.groupBy(rulesList, (r) => r.category ?? '');
		const categoryRulesTuples = Object.entries(rulesByCategory) as GroupedRules;
		const sortedCategories = categoryRulesTuples.sort(
			([a], [b]) => CATEGORY_ORDER[a] - CATEGORY_ORDER[b]
		);

		return sortedCategories.reduce<RulesetCollections>((acc, [category, ruleset]) => {
			if (pdfFormOptions.separateWeapons && isWeaponsCategory(category))
				acc.separateWeaponsRules.push([category, ruleset]);
			else acc.mainSheetRules.push([category, ruleset]);

			return acc;
		}, getEmptyRulesetCollection());
	});

	$effect(() => {
		if (mainSheetWrapperRef && mainSheetWrapperRef.children.length > 0)
			preventElementsSplitOnPage(mainSheetWrapperRef);
		if (weaponsWrapperRef && weaponsWrapperRef.children.length > 0)
			preventElementsSplitOnPage(weaponsWrapperRef);
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
	bind:weaponsWrapperRef
	bind:mainSheetWrapperRef
	bind:separateWeapons={pdfFormOptions.separateWeapons}
/>

<div class="h-0 w-[1400px] overflow-hidden">
	{#if fileData}
		{#key mainSheetRules}
			<section bind:this={mainSheetWrapperRef} class="light">
				<BasicInfoTable {fileData} />

				{#each fileData.members as member, index (`${member.name}_${index}`)}
					{#if !member.reserve}
						<ModelInfoTable {member} />
					{/if}
				{/each}
				{#if !!mainSheetRules.length}
					<h1 class="pb-4 text-4xl font-bold">
						{m.home_list_rules()}
					</h1>
					{#each mainSheetRules as [category, ruleset] (getCategoryRulesKey(fileData.id, category))}
						<RulesCategory {category} {ruleset} />
					{/each}
				{/if}
			</section>
		{/key}

		{#if !!separateWeaponsRules.length}
			<section bind:this={weaponsWrapperRef} class="light">
				{#each separateWeaponsRules as [category, ruleset] (getCategoryRulesKey(fileData.id, category))}
					<RulesCategory {category} {ruleset} />
				{/each}
			</section>
		{/if}
	{/if}
</div>
