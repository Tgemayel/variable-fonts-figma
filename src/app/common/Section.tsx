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
            <LabelWrapper>
                <Text size="xlarge" weight="bold">
                    {label}
                </Text>
            </LabelWrapper>
            {children}
        </SectionWrapper>
    );
};

const SectionWrapper = styled.div`
    padding: 0.625rem;
`;

const LabelWrapper = styled.div`
    margin-bottom: 0.5rem;
`;

export default Section;
