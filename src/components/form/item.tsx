import { Grid } from '@arco-design/web-react';
import { ReactNode } from 'react';
import FormItemAvatar from './item/avatar';
import FormItemCheckbox from './item/checkbox';
import FormItemDatePicker from './item/date-picker';
import FormItemEmail from './item/email';
import FormItemID from './item/id';
import FormItemImage from './item/image';
import FormItemImages from './item/images';
import FormItemInput from './item/input';
import FormItemInputNumber from './item/number';
import FormItemPassword from './item/password';
import FormItemPhoneNo from './item/phoneno';
import FormItemRadio from './item/radio';
import FormItemRichEdit from './item/rich-edit';
import FormItemSearch from './item/search';
import FormItemSelect from './item/select';
import FormItemSex from './item/sex';
import FormItemText from './item/text';
import FormItemTextArea from './item/textarea';
import FormItemVideo from './item/video';
import FormItemVideos from './item/videos';

export type IFormItemProps = {
	label?: ReactNode;
	/**
	 * 后缀标签。通常用于单位显示
	 */
	labelAfter?: ReactNode;
	required?: boolean;
	labelValign?: 'start' | 'center' | 'end' | 'stretch';
	/**
	 * 标签所占宽度，取值范围(0,24),默认8
	 */
	labelSpan?: number;
	/**
	 * 标签所占宽度，取值范围(0,24),默认4
	 */
	labelAfterSpan?: number;
	/**
	 * 分隔符,默认为`:`
	 */
	separator?: ReactNode;
};

/**
 * 表单项
 */
export default function FormItem({
	children,
	required,
	label,
	labelAfter,
	labelValign = 'center',
	labelAfterSpan = 4,
	labelSpan = 8,
	separator = ':'
}: IFormItemProps & {
	children: ReactNode;
}) {
	const labelClassName = required ? 'required label' : 'label';
	const span = label ? labelSpan : 0;
	const spanLast = labelAfter ? labelAfterSpan : 0;
	const spanRest = 24 - span - spanLast;
	return <div className='container'><Grid.Row align={labelValign}>
		{label && <Grid.Col span={span}><span className={labelClassName}>{label}</span></Grid.Col>}
		<Grid.Col span={spanRest}>{children}</Grid.Col>
		{labelAfter && <Grid.Col span={spanLast}><span className='labelAfter'>{labelAfter}</span></Grid.Col>}
	</Grid.Row>
		<style jsx>{`
.required::before{
content: '*';
color: #f00;
margin-right: .25rem;
}
.label{
color: #86909C;
font-size: .875rem;
float: right;
}
.labelAfter{
float: left;
}
.label::after{
content: '${separator}';
color: #86909C;
padding: 0 .25rem;
}
.container{
width: 100%;
padding: 0.5rem;
}
`}</style>
	</div>;
}

/**
 * 输入框
 */
FormItem.Input = FormItemInput;
/**
 * 手机号
 */
FormItem.PhoneNo = FormItemPhoneNo;
/**
 * 邮箱
 */
FormItem.Email = FormItemEmail;
/**
 * 头像
 */
FormItem.Avatar = FormItemAvatar;
/**
 * 密码框
 */
FormItem.Password = FormItemPassword;
/**
 * 下拉选择框
 */
FormItem.Select = FormItemSelect;
/**
 * 文本框
 */
FormItem.Text = FormItemText;
/**
 * 多行输入框
 */
FormItem.TextArea = FormItemTextArea;
/**
 * 性别选择
 */
FormItem.Sex = FormItemSex;
/**
 * 单选框
 */
FormItem.Radio = FormItemRadio;
/**
 * 数字输入框
 */
FormItem.InputNumber = FormItemInputNumber;
/**
 * 富文本
 */
FormItem.RichEdit = FormItemRichEdit;
/**
 * 日期选择
 */
FormItem.DatePicker = FormItemDatePicker;
/**
 * 搜索框
 */
FormItem.Search = FormItemSearch;
/**
 * 复选框
 */
FormItem.Checkbox = FormItemCheckbox;
/**
 * 身份证
 */
FormItem.ID = FormItemID;
/**
 * 图像
 */
FormItem.Image = FormItemImage;
/**
 * 图片上传
 */
FormItem.Images = FormItemImages;
/**
 * 视频上传
 */
FormItem.Video = FormItemVideo;
/**
 * 视频上传
 */
FormItem.Videos = FormItemVideos;
