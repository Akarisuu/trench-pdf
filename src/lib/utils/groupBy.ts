export const groupBy = function <T, K extends string>(data: T[], keyExtractor: (item: T) => K) {
	return data.reduce<Partial<Record<K & string, T[]>>>((acc, item) => {
		const group = keyExtractor(item);

		acc[group] = acc[group] || [];
		acc[group].push(item);
		return acc;
	}, {});
};
