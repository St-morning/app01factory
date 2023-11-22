import api from '../../../../../atoms/api';
import smartfetch from '../../../../../atoms/smart-fetch';
import { Message, Result } from './list-user.api';

export type { Data as Result, Message } from './list-user.api';

export default async function apiAdminGroupUnionUserListUser(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/group/union-user/list-user'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
