import { EQUIPMENT_CATEGORIES } from '$lib/schemas/compendium';
import type { Injury, Skill, Upgrade } from '$lib/schemas/compendium';

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

export const PAGE_WRITABLE_SPACE = A4.y - 2 * MARGIN.y;
export const WEAPONS_CATEGORIES = ['ranged', 'melee'] as const satisfies RulesCategory[];
export const isWeaponsCategory = (category: RulesCategory): category is WeaponsCategory =>
	WEAPONS_CATEGORIES.includes(category as WeaponsCategory);
export const getEmptyRulesetCollection = () => ({
	separateWeaponsRules: [],
	mainSheetRules: []
});

export type Rule = {
	name: string;
	description?: string | null;
	category: RulesCategory;
	type?: string | null;
	modifiers?: string[] | null;
	range?: string | null;
	keywords?: string[] | null;
};

export type Rules = Record<string, Rule>;
export type RulesCategory = (typeof RULES_CATEGORIES)[number];
export type WeaponsCategory = (typeof WEAPONS_CATEGORIES)[number];
export type GroupedRules = [RulesCategory, Rule[]][];
export type GroupedWeaponsRules = [WeaponsCategory, Rule[]][];
export type MinorRuleset = { category: RulesCategory; items: Upgrade[] | Injury[] | Skill[] };
export type RulesetCollections = {
	separateWeaponsRules: GroupedWeaponsRules;
	mainSheetRules: GroupedRules;
};
