import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import imageIcon from '../../assets/add-image.png';
import cancelIcon from '../../assets/cancel.png';
import styled from 'styled-components';

const Container = styled.label<{ width: string, ratio: string, marginTop: number, isDragging: boolean }>`
    margin-top: ${({ marginTop }) => `${marginTop}px`};
    width: ${({ width }) => width}; 
    aspect-ratio: ${({ ratio }) => ratio}; ;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    border-radius: 15px;
    border: 4px dashed rgba(0, 0, 0, 0.2);
    background-color: ${({ isDragging }) => (isDragging ? 'rgba(0, 0, 255, 0.1)' : 'transparent')};

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

const Input = styled.input`
    display: none;
`;

const ImageInputIcon = styled.img<{ textDisplay: 'block' | 'none' }>`
    width: 40px;
    height: 40px;

    display: ${({ textDisplay }) => textDisplay};
`;

const ImageInputFristText = styled.div<{ textDisplay: 'block' | 'none' }>`
    margin-top: 15px;
    font-size: 14px;
    line-height: 14px;

    display: ${({ textDisplay }) => textDisplay};
`;

const ImageInputSecondText = styled.div<{ textDisplay: 'block' | 'none' }>`
    margin-top: 5px;
    font-size: 14px;
    line-height: 14px;

    display: ${({ textDisplay }) => textDisplay};
`;

const ProfileImagePreview = styled.img<{ previewDisplay: 'block' | 'none' }>`
    width: 100%;
    height: 100%;

    position: absolute;
    
    border-radius: 15px;

    display: ${({ previewDisplay }) => previewDisplay};
    object-fit: contain; 
`;

const PreviewRemoveIcon = styled.div<{ cancelDisplay: 'flex' | 'none' }>`
    width: 30px;
    height: 30px;
    top: 3px;
    right: 3px;

    display: ${({ cancelDisplay }) => cancelDisplay};
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 15px;

    background-color: rgba(239, 61, 61, 0.4);

    position: absolute;

    cursor: pointer;

    &:hover {
        background-color: rgba(239, 61, 61, 1);
    }
`;

const CancelIcon = styled.img`
    width: 25px;
    height: 25px;
`

interface ImageInputProps {
    width: string;
    ratio: string;
    marginTop: number;
    image: File | undefined | (File | undefined)[];
    setImage: any;
    setValidImage: Dispatch<SetStateAction<boolean | null>>;
    inputDisabled: boolean;
    curImage?: string;
}

const ImageInput: React.FC<ImageInputProps> = (props) => {
    const { width, ratio, marginTop, image, setImage, setValidImage, inputDisabled, curImage } = props;
    const [previewDisplay, setPreviewDisplay] = useState<'block' | 'none'>('block');
    const [cancelDisplay, setCancelDisplay] = useState<'flex' | 'none'>('none');
    const [textDisplay, setTextDisplay] = useState<'block' | 'none'>('block');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | undefined>(curImage);

    // 방금 막 업로드한 이미지가 아닌 리렌더링 발생했을 때 이미지
    useEffect(function preLoad() {
        if (image && !Array.isArray(image)) { // 배열일 때는 리렌더링을 고려할 필요가 없음 -> 이 경우 상위에서 관리하기 떄문
            isValidImage(image);
        }
    }, []);

    const isValidImage = (file: File) => {
        const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        const maxSize = 5 * 1024 * 1024;

        if (validTypes.includes(file.type) && file.size <= maxSize) {
            setValidImage(true);

            if (Array.isArray(image)) {
                if (image.length > 10) {
                    alert('사진은 최대 10개 까지만 게시할 수 있습니다.');
                    return;
                }

                setImage((prev) => [file, ...prev]); // 배열 젤 앞에 추가
            } else {
                setImage(file);
                setPreview(URL.createObjectURL(file));
                setPreviewDisplay('block');
                setCancelDisplay('flex');
                setTextDisplay('none');
            }

            return;
        }

        setValidImage(false);
        setImage(undefined);
        setPreviewDisplay('none');
        setCancelDisplay('none');
        setTextDisplay('block');
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const profileImage = e.dataTransfer.files?.[0];

        if (profileImage) {
            isValidImage(profileImage);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];

        if (image) {
            isValidImage(image)
        }

        e.target.value = '';
    };

    const removeImage = () => {
        setImage(undefined);
        setPreviewDisplay('none');
        setCancelDisplay('none');
        setTextDisplay('block');
    }

    const preventClickWhenImageExists = (e: React.MouseEvent<HTMLLabelElement>) => {
        if (!Array.isArray(image) && image) {
            e.preventDefault();
        }
    };


    return (
        <>
            <Container
                width={width}
                ratio={ratio}
                marginTop={marginTop}
                htmlFor='ImageInput'
                onClick={preventClickWhenImageExists}
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>

                <Input id='ImageInput' type='file' onChange={handleImageChange} disabled={inputDisabled} />
                <ImageInputIcon src={imageIcon} textDisplay={textDisplay} />
                <ImageInputFristText textDisplay={textDisplay}><strong>클릭하여 업로드</strong> 또는 <strong>드래그 & 드랍</strong></ImageInputFristText>
                <ImageInputSecondText textDisplay={textDisplay}>PNG, JPG (최대 5MB)</ImageInputSecondText>
                <ProfileImagePreview src={preview} previewDisplay={previewDisplay} />

                <PreviewRemoveIcon cancelDisplay={cancelDisplay} onClick={removeImage}>
                    <CancelIcon src={cancelIcon} />
                </PreviewRemoveIcon>
            </Container>
        </>
    );
}

export default ImageInput;