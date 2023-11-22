import { Message } from '@arco-design/web-react';

const ui = {
	Message: {
		...Message,
		showError(error: unknown) {
			Message.error((error as Error).message);
		}
	},
};

export default ui;
