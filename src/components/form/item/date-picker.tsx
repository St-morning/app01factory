import { DatePicker, DatePickerProps, MonthPickerProps, QuarterPickerProps, RangePickerProps, WeekPickerProps, YearPickerProps } from '@arco-design/web-react';
import dt2timeStamp from '../../../atoms/dt/to-time-stamp';
import FormItem, { IFormItemProps } from '../item';

/**
 * 日期选择
 */
export default function FormItemDatePicker({
	value,
	label,
	labelAfter,
	required,
	labelValign = 'center',
	labelSpan,
	labelAfterSpan,
	separator,
	onChange,
	...props
}: DatePickerProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
		separator={separator}
	><DatePicker
			allowClear
			style={{
				width: '100%'
			}}
			{...props}
			onChange={(val, dayjs) => {
				if (onChange) {
					if (val && dayjs) {
						onChange(dayjs.valueOf().toString(), dayjs);
					} else {
						onChange('', dayjs);
					}
				}
			}}
			value={dt2timeStamp(value)}
		/>
	</FormItem>;
}

FormItemDatePicker.Range = FormItemDateRangePicker;
FormItemDatePicker.Quarter = FormItemDateQuarterPicker;
FormItemDatePicker.Month = FormItemDateMonthPicker;
FormItemDatePicker.Year = FormItemDateYearPicker;
FormItemDatePicker.Week = FormItemDateWeekPicker;

function FormItemDateRangePicker({
	value,
	onChange,
	label,
	labelAfter,
	required,
	labelValign = 'center',
	labelSpan = 4,
	labelAfterSpan,
	...props
}: RangePickerProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
	><DatePicker.RangePicker
			value={value && value.map((v) => {
				return dt2timeStamp(v);
			})}
			onChange={(val, dayjs) => {
				if (onChange) {
					if (val && dayjs) {
						onChange(dayjs.map((v) => {
							return v.valueOf().toString();
						}), dayjs);
					} else {
						onChange([], dayjs);
					}
				}
			}}
			allowClear
			clearRangeOnReselect
			style={{
				width: '100%'
			}}
			{...props}
		/>
	</FormItem>;
}

function FormItemDateQuarterPicker({
	value,
	onChange,
	label,
	labelAfter,
	required,
	labelValign = 'center',
	labelSpan,
	labelAfterSpan,
	...props
}: QuarterPickerProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
	><DatePicker.QuarterPicker
			value={dt2timeStamp(value)}
			onChange={(val, dayjs) => {
				if (onChange) {
					if (val && dayjs) {
						onChange(dayjs.valueOf().toString(), dayjs);
					} else {
						onChange('', dayjs);
					}
				}
			}}
			allowClear
			style={{
				width: '100%'
			}}
			{...props}
		/>
	</FormItem>;
}

function FormItemDateMonthPicker({
	value,
	onChange,
	label,
	labelAfter,
	required,
	labelValign = 'center',
	labelSpan,
	labelAfterSpan,
	...props
}: MonthPickerProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
	><DatePicker.MonthPicker
			value={dt2timeStamp(value)}
			onChange={(val, dayjs) => {
				if (onChange) {
					if (val && dayjs) {
						onChange(dayjs.valueOf().toString(), dayjs);
					} else {
						onChange('', dayjs);
					}
				}
			}}
			allowClear
			style={{
				width: '100%'
			}}
			{...props}
		/>
	</FormItem>;
}

function FormItemDateYearPicker({
	value,
	onChange,
	label,
	labelAfter,
	required,
	labelValign = 'center',
	labelSpan,
	labelAfterSpan,
	...props
}: YearPickerProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
	><DatePicker.YearPicker
			value={dt2timeStamp(value)}
			onChange={(val, dayjs) => {
				if (onChange) {
					if (val && dayjs) {
						onChange(dayjs.valueOf().toString(), dayjs);
					} else {
						onChange('', dayjs);
					}
				}
			}}
			allowClear
			style={{
				width: '100%'
			}}
			{...props}
		/>
	</FormItem>;
}

function FormItemDateWeekPicker({
	value,
	onChange,
	label,
	labelAfter,
	required,
	labelValign = 'center',
	labelSpan,
	labelAfterSpan,
	...props
}: WeekPickerProps & IFormItemProps) {
	return <FormItem
		label={label}
		labelAfter={labelAfter}
		required={required}
		labelValign={labelValign}
		labelSpan={labelSpan}
		labelAfterSpan={labelAfterSpan}
	><DatePicker.WeekPicker
			value={dt2timeStamp(value)}
			onChange={(val, dayjs) => {
				if (onChange) {
					if (val && dayjs) {
						onChange(dayjs.valueOf().toString(), dayjs);
					} else {
						onChange('', dayjs);
					}
				}
			}}
			allowClear
			style={{
				width: '100%'
			}}
			{...props}
		/>
	</FormItem>;
}
