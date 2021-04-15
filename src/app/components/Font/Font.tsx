import * as React from 'react';
import styled from 'styled-components';
import { Select } from 'react-figma-plugin-ds';
import Section from '../../common/Section';
import { IFigmaSelectOption } from '../../types';
import { updateActiveFont } from '../../store/activeTextSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppState } from '../../context/stateContext';
import { RootState } from '../../store/rootReducer';
import { DEFAULT_COLOR } from '../../consts';
import FontUpload from './FontUpload';

const Font = () => {
    const { fonts, setActiveAxes, setActiveColor, setActiveInstance } = useAppState();
    const { fontName } = useSelector((state: RootState) => state.activeText);
    const dispatch = useDispatch();

    const onChange = React.useCallback(
        (data: IFigmaSelectOption) => {
            const font = fonts[data.value];

            if (data.value !== fontName) {
                const axes = {};
                font.axes.forEach((axis) => {
                    axes[axis.tag] = axis.default;
                });
                dispatch(
                    updateActiveFont({
                        fontName: font.fontName,
                        axes,
                        color: DEFAULT_COLOR,
                    })
                );
                setActiveAxes(axes);
                setActiveColor(DEFAULT_COLOR);
                setActiveInstance(font.instances.find((instance) => instance.type === 'default'));
            }
        },
        [fonts, fontName]
    );

    const fontList = React.useMemo(
        () =>
            Object.keys(fonts).map((fontName: string) => ({
                label: fonts[fontName].fontFamilyName || fontName,
                value: fontName,
            })),
        [fonts]
    );

    return (
        <>
            <Section label="Font">
                <FontListWrapper>
                    <Select
                        className="font-select"
                        onChange={onChange}
                        options={fontList}
                        placeholder="Choose a font"
                        defaultValue={fontName}
                    />
                </FontListWrapper>
            </Section>
            <Section label="Upload">
                <FontUpload />
            </Section>
        </>
    );
};

const FontListWrapper = styled.div`
    .font-select .select-menu__button {
        justify-content: space-between;
        border-color: var(--black1);
    }
    .font-select .select-menu__label {
        font-size: var(--font-size-large);
    }
    .font-select .select-menu__menu {
        max-height: 350px;
    }
`;

export default Font;
