import api from '../../../../../atoms/api';
import smartfetch from '../../../../../atoms/smart-fetch';
import { Message, Result } from './list-group.api';

export type { Data as Result, Message } from './list-group.api';

export default async function apiAdminRoleUnionUserListGroup(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/role/union-user/list-group'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
