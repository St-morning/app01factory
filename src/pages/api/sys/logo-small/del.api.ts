import { PageConfig } from 'next';
import baseSysDel from '../base/del';
import key from './key';

/**
 * 删除门户小图片
 */
const handler = baseSysDel(key());

export const config: PageConfig = {};

export default handler;
