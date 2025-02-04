import { abilities } from '$lib/data/abilities.json';
import * as m from '$lib/i18n/messages';
import type { Equipment, EquipmentCategory, Member } from '$lib/schemas/compendium';

export const createEquipmentList = (
	equipment: Equipment[],
	category: EquipmentCategory | EquipmentCategory[]
): string => {
	const matchingEquipmentList = equipment.reduce<string[]>((acc, curr) => {
		if (!curr.object.category) return acc;

		const isCategoryArray = Array.isArray(category);
		const isPartOfArrayCategory = isCategoryArray && category.includes(curr.object.category);
		const isMatchingStringCategory = !isCategoryArray && curr.object.category === category;

		if (isPartOfArrayCategory || isMatchingStringCategory) {
			acc.push(curr.object.name);
		}

		return acc;
	}, []);

	return matchingEquipmentList.join(', ') || m.shared_emptyValue();
};

export const createAbilitiesList = (member: Member): string => {
	const upgradesList = member.upgrades.map((u) => u.name);
	const modelAbilitiesList = member.model.object.abilities.map(
		({ content }) => abilities.find(({ id }) => id === content)?.name
	);
	const abilitiesList = [...upgradesList, ...modelAbilitiesList].filter(Boolean);

	return abilitiesList.join(', ') || m.shared_emptyValue();
};

export const createSkillsInjuriesList = (member: Member): string => {
	const skillsList = member.skills.map((s) => s.name);
	const injuriesList = member.injuries.map((i) => i.name);
	const skillsInjuriesList = [...skillsList, ...injuriesList].filter(Boolean);

	return skillsInjuriesList.join(', ') || m.shared_emptyValue();
};

export const createTagsList = (member: Member): string => {
	const tagsList = member.model.object.tags.map(({ tagName }) => tagName.toUpperCase());

	return tagsList.join(', ') || m.shared_emptyValue();
};

export const formatNumericToDiceModifier = (value: number | undefined): string => {
	if (typeof value !== 'number') return m.shared_emptyValue();
	if (value > 0) return `+${value}`;
	return value.toString();
};

export const createNameWithFallback = (member: Member): string => {
	if (member.name === member.model.object.name) return member.name;
	return `${member.name} (${member.model.object.name})`;
};

export const createBaseSize = (value: number | string): string => {
	return `${value}mm`;
};

export const createMoveDistance = (value: number | string): string => {
	return `${value}''`;
};
