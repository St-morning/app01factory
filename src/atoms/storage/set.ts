import keys from './keys';

export default function setStorage<T>(key: keys, value: T) {
	try {
		localStorage.setItem(key, JSON.stringify(value));;
	} catch (error) {
		console.log(error);
	}
}

setStorage.keys = keys;
