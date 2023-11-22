import React, { AriaAttributes, CSSProperties, FC, useEffect, useState } from 'react';
import Input, { InputProps } from './input';
import Button from '../common/button';
import { usePropsValue } from './use-props-value';

type ValueProps = {
	allowEmpty: true
	value?: number | null
	defaultValue?: number | null
	onChange?: (value: number | null) => void
}

type ValuePropsWithNull = {
	allowEmpty?: false
	value?: number
	defaultValue?: number
	onChange?: (value: number) => void
}

type NativeProps<S extends string = never> = {
	className?: string
	style?: CSSProperties & Partial<Record<S, string>>
	tabIndex?: number
} & AriaAttributes;

export type StepperProps = Pick<InputProps, 'onFocus' | 'onBlur'> &
	(ValuePropsWithNull | ValueProps) & {
		min?: number
		max?: number
		step?: number
		digits?: number
		disabled?: boolean
		inputReadOnly?: boolean
	} & NativeProps

const defaultProps = {
	defaultValue: 0,
	step: 1,
	disabled: false,
	allowEmpty: false,
} as StepperProps;

export default function Stepper(props = {} as StepperProps) {
	const { disabled, step, max, min, inputReadOnly } = {
		...defaultProps,
		...props
	};

	const [value, setValue] = usePropsValue<number | null>(props as any);
	const [inputValue, setInputValue] = useState(() =>
		convertValueToText(props.value, props.digits)
	);
	function setValueWithCheck(v: number) {
		if (isNaN(v)) return;
		let target = bound(v, props.min, props.max);
		if (props.digits !== undefined) {
			target = parseFloat(target.toFixed(props.digits));
		}
		setValue(target);
	}

	const [hasFocus, setHasFocus] = useState(false);

	useEffect(() => {
		if (!hasFocus) {
			setInputValue(convertValueToText(value, props.digits));
		}
	}, [hasFocus]);

	useEffect(() => {
		if (!hasFocus) {
			setInputValue(convertValueToText(value, props.digits));
		}
	}, [value, props.digits]);
	const handleInputChange = (v: string) => {
		setInputValue(v);
		const value = convertTextToValue(v);
		if (value === null) {
			if (props.allowEmpty) {
				setValue(null);
			} else {
				setValue(props.defaultValue);
			}
		} else {
			setValueWithCheck(value);
		}
	};

	const handleMinus = () => {
		setValueWithCheck(
			(value || 0) - step
		);
	};

	const handlePlus = () => {
		setValueWithCheck(
			(value ?? 0) + step
		);
	};

	const minusDisabled = () => {
		if (disabled) return true;
		if (value === null) return false;
		if (min !== undefined) {
			return value <= min;
		}
		return false;
	};

	const plusDisabled = () => {
		if (disabled) return true;
		if (value === null) return false;
		if (max !== undefined) {
			return value >= max;
		}
		return false;
	};
	const cls = hasFocus ? 'stepper active' : 'stepper';
	return <div
		className={cls}
	>
		<input
			type={'button'}
			className={'minus'}
			onClick={handleMinus}
			disabled={minusDisabled()}
			value='-'
		/>
		<div className={'middle'}>
			<input
				className='input'
				onFocus={e => {
					setHasFocus(true);
					props.onFocus?.(e);
				}}
				value={inputValue}
				onChange={(e) => {
					const val = e.target.value;
					disabled || handleInputChange(val);
				}}
				disabled={disabled}
				onBlur={e => {
					setHasFocus(false);
					props.onBlur?.(e);
				}}
				readOnly={inputReadOnly}
				aria-valuenow={Number(inputValue)}
				aria-valuemax={max}
				aria-valuemin={min}
			/>
		</div>
		<input
			type={'button'}
			className={'plus'}
			onClick={handlePlus}
			disabled={plusDisabled()}
			value='+'
		/>
		<style jsx>{`
.stepper{
  --height: 28px;
  --input-width: 44px;
  --input-font-size: 13px;
  --input-font-color: #333333;
  --input-background-color: #f5f5f5;
  --border-radius: 2px;
  --border: none;
  --border-inner: solid 2px transparent;
  --active-border: var(--border);
  --button-font-size: 15px;
  --button-text-color: #1677ff;
  --button-background-color: #f5f5f5;
  --button-width: var(--height);

  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  width: calc(var(--input-width) + 2 * var(--button-width));
  border: var(--border);
  border-radius: var(--border-radius);
}
.active{
  border: var(--active-border);
}
.middle{
	flex: 1;
	border-left: var(--border-inner);
	border-right: var(--border-inner);
}
.input {
	border: 0;
	height: var(--height);
	width: var(--input-width);
	background-color: var(--input-background-color);
	font-size: var(--input-font-size);
	color: var(--input-font-color);
	text-align: center;
}
.minus,.plus {
	border-radius: 0;
	width: var(--button-width);
	height: var(--height);
	padding: 0;
	color: var(--button-text-color);
	background-color: var(--button-background-color);
	font-size: var(--button-font-size);
	border-width: 0;
}
.minus:disabled,.plus:disabled{
	color: #999999;
}
`}</style>
	</div>;
}

function convertValueToText(value: number | null, digits?: number) {
	if (value === null || value === undefined) {
		return '';
	}
	if (digits !== undefined) {
		return value.toFixed(digits);
	}
	return value.toString();
}

function convertTextToValue(text: string) {
	if (text === '') return null;
	return parseFloat(text);
}

function bound(
	position: number,
	min: number | undefined,
	max: number | undefined
) {
	let ret = position;
	if (min !== undefined) {
		ret = Math.max(position, min);
	}
	if (max !== undefined) {
		ret = Math.min(ret, max);
	}
	return ret;
}
