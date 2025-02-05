<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as m from '$lib/i18n/messages';

	import type { Rule } from '../_utils';

	type Props = {
		rule: Rule;
	};

	const { rule }: Props = $props();
</script>

<Table.Root class="table-fixed border">
	<Table.Header>
		<Table.Row class="*:border *:bg-muted">
			<Table.Head class="w-48">{m.home_list_weaponsRuleset_type()}</Table.Head>
			<Table.Head class="w-48">{m.home_list_weaponsRuleset_range()}</Table.Head>
			<Table.Head>{m.home_list_weaponsRuleset_keywords()}</Table.Head>
			<Table.Head>{m.home_list_weaponsRuleset_modifiers()}</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell>{rule.type}</Table.Cell>
			<Table.Cell>{rule.range}</Table.Cell>
			<Table.Cell>{rule.keywords?.join(', ') || m.shared_emptyValue()}</Table.Cell>
			<Table.Cell>{rule.modifiers?.join(', ') || m.shared_emptyValue()}</Table.Cell>
		</Table.Row>
		{#if rule.description}
			<Table.Row>
				<Table.Cell class="bg-muted text-muted-foreground"
					>{m.home_list_weaponsRuleset_additionalRules()}</Table.Cell
				>
				<Table.Cell colspan={3}>{rule.description}</Table.Cell>
			</Table.Row>
		{/if}
	</Table.Body>
</Table.Root>
