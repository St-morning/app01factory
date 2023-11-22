import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './add.api';

export type { Data, Message, Result } from './add.api';

export default async function apiAdminGroupAdd(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/group/add'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
