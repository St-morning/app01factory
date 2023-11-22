import getSize from './getSize';

export default function MyIcon({
	color
}: {
	color: string;
}) {
	const { width, height } = getSize();
	return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
		<g>
			<path d="M0,19.25C0,15.1999,3.28325,11.9167,7.33333,11.9167C11.3834,11.9167,14.6667,15.1999,14.6667,19.25L0,19.25ZM7.33333,11C4.29458,11,1.83333,8.53875,1.83333,5.5C1.83333,2.46125,4.29458,0,7.33333,0C10.3721,0,12.8333,2.46125,12.8333,5.5C12.8333,8.53875,10.3721,11,7.33333,11Z" fill={color} fillOpacity="1" />
		</g>
	</svg>;
}
