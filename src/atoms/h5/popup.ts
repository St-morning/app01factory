import { PopupSwiper } from '@arco-design/mobile-react';
import { ReactNode } from 'react';
import '@arco-design/mobile-react/esm/popup/style/css/index.css';
import '@arco-design/mobile-react/esm/popup-swiper/style/css/index.css';

export default function h5Popup(content: ReactNode) {
	return PopupSwiper.open({
		children: content,
		allowSwipeDirections: ['bottom'],
		exitDirection: 'bottom',
		onClose(scene?) {
		}
	});
}
