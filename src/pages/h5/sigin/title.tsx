import H5 from '../../../components/h5';
import getSysImgUrl from '../../api/sys/get-sys-img-url';

export default function Title({
	name
}: {
	name: string;
}) {
	return <>
		<div className='blk'>
			<H5.Layout.Row>
				<H5.Layout.Column span={16}>
					<H5.Layout.Row>
						<H5.Layout.Column><span className='title'>您好,</span></H5.Layout.Column>
					</H5.Layout.Row>
					<H5.Layout.Row>
						<H5.Layout.Column><span className='subtitle'>欢迎来到{name}系统</span></H5.Layout.Column>
					</H5.Layout.Row>
				</H5.Layout.Column>
				<H5.Layout.Column span={6}>
					<img className='img' src={getSysImgUrl('logo')} />
				</H5.Layout.Column>
			</H5.Layout.Row>
		</div>
		<style jsx>{`
.blk{
padding: 1rem 0;
}
.title{
font-family: AlibabaPuHuiTiM;
font-size: 32px;
color: #303030;
}
.subtitle{
font-family: AlibabaPuHuiTiR;
font-size: 16px;
font-weight: normal;
color: #303030;
}
`}</style>
	</>;
}
