import mmLogger from '../../../atoms/server/logger';
import uuid from '../../../atoms/server/uuid';
import tbZhmxx, { ITbZhmxx } from '../../../db/01factory/table/tbzhmxx';

const logger = mmLogger('pages/api/controllers/zhmxx');

export type ZhmxxLbchxParam = {
	page: string;
	keyword: string;
};
export type ZhmxxLbchxResult = {
	data: ITbZhmxx[];
	total: number;
};

export type ZhmxxXzbcParam = Pick<ITbZhmxx, 'bmfsh' | 'bmjzhshj' | 'bmkshshj' | 'zhmgw' | 'zhmrsh'>;
export type ZhmxxXzbcResult = {};

export type ZhmxxBjbcParam = Pick<ITbZhmxx, 'bmfsh' | 'bmjzhshj' | 'bmkshshj' | 'zhmgw' | 'zhmrsh' | 'zhmxxbh'>;
export type ZhmxxBjbcResult = {};

export type ZhmxxShanchuParam = Pick<ITbZhmxx, 'zhmxxbh'>;
export type ZhmxxShanchuResult = {};

export type ZhmxxZmxxcklbcxParam = {};
export type ZhmxxZmxxcklbcxResult = ITbZhmxx[];

/**
 * 招募信息
 */
const zhmxx = {

	/**
	 * 列表查询
	 */
	async lbchx(param: ZhmxxLbchxParam) {
		logger.debug(param);
		const { keyword, page } = param;
		const data = await tbZhmxx().list(
			['zhmgw'],
			keyword,
			page,
			10,
			{},
			(qb) => {
				return qb.orderBy('fbshj', 'desc');
			}
		);
		return data as ZhmxxLbchxResult;
	},
	/**
	 * 新增保存
	 */
	async xzbc(param: ZhmxxXzbcParam) {
		logger.debug(param);
		const { bmfsh, bmjzhshj, bmkshshj, zhmgw, zhmrsh } = param;
		if (!zhmgw) {
			throw new Error('招募岗位为必填项，请重新填写');
		}
		if (!zhmrsh) {
			throw new Error('招募人数为必填项，请重新填写');
		}
		if (!bmfsh) {
			throw new Error('报名方式为必填项，请重新填写');
		}
		if (!bmkshshj) {
			throw new Error('报名开始时间为必填项，请重新填写');
		}
		if (!bmjzhshj) {
			throw new Error('报名截止时间为必填项，请重新填写');
		}
		const now = Date.now();
		if (parseInt(bmkshshj, 10) < now) {
			throw new Error('报名开始时间过早');
		}
		if (parseInt(bmkshshj, 10) >= parseInt(bmjzhshj, 10)) {
			throw new Error('报名时间过短');
		}
		const zhmxxbh = uuid();
		const fbshj = now.toString();
		await tbZhmxx().insert({
			bmfsh,
			bmjzhshj,
			bmkshshj,
			fbshj,
			zhmgw,
			zhmrsh,
			zhmxxbh
		});
		return {} as ZhmxxXzbcResult;
	},
	/**
	 * 编辑保存
	 */
	async bjbc(param: ZhmxxBjbcParam) {
		logger.debug(param);
		const { zhmxxbh, bmfsh, bmjzhshj, bmkshshj, zhmgw, zhmrsh } = param;
		if (!zhmxxbh) {
			throw new Error('招募信息编号不能为空');
		}
		if (!zhmgw) {
			throw new Error('招募岗位为必填项，请重新填写');
		}
		if (!zhmrsh) {
			throw new Error('招募人数为必填项，请重新填写');
		}
		if (!bmfsh) {
			throw new Error('报名方式为必填项，请重新填写');
		}
		if (!bmkshshj) {
			throw new Error('报名开始时间为必填项，请重新填写');
		}
		if (!bmjzhshj) {
			throw new Error('报名截止时间为必填项，请重新填写');
		}
		const now = Date.now();
		if (parseInt(bmkshshj, 10) < now) {
			throw new Error('报名开始时间过早');
		}
		if (parseInt(bmkshshj, 10) >= parseInt(bmjzhshj, 10)) {
			throw new Error('报名时间过短');
		}
		await tbZhmxx().update({
			bmfsh,
			bmjzhshj,
			bmkshshj,
			fbshj: now.toString(),
			zhmgw,
			zhmrsh,
			zhmxxbh
		}, {
			zhmxxbh
		});
		return {} as ZhmxxBjbcResult;
	},
	/**
	 * 删除
	 */
	async shanchu(param: ZhmxxShanchuParam) {
		logger.debug(param);
		const { zhmxxbh } = param;
		if (!zhmxxbh) {
			throw new Error('关键字为空');
		}
		await tbZhmxx().delete({
			zhmxxbh
		});
		return {} as ZhmxxShanchuResult;
	},
	/**
	 * 招募信息查看列表查询
	 */
	async zmxxcklbcx(param: ZhmxxZmxxcklbcxParam) {
		logger.debug(param);
		const data = await tbZhmxx().query().orderBy('fbshj', 'desc');
		return data as ZhmxxZmxxcklbcxResult;
	},
};

export default zhmxx;
