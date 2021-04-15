import { FIGMA_EVENT_TYPES } from '../../plugin/constants';

const useGetToken = () => {
    window.parent.postMessage(
        {
            pluginMessage: {
                type: FIGMA_EVENT_TYPES.GET_TOKEN,
            },
        },
        '*'
    );
};

export default useGetToken;
