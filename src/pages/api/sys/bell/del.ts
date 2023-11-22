import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from '../base/del';

export type { Message, Result } from '../base/del';

export default async function apiSysBellDel(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/sys/bell/del'], 'delete', msg);
	if (ret.ok === true) {
		return;
	}
	throw new Error(ret.message);
}
