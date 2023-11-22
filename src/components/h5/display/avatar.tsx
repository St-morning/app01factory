import { Avatar as Base } from '@arco-design/mobile-react';
import { AvatarProps as Props } from '@arco-design/mobile-react/esm/avatar';
import '@arco-design/mobile-react/esm/avatar/style/css/index.css';

/**
 * 头像
 * 头像展示组件，支持圆形和方形两种形状，支持图片文字头像，支持五种尺寸。
 */
export default function Avatar(props: Props) {
	return <Base {...props} />;
}
