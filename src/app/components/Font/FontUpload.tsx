import * as React from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Input, Text } from 'react-figma-plugin-ds';
import { Link } from 'react-router-dom';
import RadioButtons from '../../common/RadioButtons';
import { getFontData } from '../../utils/getFontData';
import { useAppState } from '../../context/stateContext';
import { IFont } from '../../types';
import FileUploadDropzone from '../../common/FileUploadDropzone';
import { API_URL } from '../../consts';

const FontUpload = () => {
    const { setFonts, accessToken } = useAppState();

    const [uploadFontChoice, setUploadFontChoice] = React.useState('url');
    const [url, setUrl] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [ownership, setOwnership] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);

    const onUpload = React.useCallback(() => {
        if (uploadFontChoice === 'url') {
            if (!url.toLowerCase().endsWith('.ttf')) {
                setError(true);
                return;
            }

            setUploading(true);

            const body = {
                type: 'URL',
                font: url,
            };

            fetch(`${API_URL}/fonts/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then(() => {
                    getFontData(url).then((font: IFont) => {
                        setError(false);

                        setFonts((prev) => {
                            return {
                                ...prev,
                                [font.fontName]: font,
                            };
                        });
                        setUrl('');
                        setFiles([]);
                        setOwnership(false);
                        setUploading(false);
                    });
                });
        } else {
            setUploading(true);

            const body = {
                type: 'FILE',
                font: files[0].name,
            };

            fetch(`${API_URL}/fonts/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then(async (respond) => {
                    if (respond.url) {
                        await fetch(respond.url, {
                            method: 'PUT',
                            body: files[0],
                            headers: { 'Content-Type': 'font/ttf' },
                        });

                        const fontURL = respond.url.split('?')[0];

                        getFontData(fontURL).then((font: IFont) => {
                            setError(false);

                            setFonts((prev) => {
                                return {
                                    ...prev,
                                    [font.fontName]: font,
                                };
                            });
                            setUrl('');
                            setFiles([]);
                            setOwnership(false);
                            setUploading(false);
                        });
                    }
                });
        }
    }, [url, files, uploadFontChoice, setError, setUrl, setFiles, setFonts]);

    const onSelectedFiles = React.useCallback((data) => {
        setFiles(data);
    }, []);

    return (
        <>
            <RadioButtons
                name="font"
                onChange={setUploadFontChoice}
                options={[
                    {
                        text: 'By URL',
                        value: 'url',
                    },
                    {
                        text: 'From your local',
                        value: 'custom',
                    },
                ]}
                value={uploadFontChoice}
            />
            {uploadFontChoice === 'url' ? (
                <Wrapper>
                    <Input defaultValue={url} placeholder="Enter a valid Variable Font URL" onChange={setUrl} />
                </Wrapper>
            ) : (
                <Wrapper>
                    <FileUploadDropzone acceptedFileTypes={['ttf']} onSelectedFiles={onSelectedFiles}>
                        {files.length ? (
                            files.map((file) => <Text key={file.name}>{file.name}</Text>)
                        ) : (
                            <>
                                <Text size="medium" weight="bold">
                                    Drop a variable font here <br></br>or click to select a variable font from your
                                    computer
                                </Text>
                                <Text size="xsmall" weight="medium">
                                    Supported formats: TTF
                                </Text>
                            </>
                        )}
                    </FileUploadDropzone>
                </Wrapper>
            )}

            {error && (
                <ErrorWrapper>
                    <Text size="xsmall" weight="medium">
                        * Only TTF files are supported for now.
                    </Text>
                </ErrorWrapper>
            )}

            <Wrapper>
                <Checkbox
                    label="I acknowledge that I have complete ownership of the font"
                    onChange={() => setOwnership(!ownership)}
                    type="checkbox"
                />
            </Wrapper>

            <ButtonWrapper>
                <Button isDisabled={(!url && !files.length) || !ownership || !accessToken.length} onClick={onUpload}>
                    {uploading ? 'Uploading now ...' : 'Upload'}
                </Button>
            </ButtonWrapper>

            {!accessToken.length && (
                <ErrorWrapper>
                    <Text size="xsmall" weight="medium">
                        To enable this feature, <br /> you should <Link to="/token">Request a token</Link> first.
                    </Text>
                </ErrorWrapper>
            )}
        </>
    );
};

const Wrapper = styled.div`
    margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
    margin-top: 1rem;

    .button {
        width: 100%;
        justify-content: center;
    }
`;

const ErrorWrapper = styled.div`
    margin-top: 0.25rem;
    color: red;
    text-align: center;
`;

export default FontUpload;
