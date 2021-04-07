import * as React from 'react';
import { Text } from 'react-figma-plugin-ds';
import styled from 'styled-components';

export interface RadioButtonsProps {
    disabled?: boolean;
    focused?: boolean;
    name: string;
    onChange: (value) => void;
    options: RadioButtonsOption[];
    propagateEscapeKeyDown?: boolean;
    value: null | string;
}

interface RadioButtonsOption {
    disabled?: boolean;
    text: string;
    value: null | string;
}

const RadioButtons = ({ disabled, focused, name, onChange, options, value }: RadioButtonsProps) => {
    const handleChange = React.useCallback(
        (event: React.ChangeEvent) => {
            const index = (event.target as HTMLElement).getAttribute('data-index');
            if (index === null) {
                return;
            }
            const newValue = options[parseInt(index)].value;
            onChange(newValue);
        },
        [name, onChange, options]
    );

    return (
        <RadioButtonsWrapper>
            {options.map(function (option, index) {
                const text = typeof option.text === 'undefined' ? option.value : option.text;
                const isOptionDisabled = disabled === true || option.disabled === true;
                return (
                    <RadioButton key={index}>
                        <RadioInput
                            checked={value === option.value}
                            data-index={index}
                            data-initial-focus={focused === true}
                            disabled={isOptionDisabled === true}
                            name={name}
                            onChange={handleChange}
                            tabIndex={isOptionDisabled === true ? undefined : 0}
                            type="radio"
                            value={option.value === null ? undefined : option.value}
                        />
                        <RadioLabel>
                            <Text>{text}</Text>
                        </RadioLabel>
                    </RadioButton>
                );
            })}
        </RadioButtonsWrapper>
    );
};

export default RadioButtons;

const RadioButtonsWrapper = styled.div`
    display: flex;
`;

const RadioButton = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const RadioInput = styled.input`
    margin-right: 0.25rem;
`;

const RadioLabel = styled.div``;
