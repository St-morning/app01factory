import { Loading as Base } from '@arco-design/mobile-react';
import { LoadingProps as Props } from '@arco-design/mobile-react/esm/loading';
import '@arco-design/mobile-react/esm/loading/style/css/index.css';

/**
 * 反馈
 * 加载中组件，分为四种类型，`circle`为环形，`arc`为弧线，`spin`为旋转，`dot`为圆点。所有类型均可定制颜色，环形和弧线类型可定制线圈半径及粗细，旋转和圆点类型可定制内部元素透明度。
 */
export default function Loading({ type = 'circle', ...props }: Props) {
	return <Base {...props} type={type} />;
}
