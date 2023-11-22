import res from '../../../atoms/res';

export default function Body() {
	return <>
		<span className="title"></span>
		<div className="content">
			<img src={res['/images/sys/norole.png']} alt="默认图片" />
			<span className="txt">
				请联系管理员为你配置菜单权限！
			</span>
		</div>
		<style jsx>{`
.title {
width: 1250px;
height:22.86px ;
margin:10px 0;
}
.content {
height: 660px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #FFF;
margin-bottom: 5px;
}

.txt {
font:normal 400 24px/20px normal;
color:#C4C4C4;
margin-top: 16px;
}
		`}</style>
	</>;
}
