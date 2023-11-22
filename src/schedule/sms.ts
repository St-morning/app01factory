import querystring from 'querystring'; // 引入querystring模块
import fetch from 'node-fetch';
import mmLogger from '../atoms/server/logger';

const logger = mmLogger('/schedule/device-is-online');

type IData = {
	appKey: string;
	appSecret: string;
	/**
	 * APP接入地址(在控制台"应用管理"页面获取)+接口访问URI
	 */
	realUrl: string;
	/**
	 * 国内短信签名通道号或国际/港澳台短信通道号
	 */
	sender: string;
	/**
	 * 模板ID
	 */
	templateId: string;
	/**
	 * 签名名称
	 * 条件必填,国内短信关注,当templateId指定的模板类型为通用模板时生效且必填,必须是已审核通过的,与模板类型一致的签名名称
	 * 国际/港澳台短信不用关注该参数
	 */
	signature: string;
	/**
	 * 短信状态报告接收地址,推荐使用域名,为空或者不填表示不接收状态报告
	 */
	statusCallBack?: string;
};

/**
 * 发送短信
 * @see https://support.huaweicloud.com/devg-msgsms/sms_04_0008.html
 */
export default async function sms(data: IData) {
	logger.info('开始发送短信');
	try {
		// 必填,接收者手机号码
		const receiver = ['+8612345678901', '13456789012'].filter((no) => {
			return /^(\+86)?1\d{10}$/.test(no);
		}).map((no) => {
			if (/\+86/.test(no)) {
				return no;
			}
			return `+86${no}`;
		}).join(','); //短信接收人号码

		if (receiver.length === 0) {
			return;
		}

		/**
		 * 选填,使用无变量模板时请赋空值 const templateParas = '';
		 * 单变量模板示例:模板内容为"您的验证码是${1}"时,templateParas可填写为'["369751"]'
		 * 双变量模板示例:模板内容为"您有${1}件快递请到${2}领取"时,templateParas可填写为'["3","人民公园正门"]'
		 * 模板中的每个变量都必须赋值，且取值不能为空
		 * 查看更多模板和变量规范:产品介绍>模板和变量规范
		 */
		const templateParas = ['369751']; // 模板变量，此处以单变量验证码短信为例，请客户自行生成6位验证码，并定义为字符串类型，以杜绝首位0丢失的问题（例如：002569变成了2569）。

		// 请求Body,不携带签名名称时,signature请填null
		const body = buildRequestBody(data.sender, receiver, data.templateId, templateParas, data.signature, data.statusCallBack);
		const res = await fetch(data.realUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'WSSE realm="SDP",profile="UsernameToken",type="Appkey"',
				'X-WSSE': buildWsseHeader(data.appKey, data.appSecret)
			},
			body
			// rejectUnauthorized: false //为防止因HTTPS证书认证失败造成API调用失败,需要先忽略证书信任问题
		});

		const ret = await res.text();
		logger.debug('调用短信返回信息', ret);
	} catch (error) {
		logger.error(error);
	}
	logger.info('结束发送短信');
}

/**
 * 构造请求Body体
 * @param signature | 签名名称,使用国内短信通用模板时填写
 */
function buildRequestBody(sender: string, receiver: string, templateId: string, templateParas: unknown[], signature: string, statusCallBack = '') {
	if (signature !== null && signature.length > 0) {
		return querystring.stringify({
			'from': sender,
			'to': receiver,
			'templateId': templateId,
			'templateParas': JSON.stringify(templateParas),
			'statusCallback': statusCallBack,
			'signature': signature
		});
	}

	return querystring.stringify({
		'from': sender,
		'to': receiver,
		'templateId': templateId,
		'templateParas': JSON.stringify(templateParas),
		'statusCallback': statusCallBack
	});
}

/**
 * 构造X-WSSE参数值
 */
function buildWsseHeader(appKey: string, appSecret: string) {
	const crypto = require('crypto');
	const util = require('util');

	const time = new Date(Date.now()).toISOString().replace(/.[0-9]+Z/, 'Z'); //Created
	const nonce = crypto.randomBytes(64).toString('hex'); //Nonce
	const passwordDigestBase64Str = crypto.createHash('sha256').update(nonce + time + appSecret).digest('base64'); //PasswordDigest

	return util.format('UsernameToken Username="%s",PasswordDigest="%s",Nonce="%s",Created="%s"', appKey, passwordDigestBase64Str, nonce, time);
}
