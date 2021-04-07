import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SketchPicker } from 'react-color';
import { Text } from 'react-figma-plugin-ds';
import { updateActiveColor } from '../../store/activeTextSlice';
import { RootState } from '../../store/rootReducer';
import { useAppState } from '../../context/stateContext';
import asyncUpdateFigma from '../../utils/updateOnFigma';

const ColorSection = () => {
    const dispatch = useDispatch();

    const [pickerVisiblity, setPickerVisibility] = React.useState(false);
    const { color, fontName, content } = useSelector((state: RootState) => state.activeText);
    const { hbInstance, fonts, activeAxes, setActiveColor } = useAppState();

    const handleClick = React.useCallback(() => {
        setPickerVisibility(!pickerVisiblity);
    }, [pickerVisiblity, setPickerVisibility]);

    const handleClose = React.useCallback(() => {
        setPickerVisibility(false);
    }, [pickerVisiblity, setPickerVisibility]);

    const handleChange = React.useCallback((color) => {
        dispatch(updateActiveColor(color.rgb));
    }, []);

    const handleChangeComplete = React.useCallback(
        (color) => {
            setActiveColor(color.rgb);
            asyncUpdateFigma(hbInstance, fonts[fontName].fontUrl, fontName, content, activeAxes, color.rgb);
        },
        [hbInstance, fonts, fontName, content, activeAxes, setActiveColor]
    );

    return (
        <PickerWrapper>
            <PickerLabel>
                <Text size="medium" weight="bold">
                    Color
                </Text>
            </PickerLabel>
            <div>
                <PickerButton onClick={handleClick}>
                    <PickerButtonPanel color={color} />
                </PickerButton>
                {pickerVisiblity ? (
                    <Popover>
                        <Cover onClick={handleClose} />
                        <SketchPicker color={color} onChange={handleChange} onChangeComplete={handleChangeComplete} />
                    </Popover>
                ) : null}
            </div>
        </PickerWrapper>
    );
};

const PickerWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const PickerLabel = styled.div`
    margin-right: 1rem;
`;

const PickerButton = styled.div`
    padding: 5px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    cursor: pointer;
`;

const PickerButtonPanel = styled.div`
    width: 36px;
    height: 14px;
    borderradius: 2px;
    background: ${(props) => `rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${props.color.a})`};
`;

const Popover = styled.div`
    position: absolute;
    z-index: 2;
`;

const Cover = styled.div`
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`;

export default ColorSection;
