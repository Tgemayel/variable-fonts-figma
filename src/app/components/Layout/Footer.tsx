import * as React from 'react';
import styled from 'styled-components';
import { Text } from 'react-figma-plugin-ds';

const Footer = () => {
    return (
        <Wrapper>
            <Text size="xsmall" weight="medium">
                @ 2021 Variable Fonts {process.env.REACT_APP_VERSION}
            </Text>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-top: 1px solid #e5e5e5;
    padding: 0.625rem;
`;

export default Footer;
