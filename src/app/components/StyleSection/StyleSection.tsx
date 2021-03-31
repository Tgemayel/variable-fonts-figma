import * as React from 'react';
import { useSelector } from 'react-redux';
import Section from '../../common/Section';
import { RootState } from '../../store/rootReducer';
import ColorSection from './colorSection';

const StyleSection = () => {
    const fontName = useSelector((state: RootState) => state.activeText.fontName);

    if (!fontName) return <></>;

    return (
        <Section label="Style">
            <ColorSection />
        </Section>
    );
};

export default StyleSection;
