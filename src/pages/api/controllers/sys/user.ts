import pages from '../../../../atoms/pages';
import pagesize from '../../../../atoms/pagesize';
import mmLogger from '../../../../atoms/server/logger';
import md5 from '../../../../atoms/server/md5';
import { ITb01menu } from '../../../../db/01factory/table/tb01menu';
import tb01user, { ITb01user } from '../../../../db/01factory/table/tb01user';
import RoleType from '../../../../db/01factory/type/role';
import viewUserRole, { IVUserRole } from '../../../../db/01factory/view/userrole';
import ctrls from '../../ctrls';
import { CallBackGetCookie, CallBackSetCookie } from './session/cookie';

const logger = mmLogger('pages/api/controllers/sys/user');

export type SysUserSigninParam = Pick<ITb01user, 'userid' | 'password'> & {
	setCookie: CallBackSetCookie;
};
export type SysUserChangePasswordParam = {
	/**
	 * 原密码
	 */
	oldpsw: string;
	/**
	 * 新密码
	 */
	newpsw: string;
	getCookie: CallBackGetCookie;
};
export type SysUserModifyParam = Pick<ITb01user, 'ext' | 'phone' | 'sex' | 'userid' | 'username'>;
export type SysUserAddParam = Partial<Pick<ITb01user, 'username' | 'phone' | 'sex' | 'ext'>> & Pick<ITb01user, 'userid'>;
export type SysUserRedirectAfterLoginParam = {
	redirectUrl: string;
	getCookie: CallBackGetCookie;
	setCookie: CallBackSetCookie;
	redirect(url: string): void;
};
export type SysUserSignUpParam = SysUserCheckParam & Pick<ITb01user, 'password'>;
export type SysUserSignUpResult = {};
export type SysUserCheckParam = Pick<ITb01user, 'userid'>;
export type SysUserCheckResult = {};
export type SysUserGetRolesParam = {
	getCookie: CallBackGetCookie;
};
export type SysUserGetRolesResult = IVUserRole[];
export type SysUserListParam = {
	// 当前页面
	page: string;
	// 用户状态：启用1 ，停用0
	state: string;
	// 用户查询关键字
	keyword: string;
};
export type SysUserListResult = {
	total: number;
	data: ITb01user[];
};
export type SysUserGetByIDResult = ITb01user;

const sysUser = {
	/**
	 * 注册
	 */
	async signup(param: SysUserSignUpParam) {
		await this.check(param);
		const { userid, password } = param;
		if (!password) {
			throw new Error('密码不能为空');
		}
		await tb01user().insert({
			userid,
			password: md5(password),
			state: 1
		});
	},
	async check(param: SysUserCheckParam) {
		const { userid } = param;
		if (!userid) {
			throw new Error('未知错误');
		}
		const user = await tb01user().first({
			userid
		});
		if (user) {
			throw new Error('用户已存在');
		}
	},
	/**
	 * 登录
	 */
	async signin(body: SysUserSigninParam) {
		logger.debug('msg body:', body);
		const { userid, setCookie, ...msg } = body;
		const user = await tb01user().first({
			userid: userid,
			password: md5(msg.password)
		});
		logger.debug('user', user);
		if (!user) {
			throw new Error('帐户名或密码错误');
		}
		const { password, ...data } = user;
		if (data.state != 1) {
			throw new Error('账户已作废,请联系管理员');
			// const msg = '账户已作废,请联系管理员';
			// res.statusMessage = encodeURIComponent(msg);
			// res.status(500).end(msg);
		}
		const vurs = await viewUserRole().query({
			userid: data.userid
		});
		if (vurs.length > 0) {
			const [vu] = vurs;
			ctrls.sysSession.setUser(vu, setCookie);
		} else {
			ctrls.sysSession.setUser({
				...data,
				roleid: null as unknown as RoleType,
				rolename: null as unknown as string,
				description: null as unknown as string
			}, setCookie);
		}
	},
	/**
	 * 修改密码
	 */
	async changePassword({ getCookie, oldpsw, newpsw }: SysUserChangePasswordParam) {
		const user = await ctrls.sysSession.getUser(getCookie);
		if (!oldpsw || !newpsw) {
			throw new Error('密码不能为空');
		}
		const tb = tb01user();
		const data = await tb
			.first({
				userid: user.userid,
				password: md5(oldpsw)
			});
		if (!data) {
			throw new Error('密码错误');
		}
		if (data.password === newpsw) {
			throw new Error('原密码和新密码一致，请重新输入');
		}
		await tb.update({ password: md5(newpsw) }, { userid: user.userid });
	},
	/**
	 * 重置密码
	 */
	async resetPassword(userid: string) {
		if (!userid) {
			throw new Error('useid is required!');
		}
		const tb = tb01user();
		const u = await tb.first({
			userid
		});
		if (!u) {
			throw new Error('User not exist!');
		}
		await tb.update({
			password: md5('123456')
		}, {
			userid
		});
	},
	async modify(param: SysUserModifyParam) {
		const { userid, username, ext, phone, sex } = param;
		if (userid) {
			await tb01user().update({
				username: username,
				sex: sex,
				phone: phone,
				ext: ext
			}, { userid });
		}
	},
	async enable(userid: string) {
		if (userid) {
			await tb01user().update({
				state: 1
			}, { userid });
		}
	},
	async disable(userid: string) {
		if (userid) {
			await tb01user()
				.update({
					state: 0
				}, { userid });
		}
	},
	listAll(keyword: string, page: number) {
		return tb01user()
			.list(['userid', 'username', 'phone'], keyword, page, pagesize(), {
				state: 1
			}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
	},
	list(param: SysUserListParam) {
		const { keyword, page, state } = param;
		return tb01user()
			.list(['userid', 'username', 'phone'], keyword, page, pagesize(), {}, (qb) => {
				return qb.orderBy('userid', 'asc');
			}, (qb) => {
				if (state) {
					void qb.where('state', parseInt(state));
				}
				return qb.whereNot('userid', 'admin');
			});
	},
	async add(user: SysUserAddParam) {
		// 通过first 判断用户名userid是否唯一
		const data = await tb01user()
			.first({ userid: user.userid });
		if (data) {
			logger.debug('error', data);
			throw new Error('用户名重复！');
		} else {
			await tb01user().insert({
				...user,
				password: md5('123456'),
				state: 1
			});
		}
	},
	async getRolesByUserID(userid: string) {
		const data = await viewUserRole()
			.query()
			.orderBy('userid', 'asc')
			.where({ userid: userid });
		const count = data.length;
		return { data, count };
	},
	all() {
		return tb01user()
			.query({
				state: 1
			});
	},
	async search(keyword: string) {
		const { data } = await tb01user()
			.list(['username'], keyword, 1, 0, {}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
		return data;
	},
	getByID(userid: string) {
		return tb01user().first({ userid });
	},
	async redirectAfterLogin({ getCookie, setCookie, redirect, redirectUrl = '' }: SysUserRedirectAfterLoginParam) {
		try {
			// 从Cookie中取到数据
			const u = await ctrls.sysSession.getUser(getCookie);
			logger.debug('1111111111111', u);
			if (!u) {
				return redirect(pages['/account/signin']);
			}
			logger.debug('11111111111112222222', u);
			// 判断 只有一个角色,再次跳转回来，查找角色的menuid
			if (u.roleid) {
				logger.debug('111111111111133333', u);
				// 根据角色id 查找 角色菜单关联表，找到所有的菜单id
				const data = await ctrls.sysMenu.getByRoleID(u.roleid);

				logger.debug('1111111111114444444', u, redirectUrl);
				// 要跳转的页面是否有权限
				if (redirectUrl) {
					const url = redirectUrl.replace(/\?.*/, '');
					if (data.some((menu) => {
						logger.debug('222222222222', url, menu);
						return menu.url === url;
					})) {
						return redirect(redirectUrl);
					} else {
						return redirect(pages['/403']);
					}
				}
				logger.debug('333333', u);

				function getFirstMenu(menus: Pick<ITb01menu, 'menuid' | 'pid' | 'url'>[], pid: string | null): string | null {
					if (menus == null) {
						return null;
					}
					for (let i = 0; i < menus.length; ++i) {
						const menu = menus[i];
						if (menu.pid === pid) {
							if (menu.url) {
								return menu.url;
							}
							const url = getFirstMenu(menus, menu.menuid);
							if (url) {
								return url;
							}
						}
					}
					return null;
				}

				const url = getFirstMenu(data, null);
				// const url = oneTest(menus, null, null);
				// const url = twoTest(menus);
				logger.debug('3333333333', data, url);
				if (url) {
					return redirect(url);
				}
				return redirect(pages['/admin/sys/nomenu']);
			}

			// 调服务查询 该用户拥有多少角色
			const data = await ctrls.sysUser.getRolesByUserID(u.userid);
			logger.debug('222222222', data);
			// 逻辑判断
			const destination = (() => {
				if (data.count == 0) {
					return pages['/account/norolepage'];
				}
				if (data.count > 1) {
					return `${pages['/account/rolechoose']}?redirect=${redirectUrl}`;
				}
				const [role] = data.data;
				logger.debug('sssssssssssssssss', u);
				// 只有一个角色,再次跳转回来，查找角色的menuid
				ctrls.sysSession.setUser({
					...u,
					roleid: role.roleid,
					rolename: role.rolename
				}, setCookie);
				return `${pages['/account/pagejump']}?redirect=${redirectUrl}`;
			})();
			return redirect(destination);
		} catch (error) {
			logger.error(error);
			return redirect(pages['/500']);
		}
	},
	async getRoles({ getCookie }: SysUserGetRolesParam) {
		// 从Cookie中获取 user.userid
		const u = await ctrls.sysSession.getUser(getCookie);
		logger.debug('user::::::::::::', u);
		// 获取所有用户的角色
		const data = await ctrls.sysUser.getRolesByUserID(u.userid);
		return data.data as SysUserGetRolesResult;
	}
};

export default sysUser;
