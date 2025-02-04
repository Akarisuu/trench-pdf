import { EQUIPMENT_CATEGORIES } from '$lib/schemas/compendium';

export const CATEGORY_ORDER = {
	armour: 1,
	ranged: 2,
	melee: 3,
	equipment: 4,
	ability: 5,
	upgrade: 6,
	skill: 7,
	injury: 8
} satisfies Record<RulesCategory, number>;

export const A4 = {
	x: 595,
	y: 842
} as const;
export const MARGIN = {
	x: 40,
	y: 40
} as const;

export const RULES_CATEGORIES = [
	...EQUIPMENT_CATEGORIES,
	'skill',
	'injury',
	'upgrade',
	'ability'
] as const;
export type RulesCategory = (typeof RULES_CATEGORIES)[number];

export const PAGE_WRITABLE_SPACE = A4.y - 2 * MARGIN.y;
export const WEAPONS_CATEGORIES = ['ranged', 'melee'] as const satisfies RulesCategory[];
export type WeaponCategory = (typeof WEAPONS_CATEGORIES)[number];
