import mmLogger from '../../../../atoms/server/logger';
import RoleType from '../../../../db/01factory/type/role';
import { IVUserRole } from '../../../../db/01factory/view/userrole';
import ctrls from '../../ctrls';
import { CallBackDelCookie, CallBackGetCookie, CallBackSetCookie } from './session/cookie';

const logger = mmLogger('pages/api/controllers/sys/session');

export type SysSessionSetUserParam = IVUserRole;
export type SysSessionGetUserParam = CallBackGetCookie;
export type SysSessionGetUserResult = SysSessionSetUserParam;
export type SysSessionDelUserParam = CallBackDelCookie;
export type SysSessionSwitchRoleParam = {
	getCookie: CallBackGetCookie;
	setCookie: CallBackSetCookie;
	roleid: RoleType;
	rolename: string;
};

const sysSession = {
	_getToken() {
		return process.env.NEXT_SESSION_TOKEN!;
	},
	getUser(getCookie: CallBackGetCookie) {
		// 该数据视图中不包含 role_id 
		return ctrls.sysSessionCookie.get<SysSessionSetUserParam>(getCookie, this._getToken());
	},
	setUser(user: SysSessionSetUserParam, setCookie: CallBackSetCookie) {
		// 设置Cookie 
		logger.debug('setUser', user);
		return ctrls.sysSessionCookie.set(setCookie, this._getToken(), user);
	},
	async switchRole({ getCookie, setCookie, roleid, rolename }: SysSessionSwitchRoleParam) {
		const user = await this.getUser(getCookie);
		this.setUser({
			...user,
			roleid,
			rolename
		}, setCookie);
	},
	delUser(delCookie: SysSessionDelUserParam) {
		return delCookie(this._getToken());
	}
};
export default sysSession;
