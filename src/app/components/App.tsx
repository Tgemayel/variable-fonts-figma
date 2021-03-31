import * as React from 'react';
import GlobalStyles from '../common/Global.styles';
import AxesSection from './AxesSection/AxesSection';
import InstancesSection from './InstancesSection';
import PreviewSection from './PreviewSection';
import GlyphsSection from './GlyphsSection';
import AboutSection from './AboutSection';
import FontSection from './FontSection';
import StyleSection from './StyleSection/StyleSection';
import Spinner from '../common/Spinner';
import useFetchFigmaMessages from '../hooks/useFetchFigmaMessages';
import useGetFontList from '../hooks/useGetFontList';
import useGetHbInstance from '../hooks/useGetHbInstance';

const App = ({}) => {
    const { loading } = useGetFontList();

    useGetHbInstance();
    useFetchFigmaMessages();

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <GlobalStyles />
                    <FontSection />
                    <PreviewSection />
                    <StyleSection />
                    <AxesSection />
                    <InstancesSection />
                    <GlyphsSection />
                    <AboutSection />
                </>
            )}
        </>
    );
};

export default App;
