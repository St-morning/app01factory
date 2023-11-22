import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './list.api';

export type { Data as Result, Message } from './list.api';

export default async function apiAdminRoleList(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/role/list'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
