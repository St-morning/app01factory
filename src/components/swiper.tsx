import { Swiper as Base, SwiperProps, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Lazy } from 'swiper';


import 'swiper/swiper.min.css';
// import 'swiper/modules/navigation/navigation.min.css';
// import 'swiper/modules/pagination/pagination.min.css';
// import 'swiper/modules/scrollbar/scrollbar.min.css';

// SwiperCore.use([Autoplay, Keyboard, Lazy]);

/**
 * 轮播
 */
export default function Swiper(props: SwiperProps) {
	return <Base
		modules={[Autoplay, Keyboard, Lazy]}
		slidesPerView={1}
		autoplay
		keyboard
		loop
		lazy
		preloadImages
		{...props}
	/>;
}

Swiper.Slide = SwiperSlide;
