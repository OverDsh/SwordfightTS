export function updateTable<T extends object, K extends keyof T>(
	t1: T,
	key: K,
	callback: (table: NonNullable<T[K]>) => T[K],
): T {
	if (t1[key] !== undefined) {
		const newTable = table.clone(t1);
		newTable[key] = callback(t1[key]!)!;
		return newTable;
	}
	return t1;
}
