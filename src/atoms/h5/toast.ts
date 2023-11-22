import { Toast } from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/toast/style/css/index.css';
import { ReactNode } from 'react';

let handler = null as {
	close(): void;
};

export default function h5Toast(content: ReactNode, duration = 1000) {
	if (handler) {
		handler.close();
		handler = null;
	}
	handler = Toast.toast({
		duration,
		content,
		onClose() {
			handler = null;
		}
	});
	return handler;
}
