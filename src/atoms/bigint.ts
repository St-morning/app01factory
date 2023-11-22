
export default {
	/**
	 * 长整型转换为数字类型
	 * !!! 不可滥用
	 * !!! 这种转换是有风险的，因为在转换过程中可能会损失精度，但时间戮类型字段是没有影响的。
	 * !!! 其它类型的数据转换时一定要确保数据完整性。
	 */
	toNumber<T>(data: T[]) {
		return data.map((it) => {
			const keys = Object.keys(it) as (keyof T)[];
			return keys.reduce((pre, key) => {
				const value = it[key];
				if (typeof value === 'bigint') {
					return {
						...pre,
						[key]: Number(value)
					};
				}
				return {
					...pre,
					[key]: value
				};
			}, {} as T);
		});
	}
};
