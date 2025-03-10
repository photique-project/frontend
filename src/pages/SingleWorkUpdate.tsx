import { useState, useEffect } from 'react';
import { format } from "date-fns";
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/environment';
import styled, { keyframes } from 'styled-components';
import DatePicker from "react-datepicker";
import ENDPOINTS from '../api/endpoints';
import useAuthStore from '../zustand/store';
import { parse } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

import useFetch from '../hooks/useFetch';

import ToastMessage from '../components/ToastMessage';
import Header from '../components/Header';
import ImageInput from '../components/input/ImageInput';
import ScrollInput from '../components/input/ScrollInput';
import ShortButton from '../components/button/ShortButton';
import Tag from '../components/Tag';
import SingleWorkCreatePreview from '../components/SingleWorkCreatePreview';

import writeBlackIcon from '../assets/write-black.png';
import writeWhiteIcon from '../assets/write-white.png';
import viewBlackIcon from '../assets/view-black.png';
import viewWhiteIcon from '../assets/view-white.png'
import cameraIcon from '../assets/input-camera.png';
import lensIcon from '../assets/input-lens.png';
import settingsIcon from '../assets/input-settings.png';
import locationIcon from '../assets/input-location.png';
import calendarIcon from '../assets/input-calendar.png';
import tagIcon from '../assets/input-tag.png';
import categoryIcon from '../assets/category.png';
import loadingIcon from '../assets/loading-large.png';




const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    background-color: #F9FBFF;
`;

const BodyBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100%; 
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const FormBox = styled.div`
    margin-top: 40px;
    margin-bottom: 100px;
    width: 1100px;
    padding: 50px;
    
    display: flex;
    justify-content: center;

    flex-direction: column;
    flex-wrap: wrap;

    background-color: white;

    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    
    
    @media (max-width: 1400px) {
        width: calc((11 / 14) * 100%  - 100px);
    }

    @media (max-width: 768px) {
        margin-top: 20px;
    }

    @media (max-width: 480px) {
        padding: 20px;
        width: calc((11 / 14) * 100%  - 40px);
    }
`

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        justify-content: center;
        align-items: center;
    }
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 16px;
    }
`

const TabBox = styled.div`
    width: 100%;
    margin-top:40px;

    display: flex;
    flex-direction: column;
    
    justify-content: center;
    align-items: center;

    @media (max-width: 480px) {
        margin-top: 30px;
    }
`;

const Tab = styled.div`
    padding: 8px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    
`;

const TabIconBox = styled.div<{ viewMode: boolean }>`
    width: 135px;
    height: 52px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    border-radius: 30px;

    background-color: ${({ viewMode }) => (viewMode ? 'black' : 'white')};
    transition: background-color 0.3s ease-in-out;

    gap: 10px;

    cursor: pointer;

    &:hover {
        background-color: ${({ viewMode }) => (viewMode ? 'black' : 'rgba(0, 0, 0, 0.08)')};
    }

    @media (max-width: 768px) {
        width: calc(135px * (3/4));
        height: calc(52px * (3/4));
        gap: 7px;
    }

    @media (max-width: 480px) {
        width: calc(135px * (3/5));
        height: calc(52px * (3/5));
    }

    @media (max-width: 320px) {
        width: calc(135px * (3/7));
    }
`;

const TabIcon = styled.img`
    width: 32px;
    height: 32px;

    @media (max-width: 768px) {
        width: calc(32px * (3/4));
        height: calc(32px * (3/4));
    }
`;

const TabIconText = styled.div<{ viewMode: boolean }>`
    font-size: 16px;
    font-weight: 700;
    color: ${({ viewMode }) => (viewMode ? 'white' : 'black')};

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        display: none;
    }
`;



const WriteViewContainer = styled.div`
    margin-top: 40px;
    width: 100%;

    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        margin-top: 30px;
    }
`

const ImageInputTitleBox = styled.div`
    width: 100%;
`

const ImageInputTitle = styled.div<{ color: 'black' | 'red' }>`
    font-size: 14px;
    font-weight: 700;
    color: ${({ color }) => (color)};
`

const InputBox = styled.div`
    margin-top: 40px;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    justify-content: space-between;
    

    row-gap: 40px;

    @media (max-width: 768px) {
        row-gap: 30px;
    }
`;

const SmallInputBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const SmallInputLabelBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;    

    @media (max-width: 480px) {
        gap: 5px;    
    }
`;

const SmallInputIcon = styled.img`
    width: 26px;
    height: 26px;

    @media (max-width: 480px) {
        width: 16px;
        height: 16px;    
    }
`;

const SmallInputTitle = styled.label`
    font-size: 16px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const SmallInput = styled.input`
    margin-top: 10px;
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% - 24px);
    height: 40px;

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

    @media (max-width: 480px) {
        font-size: 14px;
    }
`

const DataSelectButton = styled(DatePicker)`
    margin-top: 10px;
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% - 24px);
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    font-size: 16px;
    color: black;
    

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: white;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }

    &::placeholder {
    color: rgba(0, 0, 0, 0.3); 
  }

  @media (max-width: 480px) {
        font-size: 14px;
    }
`

const ScrollInputBox = styled.div`
    width: 100%;
    margin-top: 10px;
    
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;
`



const LongInputBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const LongInputLabelBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;    

    @media (max-width: 480px) {
        gap:5px;
    }
`;

const LongInputTitle = styled.label`
    font-size: 16px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const LongInput = styled.input`
    margin-top: 10px;
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% - 24px);
    height: 40px;

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

    @media (max-width: 480px) {
        font-size: 14px;
    }
`

const TagBox = styled.div`
    margin-top:10px;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    
    gap: 5px;
`

const DescriptionInput = styled.textarea`
    margin-top: 10px;
    padding: 12px;
    width: calc(100% - 24px);
    height: 200px;
    
    resize: vertical;

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

    @media (max-width: 480px) {
        font-size: 14px;
    }
`

const ButtonBox = styled.div`
    width: 100%;
    margin-top: 80px;


    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;

    gap: 15px;

    @media (max-width: 768px) {
        margin-top: 60px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        justify-content: center;
        gap: 5px;
    }
`



const LoadingBackground = styled.div`
    width: 100%;
    height: 100%;

    position: absolute;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.2);
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
    width: 50px;
    height: 50px;

    animation: ${rotate} 1.2s ease-in-out infinite;
`

interface SingleWork {
    id: number,
    writer: {
        id: number;
        nickname: string;
        introduction: string;
        profileImage: string;
    };
    image: string;
    createdAt: string;
    camera: string;
    lens: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
    location: string;
    category: string;
    date: string;
    tags: string[];
    title: string;
    description: string;
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchRequestOptions {
    url: string;
    method: Method
    headers?: Record<string, string>;
    credentials: 'include' | 'same-origin';
    contentType: 'application/json' | 'multipart/form-data';
    body?: Record<string, any> | FormData | null;
}

const SingleWorkUpdate = () => {
    const apertureOptions = ["미입력", "f/0.7", "f/0.8", "f/0.85", "f/0.95", "f/1", "f/1.2", "f/1.4", "f/1.8", "f/2", "f/2.8", "f/3.2", "f/3.5", "f/4", "f/4.5", "f/5", "f/5.6", "f/6.3", "f/7.1", "f/8", "f/9", "f/10", "f/11", "f/13", "f/14", "f/16", "f/22", "f/32", "f/40", "f/45", "f/64"];
    const shutterSpeedOptions = ["미입력", "1/8000", "1/4000", "1/2000", "1/1000", "1/500", "1/250", "1/125", "1/60", "1/30", "1/15", "1/8", "1/4", "1/2", "1", "2", "4", "8", "15", "30"];
    const isoOptions = ["미입력", "50", "100", "200", "400", "800", "1600", "3200", "6400", "12800", "25600", "51200", "102400", "204800"];
    const categoryOptions = ["풍경", "인물", "동물", "식물", "건축", "여행", "음식", "스포츠", "흑백", "야경", "길거리", "추상", "이벤트", "패션"];
    const categoryMap: { [key: string]: string } = {
        "풍경": "landscape",
        "인물": "portrait",
        "동물": "animal",
        "식물": "plant",
        "건축": "architecture",
        "여행": "travel",
        "음식": "food",
        "스포츠": "sports",
        "흑백": "blackAndWhite",
        "야경": "nightscape",
        "길거리": "street",
        "추상": "abstract",
        "이벤트": "event",
        "패션": "fashion"
    };
    const user = useAuthStore.getState().user;
    const location = useLocation();

    const navigate = useNavigate();

    // 작성뷰, 미리보기 뷰
    const [writeView, setWriteView] = useState<boolean>(true);
    const [preview, setPreview] = useState<boolean>(false);

    // 단일작품 입력 데이터 상태관리
    const [singleWork, setSingleWork] = useState<SingleWork>(
        location.state?.singleWorkUpdateState
    );

    // 이미지 입력값 상태관리 변수
    const [validImage, setValidImage] = useState<boolean | null>(true);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageHelperText, setImageHelperText] = useState<string>('사진*');
    const [imageHelperTextColor, setImageHelperTextColor] = useState<'black' | 'red'>('black');

    // 카메라 이름 입력값 상태관리 변수
    const [validCameraInput, setValidCameraInput] = useState<boolean | null>(true);
    const [cameraHelperText, setCameraHelperText] = useState<string>('카메라*');
    const [cameraHelperTextColor, setCamareHelperTextColor] = useState<'black' | 'red'>('black');

    // 카테고리 입력값 상태관리 변수
    const [validCategoryInput, setValidCategoryInput] = useState<boolean | null>(true);
    const [categoryHelperText, setCategoryHelperText] = useState<string>('카테고리*');
    const [categoryHelperTextColor, setCategoryHelperTextColor] = useState<'black' | 'red'>('black');

    // 날짜 입력값 상태관리 변수
    const parseDate = (dateString: string): Date => {
        return dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : new Date();
    };

    const [validDateInput, setValidDateInput] = useState<boolean | null>(true);
    const [dateHelperText, setDateHelperText] = useState<string>('날짜*');
    const [dateHelperTextColor, setDateHelperTextColor] = useState<'black' | 'red'>('black');
    const [selectedDate, setSelectedDate] = useState<Date | null>(parseDate(singleWork.date));

    // 태그 입력값 상태관리 변수
    const [tagInput, setTagInput] = useState<string>('');
    const [isComposing, setIsComposing] = useState(false);

    // 제목 입력값 상태관리 변수
    const [validTitleInput, setValidTitleInput] = useState<boolean | null>(true);
    const [titleHelperText, setTitleHelperText] = useState<string>('제목*');
    const [titleHelperTextColor, setTitleHelperTextColor] = useState<'black' | 'red'>('black');

    // 설명 입력값 상태관리 변수
    const [validDescriptionInput, setValidDescriptionInput] = useState<boolean | null>(true);
    const [descriptionHelperText, setDescriptionHelperText] = useState<string>('설명*');
    const [descriptionHelperTextColor, setDescriptionHelperTextColor] = useState<'black' | 'red'>('black');

    // 입력값 disable
    const [inputDisabled, setInputDisalbed] = useState<boolean>(false);

    // 토스트 메시지 상태관리 변수
    const [toastMessageDisplay, setToastMessageDisplay] = useState<boolean>(false);
    const [firstText, setFirstText] = useState<string>('');
    const [secondText, setSecondText] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(null);

    // 로딩 배경 상태관리
    const [loadingDisplay, setLoadingDisplay] = useState<boolean>(false);

    // URL로 만든 src로 로딩할 수 있는 preview이미지를 imageInput컴포넌트에서 관리하기 때문에 
    // preview 화면에서 보여줄 src를 위해 URL만드는 과정필요함
    // 이미지가 수정됐을 때마다 preview를 새로 만들어줘야 하므로 해당 useEffect사용
    useEffect(function convertToPreviewURL() {
        if (image) {
            const previewURL = URL.createObjectURL(image);
            setSingleWork(prevState => ({
                ...prevState,
                image: previewURL
            }));

            return () => URL.revokeObjectURL(previewURL);
        }
    }, [image])

    // 입력받은 이미지 유효성검사
    useEffect(function validateImage() {
        if (validImage != null) {

            if (validImage) {
                setImageHelperText('사진*')
                setImageHelperTextColor('black');

                return;
            }

            setImageHelperText('사진* - PNG, JPG 파일만 가능하며, 최대 크기는 5MB입니다')
            setImageHelperTextColor('red');
        }
    }, [validImage])

    // 카메라 입력
    const handleCameraInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.substring(0, 30);

        setSingleWork(prevState => ({
            ...prevState,
            camera: input
        }));

        const trimmedInput = input.trim();

        if (1 <= trimmedInput.length && trimmedInput.length <= 50) {
            setValidCameraInput(true);
            setCamareHelperTextColor('black');
            setCameraHelperText('카메라*')
            return;
        }

        setValidCameraInput(false);
        setCamareHelperTextColor('red');
        setCameraHelperText('카메라* - 앞뒤 공백을 제외한 1글자 이상 50글자 이하만 가능합니다')
    }

    // 렌즈 입력
    const handleLensInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.substring(0, 30);

        setSingleWork(prevState => ({
            ...prevState,
            lens: input
        }));
    }

    // 설정값 입력
    const handleApertureInputChange = (option: string) => {
        setSingleWork(prevState => ({
            ...prevState,
            aperture: option
        }));
    }

    const handleShutterSpeedInputChange = (option: string) => {
        setSingleWork(prevState => ({
            ...prevState,
            shutterSpeed: option
        }));
    }

    const handleIsoInputChange = (option: string) => {
        setSingleWork(prevState => ({
            ...prevState,
            iso: option
        }));
    }


    // 위치 입력
    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.substring(0, 30);

        setSingleWork(prevState => ({
            ...prevState,
            location: input
        }));
    }

    // 카테고리 입력
    const handleCategoryInputChange = (option: string) => {
        setSingleWork(prevState => ({
            ...prevState,
            category: option
        }));

        setValidCategoryInput(true);
        setCategoryHelperTextColor('black');
        setCategoryHelperText('키테고리*')
    }


    // 날짜 입력
    const handleDataInputChange = (date: Date) => {
        const formatDate = (date: Date) => {
            return date ? format(date, "yyyy-MM-dd") : '날짜를 입력하세요';
        };

        setSingleWork(prevState => ({
            ...prevState,
            date: formatDate(date)
        }));

        setSelectedDate(date);
        setValidDateInput(true);
        setDateHelperTextColor('black');
        setDateHelperText('날짜*');
    }

    // 태그 입력
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.substring(0, 10);
        const trimmedInput = input.trim();
        setTagInput(trimmedInput);
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isComposing) {
            return; // 한글 입력 중이면 이벤트 무시
        }

        if (e.key === 'Enter') {
            e.preventDefault();

            if (singleWork.tags.length >= 5) {
                alert('태그는 최대 5개까지만 추가할 수 있습니다.');
                return;
            }

            const trimmedTag = tagInput.trim();

            if (trimmedTag.includes(' ')) {
                alert('태그는 띄어쓰기를 포함할 수 없습니다');
                return;
            }

            if (trimmedTag && !singleWork.tags.includes(trimmedTag)) {
                setSingleWork(prevState => ({
                    ...prevState,
                    tags: [...prevState.tags, trimmedTag]
                }));
                setTagInput('');
            }
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setSingleWork(prevState => ({
            ...prevState,
            tags: prevState.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleCompositionStart = () => {
        setIsComposing(true); // 한글 입력 시작
    };

    const handleCompositionEnd = () => {
        setIsComposing(false); // 한글 입력 종료
    };

    // 제목 입력
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.substring(0, 30);

        setSingleWork(prevState => ({
            ...prevState,
            title: input
        }));

        const trimmedInput = input.trim();

        if (1 <= trimmedInput.length && trimmedInput.length <= 30) {
            setValidTitleInput(true);
            setTitleHelperTextColor('black');
            setTitleHelperText('제목*')
            return;
        }

        setValidTitleInput(false);
        setTitleHelperTextColor('red');
        setTitleHelperText('제목* - 앞뒤 공백을 제외한 1글자 이상 30글자 이하만 가능합니다')
    };

    // 설명 입력
    const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value.substring(0, 500);

        setSingleWork(prevState => ({
            ...prevState,
            description: input
        }));

        const trimmedInput = input.trim();

        if (1 <= trimmedInput.length && trimmedInput.length <= 500) {
            setValidDescriptionInput(true);
            setDescriptionHelperTextColor('black');
            setDescriptionHelperText('설명*')
            return;
        }

        setValidDescriptionInput(false);
        setDescriptionHelperTextColor('red');
        setDescriptionHelperText('설명* - 앞뒤 공백을 제외한 1글자 이상 500글자 이하만 가능합니다')
    };

    // 뷰 전환
    const handleView = (event: React.MouseEvent<HTMLDivElement>) => {
        const id = (event.currentTarget as HTMLElement).id;

        if (id === 'write') {
            setWriteView(true);
            setPreview(false);

            return;
        }

        setWriteView(false);
        setPreview(true);
    }

    // 페이지 이동
    const navigateToHomePage = () => {
        navigate('/home', { state: { singleWorkId: singleWork.id } });
    };

    // 단일작품 생성 useFetch
    const {
        loading: singleWorkUpdateLoading,
        statusCode: singleWorkUpdateStatusCode,
        fetchRequest: singleWorkUpdateRequest
    } = useFetch<void>();

    // 단일작품 게시하기
    const handleSingleWorkUpdate = () => {
        // 이미지 입력값 확인
        if (!validImage) {
            if (validImage == null) {
                setImageHelperTextColor('red');
                setImageHelperText('사진* - 필수값입니다')
            }

            return;
        }

        // 카메라 입력값 확인
        // 앞뒤공백제거하고 1글자 이상 50글자 이하
        if (!validCameraInput) {
            if (validCameraInput == null) {
                setCamareHelperTextColor('red');
                setCameraHelperText('카메라* - 필수값입니다')
            }
            return;
        }

        // 렌즈, 셔터, ios, 위치 입력 값 확인필요 x 

        // 카테고리 입력값 확인
        if (!validCategoryInput) {
            if (validCategoryInput == null) {
                setCategoryHelperTextColor('red');
                setCategoryHelperText('키테고리* - 필수값입니다')

            }
            return;
        }

        // 날짜 입력값 확인
        if (!validDateInput) {
            if (validDateInput == null) {
                setDateHelperTextColor('red');
                setDateHelperText('날짜* - 필수값입니다');
            }
            return
        }

        // 태그 입력값 확인 x

        // 제목 입력값 확인
        if (!validTitleInput) {
            if (validTitleInput == null) {
                setTitleHelperTextColor('red');
                setTitleHelperText('제목* - 필수값입니다')
            }

            return
        }

        // 설명 입력값 확인
        if (!validDescriptionInput) {
            if (validDescriptionInput == null) {
                setDescriptionHelperTextColor('red');
                setDescriptionHelperText('설명* - 필수값입니다')
            }

            return
        }

        // 모드 검증되면 생성 요청하고 useEffect작성
        const requestTags: { name: string }[] = [];
        singleWork.tags.forEach((tag) => {
            requestTags.push({
                name: tag,
            });
        });


        const formData = new FormData();
        formData.append('writerId', user.id.toString());
        if (image !== undefined) {
            formData.append('image', image);
        }
        formData.append('camera', singleWork.camera.trim());
        formData.append('lens', singleWork.lens.trim());
        formData.append('aperture', singleWork.aperture === '' ? '미입력' : singleWork.aperture);
        formData.append('shutterSpeed', singleWork.shutterSpeed === '' ? '미입력' : singleWork.shutterSpeed);
        formData.append('iso', singleWork.iso === '' ? '미입력' : singleWork.iso);
        formData.append('location', singleWork.location.trim());
        formData.append('category', categoryMap[singleWork.category]);
        formData.append('date', singleWork.date);
        formData.append('tags', JSON.stringify(requestTags));
        formData.append('title', singleWork.title.trim());
        formData.append('description', singleWork.description.trim());

        const options: FetchRequestOptions = {
            url: `${API_BASE_URL}${ENDPOINTS.SINGLE_WORK.SEARCH}/${singleWork.id}`,
            method: 'PATCH',
            credentials: 'include',
            contentType: 'multipart/form-data',
            body: formData
        }

        singleWorkUpdateRequest(options);
    }

    useEffect(function handleSingleWorkCreateResult() {
        setLoadingDisplay(false);

        if (singleWorkUpdateStatusCode === 204) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 수정완료!');
            setSecondText('홈페이지로 돌아갑니다'); // 여기서 useLocation으로 단일작품 값 전달해야함
            setIsSuccess(true);

            setTimeout(() => {
                navigate('/home', { state: { singleWorkId: singleWork.id } });
            }, 3000);
            return;
        }

        if (singleWorkUpdateStatusCode === 400) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 수정실패 !');
            setSecondText('입력값을 확인해주세요');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);

            return;
        }

        if (singleWorkUpdateStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 수정실패 !');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSuccess(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                navigate('/home');
            }, 3000);
            return;
        }

        if (singleWorkUpdateStatusCode === 403) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 수정실패 !');
            setSecondText('인가되지 않은 접근입니다');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

        if (singleWorkUpdateStatusCode === 404) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 게시실패 !');
            setSecondText('유저 데이터가 존재하지 않습니다');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

        if (singleWorkUpdateStatusCode === 500) {
            setToastMessageDisplay(true);
            setFirstText('서버에러 !');
            setSecondText('잠시 후 다시 시도해주세요');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

    }, [singleWorkUpdateStatusCode])

    return (
        <Container>
            <Header />
            <BodyBox>
                <FormBox>
                    <TitleBox>
                        <Title>게시글 작성</Title>
                    </TitleBox>

                    <TabBox>
                        <Tab>
                            <TabIconBox id='write' viewMode={writeView} onClick={handleView}>
                                <TabIcon src={writeView ? writeWhiteIcon : writeBlackIcon}></TabIcon>
                                <TabIconText viewMode={writeView}>작성하기</TabIconText>
                            </TabIconBox>
                            <TabIconBox id='preview' viewMode={preview} onClick={handleView}>
                                <TabIcon src={preview ? viewWhiteIcon : viewBlackIcon}></TabIcon>
                                <TabIconText viewMode={preview}>미리보기</TabIconText>
                            </TabIconBox>
                        </Tab>
                    </TabBox>


                    {writeView &&
                        <WriteViewContainer>
                            <ImageInputTitleBox>
                                <ImageInputTitle color={imageHelperTextColor}>{imageHelperText}</ImageInputTitle>
                            </ImageInputTitleBox>

                            <ImageInput width={'100%'} ratio={'16/9'} marginTop={5} image={image} setImage={setImage} setValidImage={setValidImage} inputDisabled={inputDisabled} curImage={singleWork.image} />

                            <InputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={cameraIcon} />
                                        <SmallInputTitle style={{ color: cameraHelperTextColor }}>{cameraHelperText}</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <SmallInput
                                        placeholder='예: Sony A7C'
                                        value={singleWork.camera}
                                        onChange={handleCameraInputChange}
                                        disabled={inputDisabled}
                                    />
                                </SmallInputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={lensIcon} />
                                        <SmallInputTitle>렌즈</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <SmallInput
                                        placeholder='예: Sony FE 24-70mm f/2.8 GM'
                                        value={singleWork.lens}
                                        onChange={handleLensInputChange}
                                        disabled={inputDisabled}
                                    />
                                </SmallInputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={settingsIcon} />
                                        <SmallInputTitle>설정값</SmallInputTitle>
                                    </SmallInputLabelBox>

                                    <ScrollInputBox>

                                        <ScrollInput
                                            title={'조리개'}
                                            options={apertureOptions}
                                            selectedOption={singleWork.aperture}
                                            handleInputChange={handleApertureInputChange}
                                        />
                                        <ScrollInput
                                            title={'셔터'}
                                            options={shutterSpeedOptions}
                                            selectedOption={singleWork.shutterSpeed}
                                            handleInputChange={handleShutterSpeedInputChange}
                                        />
                                        <ScrollInput
                                            title={'ISO'}
                                            options={isoOptions}
                                            selectedOption={singleWork.iso}
                                            handleInputChange={handleIsoInputChange}
                                        />

                                    </ScrollInputBox>

                                </SmallInputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={locationIcon} />
                                        <SmallInputTitle>위치</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <SmallInput
                                        placeholder='예: Seoul, South Korea'
                                        value={singleWork.location}
                                        onChange={handleLocationInputChange}
                                        disabled={inputDisabled}
                                    />
                                </SmallInputBox>


                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={categoryIcon} />
                                        <SmallInputTitle style={{ color: categoryHelperTextColor }}>{categoryHelperText}</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <ScrollInputBox>

                                        <ScrollInput
                                            title={'카테고리'}
                                            options={categoryOptions}
                                            selectedOption={singleWork.category}
                                            handleInputChange={handleCategoryInputChange}
                                        />
                                    </ScrollInputBox>
                                </SmallInputBox>


                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={calendarIcon} />
                                        <SmallInputTitle style={{ color: dateHelperTextColor }}>{dateHelperText}</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <DataSelectButton
                                        selected={selectedDate}
                                        onChange={handleDataInputChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="날짜를 선택하세요"
                                        disabled={inputDisabled}
                                    />
                                </SmallInputBox>

                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <SmallInputIcon src={tagIcon} />
                                        <LongInputTitle>태그</LongInputTitle>
                                    </LongInputLabelBox>
                                    <LongInput
                                        value={tagInput}
                                        onChange={handleTagInputChange}
                                        onKeyDown={handleTagInputKeyDown}
                                        placeholder="태그를 입력하고 Enter를 누르세요 (최대 5개)"
                                        onCompositionStart={handleCompositionStart}
                                        onCompositionEnd={handleCompositionEnd}
                                        disabled={inputDisabled}
                                    />
                                    {singleWork.tags.length > 0 &&
                                        <TagBox>
                                            {singleWork.tags.map((tag, index) => (
                                                <Tag key={index} text={tag} handleTagRemove={() => handleRemoveTag(tag)}></Tag>
                                            ))}
                                        </TagBox>
                                    }
                                </LongInputBox>

                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <LongInputTitle style={{ color: titleHelperTextColor }}>{titleHelperText}</LongInputTitle>
                                    </LongInputLabelBox>
                                    <LongInput
                                        placeholder='작품 제목을 입력해주세요 (30자 이내)'
                                        value={singleWork.title}
                                        onChange={handleTitleInputChange}
                                        disabled={inputDisabled}
                                    />
                                </LongInputBox>

                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <LongInputTitle style={{ color: descriptionHelperTextColor }}>{descriptionHelperText}</LongInputTitle>
                                    </LongInputLabelBox>
                                    <DescriptionInput
                                        placeholder='작품 설명을 입력해주세요 (500자 이내)'
                                        value={singleWork.description}
                                        onChange={handleDescriptionInputChange}
                                        disabled={inputDisabled}
                                    ></DescriptionInput>
                                </LongInputBox>


                            </InputBox>


                        </WriteViewContainer>
                    }

                    {preview && <SingleWorkCreatePreview singleWork={singleWork} />}

                    <ButtonBox>
                        <ShortButton text={'취소'} type={'white'} action={navigateToHomePage}></ShortButton>
                        <ShortButton text={'수정완료'} type={'black'} action={handleSingleWorkUpdate}></ShortButton>
                    </ButtonBox>


                </FormBox>
            </BodyBox>

            {toastMessageDisplay &&
                <ToastMessage
                    firstText={firstText}
                    secondText={secondText}
                    isSuccess={isSuccess}
                />}

            {loadingDisplay &&
                <LoadingBackground>
                    <LoadingIcon src={loadingIcon} />
                </LoadingBackground>
            }
        </Container>
    )
}

export default SingleWorkUpdate;