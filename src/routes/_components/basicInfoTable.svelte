<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as m from '$lib/i18n/messages';
	import type { ValidCompendiumData } from '$lib/schemas/compendium';

	type Props = {
		fileData: ValidCompendiumData;
		ref: HTMLElement;
	};

	let { fileData, ref = $bindable() }: Props = $props();
</script>

<div bind:this={ref}>
	<Table.Root class="mb-8 border-b">
		<Table.Header>
			<Table.Row>
				<Table.Head class="pb-0 text-4xl font-bold leading-relaxed">{fileData.name}</Table.Head>
				<Table.Head class="pb-0">{m.home_list_ducats()}</Table.Head>
				<Table.Head class="pb-0">{m.home_list_glory()}</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>{fileData.faction.name}</Table.Cell>
				<Table.Cell>{fileData.ducatCost} / {fileData.ducatTotal}</Table.Cell>
				<Table.Cell>{fileData.gloryCost} / {fileData.gloryTotal}</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
