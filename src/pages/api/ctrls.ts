import code from './controllers/code';
import sysConfig from './controllers/sys/config';
import sysFile from './controllers/sys/file';
import sysGroup from './controllers/sys/group';
import sysLog from './controllers/sys/log';
import sysMenu from './controllers/sys/menu';
import sysRole from './controllers/sys/role';
import sysSession from './controllers/sys/session';
import sysSessionCookie from './controllers/sys/session/cookie';
import sysTbimpexp from './controllers/sys/tbimpexp';
import sysUser from './controllers/sys/user';
import sysUtils from './controllers/sys/utils';
import zhmxx from './controllers/zhmxx';

const ctrls = {
	zhmxx,
	code,
	sysConfig,
	sysFile,
	sysGroup,
	sysLog,
	sysMenu,
	sysRole,
	sysSession,
	sysTbimpexp,
	sysUser,
	sysUtils,
	sysSessionCookie
};
export default ctrls;
