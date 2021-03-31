import * as React from 'react';
import { useDispatch } from 'react-redux';
import { FIGMA_EVENT_TYPES, STATUSES } from '../../plugin/constants';
import { DEFAULT_CONTENT } from '../consts';
import { useAppState } from '../context/stateContext';
import { updateActiveFont, updateActiveText, updateSelectionStatus } from '../store/activeTextSlice';

const useFetchFigmaMessages = () => {
    const dispatch = useDispatch();
    const { setActiveAxes, setActiveColor } = useAppState();

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { payload } = event.data.pluginMessage;

            if (payload.status === STATUSES.SUCCESS && payload.type === FIGMA_EVENT_TYPES.SELECTED_CHANGED) {
                const { fontName, content, axes, color } = payload;
                dispatch(
                    updateActiveFont({
                        fontName,
                        axes,
                        color,
                    })
                );
                dispatch(updateActiveText(content));
                dispatch(updateSelectionStatus(true));
                setActiveAxes(axes);
                setActiveColor(color);
            } else {
                dispatch(updateActiveText(DEFAULT_CONTENT));
                dispatch(updateSelectionStatus(false));
            }
        };
    }, []);
};

export default useFetchFigmaMessages;
