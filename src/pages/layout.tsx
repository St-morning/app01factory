import { ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import api from '../atoms/api';
import Logo from './layout/logo';
import Header from './layout/header';
import apiAccountGetPageInfo, { Message as M1, Result as R1 } from './api/account/get-page-info';
import { SysMenuParam1 } from './api/controllers/sys/menu';
import urls from '../atoms/urls';
import Ui from '../components/ui';

type MenuData = SysMenuParam1;

export default function PageLayout({
	children,
	pathname: defaultPathName
}: {
	children: ReactNode;
	pathname: string;
}) {
	const [pathname, setpathname] = useState(defaultPathName);
	// 获取系统信息，菜单
	const [data, setdata] = useState({
		menus: [],
		user: {},
		appname: process.env.NEXT_PUBLIC_APP_NAME
	} as R1);
	useEffect(() => {
		void (async () => {
			const data = await apiAccountGetPageInfo({});
			setdata(data);
		})();
	}, []);
	const menudata = data.menus;

	// 菜单-暂只考虑二级菜单
	const [rootmenu, setrootmenu] = useState([] as MenuData[]);
	/**
	 * 获取子级菜单
	 * @param pid 
	 */
	function getsub(pid: string) {
		return menudata.filter((it) => {
			return it.pid === pid;
		});
	}
	const [selectedKeys, setselectedKeys] = useState<string[]>([]);
	const [openKeys, setopenKeys] = useState<string[]>([]);
	useEffect(() => {
		void (() => {
			if (menudata && menudata.length > 0) {
				const root = menudata.filter((it) => {
					return !it.pid;
				});
				const sel = menudata.find((it) => {
					return pathname.indexOf(it.url) === 0;
				});
				if (sel) {
					setselectedKeys([sel.menuid]);
					setopenKeys(sel.pid ? [sel.pid] : []);
				} else {
					setselectedKeys([]);
					setopenKeys([]);
				}
				setrootmenu(root);
			}
		})();
	}, [menudata, pathname]);
	useEffect(() => {
		Router.events.on('routeChangeComplete', (url: string) => {
			if (urls.isLocal(url)) {
				setpathname(urls.parsePath(url).pathname);
			}
		});
	}, []);
	return <>
		<div className='layout'>
			<div className='left'>
				<Logo appname={data.appname} />
				{rootmenu.length > 0 && <Ui.Menu
					style={{ overflowY: 'auto' }}
					defaultSelectedKeys={selectedKeys}
					defaultOpenKeys={openKeys}
				>
					{rootmenu.map((root) => {
						return getmenuitem(root, getsub(root.menuid));
					})}
				</Ui.Menu>}
			</div>
			<div className='right'>
				<Header
					appname={data.appname}
					avatar={data?.user?.ext?.avatar}
					username={data?.user?.username}
					rolename={data?.user?.rolename}
				/>
				<div className='page'>
					{children}
				</div>
			</div>
		</div>
		<style jsx>{`
.layout{
display: flex;
flex-direction: row;
height: 100vh;
width: 100vw;
background-color: #FFFFFF;
}
.left{
display: flex;
flex-direction: column;
min-height: 100vh;
min-width: 13rem;
flex-grow: 0;
flex-shrink: 0;
}
.right{
display: flex;
flex-direction: column;
flex-grow: 1;
flex-shrink: 1;
}
.page{
display: flex;
flex-direction: column;
padding: 1rem;
background-color: #F7F8FA;
flex-grow: 1;
flex-shrink: 1;
overflow: auto;
}
		`}</style>
	</>;
}

/**
 * 获取菜单项
 * @param data 
 */
function getmenuitem(data: MenuData, subdata: MenuData[]) {
	if (subdata.length > 0) {
		return <Ui.Menu.SubMenu key={data.menuid} title={<Icon data={data} />}>
			{subdata.map((it) => {
				return <Ui.Menu.Item key={it.menuid}>
					{it.url && <Value data={it} />}
				</Ui.Menu.Item>;
			})}
		</Ui.Menu.SubMenu>;
	}
	return <Ui.Menu.Item key={data.menuid}>
		{data.url && <Value data={data} />}
	</Ui.Menu.Item>;
}

/**
 * 菜单项内容
 * @param param0 
 * @returns 
 */
function Value(
	{
		data
	}: {
		data: MenuData
	}) {
	return <>
		<Ui.Link href={data.url}>
			<Icon data={data} />
		</Ui.Link>
	</>;
}

/**
 * 菜单项title
 * @param param0 
 * @returns 
 */
function Icon(
	{
		data
	}: {
		data: MenuData
	}) {
	return <>
		<div className='row'>
			{data.icon && <img className={data.pid ? 'img1' : 'img'} src={`${api['/api/file/id']}/${data.icon}`} />}
			<span className={data.pid ? 'lbl1' : 'lbl'}>{data.menuname}</span>
		</div>
		<style jsx>{`
.row{
display: flex;
flex-direction: row;
align-items: center;
}
.img{
height: 1.125rem;
width: 1.125rem;
}
.img1{
margin-left: 1rem;
height: 1rem;
width:1rem;
}
.lbl{
font-size: 1rem;
margin-left: 0.5rem;
}
.lbl1{
font-size: 0.875rem;
margin-left: 0.5rem;
}
`}</style>
	</>;
}
