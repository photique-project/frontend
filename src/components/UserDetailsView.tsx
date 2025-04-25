import { useEffect, useState } from 'react';
import { FetchRequestOptions } from '../types/http';
import ENDPOINTS from '../api/endpoints';
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import useAuthStore from '../zustand/store';
import useFetch from '../hooks/useFetch';
import PasswordInput from './input/PasswordInput';
import ToastMessage from './ToastMessage';

import imageIcon from '../assets/add-image.png';
import lockIcon from '../assets/lock.png';
import withdrawIcon from '../assets/withdraw.png';
import loadingIcon from '../assets/loading-white.png';
import alertIcon from '../assets/alert.png';



const Container = styled.div`
    width: 80%;
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 40px;
`

const Title = styled.div`
    margin-top: 40px;
    width: 100%;

    font-size: 24px;
    font-weight: 700;
`

const BoxTitle = styled.div`
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    
`

const BoxSubTitle = styled.div`
    width: 100%;
    font-size: 16px;

    margin-top: 5px;
    
    color: rgba(0, 0, 0, 0.5);
    
`

const Box = styled.div`
    padding: 25px;
    width: calc(100% - 50px);

    display: flex;
    flex-direction: column;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    background-color: white;
`

const ImageBox = styled.div`
    margin-top:35px;
    display: flex;
    flex-direction: row;

    gap: 20px;

    @media (max-width: 760px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const ImageInputBox = styled.label<{ isDragging: boolean }>`
    width: 200px;
    aspect-ratio: 1/1;

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

    @media (max-width: 760px) {
        width: 100%;
    }
`;

const ImageInput = styled.input`
    display: none;
`

const ImageInputTextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 10px;
`

const ImageInputIcon = styled.img`
    width: 50px;
    height: 50px;
`

const ImageInputText = styled.div`
    font-size: 14px;
`

const ImageInputSettingBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;

    @media (max-width: 760px) {
    width: 100%;   
        
    }
`

const ImageInputSettingBoxText = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.6);
`


const ImageInputButtonBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 5px;

    position: absolute;
    bottom: 0;

    @media (max-width: 760px) {
        margin-top: 10px;
        position: initial;
        bottom: auto;
    }
`

const ImageInputInitButton = styled.button`
    width: 100%;
    height: 35px;

    font-size: 16px;
    font-weight: 700;

    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.3);

    color: rgba(0, 0, 0, 0.6);

    background-color: white;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`

const ImageInputResetButton = styled.button`
    width: 100%;
    height: 35px;

    font-size: 16px;
    font-weight: 700;

    border-radius: 7px;

    color: white;

    background-color: black;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }
`

const ProfileImagePreview = styled.img`
    width: 100%;
    height: 100%;

    border-radius: 15px;
    position: absolute;
`

const NicknameInputBox = styled.div`
    margin-top:35px;
    width: 100%;

    display: flex;
    flex-direction: column;
`

const NicknameInputLabel = styled.label`
    font-size: 16px;
    font-weight: 500;
`

const NicknameInput = styled.input`
    margin-top: 10px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: calc(100% - 24px);
    
    font-size: 16px;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }
`

const NicknameInputButtonBox = styled.div`
    margin-top: 10px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 5px;
`

const NicknameInputResetButton = styled.button`
    padding: 12px;
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 7px;

    font-size: 14px;
    font-weight: 700;


    color: white;

    background-color: black;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }
`

const NicknameInputValidateButton = styled.button`
    padding: 12px;
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-weight: 700;

    border-radius: 7px;

    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);

    color: rgba(0, 0, 0, 0.6);

    background-color: #e3ffed;

    cursor: pointer;

    &:hover {
        background-color: rgb(141, 255, 170);
    }

    transition: all ease-in-out 0.3s;
`

const IntroductionInputBox = styled.div`
    margin-top: 30px;

    display: flex;
    flex-direction: column;
`

const IntroductionInputLabel = styled.label`
    font-size: 16px;
    font-weight: 500;
`;

const IntroductionInput = styled.textarea`
    margin-top: 10px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 70px;

    resize: none;

    font-size: 16px;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }
`

const IntroductionInputButtonBox = styled.div`
    margin-top: 10px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 5px;
`

const IntroductionInputResetButton = styled.button`
    padding: 12px;
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 7px;

    font-size: 14px;
    font-weight: 700;


    color: white;

    background-color: black;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }
`

const InfoBox = styled.div`
    margin-top:30px;
    
    display: flex;
    flex-direction: column;
    gap:5px;
`;

const InfoText = styled.div`
    font-size: 16px;
    font-weight: 500;
`

const InfoValue = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
`

const Line = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 1px;

    background-color: rgba(0, 0, 0, 0.3);
`

const PasswordUpdateButton = styled.div`
    margin-top: 20px;
    width: 100%;
    padding-bottom: 12px;
    padding-top: 12px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    background-color: white;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`

const LockIcon = styled.img`
    width: 24px;
    height: 24px;
`

const PasswordUpdateText = styled.div`
    font-size: 16px;
`

const WithdrawButton = styled.div`
    margin-top: 35px;
    width: 100%;
    padding-bottom: 12px;
    padding-top: 12px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 10px;

    background-color: rgba(255, 0, 0, 0.3);

    cursor: pointer;

    &:hover {
        background-color: rgba(255, 0, 0, 0.8);
    }
`;

const WithdrawIcon = styled.img`
    width: 24px;
    height: 24px;
`

const WithdrawText = styled.div`
    font-size: 16px;
    color: white;
`

const PaddingBox = styled.div`
    padding: 50px;
`

const slideUpWithShake = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  60% {
    transform: translateY(-5px);
    opacity: 1;
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const UpdateBox = styled.div`
    padding-left:40px;
    padding-right: 40px;
    padding-top:15px;
    padding-bottom: 15px;
    width: calc(880px - 80px);
    
    position: fixed;
    bottom: 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 10px;

    background-color: #000000;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);

    animation: ${slideUpWithShake} 0.6s;
`

const UpdateBoxText = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: white;
`

const UpdateBoxButton = styled.button`
    padding: 10px;
    padding-left: 14px;
    padding-right: 14px;
    font-size: 20px;
    font-weight: 700;
    color: white;

    
    border-radius: 7px;

    background-color: #acffc5a7;

    &:hover {
        background-color: #45f67aa7;
    }

    cursor: pointer;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.img`
    width: 20px;
    height: 20px;

    animation: ${rotate} 1.2s ease-in-out infinite;
`

const UpdateCompleteBox = styled.div`
padding-left:40px;
    padding-right: 40px;
    padding-top:15px;
    padding-bottom: 15px;
    width: calc(880px - 80px);
    
    position: fixed;
    bottom: 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 10px;

    background-color: #000000;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);

    animation: ${slideUpWithShake} 0.6s;
`

const UpdateCompleteText = styled.div`
    padding: 10px;
    font-size: 20px;
    font-weight: 700;
    color: white;
`

const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    left:  0;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.7);
`

const PasswordUpdateBox = styled.div`
    padding: 30px;
    width: 400px;


    display: flex;
    flex-direction: column;

    border-radius: 10px;
    background-color: white;
`

const PasswordUpdateTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`

const PasswordInputLabel = styled.label`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 700;

    word-wrap: break-word;  
    word-break: break-word; 
    white-space: normal;  
`

const PasswordUpdateRequestButton = styled.button`
    margin-top: 30px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;


    font-size: 16px;
    font-weight: 700;

    border-radius: 7px;

    color: white;
    background-color: black;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }
`

const PasswordUpdateCancelButton = styled.button`
    margin-top: 5px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;

    background-color: white;

    font-size: 16px;
    font-weight: 700;

    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.3);


    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }

    cursor: pointer;
`

const DeleteBox = styled.div`
    padding: 25px;

    display: flex;
    flex-direction: column;

    border-radius: 10px;
    background-color: white;
`

const DeleteBoxTitleBox = styled.div`
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    
    gap: 10px;
`

const AlertIcon = styled.img`
    width: 30px;
    height:30px;
`

const DeleteBoxTitle = styled.div`
    font-size: 20px;
    font-weight: 700;


    color: #f50000;
`

const DeleteBoxContent = styled.div`
    font-size:16px;
    color: rgba(0, 0, 0, 0.6);
`

const DeleteBoxInput = styled.input`
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 10px;
    width: calc(100% - 24px);
    height: 40px;


    font-size: 16px;
    line-height: 17px;
    
    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }

`

const DeleteBoxButtonBox = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;

    gap: 5px;

    cursor: pointer;
`

const DeleteBoxCancelButton = styled.button`
    width: 50px;
    height: 30px;

    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.01);

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const DeleteBoxDeleteButton = styled.button`
    width: 50px;
    height: 30px;

    font-size: 16px;
    color: white;
    background-color: rgba(255, 0, 0, 0.4);

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    &:hover {
        background-color: rgba(255, 0, 0, 1);
    }
`



interface UserDetailsViewProps {



}



const UserDetailsView: React.FC<UserDetailsViewProps> = (props) => {
    const navigate = useNavigate();

    // 로그인 정보
    const user = useAuthStore.getState().user;

    // 이미지
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [validImage, setValidImage] = useState<boolean>(true);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>(user.profileImage);

    const validateImage = (file: File) => {
        const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        const maxSize = 5 * 1024 * 1024;

        if (validTypes.includes(file.type) && file.size <= maxSize) {
            setValidImage(true);
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));


            return;
        }

        setValidImage(false);
        setImage(undefined);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const profileImage = e.dataTransfer.files?.[0];

        if (profileImage) {
            validateImage(profileImage);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];

        if (image) {
            validateImage(image)
        }

        e.target.value = '';
    };

    const preventClickWhenImageExists = (e: React.MouseEvent<HTMLLabelElement>) => {
        if (image) {
            e.preventDefault();
        }
    };


    const handleDefaultProfileImage = () => {
        setPreviewImage('');
        setImage(undefined);
    }

    const handleResetProfilImage = () => {
        setPreviewImage(user.profileImage);
        setImage(undefined);
    }



    // 닉네임
    const [nicknameHelperText, setNicknameHelperText] = useState<string>('닉네임');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState<string>('black');
    const [nicknameInput, setNicknameInput] = useState<string>(user.nickname);
    const [validNickname, setValidNickname] = useState<boolean>(true);

    const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidNickname(false);
        const input = e.target.value.substring(0, 11);

        setNicknameInput(input);

        const trimmedInput = input.trim();

        if (1 <= trimmedInput.length && trimmedInput.length <= 11 && !trimmedInput.includes(' ')) {
            setNicknameHelperText('닉네임');
            setNicknameHelperTextColor('black');
            return;
        }

        setValidNickname(false);
        setNicknameHelperText('닉네임 - 공백을 포함하지 않은 1글자 이상 11글자 이하만 가능합니다');
        setNicknameHelperTextColor('red');
    }

    const handleNicknameReset = () => {
        setValidNickname(true);
        setNicknameHelperText('닉네임');
        setNicknameHelperTextColor('black');
        setNicknameInput(user.nickname);
    }

    const {
        loading: nicknameValidateRequestLoading,
        statusCode: nicknameValidateRequestStatusCode,
        fetchRequest: nicknameValidateRequest
    } = useFetch<void>();

    const handleNicknameValidateRequest = () => {
        const method = ENDPOINTS.USER.VALIDATE_NICKNAME.METHOD;
        const url = ENDPOINTS.USER.VALIDATE_NICKNAME.URL;

        const options: FetchRequestOptions = {
            url: url(nicknameInput),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json'
        }

        nicknameValidateRequest(options);
    }

    useEffect(function handleNicknameValidateResponse() {
        if (nicknameValidateRequestStatusCode === 204) {
            setValidNickname(true);
            setNicknameHelperText('닉네임 - 사용가능한 닉네임입니다');
            setNicknameHelperTextColor('green');
            return;
        }

        if (nicknameValidateRequestStatusCode === 400) {
            setValidNickname(false);
            setNicknameHelperText('닉네임 - 입력값을 확인해주세요');
            setNicknameHelperTextColor('red');
            return;
        }

        if (nicknameValidateRequestStatusCode === 409) {
            setValidNickname(false);
            setNicknameHelperText('닉네임 - 이미 존재하는 닉네임입니다');
            setNicknameHelperTextColor('red');
            return;
        }

        if (nicknameValidateRequestStatusCode === 500) {
            setValidNickname(false);
            setNicknameHelperText('닉네임 - [Server Error] 잠시 후 다시 시도해주세요');
            setNicknameHelperTextColor('red');

        }

    }, [nicknameValidateRequestStatusCode])



    // 자기소개
    const [introductionHelperText, setIntroductionHelperText] = useState<string>('자기소개');
    const [introductionHelperTextColor, setIntroductionHelperTextColor] = useState<string>('black');
    const [introductionInput, setIntroductionInput] = useState<string>(user.introduction ? user.introduction : '');
    const [validIntroduction, setValidIntroduction] = useState<boolean>(true);

    const handleIntroductionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value.substring(0, 50);

        setIntroductionInput(input);

        const trimmedInput = input.trim();

        if (0 <= trimmedInput.length && trimmedInput.length <= 50) {
            setValidIntroduction(true);
            setIntroductionHelperText('자기소개');
            setIntroductionHelperTextColor('black');
            return;
        }

        setValidNickname(false);
        setIntroductionHelperText('자기소개 - 0글자 이상 50글자 이하만 가능합니다');
        setIntroductionHelperTextColor('red');
    }

    const handleIntroductionReset = () => {
        setValidIntroduction(true);
        setIntroductionHelperText('자기소개');
        setIntroductionHelperTextColor('black');
        setIntroductionInput(user.introduction ? user.introduction : '');
    }



    // 회원정보 수정 요청
    const [updateCompleteToastMessageDisplay, setUpdateCompleteToastMessageDisplay] = useState<boolean>(false);
    const [updateToastMessageDisplay, setUpdateToastMessageDisplay] = useState<boolean>(false);
    const [updateCompleteMessage, setUpdateCompleteMessage] = useState<string>('유저정보가 수정되었습니다 !');
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

    useEffect(function () {
        if (validImage && validNickname && validIntroduction && (nicknameInput !== user.nickname || introductionInput !== (user.introduction ? user.introduction : '') || previewImage !== user.profileImage)) {
            setUpdateToastMessageDisplay(true);
            return;
        }

        setUpdateToastMessageDisplay(false);

    }, [previewImage, image, nicknameInput, validNickname, introductionInput]);



    const {
        loading: userUpdateLoading,
        statusCode: userUpdateStatusCode,
        fetchRequest: userUpdateFetchRequest
    } = useFetch<void>();

    const handleUserUpdateRequest = () => {
        if (!validNickname) {
            setNicknameHelperText('닉네임 - 중복확인을 진행해주세요');
            setNicknameHelperTextColor('red');
            return;
        }

        const formData = new FormData();

        // 그대로면 수정 X
        // 기본값이라면 빈값 전송
        if (previewImage !== user.profileImage) {
            if (!image) {
                const emptyBlob = new Blob([], { type: 'application/octet-stream' });
                formData.append('profileImage', emptyBlob, 'empty-file');
            } else {
                formData.append('profileImage', image);
            }
        }

        // 그대로면 수정 X
        if (nicknameInput !== user.nickname) {
            formData.append('nickname', nicknameInput);
        }

        // 그대로면 수정 X
        if (introductionInput !== user.introduction) {
            formData.append('introduction', introductionInput);
        }

        const method = ENDPOINTS.USER.UPDATE.METHOD;
        const url = ENDPOINTS.USER.UPDATE.URL(user.id);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            credentials: 'include',
            contentType: 'multipart/form-data',
            body: formData,
        };

        userUpdateFetchRequest(options)
    }

    useEffect(function handleUserUpdateResponse() {
        const login = async () => {
            const login = useAuthStore.getState().login;
            await login(); // 로그인요청으로 받은 토큰으로 유저아이디 값을 전역 저장소에 세팅
        }

        if (userUpdateStatusCode === 204) {
            setUpdateToastMessageDisplay(false);
            setUpdateCompleteToastMessageDisplay(true);
            setUpdateCompleteMessage('유저정보가 수정되었습니다 !');
            setUpdateSuccess(true);

            setTimeout(async () => {
                setUpdateCompleteToastMessageDisplay(false);
                setValidNickname(false);
                setNicknameHelperText('닉네임');
                setNicknameHelperTextColor('black');
                await login();
                window.location.reload();

            }, 3000)
            return;
        }

        if (userUpdateStatusCode === 400) {
            return;
        }

        if (userUpdateStatusCode === 401) {
            return;
        }

        if (userUpdateStatusCode === 403) {
            return;
        }

        if (userUpdateStatusCode === 404) {
            return;
        }

        if (userUpdateStatusCode === 409) {
            return;
        }

        if (userUpdateStatusCode === 500) {
            return;
        }

    }, [userUpdateStatusCode])


    const formatDate = (createdAt: string): string => {
        const date = new Date(createdAt);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}년 ${month}월 ${day}일`;
    };




    // 비밀번호 변경
    const [passwordUpdateModalDisplay, setPasswordUpdateModalDisplay] = useState<boolean>(false);
    const [passwordInputHelperText, setPasswordInputHelperText] = useState<string>('새 비밀번호');
    const [passwordInputHelperTextColor, setPasswordInputHelperTextColor] = useState<string>('black');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [repasswordInputHelperText, setRepasswordInputHelperText] = useState<string>('비밀번호 확인');
    const [repasswordInputHelperTextColor, setRepasswordInputHelperTextColor] = useState<string>('black');
    const [repasswordInput, setRepasswordInput] = useState<string>('');
    const [toastMessageDisplay, setToastMessageDisplay] = useState<boolean>(false);
    const [firstText, setFirstText] = useState<string>('');
    const [secondText, setSecondText] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(null);

    const handlePasswordUpdateModalDisplay = () => {
        setPasswordUpdateModalDisplay(!passwordUpdateModalDisplay);
        setPasswordInputHelperText('새 비밀번호')
        setPasswordInputHelperTextColor('black')
        setRepasswordInputHelperText('비밀번호 확인')
        setRepasswordInputHelperTextColor('black')
    }


    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value);
    };

    const handleRepasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepasswordInput(e.target.value);
    };

    const validatePassword = () => {
        if (passwordInput !== '') {
            if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/.test(passwordInput)) {
                setPasswordInputHelperTextColor('red');
                setPasswordInputHelperText('새 비밀번호 - 비밀번호는 최소 8자 이상이어야 하며, 최소 한 개의 영문자, 숫자, 특수문자를 포함해야 합니다');
                return false;
            }

            setPasswordInputHelperTextColor('black');
            setPasswordInputHelperText('새 비밀번호');
            return true;
        }

        setPasswordInputHelperTextColor('red');
        setPasswordInputHelperText('새 비밀번호 - 비밀번호는 최소 8자 이상이어야 하며, 최소 한 개의 영문자, 숫자, 특수문자를 포함해야 합니다');
        return false;

    }

    const validateRepassword = () => {
        if (repasswordInput !== '') {
            if (passwordInput !== repasswordInput) {
                setRepasswordInputHelperTextColor('red');
                setRepasswordInputHelperText('비밀번호 확인 - 일치하지 않습니다');
                return false;
            }

            setRepasswordInputHelperTextColor('black');
            setRepasswordInputHelperText('비밀번호 확인');
            return true;
        }

        setRepasswordInputHelperTextColor('black');
        return false;
    }

    const {
        loading: passwordUpdateLoading,
        statusCode: passwordUpdateStatusCode,
        fetchRequest: passwordUpdateFetchRequest
    } = useFetch<void>();



    const handlePasswordUpdateRequest = () => {
        // 비밀번호 유효성 검사
        if (!validatePassword()) {
            return;
        }

        if (!validateRepassword()) {
            return;
        }

        const method = ENDPOINTS.USER.UPDATE.METHOD;
        const url = ENDPOINTS.USER.UPDATE.URL;

        const formData = new FormData();
        formData.append('password', passwordInput);

        const options: FetchRequestOptions = {
            url: url(user.id),
            method: method,
            credentials: 'include',
            contentType: 'multipart/form-data',
            body: formData,
        };

        passwordUpdateFetchRequest(options)
    }

    useEffect(function handlePasswordUpdateResponse() {
        if (passwordUpdateStatusCode === 204) {
            setToastMessageDisplay(true);
            setFirstText('비밀번호 수정완료!');
            setSecondText('');
            setIsSuccess(true);

            setTimeout(async () => {
                setToastMessageDisplay(false);
                setPasswordUpdateModalDisplay(false);
            }, 3000)
            return;
        }

        if (passwordUpdateStatusCode === 400) {
            setToastMessageDisplay(true);
            setFirstText('비밀번호 수정실패!');
            setSecondText('입력값을 확인해주세요');
            setIsSuccess(false);

            setTimeout(async () => {
                setToastMessageDisplay(false);
            }, 3000)
            return;
        }

        if (passwordUpdateStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('비밀번호 수정실패!');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSuccess(false);

            setTimeout(async () => {
                useAuthStore.getState().logout();
                navigate('/home');
            }, 3000)
            return;
        }

        if (userUpdateStatusCode === 403) {
            setToastMessageDisplay(true);
            setFirstText('비밀번호 수정실패!');
            setSecondText('인가되지 않은 접근입니다');
            setIsSuccess(false);

            setTimeout(async () => {
                setToastMessageDisplay(false);
            }, 3000)
            return;
        }

        if (passwordUpdateStatusCode === 404) {
            setToastMessageDisplay(true);
            setFirstText('비밀번호 수정실패!');
            setSecondText('유저 데이터가 존재하지 않습니다');
            setIsSuccess(false);

            setTimeout(async () => {
                setToastMessageDisplay(false);
            }, 3000)
            return;
        }

        if (userUpdateStatusCode === 500) {
            setToastMessageDisplay(true);
            setFirstText('서버에러 !');
            setSecondText('잠시 후 다시 시도해주세요');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

    }, [passwordUpdateStatusCode])


    // 회원탈퇴
    const [withdrawModalDisplay, setWithdrawModalDisplay] = useState<boolean>(false);
    const [deleteModalInput, setDeleteModalInput] = useState<string>('');

    const handleWithdrawModalDisplay = () => {
        setWithdrawModalDisplay(!withdrawModalDisplay);
    }

    const handleDeleteModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteModalInput(e.target.value);
    }

    const {
        loading: withdrawLoading,
        statusCode: withdrawStatusCode,
        fetchRequest: withdrawRequest
    } = useFetch<void>();

    const handleWithdrawRequest = () => {
        if (deleteModalInput !== '삭제') {
            return;
        }

        const method = ENDPOINTS.USER.WITHDRAW.METHOD;
        const url = ENDPOINTS.USER.WITHDRAW.URL;

        const options: FetchRequestOptions = {
            url: url(user.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        withdrawRequest(options);
    }


    useEffect(function withdrawResponse() {
        if (withdrawStatusCode === 204) {
            setToastMessageDisplay(true);
            setFirstText('회원탈퇴 성공 !');
            setSecondText('현재 창이 닫힙니다');
            setIsSuccess(true);
            setWithdrawModalDisplay(false);

            setTimeout(() => {
                navigate('/home');
            }, 3000);
            return;
        }
        // 나머지 에러처리
        if (withdrawStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('회원탈퇴 실패 !');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSuccess(false);
            setWithdrawModalDisplay(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                navigate('/home');
            }, 3000);
            return;
        }

        if (withdrawStatusCode === 403) {
            setToastMessageDisplay(true);
            setFirstText('회원탈퇴 실패 !');
            setSecondText('인가되지 않은 접근입니다');
            setIsSuccess(false);
            setWithdrawModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

        if (withdrawStatusCode === 404) {
            setToastMessageDisplay(true);
            setFirstText('회원탈퇴 실패 !');
            setSecondText('유저 데이터를 찾을 수 없습니다');
            setIsSuccess(false);
            setWithdrawModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }


        if (withdrawStatusCode === 500) {
            setToastMessageDisplay(true);
            setFirstText('서버에러 !');
            setSecondText('잠시 후 다시 시도해주세요');
            setIsSuccess(false);
            setWithdrawModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

    }, [withdrawStatusCode]);




    return (
        <Container>
            <Title>계정 수정</Title>

            <Box>
                <BoxTitle>프로필 이미지</BoxTitle>
                <BoxSubTitle>프로필에 표시할 이미지를 선택하세요</BoxSubTitle>
                {/* 이미지 입력 따로 만들기 */}
                {/* 프로필 이미지나 닉네임이나 자기소개 변경 사항이 있을 경우 변경하시겠습니까 메시지 하단에 띄우고 업데이트하도록 */}

                <ImageBox>
                    <ImageInputBox
                        htmlFor='ImageInput'
                        onClick={preventClickWhenImageExists}
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>

                        <ImageInput
                            id='ImageInput'
                            type='file'
                            onChange={handleImageInputChange}
                            disabled={inputDisabled}
                        />

                        {!previewImage &&
                            <ImageInputTextBox>
                                <ImageInputIcon src={imageIcon} />
                                <ImageInputText><strong>클릭</strong> 또는 <strong>드래그 & 드랍</strong></ImageInputText>
                            </ImageInputTextBox>}

                        {previewImage && <ProfileImagePreview src={previewImage} />}

                    </ImageInputBox>

                    <ImageInputSettingBox>
                        <ImageInputSettingBoxText>최대 파일 크기: 5MB</ImageInputSettingBoxText>
                        <ImageInputSettingBoxText>지원형식: PNG, JPG</ImageInputSettingBoxText>

                        <ImageInputButtonBox>
                            <ImageInputInitButton onClick={handleDefaultProfileImage}>기본값</ImageInputInitButton>
                            <ImageInputResetButton onClick={handleResetProfilImage}>원래대로</ImageInputResetButton>

                        </ImageInputButtonBox>

                    </ImageInputSettingBox>

                </ImageBox>

            </Box>

            <Box>
                <BoxTitle>기본 정보</BoxTitle>
                <NicknameInputBox>
                    <NicknameInputLabel
                        htmlFor='nicknameInput'
                        style={{ color: nicknameHelperTextColor }}
                    >{nicknameHelperText}</NicknameInputLabel>
                    <NicknameInput
                        id='nicknameInput'
                        placeholder='닉네임을 입력해주세요 (11자 이내)'
                        value={nicknameInput}
                        onChange={handleNicknameInput}
                    />
                    <NicknameInputButtonBox>
                        <NicknameInputResetButton onClick={handleNicknameReset}>원래대로</NicknameInputResetButton>
                        <NicknameInputValidateButton
                            disabled={user.nickname === nicknameInput}
                            onClick={handleNicknameValidateRequest}
                        >
                            중복확인
                        </NicknameInputValidateButton>

                    </NicknameInputButtonBox>
                </NicknameInputBox>

                <IntroductionInputBox>
                    <IntroductionInputLabel
                        htmlFor='introductionInput'
                        style={{ color: introductionHelperTextColor }}
                    >
                        {introductionHelperText}
                    </IntroductionInputLabel>

                    <IntroductionInput
                        id='introductionInput'
                        placeholder='소개를 입력해주세요 (50자 이내)'
                        value={introductionInput ? introductionInput : ''}
                        onChange={handleIntroductionInput}
                    />

                </IntroductionInputBox>

                <IntroductionInputButtonBox>
                    <IntroductionInputResetButton onClick={handleIntroductionReset}>원래대로</IntroductionInputResetButton>

                </IntroductionInputButtonBox>

            </Box>

            <Box>
                <BoxTitle>계정 정보</BoxTitle>
                <InfoBox>
                    <InfoText>이메일</InfoText>
                    <InfoValue>{user.email}</InfoValue>
                </InfoBox>

                <InfoBox>
                    <InfoText>가입일</InfoText>
                    <InfoValue>{formatDate(user.createdAt)}</InfoValue>
                </InfoBox>


                <Line />

                <PasswordUpdateButton onClick={handlePasswordUpdateModalDisplay}>
                    <LockIcon src={lockIcon} />
                    <PasswordUpdateText>비밀번호 변경</PasswordUpdateText>
                </PasswordUpdateButton>
            </Box>

            <Box style={{ border: '1px solid red' }}>
                <BoxTitle style={{ color: 'red' }}>계정 삭제</BoxTitle>
                <BoxSubTitle>계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다</BoxSubTitle>

                <WithdrawButton onClick={handleWithdrawModalDisplay}>
                    <WithdrawIcon src={withdrawIcon} />
                    <WithdrawText>계정삭제</WithdrawText>
                </WithdrawButton>
            </Box>

            <PaddingBox />

            {updateToastMessageDisplay &&
                <UpdateBox>
                    <UpdateBoxText>변경사항을 저장하시겠습니까?</UpdateBoxText>
                    <UpdateBoxButton onClick={handleUserUpdateRequest}>
                        {userUpdateLoading &&
                            <LoadingIcon src={loadingIcon} />
                        }
                        {!userUpdateLoading &&
                            '저장'}
                    </UpdateBoxButton>
                </UpdateBox>
            }

            {updateCompleteToastMessageDisplay &&
                <UpdateCompleteBox style={{ backgroundColor: updateSuccess ? 'green' : 'red' }}>
                    <UpdateCompleteText>{updateCompleteMessage}</UpdateCompleteText>

                </UpdateCompleteBox>
            }



            {passwordUpdateModalDisplay &&
                <ModalBackground>
                    <PasswordUpdateBox>
                        <PasswordUpdateTitle>비밀번호 수정</PasswordUpdateTitle>

                        <PasswordInputLabel style={{ color: passwordInputHelperTextColor }}>{passwordInputHelperText}</PasswordInputLabel>
                        <PasswordInput placeHolder='비밀번호' marginTop={10} text={passwordInput} handleChange={handlePasswordInputChange} inputDisabled={inputDisabled} />

                        <PasswordInputLabel style={{ color: repasswordInputHelperTextColor }}>{repasswordInputHelperText}</PasswordInputLabel>
                        <PasswordInput placeHolder='비밀번호 확인' marginTop={10} text={repasswordInput} handleChange={handleRepasswordInputChange} inputDisabled={inputDisabled} />

                        <PasswordUpdateRequestButton onClick={handlePasswordUpdateRequest}>
                            {passwordUpdateLoading &&
                                <LoadingIcon src={loadingIcon} />
                            }
                            {!passwordUpdateLoading &&
                                '수정'}
                        </PasswordUpdateRequestButton>
                        <PasswordUpdateCancelButton onClick={handlePasswordUpdateModalDisplay}>취소</PasswordUpdateCancelButton>

                    </PasswordUpdateBox>
                </ModalBackground>
            }

            {withdrawModalDisplay &&
                <ModalBackground>
                    {withdrawLoading &&
                        <LoadingIcon src={loadingIcon} />
                    }
                    {!withdrawLoading &&
                        <DeleteBox>
                            <DeleteBoxTitleBox>
                                <AlertIcon src={alertIcon} />
                                <DeleteBoxTitle>회원탈퇴 확인</DeleteBoxTitle>
                            </DeleteBoxTitleBox>

                            <DeleteBoxContent>이 작업은 되돌릴 수 없습니다.</DeleteBoxContent>
                            <DeleteBoxContent>유저와과 관련된 모든 데이터가 영구적으로 삭제됩니다.</DeleteBoxContent>

                            <DeleteBoxInput
                                placeholder='"삭제"를 입력하세요'
                                value={deleteModalInput}
                                onChange={handleDeleteModalInputChange}
                            />

                            <DeleteBoxButtonBox>
                                <DeleteBoxCancelButton onClick={handleWithdrawModalDisplay}>취소</DeleteBoxCancelButton>
                                <DeleteBoxDeleteButton onClick={handleWithdrawRequest}>탈퇴</DeleteBoxDeleteButton>
                            </DeleteBoxButtonBox>

                        </DeleteBox>
                    }
                </ModalBackground>
            }

            {toastMessageDisplay &&
                <ToastMessage
                    firstText={firstText}
                    secondText={secondText}
                    isSuccess={isSuccess}
                />}


        </Container>

    )
}

export default UserDetailsView;