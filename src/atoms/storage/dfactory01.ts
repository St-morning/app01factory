import getStorage from './get';
import setStorage from './set';
import removeStorage from './remove';

const key = getStorage.keys.dfactory01;

type ValueType = string;

export default {
	get() {
		return getStorage<ValueType>(key, '01factory');
	},
	set(val: ValueType) {
		if (val === null) {
			removeStorage(key);
		} else {
			setStorage(key, val);
		}
	},
	remove() {
		removeStorage(key);
	}
};
