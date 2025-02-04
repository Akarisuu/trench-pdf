import type { Injury, Skill, Upgrade } from '$lib/schemas/compendium';

import type { RulesCategory } from './consts';

export type Rule = {
	name: string;
	description?: string | null;
	category?: RulesCategory | null;
	type?: string | null;
	modifiers?: string[] | null;
	range?: string | null;
	keywords?: string[] | null;
};

export type Rules = Record<string, Rule>;
export type GroupedRules = [RulesCategory, Rule[]][];
export type MinorRuleset = { category: RulesCategory; items: Upgrade[] | Injury[] | Skill[] };
