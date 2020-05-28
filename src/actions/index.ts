import { CLICK_UPDATE_VALUE } from './actionTypes';
export const clickButton = (value: any) => ({
    type: CLICK_UPDATE_VALUE,
    newValue: value
});