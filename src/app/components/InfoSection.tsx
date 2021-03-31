import * as React from 'react';
import { Text } from 'react-figma-plugin-ds';
import Section from '../common/Section';

const InfoSection = () => {
    return (
        <Section label="Info">
            <Text size="small" weight="medium">
                Family name: Roboto Extremo
            </Text>
        </Section>
    );
};

export default InfoSection;
