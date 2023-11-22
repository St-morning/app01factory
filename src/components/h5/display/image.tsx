import { Image as Base } from '@arco-design/mobile-react';
import { ImageProps as Props } from '@arco-design/mobile-react/esm/image';
import '@arco-design/mobile-react/esm/image/style/css/index.css';
import { useState } from 'react';
import ImagePreview from './image-preview';

/**
 * 图片
 * 增强版的 img 标签，提供多种图片填充模式，支持图片加载中提示、加载失败提示。
 */
export default function Image({ onClick, preview, src, ...props }: Props & { preview?: boolean }) {
	const [idx, setidx] = useState(-1);
	return <>
		<Base
			{...props}
			src={src}
			onClick={(e) => {
				onClick && onClick(e);
				if (preview) {
					setidx(0);
				}
			}}
		/>
		{preview && <ImagePreview
			openIndex={idx}
			close={() => {
				setidx(-1);
			}}
			images={[{
				src
			}]}
		/>}
	</>;
}
