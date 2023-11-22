import getMaskID from './getMaskID';
import getSize from './getSize';

export default function HomeIcon({
	color
}: {
	color: string;
}) {
	const { width, height } = getSize();
	const maskID = getMaskID();
	return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
		<defs>
			<mask id={maskID}>
				<g>
					<path d="M11,0L21,5.77601L21,22.5789L1,22.5789L1,5.77601L11,0ZM11,2.35437L3,6.97484L3,20.5263L12,20.5263L12,11.2895L15,11.2895L15,20.5263L19,20.5263L19,6.97587L11,2.35437Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="1" />
				</g>
			</mask>
		</defs>
		<g mask={`url(#${maskID})`}>
			<rect width={width} height={height} fill={color} fillOpacity="1" />
		</g>
	</svg>;
}
