import React, { useState } from 'react';
import { Data } from './index.page';
import SysName from './sys-name';
import Img from './img';
import checkRequired from '../../../../atoms/check-required';
import apiSysSave from '../../../api/sys/save';
import Ui from '../../../../components/ui';
import ui from '../../../../atoms/ui';

export default function Body({
	init
}: {
	init: Data;
}) {
	const [data, setdata] = useState(init);
	console.log(data);

	// 根据不同的键值写入不同的数据
	function setData(key: keyof Data, value: string) {
		setdata((data) => {
			return {
				...data,
				[key]: value
			};
		});
	}
	// 保存服务
	async function dataSave() {
		try {
			checkRequired(data, 'sys_name', '系统名称');
			await apiSysSave(data);
			ui.Message.success('保存成功');
		} catch (err) {
			ui.Message.error((err as Error).message);
		}
	}

	return <>
		<Ui.Form>
			<Ui.Form.Row>
				<Ui.Form.Column span={8}>
					<SysName
						value={data.sys_name}
						onChange={(value) => {
							setData('sys_name', value);
						}}
					/>
				</Ui.Form.Column>
			</Ui.Form.Row>
			<Ui.Form.Row>
				<Ui.Form.Column span={8}>
					<Img
						label='登录底部背景图片'
						width={600}
						height={400}
						data={data}
						sysKeyType='background'
						onChange={(fid) => {
							setData('background', fid);
						}}
						onDelete={() => {
							setData('background', null);
						}}
					/>
				</Ui.Form.Column>
			</Ui.Form.Row>
			<Ui.Form.Row>
				<Ui.Form.Column span={8}>
					<Img
						label='系统登录Logo'
						width={124}
						height={124}
						data={data}
						sysKeyType='logo_large'
						onChange={(fid) => {
							setData('logo_large', fid);
						}}
						onDelete={() => {
							setData('logo_large', null);
						}}
					/>
				</Ui.Form.Column>
			</Ui.Form.Row>
			<Ui.Form.Row>
				<Ui.Form.Column span={8}>
					<Img
						label='系统门户Logo'
						width={32}
						height={32}
						data={data}
						sysKeyType='logo'
						onChange={(fid) => {
							setData('logo', fid);
						}}
						onDelete={() => {
							setData('logo', null);
						}}
					/>
				</Ui.Form.Column>
			</Ui.Form.Row>
			<Ui.Form.Row>
				<Ui.Form.Column offset={21}>
					<Ui.Button.Save onClick={dataSave} />
				</Ui.Form.Column>
			</Ui.Form.Row>
		</Ui.Form>
	</>;
}
