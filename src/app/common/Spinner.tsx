import * as React from 'react';
import styled from 'styled-components';

const Spinner = () => {
    return (
        <SpinnerWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 50 50">
                <path
                    fill="#18A0FB"
                    d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.5s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </SpinnerWrapper>
    );
};

const SpinnerWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Spinner;
