import { join } from 'path';
import { pinyin } from 'pinyin-pro';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/controllers/gongju');

export type GongjuParam1 = string;
export type GongjuParam2 = number;

/**
 * 工具
 */
const gongju = {
	/**
	 * 获取汉字拼音，小于8个字母使用全拼
	 */
	getPinYin(zh: string, maxLen = 8): string {
		logger.debug(zh);
		zh = this.removeSymbols(zh);
		return join(...zh.split('/').map((zh) => {
			const all = pinyin(zh, {
				pattern: 'pinyin',
				toneType: 'none',
				type: 'all'
			});
			const whole = all.map((it) => {
				return it.isZh ? it.pinyin : it.origin;
			}).join('');
			if (whole.length <= maxLen) {
				return whole;
			}
			const shengMu = all.map((it) => {
				// 如果是没有声母的汉字，inittial为空
				return it.isZh ? (it.initial || it.first) : it.origin;
			}).join('');
			if (shengMu.length <= maxLen) {
				return shengMu;
			}
			const shouXieZiMu = all.map((it) => {
				return it.isZh ? it.first : it.origin;
			}).join('');
			return shouXieZiMu;
		}));
	},
	/**
	 * 移除中文符号
	 */
	removeSymbols(str: string) {
		return str.replace(/，|。|？|！|@|#|￥|%|…|\*|（|）|\{|\}|·|「|~|`|《|》|<|>|,|\.|\[|\]|\{|\}|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|-|=|\s/g, '');
	}
};

export default gongju;
