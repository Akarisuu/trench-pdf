const compareChildrenByKeys = ([a]: [string, unknown], [b]: [string, unknown]) => {
	const aParts = a.split('_').map((e) => parseInt(e));
	const bParts = b.split('_').map((e) => parseInt(e));

	for (let index = 0; index < aParts.length; index++) {
		if (bParts[index] === undefined) return -1;
		if (aParts[index] < bParts[index]) return -1;
		if (aParts[index] > bParts[index]) return 1;
	}

	return 0;
};

export const sortChildrenByKeys = (refs: Record<string, HTMLElement>) =>
	Object.entries(refs)
		.sort(compareChildrenByKeys)
		.map(([, el]) => el)
		.filter(Boolean);
