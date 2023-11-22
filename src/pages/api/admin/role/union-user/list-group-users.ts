import api from '../../../../../atoms/api';
import smartfetch from '../../../../../atoms/smart-fetch';
import { Message, Result } from './list-group-users.api';

export type { Data as Result, Message } from './list-group-users.api';

export default async function apiAdminRoleUnionUserListGroupUsers(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/role/union-user/list-group-users'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
