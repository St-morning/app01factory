import { Breadcrumb, Input } from '@arco-design/web-react';
import { ReactNode } from 'react';
import Link from './link';

/**
 * 底背景+标题+搜索区
 */
export default function MainContainer(
	{
		icon,
		title,
		subTitle,
		search,
		searchBarChildren,
		parents = [],
		children
	}: {
		/**
		 * 标题左侧图标
		 */
		icon?: string | ReactNode;
		/**
		 * 页面标题
		 */
		title: ReactNode;
		/**
		 * 祖先页面
		 */
		parents?: Array<{
			/**
			 * 祖先页面名称，一般不超过4个字
			 */
			name: string;
			/**
			 * 祖先页面地址，用以点击返回
			 */
			url: string;
		}>;
		/**
		 * 副标题
		 */
		subTitle?: ReactNode;
		/**
		 * 搜索输入框,不传不显示
		 */
		search?: {
			/**
			 * 搜索框中的值
			 */
			value?: string;
			/**
			 * 搜索输入框显示内容，默认`请输入`
			 */
			placeholder?: string;
			/**
			 * 搜索事件
			 */
			onSearch?(value: string): void;
		};
		/**
		 * 搜索工具栏左侧内容
		 */
		searchBarChildren?: ReactNode;
		/**
		 * 页面主内容
		 */
		children: ReactNode;
	}) {
	const elIcon = (() => {
		if (typeof icon === 'string') {
			return <img src={icon}></img>;
		}
		return icon;
	})();
	return <>
		<div className='mainbg'>
			<div className='head'>
				{elIcon}
				<Breadcrumb maxCount={5}>
					{parents.map((parent) => {
						return <Breadcrumb.Item key={parent.url}><Link href={parent.url}><span className='parentText'>{parent.name}</span></Link></Breadcrumb.Item>;
					})}
					<Breadcrumb.Item>
						<span className='title'>{title}</span>
					</Breadcrumb.Item>
				</Breadcrumb>
				{subTitle}
			</div>
			<div className='content'>
				{(searchBarChildren || search) && <div className='row'>
					<div className='sel'>{searchBarChildren}</div>
					<div className='sea'>
						{search && <Input.Search
							searchButton='搜索'
							allowClear
							defaultValue={search.value}
							placeholder={search.placeholder || '请输入'}
							style={{ width: 350 }}
							onSearch={(value) => {
								search.onSearch && search.onSearch(value);
							}}
							onClear={() => {
								search.onSearch && search.onSearch('');
							}}
						/>}
					</div>
				</div>}
				<div className='body'>
					{children}
				</div>
			</div>
		</div>
		<style jsx>{`
.mainbg{
display: flex;
flex-direction: column;
flex-grow: 1;
flex-shrink: 1;
overflow: auto;
}
.content{
display: flex;
flex-direction: column;
flex-grow: 1;
flex-shrink: 1;
overflow: auto;
padding: 1rem 0;
}
.head{
display: flex;
flex-direction: row;
align-items: center;
flex-grow: 0;
flex-shrink: 0;
height: 2.9375rem;
white-space: nowrap;
}
.title{
display:flex;
flex-direction: row;
justify-content: flex-start;
font-size: 1.125rem;
color: #000;
margin: 0 0.5rem;
}
.row{
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-color: #FFFFFF;
padding: 1rem .625rem 0.1rem .625rem;
}
.sea{
margin-right:0.45rem;
flex-grow: 0;
}
.sel{
margin-left:0.7rem;
flex-grow: 1;
}
.parentText{
font-family: 'Microsoft YaHei UI';
font-style: normal;
font-weight: 400;
font-size: 1.125rem;
line-height: 1.75rem;
}
.body{
display: flex;
flex-grow: 1;
overflow-x: hidden;
overflow-y: auto;
}
`}</style>
	</>;
}
