<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as m from '$lib/i18n/messages';
	import type { Member } from '$lib/schemas/compendium';

	import {
		createAbilitiesList,
		createBaseSize,
		createEquipmentList,
		createMoveDistance,
		createNameWithFallback,
		createSkillsInjuriesList,
		createTagsList,
		formatNumericToDiceModifier
	} from '../_utils/transformers';

	type Props = { member: Member; ref: HTMLElement };

	let { member, ref = $bindable() }: Props = $props();

	const name = createNameWithFallback(member);
	const tags = createTagsList(member);
	const baseSize = createBaseSize(member.model.object.base[0]);

	const moveDistance = createMoveDistance(member.model.object.movement[0]);
	const ranged = formatNumericToDiceModifier(member.model.object.ranged[0]);
	const melee = formatNumericToDiceModifier(member.model.object.melee[0]);

	const abilitiesList = createAbilitiesList(member);
	const skillsInjuriesList = createSkillsInjuriesList(member);
</script>

<div bind:this={ref}>
	<Table.Root class="mb-6 table-fixed border-y">
		<Table.Header class="border">
			<Table.Row>
				<Table.Head class="font-bold text-inherit" colspan={5}>{name}</Table.Head>
				<Table.Cell class="font-bold text-muted-foreground" colspan={5}>{tags}</Table.Cell>
				<Table.Cell class="w-28 text-center">{baseSize}</Table.Cell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row class="text-center">
				<Table.Cell class="w-12 bg-muted">{m.home_list_move()}</Table.Cell>
				<Table.Cell class="w-12 bg-muted">{m.home_list_range()}</Table.Cell>
				<Table.Cell class="w-12 bg-muted">{m.home_list_melee()}</Table.Cell>
				<Table.Cell class="w-24 bg-muted text-start" colspan={8}>{m.home_list_armor()}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="w-12 text-center">{moveDistance}</Table.Cell>
				<Table.Cell class="w-12 text-center">{ranged}</Table.Cell>
				<Table.Cell class="w-12 text-center">{melee}</Table.Cell>
				<Table.Cell colspan={8} class="w-[480px] text-start">
					{createEquipmentList(member.equipment, 'armour')}
				</Table.Cell>
			</Table.Row>
			<span class="h-2 w-full"></span>
			<Table.Row class="border">
				<Table.Cell colspan={3} class="bg-muted text-center">{m.home_list_weapons()}</Table.Cell>
				<Table.Cell colspan={8} class="w-[1400px]">
					{createEquipmentList(member.equipment, ['ranged', 'melee'])}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colspan={3} class="bg-muted text-center">
					{m.home_list_equipment()}
				</Table.Cell>
				<Table.Cell colspan={8}>{createEquipmentList(member.equipment, 'equipment')}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colspan={3} class="bg-muted text-center">{m.home_list_abilities()}</Table.Cell>
				<Table.Cell colspan={8}>{abilitiesList}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colspan={3} class="bg-muted text-center"
					>{m.home_list_skillsOrInjuries()}
				</Table.Cell>
				<Table.Cell colspan={8}>{skillsInjuriesList}</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
