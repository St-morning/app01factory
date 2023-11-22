/**
 * 必填项提示
 */
export default function checkRequired<T extends {}>(obj: T, key: keyof T, alias: string) {
	if (!obj || !obj[key]) {
		throw new Error(`${alias}为必填项，请填写完整`);
	}
}
