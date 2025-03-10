import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubPicker } from 'react-color';
import { API_BASE_URL } from '../config/environment';
import useAuthStore from '../zustand/store';
import ENDPOINTS from '../api/endpoints';

import styled, { keyframes } from 'styled-components';

import useFetch from '../hooks/useFetch';

import Header from '../components/Header';
import Tag from '../components/Tag';
import ShortButton from '../components/button/ShortButton';
import ImageInput from '../components/input/ImageInput';
import ImageBox from '../components/ImageBox';
import ExhibitionCreatePreview from '../components/ExhibitionCreatePreview';
import ToastMessage from '../components/ToastMessage';

import writeBlackIcon from '../assets/write-black.png';
import writeWhiteIcon from '../assets/write-white.png';
import viewBlackIcon from '../assets/view-black.png';
import viewWhiteIcon from '../assets/view-white.png'
import tagIcon from '../assets/input-tag.png';
import imagesIcon from '../assets/images.png';
import diamondIcon from '../assets/diamond.png';
import loadingIcon from '../assets/loading-large.png';
import { workerData } from 'worker_threads';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

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

const InputBox = styled.div`
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

const SmallInputIcon = styled.img`
    width: 26px;
    height: 26px;

    @media (max-width: 480px) {
        width: 16px;
        height: 16px;    
    }
`;


const DescriptionInput = styled.textarea`
    margin-top: 10px;
    padding: 12px;
    width: calc(100% - 24px);
    height: 100px;
    
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

    @media (max-width: 480px) {
        font-size: 14px;
    }
`

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

const SmallInputTitle = styled.label`
    font-size: 16px;
    font-weight: 700;

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const TagBox = styled.div`
    margin-top:10px;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    
    gap: 5px;
`

const CardColorInputBox = styled.div<{ backgroundColor: string }>`
    margin-top:10px;
    width: 100%;
    aspect-ratio: 3/2;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    border: 1px solid #000000;
    border-radius: 15px;

    background-color: ${({ backgroundColor }) => (backgroundColor)};
`;

const ImageListBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 20px;
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


type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchRequestOptions {
    url: string;
    method: Method
    headers?: Record<string, string>;
    credentials: 'include' | 'same-origin';
    contentType: 'application/json' | 'multipart/form-data';
    body?: Record<string, any> | FormData | null;
}

interface Tag {
    name: string;
}

interface Work {
    image: File;
    previewImage: string;
    title: string;
    description: string;
}

interface ExhibitionData {
    writer: {
        id: number;
        nickname: string;
        introduction: string;
        profileImage: string;
    };
    title: string;
    description: string;
    tags: string[];
    cardColor: string;
    works: Work[];
}

const NewExhibition = () => {
    const cardColors = [
        "#FFFFFF", "#000000", "#B80000", "#DB3E00", "#FCCB00", "#008B02", "#006B76",
        "#1273DE", "#004DCF", "#5300EB", "#e0e0e079", "#a5a5a576", "#EB9694", "#FAD0C3",
        "#FEF3BD", "#C1E1C5", "#BEDADC", "#C4DEF6", "#BED3F3", "#D4C4FB",
    ];

    const navigate = useNavigate();
    const user = useAuthStore.getState().user;

    const [writeView, setWriteView] = useState<boolean>(true);
    const [preview, setPreview] = useState<boolean>(false);

    // 전시회 입력 데이터
    const [exhibitionData, setExhibitionData] = useState<ExhibitionData>(
        {
            writer: {
                id: user.id,
                nickname: user.nickname,
                introduction: user.introduction,
                profileImage: user.profileImage,
            },
            title: '',
            description: '',
            tags: [],
            cardColor: '#ffffff',
            works: []
        }
    );

    // 제목 입력값 상태관리 변수
    const [validExhibitionTitleInput, setValidExhibitionTitleInput] = useState<boolean | null>(null);
    const [exhibitionTitleHelperText, setExhibitionTitleHelperText] = useState<string>('제목*');
    const [exhibitionTitleHelperTextColor, setExhibitionTitleHelperTextColor] = useState<'black' | 'red'>('black');

    // 설명 입력값 상태관리 변수
    const [validExhibitionDescriptionInput, setValidExhibitionDescriptionInput] = useState<boolean | null>(null);
    const [exhibitionDescriptionHelperText, setExhibitionDescriptionHelperText] = useState<string>('설명*');
    const [exhibitionDescriptionHelperTextColor, setExhibitionDescriptionHelperTextColor] = useState<'black' | 'red'>('black');

    // 태그 입력값 상태관리 변수
    const [tagInput, setTagInput] = useState<string>('');
    const [isComposing, setIsComposing] = useState(false);

    // 이미지 입력값 상태관리 변수
    const [validImage, setValidImage] = useState<boolean | null>(null); // 업로드할 때만 동작하므로 하나만 있으면 됨
    const [imageHelperText, setImageHelperText] = useState<string>('사진*');
    const [imageHelperTextColor, setImageHelperTextColor] = useState<'black' | 'red'>('black');
    const [imageDisabled, setImageDisabled] = useState<boolean>(false);

    // 이미지를 기준으로 각 이미지데이터가 추가됨
    const [images, setImages] = useState<(File | undefined)[]>([]);
    const imagesSizeRef = useRef<number>(0);

    // 로딩 및 토스트 메시지

    // 토스트 메시지 상태관리 변수
    const [toastMessageDisplay, setToastMessageDisplay] = useState<boolean>(false);
    const [firstText, setFirstText] = useState<string>('');
    const [secondText, setSecondText] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(null);


    useEffect(function cleanUp() {
        // 언마운트 코드는 언마운트와 리렌더링으로 의존성배열의 변수가 변경이 됐을 때 먼저 실행되면서 정리하고 useEffect실행됨
        return () => { exhibitionData.works.forEach((work) => URL.revokeObjectURL(work.previewImage)) }
    }, [])


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

    // 제목 입력
    const handleExhibitionTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.substring(0, 30);

        setExhibitionData(prevState => ({
            ...prevState,
            title: input
        }));

        const trimmedInput = input.trim();

        if (1 <= trimmedInput.length && trimmedInput.length <= 30) {
            setValidExhibitionTitleInput(true);
            setExhibitionTitleHelperTextColor('black');
            setExhibitionTitleHelperText('제목*')
            return;
        }

        setValidExhibitionTitleInput(false);
        setExhibitionTitleHelperTextColor('red');
        setExhibitionTitleHelperText('제목* - 앞뒤 공백을 제외한 1글자 이상 30글자 이하만 가능합니다')
    };



    // 설명 입력
    const handleExhibitionDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value.substring(0, 200);

        setExhibitionData(prevState => ({
            ...prevState,
            description: input
        }));

        const trimmedInput = input.trim();

        if (1 <= trimmedInput.length && trimmedInput.length <= 30) {
            setValidExhibitionDescriptionInput(true);
            setExhibitionDescriptionHelperTextColor('black');
            setExhibitionDescriptionHelperText('설명*')
            return;
        }

        setValidExhibitionDescriptionInput(false);
        setExhibitionDescriptionHelperTextColor('red');
        setExhibitionDescriptionHelperText('설명* - 앞뒤 공백을 제외한 1글자 이상 200글자 이하만 가능합니다')
    };


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

            if (exhibitionData.tags.length >= 5) {
                alert('태그는 최대 5개까지만 추가할 수 있습니다.');
                return;
            }

            const trimmedTag = tagInput.trim();

            if (trimmedTag.includes(' ')) {
                alert('태그는 띄어쓰기를 포함할 수 없습니다');
                return;
            }

            if (trimmedTag && !exhibitionData.tags.includes(trimmedTag)) {
                setExhibitionData(prevState => ({
                    ...prevState,
                    tags: [...prevState.tags, trimmedTag]
                }));

                setTagInput('');
            }
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setExhibitionData(prevState => ({
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


    // 카드색상 입력
    const handleCardColorInputChange = (hex: string) => {
        setExhibitionData(prevState => ({
            ...prevState,
            cardColor: hex,
        }));
    };




    // 이미지 박스 핸들링
    const handleRemoveImageBox = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));

        setExhibitionData(prevState => {
            URL.revokeObjectURL(prevState.works[index].previewImage);

            return {
                ...prevState,
                works: prevState.works.filter((_, i) => i !== index)
            };
        });
    }

    const handleMoveUp = (index: number) => {
        const moveUpIndex = (prev, index) => {
            if (index === 0) { // 인덱스 0이면 위로 이동 불가능
                return prev;
            }

            const newArray = [...prev];
            [newArray[index], newArray[index - 1]] = [newArray[index - 1], newArray[index]];

            return newArray;
        }

        setImages((prev) => moveUpIndex(prev, index));

        setExhibitionData(prevState => {
            const newWorks = [...prevState.works];
            [newWorks[index], newWorks[index - 1]] = [newWorks[index - 1], newWorks[index]];

            return { ...prevState, works: newWorks };
        });
    };

    const handleMoveDown = (index: number) => {
        const moveDownIndex = (prev, index) => {
            if (index === prev.length - 1) {  // 인덱스 끝이면 위로 아래로 이동 불가능
                return prev;
            }

            const newArray = [...prev];
            [newArray[index], newArray[index + 1]] = [newArray[index + 1], newArray[index]];

            return newArray;
        }

        setImages((prev) => moveDownIndex(prev, index));

        setExhibitionData(prevState => {
            if (index >= prevState.works.length - 1) return prevState; // 마지막 요소는 아래로 이동 불가능

            const newWorks = [...prevState.works];
            [newWorks[index], newWorks[index + 1]] = [newWorks[index + 1], newWorks[index]];

            return { ...prevState, works: newWorks };
        });
    };



    // 개별 사진 입력
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const input = e.target.value.substring(0, 30);

        setExhibitionData(prevState => ({
            ...prevState,
            works: prevState.works.map((work, i) =>
                i === index ? { ...work, title: input } : work
            )
        }));

    }

    const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const input = e.target.value.substring(0, 30);

        setExhibitionData(prevState => ({
            ...prevState,
            works: prevState.works.map((work, i) =>
                i === index ? { ...work, description: input } : work
            )
        }));
    }


    // 전시회 이미지가 추가 or 삭제 이펙트
    useEffect(function preLoad() {

        if (images.length > 0 && images.length !== imagesSizeRef.current) {
            if (images.length > imagesSizeRef.current) {
                imagesSizeRef.current += 1;

                const newPreviewImage = URL.createObjectURL(images[0]);

                setExhibitionData(prevState => ({
                    ...prevState,
                    works: [
                        {
                            image: images[0],
                            previewImage: newPreviewImage,
                            title: '',
                            description: '',
                        }, ...prevState.works
                    ]
                }));

            } else {
                imagesSizeRef.current -= 1;
                // 나머지 인덱스 조정은 제거 함수에서 수행
            }
        }
    }, [images]);


    // 전시회 생성 요청
    const {
        loading: exhibitionCreateLoading,
        statusCode: exhibitionCreateStatusCode,
        fetchRequest: exhibitionCreateRequest
    } = useFetch<void>();

    const handleExhibitionCreateRequest = () => {
        // 타이틀 검증
        if (!validExhibitionTitleInput) {
            if (validExhibitionTitleInput == null) {
                setExhibitionTitleHelperText('제목* - 필수값입니다')
                setExhibitionTitleHelperTextColor('red');
            }

            return;
        }

        // 설명 검증
        if (!validExhibitionDescriptionInput) {
            if (validExhibitionDescriptionInput == null) {
                setExhibitionDescriptionHelperText('설명* - 필수값입니다')
                setExhibitionDescriptionHelperTextColor('red');
            }

            return;
        }

        // 작품이 하나 이상 있어야 함
        if (exhibitionData.works.length < 1) {
            alert('하나 이상의 작품을 게시해야 합니다')
            return;
        }

        // 각 작품별 타이틀 설명 검증
        for (const work of exhibitionData.works) {
            const trimmedTitle = work.title.trim();
            const trimmedDescription = work.description.trim();

            if (trimmedTitle.length < 1 || trimmedTitle.length > 30) {
                alert("각 작품의 제목은 앞뒤 공백을 제외하고 1글자 이상 30자 이내여야 합니다");
                return;
            }

            if (trimmedDescription.length < 1 || trimmedDescription.length > 200) {
                alert("각 작품의 설명은 앞뒤 공백을 제외하고 1글자 이상 200자 이내여야 합니다");
                return;
            }
        }

        // 폼데이터 생성
        const requestTags: { name: string }[] = [];
        exhibitionData.tags.forEach((tag) => {
            requestTags.push({
                name: tag,
            });
        });

        const formData = new FormData();
        formData.append('writerId', user.id.toString());
        formData.append('title', exhibitionData.title);
        formData.append('description', exhibitionData.description);
        formData.append('tags', JSON.stringify(requestTags));
        formData.append('cardColor', exhibitionData.cardColor);
        exhibitionData.works.forEach((work, index) => {
            formData.append(`works[${index}].image`, work.image); // 파일
            formData.append(`works[${index}].title`, work.title);
            formData.append(`works[${index}].description`, work.description);
        });

        const options: FetchRequestOptions = {
            url: `${API_BASE_URL}${ENDPOINTS.PRERIX}${ENDPOINTS.EXHIBITION.DOMAIN}`,
            method: 'POST',
            credentials: 'include',
            contentType: 'multipart/form-data',
            body: formData
        }

        // 요청
        exhibitionCreateRequest(options);
    }

    // 요청결과 보여줄 이펙트 추가
    useEffect(function handleExhibitionCreateResponse() {
        if (exhibitionCreateStatusCode === 201) {
            setToastMessageDisplay(true);
            setFirstText('전시회 개최완료!');
            setSecondText('홈페이지로 돌아갑니다');
            setIsSuccess(true);

            setTimeout(() => {
                navigate('/home');
            }, 3000);
            return;
        }

        if (exhibitionCreateStatusCode === 400) {
            setToastMessageDisplay(true);
            setFirstText('전시회 개최실페!');
            setSecondText('입력값을 확인해주세요');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

        if (exhibitionCreateStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('전시회 개최실페!');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSuccess(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                navigate('/home');
            }, 3000);
            return;
        }

        if (exhibitionCreateStatusCode === 403) {
            setToastMessageDisplay(true);
            setFirstText('전시회 개최실페!');
            setSecondText('인가되지 않은 접근입니다');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }


        if (exhibitionCreateStatusCode === 404) {
            setToastMessageDisplay(true);
            setFirstText('전시회 개최실페!');
            setSecondText('유저 데이터가 존재하지 않습니다');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

        if (exhibitionCreateStatusCode === 500) {
            setToastMessageDisplay(true);
            setFirstText('서버에러!');
            setSecondText('잠시 후 다시 시도해주세요');
            setIsSuccess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

    }, [exhibitionCreateStatusCode])


    // 페이지 이동
    const navigateToHomePage = () => {
        navigate('/home');
    };



    return (
        <Container>
            <Header />
            <BodyBox>
                <FormBox>
                    <TitleBox>
                        <Title>새 전시회 만들기</Title>
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
                            <InputBox>
                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <LongInputTitle style={{ color: exhibitionTitleHelperTextColor }}>{exhibitionTitleHelperText}</LongInputTitle>
                                    </LongInputLabelBox>
                                    <LongInput
                                        placeholder='전시회 제목을 입력해주세요 (30자 이내)'
                                        value={exhibitionData.title}
                                        onChange={handleExhibitionTitleInputChange}
                                    />
                                </LongInputBox>

                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <LongInputTitle style={{ color: exhibitionDescriptionHelperTextColor }} >{exhibitionDescriptionHelperText}</LongInputTitle>
                                    </LongInputLabelBox>
                                    <DescriptionInput
                                        placeholder='전시회 설명을 입력해주세요 (200자 이내)'
                                        value={exhibitionData.description}
                                        onChange={handleExhibitionDescriptionInputChange}
                                    ></DescriptionInput>
                                </LongInputBox>

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
                                    />
                                    {exhibitionData.tags.length > 0 &&
                                        <TagBox>
                                            {exhibitionData.tags.map((tag, index) => (
                                                <Tag key={index} text={tag} handleTagRemove={() => handleRemoveTag(tag)}></Tag>
                                            ))}
                                        </TagBox>
                                    }
                                </LongInputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={imagesIcon} />
                                        <SmallInputTitle>작품 올리기*</SmallInputTitle>
                                    </SmallInputLabelBox>

                                    <ImageInput width={'100%'} ratio={'3/2'} marginTop={10} image={images} setImage={setImages} setValidImage={setValidImage} inputDisabled={imageDisabled} />

                                </SmallInputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={diamondIcon} />
                                        <SmallInputTitle>카드 색상*</SmallInputTitle>
                                    </SmallInputLabelBox>

                                    <CardColorInputBox backgroundColor={exhibitionData.cardColor}>
                                        <GithubPicker
                                            color={exhibitionData.cardColor}
                                            onChangeComplete={(updatedColor) => handleCardColorInputChange(updatedColor.hex)}
                                            colors={cardColors}
                                            width='250px'
                                        />
                                    </CardColorInputBox>



                                </SmallInputBox>


                                <ImageListBox>
                                    {/* filter로 요소가 삭제되면서 배열 크기가 줄어들지만,
                                 React는 key를 기준으로 기존 요소를 유지하려 하기 때문에, 
                                 index가 올바르게 업데이트되지 않음. 
                                 실제 index는 바뀌지만
                                 */}
                                    {
                                        exhibitionData.works.map((work, index) => (
                                            <ImageBox
                                                key={index}
                                                index={index}
                                                work={work}
                                                handleTitleInputChange={handleTitleInputChange}
                                                handleDescriptionInputChange={handleDescriptionInputChange}
                                                handleRemove={handleRemoveImageBox}
                                                handleMoveUp={handleMoveUp}
                                                handleMoveDown={handleMoveDown}
                                            />
                                        ))
                                    }
                                </ImageListBox>


                            </InputBox>

                        </WriteViewContainer>}

                    {preview && <ExhibitionCreatePreview exhibitionData={exhibitionData} />}


                    <ButtonBox>
                        <ShortButton text={'취소'} type={'white'} action={navigateToHomePage}></ShortButton>
                        <ShortButton text={'작성완료'} type={'black'} action={handleExhibitionCreateRequest}></ShortButton>
                    </ButtonBox>
                </FormBox>

            </BodyBox>

            {toastMessageDisplay &&
                <ToastMessage
                    firstText={firstText}
                    secondText={secondText}
                    isSuccess={isSuccess}
                />}

            {exhibitionCreateLoading &&
                <LoadingBackground>
                    <LoadingIcon src={loadingIcon} />
                </LoadingBackground>
            }
        </Container>
    );
}

export default NewExhibition;