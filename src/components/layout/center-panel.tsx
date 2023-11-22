import { ReactNode } from 'react';

/**
 * 上下左右居中面板
 */
export default function LayoutCenterPanel({
	children,
	fill,
	width
}: {
	/**
	 * 宽度，可以为 100%
	 */
	width: string;
	fill?: false;
	children: ReactNode;
} | {
	/**
	 * 宽度，可以为 100%
	 */
	width?: undefined;
	/**
	 * 是否填满
	 */
	fill: true;
	children: ReactNode;
}) {
	width = fill ? '100%' : width;
	return <div className="hang">
		<div className="lie">
			<div className='neirong'>
				{children}
			</div>
		</div>
		<style jsx>{`
/** 行 */
.hang{
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
}
/** 列 */
.lie{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
/** 内容 */
.neirong{
width: ${width};
}
`}</style>
	</div>;
}
