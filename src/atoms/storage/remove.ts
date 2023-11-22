import keys from './keys';

export default function removeStorage(key: keys) {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error(error);
	}
}

removeStorage.keys = keys;
