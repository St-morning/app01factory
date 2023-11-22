import api from '../../../../../atoms/api';
import smartfetch from '../../../../../atoms/smart-fetch';
import { Message, Result } from './save.api';

export type { Data, Message, Result } from './save.api';

export default async function apiAdminRoleUnionMenuSave(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/role/union-menu/save'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
