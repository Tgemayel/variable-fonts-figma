import * as React from 'react';
import { Button, Text } from 'react-figma-plugin-ds';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAppState } from '../../context/stateContext';
import { RootState } from '../../store/rootReducer';
import { IAxis } from '../../types';
import Axes from './Axes';

const AxesSection = () => {
    const { fonts } = useAppState();
    const { fontName, axes } = useSelector((state: RootState) => state.activeText);

    const handleAdd = React.useCallback(() => {}, []);

    if (!fontName) return <></>;

    const totalAxes = fonts[fontName].axes;

    const displayAxes = () => {
        return totalAxes.map((axis: IAxis, index: number) => {
            const { min, max, tag, name } = axis;
            return (
                <div key={`${tag}-${index}`}>
                    <Axes tag={tag} name={name} value={axes[tag]} min={min} max={max} />
                </div>
            );
        });
    };

    return (
        <SectionWrapper>
            <SectionTitle>
                <Text size="xlarge" weight="bold">
                    Axes
                </Text>
                <Button onClick={handleAdd}>Add Instance</Button>
            </SectionTitle>
            {displayAxes()}
        </SectionWrapper>
    );
};

const SectionWrapper = styled.div`
    padding: 0.625rem;
    border-bottom: 1px solid #e5e5e5;
`;

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export default AxesSection;
