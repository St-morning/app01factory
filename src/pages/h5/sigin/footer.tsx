
export default function Footer() {
	return <>
		<div className='footer'>
			<span>
				登录代表同意<span className='link'>《服务协议》</span>及<span className='link'>《隐私协议》</span>
			</span>
			<span>
				登录前请阅读
			</span>
		</div>
		<style jsx>{`
.link{
color: #1A66FF;
}
.footer{
display: flex;
flex-direction: column;
justify-content: center;
font-family: AlibabaPuHuiTiR;
font-size: 11px;
font-weight: normal;
line-height: 16px;
text-align: center;
width: 100%;
}
`}</style>
	</>;
}
