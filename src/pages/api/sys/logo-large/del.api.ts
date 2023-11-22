import { PageConfig } from 'next';
import baseSysDel from '../base/del';
import key from './key';

/**
 * 删除系统登录logo左侧大图片
 */
const handler = baseSysDel(key());

export const config: PageConfig = {};

export default handler;
