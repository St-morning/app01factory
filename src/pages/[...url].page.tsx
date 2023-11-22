import { NextPage, PageConfig } from 'next';
import Sys from './sys';

type IProps = {
};

/**
 * 404
 */
const pg000: NextPage<IProps> = () => {
	return <Sys code={404} title='Not Found' subTitle='糟糕……所请求页面不存在' />;
};

export const config: PageConfig = {
	amp: false
};

export default pg000;
