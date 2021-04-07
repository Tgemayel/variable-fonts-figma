import * as React from 'react';
import { Icon } from 'react-figma-plugin-ds';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';

export interface BasicProps {
    className?: string;
}

export interface SelectOption {
    divider?: string | boolean;
    value: string;
    label: string;
}

export interface SelectProps extends BasicProps {
    options: SelectOption[];
    isDisabled?: boolean;
    defaultValue?: string | number | boolean;
    icon: string;
    onExpand?: (state: boolean) => void;
    onChange?: (option: SelectOption) => void;
}

const CustomSelect: React.FunctionComponent<SelectProps> = ({
    className = '',
    options,
    isDisabled,
    defaultValue,
    icon,
    onExpand,
    onChange,
}) => {
    const [isExpanded, onExpandedStateChange] = React.useState(false);
    const [selectedOption, onSelectOption] = React.useState(options.find(({ value }) => defaultValue === value));
    React.useEffect(() => {
        onExpand && onExpand(isExpanded);
    }, [isExpanded]);
    React.useEffect(() => {
        onChange && selectedOption && onChange(selectedOption);
    }, [selectedOption]);
    React.useEffect(() => {
        const newSelectedOption = options.find(({ value }) => defaultValue === value);
        onSelectOption(newSelectedOption);
    }, [defaultValue]);

    const handleExpandClick = () => onExpandedStateChange(!isExpanded);

    const handleOutsideClick = () => onExpandedStateChange(false);

    const handleSelectClick = (value: any) => {
        const newOption = options.find(({ value: v }) => v === value);
        onExpandedStateChange(false);
        onSelectOption(newOption);
    };

    const expanListClass = isExpanded ? 'select-menu__menu--active' : '';
    const disabledColorClass = isDisabled ? 'icon--black-3' : '';

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick} disabled={!isExpanded}>
            <div className={`select-menu ${className}`}>
                <IconButton onClick={handleExpandClick}>
                    <Icon name={icon} color="blue" />
                </IconButton>
                <ul
                    className={`select-menu__menu ${expanListClass} ${disabledColorClass}`}
                    style={{ top: '30px', width: 'auto', right: 0, left: 'inherit' }}
                >
                    {options &&
                        options.map(({ value, label, divider }, i) =>
                            divider ? (
                                <React.Fragment key={`select-option-divider--${i}`}>
                                    {divider !== true && <span className="select-menu__divider-label">{divider}</span>}
                                    <div className="select-menu__divider" key={`select-option--${i}`} />
                                </React.Fragment>
                            ) : (
                                <li
                                    className={`select-menu__item ${
                                        selectedOption && selectedOption.value === value
                                            ? 'select-menu__item--selected'
                                            : ''
                                    }`}
                                    onClick={() => handleSelectClick(value)}
                                    key={`select-option--${i}`}
                                >
                                    <span className="select-menu__item-label">{label}</span>
                                </li>
                            )
                        )}
                </ul>
            </div>
        </OutsideClickHandler>
    );
};

const IconButton = styled.div`
    .icon {
        margin: 0;
        opacity: 1;
    }
`;
export default CustomSelect;
