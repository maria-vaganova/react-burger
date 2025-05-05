import {LOADING_START, LOADING_STOP} from "../../utils/data";

export interface ILoadingStartAction {
    type: typeof LOADING_START;
    isLoading: boolean;
}

export interface ILoadingStopAction {
    type: typeof LOADING_STOP;
    isLoading: boolean;
}

export type TLoadingActions = ILoadingStartAction | ILoadingStopAction;

export function startLoading(): ILoadingStartAction {
    return {
        type: LOADING_START,
        isLoading: true
    };
}

export function stopLoading(): ILoadingStopAction {
    return {
        type: LOADING_STOP,
        isLoading: false
    };
}
