import { Tabs as Base } from '@arco-design/mobile-react';
import { TabsProps as Props } from '@arco-design/mobile-react/esm/tabs';
import '@arco-design/mobile-react/esm/tabs/style/css/index.css';

/**
 * 导航
 * 用于让用户在不同的视图中进行切换。为优化移动端渲染性能，如有替换DOM、发请求更新数据等操作，请在`onAfterChange`而非`onChange`回调中进行。
 */
export default function Tabs(props: Props) {
	return <Base {...props} />;
}
