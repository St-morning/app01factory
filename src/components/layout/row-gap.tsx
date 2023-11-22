import LayoutCol from './column';
import LayoutRow from './row';

/**
 * 行间隔
 */
export default function LayoutRowGap({
	height = '2rem'
}: {
	/**
	 * 间隔的高度，需带单位,默认2rem
	 */
	height?: string;
}) {
	return <LayoutRow>
		<LayoutCol>
			<div className='gap'></div >
		</LayoutCol>
		<style jsx>{`
.gap{
height: ${height}
}
`}</style>
	</LayoutRow>;
}
