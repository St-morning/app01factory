import getSize from './getSize';

export default function LocateIcon({
	color
}: {
	color: string;
}) {
	const { width, height } = getSize();
	return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
		<g>
			<path d="M20.4853,20.4852L12,28.9706L3.51467,20.4852C-1.17158,15.7989,-1.17155,8.20097,3.51474,3.5147C8.20103,-1.17157,15.799,-1.17157,20.4853,3.5147C25.1716,8.20097,25.1716,15.7989,20.4853,20.4852ZM12,14.6666C13.4728,14.6666,14.6667,13.4727,14.6667,11.9999C14.6667,10.5271,13.4728,9.33323,12,9.33323C10.5272,9.33323,9.33333,10.5271,9.33333,11.9999C9.33333,13.4727,10.5272,14.6666,12,14.6666Z" fill={color} fillOpacity="1" />
		</g>
	</svg>;
}
