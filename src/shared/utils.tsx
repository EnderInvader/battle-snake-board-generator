import React from "react";

export const generateColour: () => string = () => {
  var max = 0xffff;
  return '#FF' + Math.round(Math.random() * max).toString(16);
}

export const getColorArray: () => string[] = () => {
	return [
		'#E4601B',
		'#C51BE4',
		'#1B9FE4',
	]
}

export const getYouColor: () => string = () => {
  return '#3AE41B'
}

export const getFoodColor: () => string = () => {
  return '#ff5c75'
}

export const getHazardColor: () => string = () => {
  return '#919191'
}

export const onChangeNumberLimitFactory = (target: (...arg: any) => void, max: number = 100, min: number = 0) => {
  return (event: React.ChangeEvent<HTMLInputElement>, ) => {
    let value = event.target.value;

    if (/[\D]/.test(value)) {
      return;
    }
    if (parseInt(value, 10) > max) {
      value = max.toString();
    }
    if (parseInt(value, 10) < min) {
      value = min.toString();
    }
    target(value);
  }
}

export const onBlurSetMinimumFactory = (target: (...arg: any) => void, max: number = 100, min: number = 0) => {
  return (event: React.FocusEvent<HTMLInputElement>, ) => {
    let value = event.target.value;

    if (/[\D]/.test(value)) {
      return;
    }
    if (parseInt(value, 10) > max) {
      value = max.toString();
    }
    if (parseInt(value, 10) < min || !value) {
      value = min.toString();
    }
    target(value);
  }
}

export const generateId = () => "board-generator-" + Math.floor((Math.random() * 1000000)).toString()