import api from '../../../atoms/api';
import pages from '../../../atoms/pages';
import SysKeyType from '../../../db/01factory/type/sys-key';

export default function getSysImgUrl(key: SysKeyType) {
	switch (key) {
		case 'background':
			return api['/api/sys/background/get'];
		case 'logo':
			return api['/api/sys/logo/get'];
		case 'logo_large':
			return api['/api/sys/logo-large/get'];
		case 'logo_small':
			return api['/api/sys/logo-small/get'];
	}
	return pages['/404'];
}
