import api from '../../../../../atoms/api';
import smartfetch from '../../../../../atoms/smart-fetch';
import { Message, Result } from './list-menus.api';

export type { Data, Message, Result } from './list-menus.api';

export default async function apiAdminRoleUnionMenuListMenus(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/role/union-menu/list-menus'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
