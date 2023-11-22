/**
 * 将查询对象中为undefined的去掉
 */
export default function wrapFilter<T extends object>(obj: T) {
	return Object.keys(obj).reduce((pre, key) => {
		const val = (obj as unknown as Record<string, unknown>)[key];
		if (val === undefined) {
			return pre;
		}
		return {
			...pre,
			[key]: val
		};
	}, {} as T);
}
