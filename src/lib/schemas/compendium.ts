import { z } from 'zod';

const costTypeSchema = z.enum(['ducats', 'glory']);

export const EQUIPMENT_CATEGORIES = ['armour', 'ranged', 'melee', 'equipment'] as const;
export const equipmentCategorySchema = z.enum(EQUIPMENT_CATEGORIES);
export type EquipmentCategory = z.infer<typeof equipmentCategorySchema>;

const tagSchema = z.object({
	tagName: z.string(),
	val: z.string().nullish()
});

const contentSchema = z.object({
	content: z.string().nullish(),
	tags: z.array(tagSchema).nullish(),
	glossary: z
		.array(
			z.object({
				val: z.string(),
				id: z.string()
			})
		)
		.nullish()
	// subContent: z.array(z.any()).nullish()
});
type CompendiumContent = z.infer<typeof contentSchema>;
export type Ability = CompendiumContent;

const descriptionSchema = z.object({
	content: z.string(),
	tags: z.array(tagSchema).nullish(),
	subContent: z.array(contentSchema).nullish()
});

const equipmentObjectSchema = z.object({
	itemType: z.string(),
	// source: z.string(),
	id: z.string(),
	tags: z.array(tagSchema).nullish(),
	name: z.string(),
	category: equipmentCategorySchema,
	equipType: z.string().nullish(),
	range: z.string().nullish(),
	modifiers: z.array(z.string()).nullish(),
	// blurb: z.string().nullish(),
	description: z.array(descriptionSchema).nullish()
	// eventTags: z.record(z.any()).nullish()
});

const injurySchema = z.object({
	itemType: z.string(),
	// source: z.string(),
	id: z.string(),
	// tags: z.array(tagSchema).nullish(),
	name: z.string(),
	// rollStart: z.number().nullish(),
	// rollEnd: z.number().nullish(),
	description: z.array(contentSchema)
	// eventTags: z.record(z.any()).nullish(),
	// scar: z.number().nullish(),
	// objData: z.record(z.any()).nullish()
});
export type Injury = z.infer<typeof injurySchema>;

const skillSchema = z.object({
	id: z.string(),
	type: z.string(),
	// eventTags: z.record(z.any()),
	// source: z.string(),
	// tags: z.array(tagSchema),
	name: z.string(),
	description: z.array(contentSchema)
});
export type Skill = z.infer<typeof skillSchema>;

const upgradeSchema = z.object({
	id: z.string(),
	// cost: z.number(),
	// costId: z.string().nullish(),
	description: z.array(contentSchema),
	// eventTags: z.record(z.any()),
	name: z.string()
	// limit: z.number(),
	// restrictions: z.array(z.unknown()),
	// objData: z.record(z.any()).nullish()
});
export type Upgrade = z.infer<typeof upgradeSchema>;

export const equipmentSchema = z.object({
	id: z.string(),
	cost: z.number(),
	costType: costTypeSchema,
	object: equipmentObjectSchema
});
export type Equipment = z.infer<typeof equipmentSchema>;

const modelObjectSchema = z.object({
	itemType: z.string(),
	source: z.string(),
	id: z.string(),
	tags: z.array(tagSchema),
	name: z.string(),
	promotion: z.number(),
	movement: z.array(z.number()),
	ranged: z.array(z.number()),
	melee: z.array(z.number()),
	armour: z.array(z.number()),
	base: z.array(z.number()),
	// team: z.string(),
	// faction: z.string(),
	// variant: z.string(),
	// blurb: z.array(contentSchema),
	// equipment: z.array(contentSchema),
	abilities: z.array(contentSchema)
	// eventTags: z.record(z.unknown()),
	// addons: z.array(z.unknown())
});

const modelSchema = z.object({
	id: z.string(),
	cost: z.number(),
	costType: costTypeSchema,
	object: modelObjectSchema
});

const memberSchema = z.object({
	name: z.string(),
	elite: z.boolean(),
	reserve: z.boolean(),
	model: modelSchema,
	equipment: z.array(equipmentSchema),
	injuries: z.array(injurySchema),
	skills: z.array(skillSchema),
	upgrades: z.array(upgradeSchema),
	// experience: z.number(),
	// scars: z.number(),
	notes: z.string()
});
export type Member = z.infer<typeof memberSchema>;

export const validCompendiumSchema = z.object({
	id: z.string(),
	name: z.string(),
	player: z.string().nullish(),
	campaign: z.string().nullish(),
	battleNo: z.number(),
	faction: z.object({
		name: z.string()
	}),
	// image: z.string(),
	ducatTotal: z.number(),
	gloryTotal: z.number(),
	// ducatLost: z.number(),
	// gloryLost: z.number(),
	ducatCost: z.number(),
	// payChest: z.number(),
	gloryCost: z.number(),
	// 🚨 IMPORTANT: will need to filter out reserve from members
	members: z.array(memberSchema)
	// armoury: z.array(z.unknown()),
	// deeds: z.array(z.unknown()),
	// flavour: z.array(z.unknown()),
	// notes: z.string(),
	// locations: z.array(z.unknown()),
	// modifiers: z.array(z.object({
	//   id: z.string(),
	//   type: z.string(),
	//   eventTags: z.record(z.any()),
	//   source: z.string(),
	//   tags: z.array(tagSchema),
	//   name: z.string(),
	//   description: z.array(contentSchema)
	// }))
});
export type ValidCompendiumData = z.infer<typeof validCompendiumSchema>;
