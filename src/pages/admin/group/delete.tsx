import React from 'react';
import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminGroupDel, { Message as M1, Result as R1 } from '../../api/admin/group/del';

export default function Delete({
	groupid,
	onChange
}: {
	groupid: string;
	onChange(): void
}
) {
	return <>
		{/* 对话框 */}
		<Ui.Button.Prompt
			title='删除'
			// 确定删除
			onConfirm={async () => {
				await apiAdminGroupDel({ groupid });
				ui.Message.success({
					content: '删除成功',
					closable: true
				});
				onChange();
			}}
		>
			是否确定删除
		</Ui.Button.Prompt>
	</>;
}
