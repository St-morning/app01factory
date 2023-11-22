import TabBar from './h5/nav/tab-bar';
import NavBar from './h5/nav/nav-bar';
import Pagination from './h5/nav/pagination';
import Tabs from './h5/nav/tabs';
import DropdownMenu from './h5/nav/dropdown-menu';
import Loading from './h5/feedback/loading';
import Button from './h5/common/button';
import ActionSheet from './h5/feedback/action-sheet';
import Grid from './h5/layout/grid';
import Collapse from './h5/display/collapse';
import NoticeBar from './h5/display/notice-bar';
import ImagePreview from './h5/display/image-preview';
import Image from './h5/display/image';
import Popover from './h5/display/popover';
import Steps from './h5/display/steps';
import Tag from './h5/display/tag';
import Avatar from './h5/display/avatar';
import Badge from './h5/display/badge';
import Text from './h5/display/text';
import Cell from './h5/display/cell';
import FormItem from './h5/form/item';
import Checkbox from './h5/form/checkbox';
import DatePicker from './h5/form/date-picker';
import ImagePicker from './h5/form/image-picker';
import Input from './h5/form/input';
import Picker from './h5/form/picker';
import Radio from './h5/form/radio';
import Rate from './h5/form/rate';
import SearchBar from './h5/form/search-bar';
import Slider from './h5/form/slider';
import Switch from './h5/form/switch';
import Textarea from './h5/form/textarea';
import Page from './h5/layout/page';
import Stepper from './h5/form/stepper';
import Layout from './h5/layout';
import PasswordInput from './h5/form/password';
import PopupSwiper from './h5/feedback/popup-swiper';
import Link from './link';
import Swiper from './swiper';
import icons from './icons';

/**
 * H5端组件，该组件不能直接使用，如果有效率问题，不能直接使用该组件，而需要单独引用组件
 */
const H5 = {
	icons,
	/**
	 * 轮播
	 */
	Swiper,
	/**
	 * 超链接，全面替代`<a></a>`
	 */
	Link,
	/**
	 * 标签栏
	 */
	TabBar,
	/**
	 * 导航栏组件
	 */
	NavBar,
	/**
	 * 分页器
	 */
	Pagination,
	/**
	 * 导航
	 */
	Tabs,
	/**
	 * 下拉选择菜单
	 */
	DropdownMenu,
	/**
	 * 按钮
	 */
	Button,
	/**
	 * 加载
	 */
	Loading,
	/**
	 * 打开动作面板
	 */
	ActionSheet,
	/**
	 * 宫格
	 */
	Grid,
	/**
	 * 折叠面板
	 */
	Collapse,
	/**
	 * 信息展示
	 */
	NoticeBar,
	/**
	 * 打开图片预览
	 */
	ImagePreview,
	/**
	 * 图片
	 */
	Image,
	/**
	 * 气泡卡片
	 */
	Popover,
	/**
	 * 步骤条
	 */
	Steps,
	/**
	 * 标签
	 */
	Tag,
	/**
	 * 头像
	 */
	Avatar,
	/**
	 * 徽标
	 */
	Badge,
	/**
	 * 带角标的文本
	 */
	Text,
	/**
	 * 单元格
	 */
	Cell,
	/**
	 * 复选框
	 */
	Checkbox,
	/**
	 * 日期时间选择器
	 */
	DatePicker,
	/**
	 * 图片选择器
	 */
	ImagePicker,
	/**
	 * 输入框
	 */
	Input,
	/**
	 * 密码输入框
	 */
	PasswordInput,
	/**
	 * 选择器
	 */
	Picker,
	/**
	 * 单选框
	 */
	Radio,
	/**
	 * 评分组件
	 */
	Rate,
	/**
	 * 搜索栏组件
	 */
	SearchBar,
	/**
	 * 滑动输入条
	 */
	Slider,
	/**
	 * 开关组件
	 */
	Switch,
	/**
	 * 多行文本框
	 */
	Textarea,
	/**
	 * 页面总局组件
	 */
	Page,
	/**
	 * 步进器
	 */
	Stepper,
	/**
	 * 页面容器组件
	 */
	Layout,
	/**
	 * 页面容器组件
	 */
	PopupSwiper,
	/**
	 * 表单项
	 */
	FormItem,
};

export default H5;
