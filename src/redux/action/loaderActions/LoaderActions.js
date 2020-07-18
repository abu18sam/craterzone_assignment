
export const LoaderAction = {
    "LOADER_START":"LOADER_START",
    "LOADER_STOP":"LOADER_STOP"
}

export const loaderStart = () => dispatch => {
    dispatch({type:LoaderAction.LOADER_START});
}

export const loaderStop = () => dispatch => {
    dispatch({type:LoaderAction.LOADER_STOP});
}

