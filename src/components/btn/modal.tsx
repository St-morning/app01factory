import { Message, Modal } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import res from '../../atoms/res';
import LabelInfo from '../label/info';
import Btnicon from './icon';
/**
 * 带弹窗按钮
 */
export default function ButtonModal({
	title,
	dlgTitle = '提示',
	children,
	dlgOkText,
	icon,
	dlgCancelText,
	buttonicon,
	width = '520px',
	onOK,
	onCancel
}: {
	/**
	 * 按钮标题
	 */
	title: ReactNode;
	/**
	 * 按钮左侧图标
	 */
	icon?: string | ReactNode;
	/**
	 * 提示框标题,默认为`提示`
	 */
	dlgTitle?: ReactNode;
	/**
	 * 提示内容
	 */
	children: ReactNode;
	/**
	 * 确定按钮文字
	 */
	dlgOkText?: string;
	/**
	 * 取消按钮文字
	 */
	dlgCancelText?: string;
	/**
	 * button带边框/不带边框样式
	 */
	buttonicon?: boolean;
	/**
	 * 确定事件
	 */
	/**
	 * 宽度:默认520px
	 */
	width?: string;
	onOK(): Promise<void> | void;
	onCancel?(): Promise<void> | void;
}) {
	const [visible, setvisible] = useState(false);
	const [confirmLoading, setconfirmLoading] = useState(false);
	const elIcon = typeof icon === 'string' ? <img src={icon} /> : icon;
	return <>
		{
			buttonicon ?
				< Btnicon title={title} icon={res['/images/add.png']} onClick={() => {
					setvisible(true);
				}} />
				:
				<div className="button" onClick={() => {
					setvisible(true);
				}} >
					<div className='btnLabels'>
						<span className='btnLabel'>{elIcon}</span>
						<span className='btnLabel'>{title}</span>
					</div>
				</div>
		}

		<Modal
			title={<LabelInfo title={dlgTitle} />}
			style={{ top: 0, width: width }}
			alignCenter={false}
			visible={visible}
			confirmLoading={confirmLoading}
			cancelText={dlgCancelText}
			okText={dlgOkText}
			onCancel={async () => {
				onCancel && await onCancel();
				setvisible(false);
			}}
			onOk={async () => {
				setconfirmLoading(true);
				try {
					await onOK();
					setvisible(false);
				} catch (error) {
					Message.error({
						content: (error as Error).message,
						closable: true
					});
				}
				finally {
					setconfirmLoading(false);
				}
			}}
		>
			<div className='form'>
				{children}
			</div>
		</Modal>
		<style jsx>{`
.btnLabels{
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
}
.btnLabel{
display: flex;
align-items: center;
}
.form{
overflow-x: hidden;
overflow-y: auto;
max-height: 70vh;
}

.button {
padding: 0.5rem;
cursor: pointer;
font:normal 400 .875rem normal;
color:#3F6FF6;
}
`}</style>
	</>;
}
