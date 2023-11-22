import mmLogger from '../../../atoms/server/logger';
import doccode from '../../../atoms/doccode';

const logger = mmLogger('pages/api/controllers/code');

export type CodeUserParam = {};
export type CodeUserResult = string;

/**
 * 编码
 */
const code = {
	/**
	 * user
	 */
	async user(param: CodeUserParam) {
		logger.debug(param);
		const [code] = await doccode('u', 1, 3);	// u001
		return code as CodeUserResult;
	},
};

export default code;
