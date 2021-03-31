import * as React from 'react';
import styled from 'styled-components';
import { Text } from 'react-figma-plugin-ds';
import Section from '../common/Section';

const AboutSection = () => {
    return (
        <Section label="About">
            <Content>
                <Text size="small" weight="medium">
                    Variable fonts plugin is developed by Toni Gemayel. The variable fonts rendering engine is based on
                    Samsa.js by Laurence Penney.
                </Text>
            </Content>

            <Text size="xsmall" weight="medium">
                @ 2021 Variable Fonts
            </Text>
        </Section>
    );
};

const Content = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

export default AboutSection;
