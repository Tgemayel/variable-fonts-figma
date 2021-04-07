import * as React from 'react';
import styled from 'styled-components';
import { Input, Select, Text } from 'react-figma-plugin-ds';
import { useDispatch, useSelector } from 'react-redux';
import Section from '../../common/Section';
import { useAppState } from '../../context/stateContext';
import { RootState } from '../../store/rootReducer';
import { IFigmaSelectOption, IInstance } from '../../types';
import { updateActiveFontAxes } from '../../store/activeTextSlice';
import asyncUpdateFigma from '../../utils/updateOnFigma';

const Instances = () => {
    const dispatch = useDispatch();
    const { fontName, content } = useSelector((state: RootState) => state.activeText);
    const { hbInstance, fonts, activeColor, activeInstance, setActiveInstance, setActiveAxes } = useAppState();

    const namedInstances = fontName ? fonts[fontName].instances : [];
    const namedInstanceList = React.useMemo(
        () => namedInstances.map((instance: IInstance) => ({ label: instance.name, value: instance.id })),
        [namedInstances]
    );

    const onChange = React.useCallback(
        (data: IFigmaSelectOption) => {
            const instance = namedInstances.find((instance) => instance.id === data.value);
            setActiveInstance(instance);
            setActiveAxes(instance.fvs);
            dispatch(updateActiveFontAxes(instance.fvs));

            asyncUpdateFigma(hbInstance, fonts[fontName].fontUrl, fontName, content, instance.fvs, activeColor);
        },
        [namedInstances, hbInstance, fonts, fontName, content, activeColor, setActiveInstance, setActiveAxes]
    );

    const onChangeName = React.useCallback(() => {}, []);

    if (!fontName) return <></>;

    return (
        <Section label="Instances">
            <InstanceListWrapper>
                <Select
                    className="instance-select"
                    defaultValue={(activeInstance && activeInstance.id) || 0}
                    onChange={onChange}
                    options={namedInstanceList}
                    placeholder="Choose an instance"
                />
            </InstanceListWrapper>
            {activeInstance && (
                <InstanceInfoWrapper>
                    <InstanceName>
                        <Text size="medium" weight="bold" className="instance-name">
                            Name:
                        </Text>
                        <Input defaultValue={activeInstance.name} onChange={onChangeName} placeholder="Placeholder" />
                    </InstanceName>
                    <InstanceAxesWrapper>
                        <Text size="medium" weight="bold" className="instance-name">
                            Axes:
                        </Text>
                        <InstanceAxes>
                            {Object.keys(activeInstance.fvs).map((axis) => {
                                return (
                                    <InstanceAxis key={`${fontName}-${axis}`}>
                                        <Text size="medium" weight="bold">
                                            {axis}
                                        </Text>
                                        <Text size="small" weight="medium">
                                            {activeInstance.fvs[axis]}
                                        </Text>
                                    </InstanceAxis>
                                );
                            })}
                        </InstanceAxes>
                    </InstanceAxesWrapper>
                </InstanceInfoWrapper>
            )}
        </Section>
    );
};

const InstanceListWrapper = styled.div`
    margin-top: 0.5rem;

    .instance-select .select-menu__button {
        justify-content: space-between;
        border-color: var(--black1);
    }
    .instance-select .select-menu__label {
        font-size: var(--font-size-large);
    }
    .instance-select .select-menu__menu {
        max-height: 350px;
    }
`;

const InstanceInfoWrapper = styled.div``;

const InstanceName = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    .instance-name {
        width: 3rem;
    }
`;

const InstanceAxesWrapper = styled.div`
    display: flex;
    align-items: center;

    .instance-name {
        width: 3rem;
    }
`;

const InstanceAxes = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const InstanceAxis = styled.div`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    width: 40px;
`;

export default Instances;
