import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminUserDisable from '../../api/admin/user/disable';
import apiAdminUserEnable from '../../api/admin/user/enable';

export default function DisableEnable({ status, userid, onClick }: { status: number, userid: string, onClick(): void }) {
	const title = status === 1 ? '作废' : '启用';
	return <>
		{/* 作废/启用? 点击时会弹出窗口*/}
		<Ui.Button.Modal
			title={title}
			onOK={async () => {
				// 判断state的值,1作废,0启用
				if (status === 1) {
					// 调用作废服务
					await apiAdminUserDisable({
						userid
					});
					ui.Message.success({
						content: '作废成功',
						closable: true
					});
					onClick();
				}
				// 调用启用服务
				if (status === 0 || status === null) {
					await apiAdminUserEnable({
						userid
					});
					ui.Message.success({
						content: '启用成功',
						closable: true
					});
					onClick();
				}

			}} >确定{title}吗?</Ui.Button.Modal>
	</>;
}
