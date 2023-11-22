import { PopupSwiper as Base } from '@arco-design/mobile-react';
import { PopupSwiperProps as Props } from '@arco-design/mobile-react/esm/popup-swiper';
import '@arco-design/mobile-react/esm/popup/style/css/index.css';
import '@arco-design/mobile-react/esm/popup-swiper/style/css/index.css';

/**
 * 弹出层
 */
export default function PopupSwiper(props: Props) {
	return <Base
		{...props}
	/>;
}
