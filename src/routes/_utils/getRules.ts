import { abilities as abilitiesData } from '$lib/data/abilities.json';
import type { Ability, Equipment, Injury, Member, Skill, Upgrade } from '$lib/schemas/compendium';

import type { RulesCategory } from './consts';
import type { Rules } from './types';

const collectEquipment = (equipment: Equipment[], rules: Rules) => {
	equipment.forEach((e) => {
		if (e.object.id in rules) return;

		const descriptionShape = e.object.description?.[0];

		rules[e.object.id] = {
			name: e.object.name,
			description:
				descriptionShape?.content.toLowerCase() === 'rule:'
					? (e.object.description?.[0]?.subContent?.[0]?.content ?? undefined)
					: descriptionShape?.content,
			category: e.object.category,
			modifiers: e.object.modifiers,
			range: e.object.range,
			type: e.object.equipType,
			keywords: e.object.tags?.map((v) => v.tagName)
		};
	});
};

const collectMinorRuleset = (
	items: Upgrade[] | Skill[] | Injury[],
	category: RulesCategory,
	rules: Rules
) => {
	items.forEach((i) => {
		if (i.id in rules) return;

		rules[i.id] = {
			name: i.name,
			description: i.description[0].content,
			category
		};
	});
};

const collectAbilities = (abilities: Ability[], rules: Rules) => {
	abilities.forEach((a) => {
		if (!a.content || a.content in rules) return;

		const ability = abilitiesData.find(({ id }) => id === a.content);
		if (!ability) return;

		rules[a.content] = {
			category: 'ability',
			name: ability.name,
			description: ability.description[0].content
		};
	});
};

export const getRules = (members?: Member[]) => {
	const rules: Rules = {};

	members?.forEach((member) => {
		if (member.reserve) return;

		collectEquipment(member.equipment, rules);
		collectAbilities(member.model.object.abilities, rules);
		collectMinorRuleset(member.upgrades, 'upgrade', rules);
		collectMinorRuleset(member.injuries, 'injury', rules);
		collectMinorRuleset(member.skills, 'skill', rules);
	});

	return rules;
};
