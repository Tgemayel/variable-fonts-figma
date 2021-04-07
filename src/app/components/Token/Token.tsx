import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'react-figma-plugin-ds';
import { useAppState } from '../../context/stateContext';

const Token = () => {
    const { accessToken } = useAppState();

    const onClick = React.useCallback(() => {
        console.log('request token');
    }, []);

    return (
        <Wrapper>
            <TokenWrapper>{accessToken}</TokenWrapper>
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
