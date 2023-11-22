import { ReactNode } from 'react';
import LayoutFill from './fill';

/**
 * 页面容器组件
 */
export default function LayoutBase({
	grow = 0,
	shrink = 0,
	wrap,
	direction,
	justifyContent,
	alignItems,
	children
}: {
	/**
	 * 子元素的增长系数
	 */
	grow?: number;
	/**
	 * 子元素的收缩系数
	 */
	shrink?: number;
	/**
	 * 空间不够时是否换行
	 */
	wrap?: boolean;
	/**
	 * 定义了浏览器之间，如何分配顺着弹性容器主轴 (或者网格行轴) 的元素之间及其周围的空间
	 */
	justifyContent: 'start' | 'end' | 'center' | 'space-between';
	/**
	 * 设置项目在其包含块中在交叉轴方向上的对齐方式。
	 */
	alignItems: 'start' | 'end' | 'center' | 'space-between';
	/**
	 * 主轴方向
	 */
	direction: 'row' | 'column';
	/**
	 * 子元素
	 */
	children: ReactNode;
}) {
	return <LayoutFill><div className='layout'>
		{children}
	</div>
		<style jsx>{`
.layout{
display: flex;
flex-direction: ${direction};
flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
flex-grow: ${grow};
flex-shrink: ${shrink};
justify-content: ${justifyContent};
align-items: ${alignItems};
height: 100%;
width: 100%;
}
`}</style>
	</LayoutFill>;
}
