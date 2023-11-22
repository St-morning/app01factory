import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAccountResetPsw from '../../api/account/reset-psw';

export default function Resetpassword({ userid }: { userid: string; }) {
	return <>
		<Ui.Button.Modal title={'重置密码'} onOK={async () => {
			// 判断res的值
			const res = await apiAccountResetPsw({ userid });
			if (res) {
				ui.Message.success({
					content: '重置密码成功',
					closable: true
				});
			}
		}} >确定重置密吗?</Ui.Button.Modal>
	</>;
}
