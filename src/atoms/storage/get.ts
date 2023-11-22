import keys from './keys';

export default function getStorage<T>(key: keys, defaultvalue: T) {
	try {
		const it = localStorage.getItem(key);
		if (it !== null) {
			return JSON.parse(it) as T;
		}
		return defaultvalue;
	} catch {
		return defaultvalue;
	}
}

getStorage.keys = keys;
