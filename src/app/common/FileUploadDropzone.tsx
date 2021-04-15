import * as React from 'react';
import styled from 'styled-components';
import { OnSelectedFiles } from '../types';

export interface FileUploadDropzoneProps {
    acceptedFileTypes?: string[];
    multiple?: boolean;
    onSelectedFiles: OnSelectedFiles;
    children?: React.ReactNode;
}

const FileUploadDropzone = ({ acceptedFileTypes, onSelectedFiles, multiple, children }: FileUploadDropzoneProps) => {
    const [isDropActive, setIsDropActive] = React.useState(false);

    const filterFiles = React.useCallback(
        function (files: FileList): Array<File> {
            const result = Array.prototype.slice.call(files).sort(comparator);
            if (typeof acceptedFileTypes === 'undefined') {
                return result;
            }
            return result.filter(function (file) {
                return acceptedFileTypes.indexOf(file.name.split('.').pop()) !== -1;
            });
        },
        [acceptedFileTypes]
    );

    const handleChange = React.useCallback(
        function (event: Event): void {
            const files = (event.target as HTMLInputElement).files;
            if (files === null) {
                return;
            }
            onSelectedFiles(filterFiles(files), event);
        },
        [filterFiles, onSelectedFiles]
    );
    const handleDragEnter = React.useCallback(function (event: DragEvent): void {
        event.preventDefault();
    }, []);
    const handleDragOver = React.useCallback(function (event: DragEvent): void {
        event.preventDefault();
        setIsDropActive(true);
    }, []);
    const handleDragEnd = React.useCallback(function (event: DragEvent): void {
        event.preventDefault();
        setIsDropActive(false);
    }, []);
    const handleDrop = React.useCallback(
        function (event: DragEvent): void {
            event.preventDefault();
            if (event.dataTransfer === null) {
                return;
            }
            const files = filterFiles(event.dataTransfer.files);
            onSelectedFiles(files, event);
            setIsDropActive(false);
        },
        [filterFiles, onSelectedFiles]
    );

    return (
        <DropzoneWrapper>
            <Dropzone
                multiple={multiple}
                type="file"
                onChange={handleChange}
                onDragEnd={handleDragEnd}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDropActive={isDropActive}
            />
            <DashLine />
            <Child>{children}</Child>
        </DropzoneWrapper>
    );
};

const DropzoneWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 32px 0;
    cursor: pointer;
`;

const Dropzone = styled.input`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
`;

const DashLine = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    border: 1px dashed gray;
    pointer-events: none;
`;
const Child = styled.div`
    text-align: center;
`;

function comparator(a: File, b: File) {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName !== bName) {
        return aName.localeCompare(bName);
    }
    return a.lastModified - b.lastModified;
}

export default FileUploadDropzone;
