import * as React from 'react';
import styled from 'styled-components';
import { Text } from 'react-figma-plugin-ds';
import Section from '../../common/Section';

const About = () => {
    return (
        <Section label="About">
            <Content>
                <Text size="small" weight="medium">
                    Variable Fonts plugin is developed by <a href="https://tonigemayel.com">Toni Gemayel</a>. The
                    variable fonts rendering engine is based on <a href="https://github.com/Lorp/samsa">samsa.js</a> by{' '}
                    <a href="https://www.lorp.org">Laurence Penney</a>.
                </Text>
            </Content>
        </Section>
    );
};

const Content = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

export default About;
