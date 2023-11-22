import { Notify } from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/popup/style/css/index.css';
import '@arco-design/mobile-react/esm/notify/style/css/index.css';
import { ReactNode } from 'react';

let handler = null as {
	close(): void;
};
// const cls = 'dfactory01-notify';
let container: HTMLDivElement;

function getNotify(type: 'info' | 'success' | 'error' | 'warn') {
	return (content: ReactNode, marginTop = '1rem', duration = 3000) => {
		if (handler) {
			handler.close();
			handler = null;
		}
		handler = Notify[type]({
			duration,
			content,
			getContainer() {
				// let container = document.querySelector(`.${cls}`) as HTMLDivElement;
				// if (!container) {
				container = document.createElement('div');
				container.style.position = 'absolute';
				container.style.zIndex = '9999';
				container.style.width = '100vw';
				container.style.marginTop = marginTop;
				// container.style.height = '100vh';
				// container.className = cls;
				// document.body.appendChild(container);
				document.body.insertAdjacentElement('afterbegin', container);
				// }
				return container;
			},
			onClose() {
				handler = null;
				if (container) {
					container.remove();
					container = null;
				}
			}
		});
		return handler;
	};
}

export default function h5Notify(content: ReactNode, type: 'info' | 'success' | 'error' | 'warn', marginTop = '1rem', duration = 3000) {
	return getNotify(type)(content, marginTop, duration);
}

h5Notify.info = getNotify('info');
h5Notify.success = getNotify('success');
h5Notify.error = getNotify('error');
h5Notify.warn = getNotify('warn');
