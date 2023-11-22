import { PageConfig } from 'next';
import baseSysDel from '../base/del';
import key from './key';

/**
 * 删除现场评审背景图片
 */
const handler = baseSysDel(key());

export const config: PageConfig = {};

export default handler;
