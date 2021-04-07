import * as React from 'react';
import { DEFAULT_COLOR } from '../consts';
import { IActiveAxes, IColor, IFonts, IInstance } from '../types';

export interface StateContextType {
    fonts: IFonts;
    setFonts(fonts: IFonts | ((prev: IFonts) => IFonts)): void;

    hbInstance: any;
    setHbInstance(instance: any): void;

    activeAxes: IActiveAxes;
    setActiveAxes(axes: IActiveAxes | ((prev: IActiveAxes) => IActiveAxes)): void;

    activeColor: IColor;
    setActiveColor(color: IColor): void;

    activeInstance: IInstance;
    setActiveInstance(instance: IInstance): void;

    accessToken: string;
    setAccessToken(token: string): void;
}

export const StateContext = React.createContext<StateContextType>(null!);

export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
    const [hbInstance, setHbInstance] = React.useState(null);
    const [fonts, setFonts] = React.useState<IFonts>({});
    const [activeAxes, setActiveAxes] = React.useState<IActiveAxes>({});
    const [activeColor, setActiveColor] = React.useState(DEFAULT_COLOR);
    const [activeInstance, setActiveInstance] = React.useState<IInstance>(null);
    const [accessToken, setAccessToken] = React.useState('');
    const contextValue = {
        hbInstance,
        setHbInstance,
        fonts,
        setFonts,
        activeAxes,
        setActiveAxes,
        activeColor,
        setActiveColor,
        activeInstance,
        setActiveInstance,
        accessToken,
        setAccessToken,
    };
    return <StateContext.Provider value={contextValue}>{props.children}</StateContext.Provider>;
}

export function useAppState() {
    const context = React.useContext(StateContext);
    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider');
    }
    return context;
}
