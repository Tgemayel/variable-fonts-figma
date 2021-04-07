import * as React from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { Text } from 'react-figma-plugin-ds';
import CustomSelect from '../../common/CustomSelect';
import { routeMap } from '../routes';

const Header = () => {
    const location = useLocation();
    const history = useHistory();

    const onClick = (path: string) => {
        if (location.pathname !== path) history.push(path);
    };

    const tabs = routeMap.filter((route) => route.tab === true);
    const settings = routeMap
        .filter((route) => route.settings === true)
        .map((route) => ({ label: route.title, value: route.path }));

    return (
        <Wrapper>
            <Tabs>
                {tabs.map((item, index) => (
                    <Tab
                        isActive={item.path === location.pathname}
                        key={`${item.title}-${index}`}
                        onClick={() => onClick(item.path)}
                    >
                        <Text size="large" weight="bold">
                            {item.title}
                        </Text>
                    </Tab>
                ))}
            </Tabs>
            <Settings>
                <CustomSelect icon="settings" onChange={(option) => onClick(option.value)} options={settings} />
            </Settings>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 0.625rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: start;
`;

const Tabs = styled.div`
    flex: 1;
`;

const Tab = styled.span`
    cursor: pointer;
    color: ${(props) => (props.isActive ? 'black' : 'gray')};
    padding-right: 1rem;

    p {
        display: inline;
    }
`;

const Settings = styled.span`
    cursor: pointer;
    float: right;
`;

export default Header;
