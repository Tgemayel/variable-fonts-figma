import * as React from 'react';
import { Text } from 'react-figma-plugin-ds';
import styled from 'styled-components';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { updateActiveFontAxis } from '../../store/activeTextSlice';
import { useAppState } from '../../context/stateContext';
import { IActiveAxes } from '../../types';
import asyncUpdateFigma from '../../utils/updateOnFigma';

interface Props {
    tag: string;
    name: string;
    value: number;
    min: number;
    max: number;
}

const Axis = ({ tag, name, value, min, max }: Props) => {
    const dispatch = useDispatch();

    const { fontName, content } = useSelector((state: RootState) => state.activeText);
    const { hbInstance, fonts, activeColor, activeAxes, setActiveAxes } = useAppState();

    const onChange = React.useCallback(
        (val) => {
            dispatch(
                updateActiveFontAxis({
                    tag,
                    value: val,
                })
            );
        },
        [updateActiveFontAxis]
    );

    const onAfterChange = React.useCallback(
        (val) => {
            setActiveAxes((prev: IActiveAxes) => ({
                ...prev,
                [tag]: val,
            }));
            asyncUpdateFigma(
                hbInstance,
                fonts[fontName].fontUrl,
                fontName,
                content,
                { ...activeAxes, [tag]: val },
                activeColor
            );
        },
        [hbInstance, fonts, fontName, content, activeAxes, activeColor, setActiveAxes]
    );

    return (
        <AxesWrapper>
            <AxesLabels>
                <LabelWrapper>
                    <Text size="large" weight="bold">
                        {tag}
                    </Text>
                </LabelWrapper>
                <TypeWrapper>
                    <Text size="xsmall" weight="medium">
                        {name}
                    </Text>
                </TypeWrapper>
                <Text size="small" weight="medium">
                    {value}
                </Text>
            </AxesLabels>
            <SliderRow>
                <Slider
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    step={0.01}
                    onAfterChange={onAfterChange}
                />
            </SliderRow>
        </AxesWrapper>
    );
};

const AxesWrapper = styled.div`
    height: 64px;
`;

const AxesLabels = styled.div`
    display: flex;
    align-items: center;
`;

const LabelWrapper = styled.div`
    width: 60px;
`;

const TypeWrapper = styled.div`
    flex: 1;
`;

const SliderRow = styled.div`
    margin-top: 0.5rem;

    .rangeslider.rangeslider-horizontal,
    .rangeslider-horizontal .rangeslider__fill {
        background: rgba(0, 0, 0, 0.8);
    }
    .rangeslider,
    .rangeslider .rangeslider__fill {
        box-shadow: none;
    }
    .rangeslider-horizontal {
        height: 1px;
        border-radius: 10px;
    }
    .rangeslider {
        margin: 0px;
    }
    .rangeslider-horizontal .rangeslider__handle {
        width: 8px;
        height: 8px;
        border-radius: 8px;
        outline: 2px solid white;
    }
    .rangeslider .rangeslider__handle {
        background: #000;
        box-shadow: none;
    }
    .rangeslider__handle:focus {
        background: #18a0fb;
    }
`;

export default Axis;
