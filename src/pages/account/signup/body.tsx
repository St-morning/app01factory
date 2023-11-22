import getSysImgUrl from '../../api/sys/get-sys-img-url';
import Dlmb from './dlmb';

export default function Body({
	name,
	redirect
}: {
	name: string;
	redirect: string;
}) {
	return <>
		<div className="content">
			<div className="login">
				<img className="logo" src={getSysImgUrl('logo_large')} alt="logo" />
				<span className="txt">{name}</span>
				<span className="hint">用户注册</span>
				<Dlmb />
			</div>
		</div>
		<style jsx>{`
.content {
display: flex;
width: 100vw;
height: 100vh;
justify-content: center;
align-items: center;
background-image:url(${getSysImgUrl('background')});
background-size: 100% 100%;
}

.login {
width: 438px;
display: flex;
flex-direction: column;
align-items: center;
background-color: #FFF;
border: 1px solid #96CDF5;
border-radius: 10px;
padding: 2rem 5rem;
}
.logo {
width: 124px;
height: 124px;
margin-bottom:18px;
}

.txt {
font: 28px/28px normal;
font-weight: 400;
}

.hint {
width: 100%;
font:400 20px/28px normal; 
color: #3E4D5C;
margin-top: 30px;
margin-bottom: 10px;
border-bottom: 1px solid #000;
}

		`}</style>
	</>;
}
