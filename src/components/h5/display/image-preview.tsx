import { ImagePreview as Base } from '@arco-design/mobile-react';
import { ImagePreviewProps as Props } from '@arco-design/mobile-react/esm/image-preview';
import '@arco-design/mobile-react/esm/image-preview/style/css/index.css';

/**
 * 打开图片预览
 */
export default function ImagePreview(props: Props) {
	return <Base {...props} />;
}
