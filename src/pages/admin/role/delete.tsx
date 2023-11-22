//删除操作
import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminRoleDel, { Message as M1, Result as R1 } from '../../api/admin/role/del';

export default function Delete({
	roleid,
	onChange
}: {
	roleid: string;
	onChange(): void
}) {
	return <>
		<Ui.Button.Modal
			title='删除'
			onOK={async () => {
				await apiAdminRoleDel({
					roleid
				});
				ui.Message.success({
					content: '删除成功',
					closable: true
				});
				onChange();
			}}
		>
			删除角色会同步删除与之相关的其它信息,是否确认删除
		</Ui.Button.Modal>
	</>;
}
