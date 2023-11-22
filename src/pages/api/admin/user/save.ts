import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './save.api';

export type { Data as Result, Message } from './list.api';

export default async function apiAdminUserSave(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/user/save'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
