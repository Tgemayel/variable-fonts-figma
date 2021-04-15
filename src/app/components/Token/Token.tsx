import * as React from 'react';
import styled from 'styled-components';
import { Button, Text } from 'react-figma-plugin-ds';
import { useAppState } from '../../context/stateContext';
import { API_URL } from '../../consts';
import { FIGMA_EVENT_TYPES } from '../../../plugin/constants';

const Token = () => {
    const { accessToken, setAccessToken } = useAppState();

    const onClick = React.useCallback(() => {
        fetch(`${API_URL}/token`)
            .then((res) => res.text())
            .then((token) => {
                setAccessToken(token);
                window.parent.postMessage(
                    {
                        pluginMessage: {
                            type: FIGMA_EVENT_TYPES.SET_TOKEN,
                            payload: token,
                        },
                    },
                    '*'
                );
            });
    }, []);

    return (
        <Wrapper>
            <TokenWrapper>
                <Text>{accessToken}</Text>
            </TokenWrapper>
            <Button onClick={onClick} isDisabled={accessToken.length}>
                Request Token
            </Button>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0.625rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TokenWrapper = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
    background: #eee;
    border-radius: 4px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Token;
