import { PageConfig } from 'next';
import baseSysDel from '../base/del';
import key from './key';

/**
 * 删除匿名头像
 */
const handler = baseSysDel(key());

export const config: PageConfig = {};

export default handler;
