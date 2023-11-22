import getfile from '../../../../atoms/getfile';
import pages from '../../../../atoms/pages';
import res from '../../../../atoms/res';
import SysKeyType from '../../../../db/01factory/type/sys-key';
import ctrls from '../../ctrls';
import tb01sys from '../../../../db/01factory/table/tb01sys';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/controllers/sys/config');

export type SysConfigGetSysNameResult = string;
export type SysConfigParam1 = SysKeyType;
export type SysConfigParam2 = SysKeyType | 'avatar';
export type SysConfigParam4 = Record<SysKeyType, string>;

const sysConfig = {
	async getSysName() {
		const data = await tb01sys()
			.first({
				key: 'sys_name'
			});
		return data?.value || process.env.APP_NAME || '01微工厂';
	},
	async get(key: SysConfigParam1) {
		const data = await tb01sys()
			.first({
				key
			});
		return data?.value || this.getDefaultSys(key);
	},
	getDefaultSys(key: SysConfigParam1) {
		switch (key) {
			case 'background':
				return res['/images/sys/bgimg.png'];
			case 'logo':
				return res['/images/sys/homelogo.png'];
			case 'logo_large':
				return res['/images/sys/homelogo.png'];
			case 'logo_small':
				return res['/images/sys/homelogo.png'];
			case 'sys_name':
				return process.env.NEXT_PUBLIC_APP_NAME;
		}
		return pages['/404'];
	},
	async getImg(key: SysConfigParam1) {
		try {
			const tb = tb01sys();
			const r = await tb.first({
				key
			});
			if (r && r.value) {
				return getfile(r.value);
			}
			return this.getDefaultSys(key);
		} catch (error) {
			logger.error(error);
			return this.getDefaultSys(key);
		}
	},
	async set(key: SysConfigParam1, value: string) {
		if (!value) {
			throw new Error('参数缺失');
		}
		await tb01sys().transaction(async (trx) => {
			const tb = tb01sys().useTransaction(trx);
			const r = await tb.first({
				key
			});
			// update
			if (r) {
				if (r.value !== value) {
					await tb.update({
						value
					}, {
						key
					});
					// Delete file
					await ctrls.sysFile.remove(r.value);
				}
			} else {
				// insert
				await tb.insert({
					key,
					value
				});
			}
		});
	},
	async del(key: SysConfigParam1) {
		await tb01sys().transaction(async (trx) => {
			const tb = tb01sys().useTransaction(trx);
			const r = await tb.first({
				key
			});
			if (r) {
				await tb.delete({
					key
				});
				// Delete file
				await ctrls.sysFile.remove(r.value);
			}
		});
	},
	async list() {
		const sysdata = await tb01sys()
			.query();
		return sysdata.reduce((pre, cur) => {
			if (cur.key === 'sys_name') {
				return {
					...pre,
					[cur.key as SysKeyType]: cur.value || this.getDefaultSys('sys_name')
				};
			}
			return {
				...pre,
				[cur.key as SysKeyType]: cur.value
			};
		}, {} as SysConfigParam4);
	}
};

export default sysConfig;
