import * as React from 'react';
import { useDispatch } from 'react-redux';
import { FIGMA_EVENT_TYPES, STATUSES } from '../../plugin/constants';
import { DEFAULT_CONTENT } from '../consts';
import { useAppState } from '../context/stateContext';
import { updateActiveFont, updateActiveText, updateSelectionStatus } from '../store/activeTextSlice';

const useFetchFigmaMessages = () => {
    const dispatch = useDispatch();
    const { setActiveAxes, setActiveColor, setAccessToken } = useAppState();

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { payload } = event.data.pluginMessage;

            switch (payload.type) {
                case FIGMA_EVENT_TYPES.SELECTED_CHANGED:
                    if (payload.status === STATUSES.SUCCESS) {
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
                    break;
                case FIGMA_EVENT_TYPES.GET_TOKEN:
                    const { token } = payload;
                    setAccessToken(token || '');
                    break;
                default:
                    break;
            }
        };
    }, []);
};

export default useFetchFigmaMessages;
