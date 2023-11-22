import pages from '../../atoms/pages';
import Ui from '../../components/ui';
import getSysImgUrl from '../api/sys/get-sys-img-url';

export default function Logo({
	appname
}: {
	appname: string;
}) {
	return <>
		<Ui.Link href={pages['/admin/sys/systemstting']} >
			<div className='sys' >
				<img className='img' src={getSysImgUrl('logo')} />
				<span className='syslbl'>{appname}</span>
			</div>
		</Ui.Link>
		<style jsx>{`
.sys{
cursor: pointer;
display: flex;
flex-direction: column;
align-items: center;
height: 3.75rem;
margin-left: 0.5rem;
margin-top: 9px;
}
.img{
cursor: pointer;
height: 2rem;
width: 2rem;
margin-left: 0.5rem;
border-radius: 3.125rem;
}
.syslbl{
color: #1D2129;
font:normal 400 16px/28px normal;
margin-left: 0.5rem;
margin-top: 1px;
}
`}</style>
	</>;
}
