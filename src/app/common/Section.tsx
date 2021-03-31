import * as React from 'react';
import { Text } from 'react-figma-plugin-ds';
import styled from 'styled-components';

interface Props {
    label: string;
    children?: React.ReactNode | React.ReactNode[];
}

const Section = ({ label, children }: Props) => {
    return (
        <SectionWrapper>
            <Text size="xlarge" weight="bold">
                {label}
            </Text>
            {children}
        </SectionWrapper>
    );
};

const SectionWrapper = styled.div`
    padding: 0.625rem;
    border-bottom: 1px solid #e5e5e5;
`;

export default Section;
