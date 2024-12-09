import { useState } from 'react';

import HelperText from '../HelperText';

import imageIcon from '../../assets/add-image.png';
import cancelIcon from '../../assets/cancel.png';
import styled from 'styled-components';

const Container = styled.label<{ marginTop: number, isDragging: boolean }>`
    margin-top: ${({ marginTop }) => `${marginTop}px`};
    width:100%;
    aspect-ratio: 1;

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

const ImageInput = styled.input`
    display: none;
`;

const ImageInputIcon = styled.img<{ textDisplay: 'block' | 'none' }>`
    width: 40px;
    height: 40px;

    display: ${({ textDisplay }) => textDisplay};
`;

const ImageInputFristText = styled.div<{ textDisplay: 'block' | 'none' }>`
    margin-top: 15px;
    font-size: 10px;
    line-height: 11px;

    display: ${({ textDisplay }) => textDisplay};
`;

const ImageInputSecondText = styled.div<{ textDisplay: 'block' | 'none' }>`
    margin-top: 5px;
    font-size: 10px;
    line-height: 11px;

    display: ${({ textDisplay }) => textDisplay};
`;

const ProfileImagePreview = styled.img<{ previewDisplay: 'block' | 'none' }>`
    width:100%;
    aspect-ratio: 1;

    position: absolute;

    border-radius: 15px;

    display: ${({ previewDisplay }) => previewDisplay};
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

interface ProfileImageInputProps {
    marginTop: number;
}

const ProfileImageInput: React.FC<ProfileImageInputProps> = (props) => {
    const { marginTop } = props;
    const [previewDisplay, setPreviewDisplay] = useState<'block' | 'none'>('block');
    const [cancelDisplay, setCancelDisplay] = useState<'flex' | 'none'>('none');
    const [textDisplay, setTextDisplay] = useState<'block' | 'none'>('block');
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [helperTextVisibility, setHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');

    const isValidProfilImage = (file: File) => {
        const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        const maxSize = 5 * 1024 * 1024;
        return validTypes.includes(file.type) && file.size <= maxSize;
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const profileImage = e.dataTransfer.files?.[0];
        if (profileImage) {
            if (isValidProfilImage(profileImage)) {
                const imageUrl = URL.createObjectURL(profileImage);
                setProfileImage(imageUrl);
                setPreviewDisplay('block');
                setCancelDisplay('flex');
                setTextDisplay('none');
                setHelperTextVisibility('hidden');
            } else {
                setHelperTextVisibility('visible');
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };


    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const profileImage = e.target.files?.[0];

        if (profileImage) {
            if (isValidProfilImage(profileImage)) {
                const imageUrl = URL.createObjectURL(profileImage);
                setProfileImage(imageUrl);
                setPreviewDisplay('block');
                setCancelDisplay('flex');
                setTextDisplay('none');
                setHelperTextVisibility('hidden');
            } else {
                setHelperTextVisibility('visible');
            }
        }
    };

    const removeProfileImage = () => {
        setProfileImage(undefined);
        setPreviewDisplay('none');
        setCancelDisplay('none');
        setTextDisplay('block');
        setHelperTextVisibility('hidden');
    }

    const preventClickWhenImageExists = (e: React.MouseEvent<HTMLLabelElement>) => {
        if (profileImage) {
            e.preventDefault(); // 클릭 이벤트를 막음
        }
    };


    return (
        <>
            <Container
                marginTop={marginTop}
                htmlFor='ProfileImageInput'
                onClick={preventClickWhenImageExists}
                isDragging={isDragging}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>

                <ImageInput id='ProfileImageInput' type='file' onChange={handleProfileImageChange} />
                <ImageInputIcon src={imageIcon} textDisplay={textDisplay} />
                <ImageInputFristText textDisplay={textDisplay}><strong>클릭하여 업로드</strong> 또는 <strong>드래그 & 드랍</strong></ImageInputFristText>
                <ImageInputSecondText textDisplay={textDisplay}>PNG, JPG (최대 5MB)</ImageInputSecondText>
                <ProfileImagePreview src={profileImage} previewDisplay={previewDisplay} />

                <PreviewRemoveIcon cancelDisplay={cancelDisplay} onClick={removeProfileImage}>
                    <CancelIcon src={cancelIcon} />
                </PreviewRemoveIcon>
            </Container>
            <HelperText text='*PNG, JPG 파일만 가능하며, 최대 크기는 5MB입니다.' visibility={helperTextVisibility} color='red' />
        </>
    );
}

export default ProfileImageInput;