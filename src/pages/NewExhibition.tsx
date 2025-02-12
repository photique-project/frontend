import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubPicker } from 'react-color';

import styled from 'styled-components';

import Header from '../components/Header';
import Tag from '../components/Tag';
import ShortButton from '../components/button/ShortButton';
import ImageInput from '../components/input/ImageInput';
import ImageBox from '../components/ImageBox';

import writeBlackIcon from '../assets/write-black.png';
import writeWhiteIcon from '../assets/write-white.png';
import viewBlackIcon from '../assets/view-black.png';
import viewWhiteIcon from '../assets/view-white.png'
import tagIcon from '../assets/input-tag.png';
import imagesIcon from '../assets/images.png';
import diamondIcon from '../assets/diamond.png';
import exitIcon from '../assets/exit.png';
import userIcon from '../assets/user-white.png';
import heartIcon from '../assets/heart.png';
import bookmarkIcon from '../assets/bookmark-white.png';
import chatIcon from '../assets/chat.png';
import notebookIcon from '../assets/notebook.png';
import leftIcon from '../assets/arrow-left.png';
import rightIcon from '../assets/arrow-right.png';
import ex1 from '../assets/ex1.jpg';


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

const PreviewContainer = styled.div`
    margin-top: 40px;
    width: 100%;

    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        margin-top: 30px;
    }
`;

const ExhibitionPreviewImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: contain;

    position: absolute;
`;

const ExhibitionPreviewHeader = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;
    top:0;

    z-index: 999;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 75%, rgba(255, 255 , 255, 0) 100%);
    
    opacity: 0; 
    transition: opacity 0.3s ease; 
`

const ExhibitionPreviewHeaderLeftBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap:32px;
`

const IconBox = styled.div`
    width:40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 480px) {
        width:30px;
        height: 30px;
    }
`;

const Icon = styled.img`
    width:24px;
    height:24px;
`

const ExhibitionPreviewInfoBox = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`

const ExhibitionPreviewTitle = styled.div`
    color: white;

    font-size: 20px;
    font-weight: 700;
`

const ExhibitionPreviewDescription = styled.div`
    color: rgba(255, 255, 255, 0.7);

    font-size: 14px;
`

const ExhibitionPreviewHeaderRightBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    gap: 20px; 
`;

const ExhibitionPreviewActiveUserBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;
`

const ActiveUserIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ActiveUser = styled.div`
    font-size: 14px;
    color: white;
`


const LeftMoveIconBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 20px;

    opacity: 0;

    transition: opacity 0.3s ease; 
`;

const RightMoveIconBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 20px;

    opacity: 0;

    transition: opacity 0.3s ease; 
`;

const ExhibitionPreviewFooter = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;
    bottom:0;

    z-index: 999;

    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 75%, rgba(255, 255 , 255, 0) 100%);
    
    opacity: 0; 
    transition: opacity 0.3s ease; 
`

const ExhibitionPreviewImageInfoBox = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`

const ExhibitionPreviewImageTitle = styled.div`
    color: white;

    font-size: 20px;
    font-weight: 700;
`

const ExhibitionPreviewImageDescription = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
`

const ExhibitionWriterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;
`

const WriterProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 5px;

    cursor: pointer;
`

const WriterNickname = styled.div`
    font-size: 16px;
    color: white;
`




const ExhibitionPreviewBox = styled.div`
    width: 100%;
    aspect-ratio: 3/2;
    
    display: flex;
    flex-direction: column;

    position: relative;

    background-color: rgba(0, 0, 0, 0.8);    
    
    &:has(${ExhibitionPreviewHeader}:hover),&:has(${ExhibitionPreviewFooter}:hover),&:has(${RightMoveIconBox}:hover),&:has(${LeftMoveIconBox}:hover) {
        & ${ExhibitionPreviewHeader},
        & ${ExhibitionPreviewFooter},
        & ${RightMoveIconBox},
        & ${LeftMoveIconBox} {
            opacity: 1;
        }
    }
`;





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

// 요청 개별 데이터 인터페이스
interface ExhibitionImage {
    image: File; // 요청파일
    title: string;
    description: string;
    writer: {
        id: number;
        nickname: string;
        profileImage: string;
    }
}

const NewExhibition = () => {

    const navigate = useNavigate();

    const searchUserBoxRef = useRef<HTMLDivElement>(null)

    const [writeView, setWriteView] = useState<boolean>(true);
    const [preview, setPreview] = useState<boolean>(false);

    // 제목 입력값 상태관리 변수
    const [validExhibitionTitleInput, setExhibitionValidTitleInput] = useState<boolean | null>(null);
    const [exhibitionTitleInput, setExhibitionTitleInput] = useState<string>('');
    const [exhibitionTitleHelperText, setExhibitionHelperText] = useState<string>('제목*');
    const [exhibitionTitleHelperTextColor, setExhibitionTitleHelperTextColor] = useState<'black' | 'red'>('black');
    const [exhibitionTitleInputDisabled, setExhibitionTitleInputDisabled] = useState<boolean>(false);

    // 설명 입력값 상태관리 변수
    const [validExhibitionDescriptionInput, setValidExhibitionDescriptionInput] = useState<boolean | null>(null);
    const [exhibitionDescriptionInput, setExhibitionDescriptionInput] = useState<string>('');
    const [exhibitionDescriptionHelperText, setExhibitionDescriptionHelperText] = useState<string>('설명*');
    const [descriptionHelperTextColor, setExhibitionDescriptionHelperTextColor] = useState<'black' | 'red'>('black');
    const [exhibitionDescriptionInputDisabled, setExhibitionDescriptionInputDisabled] = useState<boolean>(false);

    // 태그 입력값 상태관리 변수
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [isComposing, setIsComposing] = useState(false);



    // 이미지 입력값 상태관리 변수
    const [validImage, setValidImage] = useState<boolean | null>(null); // 업로드할 때만 동작하므로 하나만 있으면 됨
    const [imageHelperText, setImageHelperText] = useState<string>('사진*');
    const [imageHelperTextColor, setImageHelperTextColor] = useState<'black' | 'red'>('black');
    const [imageDisabled, setImageDisabled] = useState<boolean>(false);


    // 이미지를 기준으로 각 이미지데이터가 추가됨
    const [images, setImages] = useState<(File | undefined)[]>([]);
    const [previewImages, setPreviewImages] = useState<(string | undefined)[]>([]);
    const imagesSizeRef = useRef<number>(0);

    // 각 이미지에 대한 제목과 설명 상태관리 변수
    const [titleInput, setTitleInput] = useState<string[]>([]);
    const [descriptionInput, setDescriptionInput] = useState<string[]>([]);

    // 현재 preview인덱스
    const [currentIdx, setCurrentIndex] = useState<number>(0);


    useEffect(function cleanUp() {
        // 언마운트 코드는 언마운트와 리렌더링으로 의존성배열의 변수가 변경이 됐을 때 먼저 실행되면서 정리하고 useEffect실행됨
        return () => { previewImages.forEach((previewImage) => URL.revokeObjectURL(previewImage)) }
    }, [])



    // 카드 색상 상태관리 변수
    const [cardColor, setCardColor] = useState('#000');

    // 유저입력 리스트 뷰 상태관리변수
    const [searchUserList, setSearchUserList] = useState<boolean>(false);
    const [searchUser, setSearchUser] = useState<string>('');
    const [searchUserInput, setSearchUserInput] = useState<string>('');

    // 제목 입력
    const handleExhibitionTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.substring(0, 30);
        setExhibitionTitleInput(inputValue);
    };

    // 설명 입력
    const handleExhibitionDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value.substring(0, 200);
        setExhibitionDescriptionInput(inputValue);
    };

    // 개별 사진 입력
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        console.log(titleInput[index])
        console.log(titleInput.length);
        setTitleInput((prev) => {
            const newTitleInput = [...prev];
            newTitleInput[index] = e.target.value;
            return newTitleInput;
        });
    }

    const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        setDescriptionInput((prev) => {
            const newDescriptionInput = [...prev];
            newDescriptionInput[index] = e.target.value;
            return newDescriptionInput;
        });
    }



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

    // 태그 입력
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!value.includes(' ')) {
            setTagInput(value);
        }
    };

    // 카드색상 입력
    const handleCardColorInputChange = (hex: string) => {
        setCardColor(hex);
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isComposing) {
            return; // 한글 입력 중이면 이벤트 무시
        }


        if (e.key === 'Enter') {
            e.preventDefault();

            if (tags.length >= 5) {
                alert('태그는 최대 5개까지만 추가할 수 있습니다.');
                return;
            }

            const trimmedTag = tagInput.trim();

            if (trimmedTag.length > 10) {
                alert('태그는 10글자 이하만 가능합니다');
                return;
            }

            if (trimmedTag && !tags.includes(trimmedTag)) {
                setTags([...tags, trimmedTag]);
                setTagInput('');
            }
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleCompositionStart = () => {
        setIsComposing(true); // 한글 입력 시작
    };

    const handleCompositionEnd = () => {
        setIsComposing(false); // 한글 입력 종료
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchUserBoxRef.current && !searchUserBoxRef.current.contains(event.target as Node)) {
                setSearchUserList(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    // 이미지 박스 핸들링
    const handleRemoveImageBox = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
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
        setPreviewImages((prev) => moveUpIndex(prev, index));
        setTitleInput((prev) => moveUpIndex(prev, index));
        setDescriptionInput((prev) => moveUpIndex(prev, index));
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
        setPreviewImages((prev) => moveDownIndex(prev, index));
        setTitleInput((prev) => moveDownIndex(prev, index));
        setDescriptionInput((prev) => moveDownIndex(prev, index));
    };


    // 전시회 이미지가 추가 or 삭제 이펙트
    useEffect(function preLoad() {

        // 이미지가 수정되지 않았는데 미리보기 갔다가 작성하기로 왔을 때 해당 이펙트가 실행된 이유는 ?
        // 현재 페이지 상태관리 변수를 하위로 전달하고 있는데, 변수가 수정된다면 이 페이지에서 리렌더링이 일어나고 하위도 모두 리렌더링이 발생
        // 다시보니 이펙트실행은 리랜더링이 아닌 첫 렌더링과 상태관리변수가 수정됐을 때임, -> 어디서 이미지가 수정됐는지 확인해보자
        // ImageInput에서 리렌더링 발생 시 useEffect가 문제였음
        // 현재 페이지에서 상태관리변수가 수정되면 현재 페이지 리렌더링 발생
        // 리렌더링 발생하면 미리보기와 작성하기 탭을 통해서 강제로 마운트 언마운트가 되도록 해놓았기 때문에 하위에 있는 ImageInput이 리렌더링이 아닌 언마운트 & 마운트 됨
        // 이미지 변경사항은 인덱스가 변경되어도 적용됨 -> 프리뷰배열이 커지고 있음 -> 이미지 사이즈 값 조절하자
        // 삭제도 인덱스 잘 지켜지는 확인
        if (images.length > 0 && images.length !== imagesSizeRef.current) {
            console.log('이미지 추가 || 삭제 이펙트')
            imagesSizeRef.current += 1;

            const newPreviewImage = URL.createObjectURL(images[0]);
            setPreviewImages((prev) => [newPreviewImage, ...prev]);

            const newTitleInput = '';
            setTitleInput((prev) => [newTitleInput, ...prev]);

            const newDescriptionInput = '';
            setDescriptionInput((prev) => [newDescriptionInput, ...prev]);
        }
    }, [images]);

    // 미리보기 사진 이동
    const handleMoveLeft = () => {
        if (currentIdx === 0) {
            return;
        }

        setCurrentIndex(currentIdx - 1);
    }

    const handleMoveRight = () => {
        const size = images.filter((image) => image !== undefined).length;

        if (currentIdx === size - 1) {
            return;
        }

        setCurrentIndex(currentIdx + 1);
    }


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
                                        <LongInputTitle>{exhibitionTitleHelperText}</LongInputTitle>
                                    </LongInputLabelBox>
                                    <LongInput
                                        placeholder='전시회 제목을 입력해주세요 (30자 이내)'
                                        value={exhibitionTitleInput}
                                        onChange={handleExhibitionTitleInputChange}
                                    />
                                </LongInputBox>

                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <LongInputTitle>{exhibitionDescriptionHelperText}</LongInputTitle>
                                    </LongInputLabelBox>
                                    <DescriptionInput
                                        placeholder='전시회 설명을 입력해주세요 (200자 이내)'
                                        value={exhibitionDescriptionInput}
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
                                    {tags.length > 0 &&
                                        <TagBox>
                                            {tags.map((tag, index) => (
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

                                    <CardColorInputBox backgroundColor={cardColor}>
                                        <GithubPicker
                                            color={cardColor}
                                            onChangeComplete={(updatedColor) => handleCardColorInputChange(updatedColor.hex)}
                                        />
                                    </CardColorInputBox>



                                </SmallInputBox>


                                <ImageListBox>
                                    {/* filter로 요소가 삭제되면서 배열 크기가 줄어들지만,
                                 React는 key를 기준으로 기존 요소를 유지하려 하기 때문에, 
                                 index가 올바르게 업데이트되지 않음. 
                                 실제 index는 바뀌지만
                                 */}
                                    {images.some((img) => img !== undefined) && (
                                        images.filter((img) => img !== undefined).map((img, index) => (
                                            <ImageBox
                                                key={index}
                                                index={index}
                                                image={img}
                                                titleInput={titleInput[index]}
                                                handleTitleInputChange={handleTitleInputChange}
                                                descriptionInput={descriptionInput[index]}
                                                handleDescriptionInputChange={handleDescriptionInputChange}
                                                handleRemove={handleRemoveImageBox}
                                                handleMoveUp={handleMoveUp}
                                                handleMoveDown={handleMoveDown}

                                            />
                                        ))

                                    )}
                                </ImageListBox>


                            </InputBox>

                        </WriteViewContainer>}



                    {preview &&
                        <PreviewContainer>
                            <ExhibitionPreviewBox>

                                <ExhibitionPreviewHeader >
                                    <ExhibitionPreviewHeaderLeftBox>
                                        <IconBox>
                                            <Icon src={exitIcon} />
                                        </IconBox>

                                        <ExhibitionPreviewInfoBox>
                                            <ExhibitionPreviewTitle>{exhibitionTitleInput}</ExhibitionPreviewTitle>
                                            <ExhibitionPreviewDescription>{exhibitionDescriptionInput}</ExhibitionPreviewDescription>
                                        </ExhibitionPreviewInfoBox>

                                    </ExhibitionPreviewHeaderLeftBox>


                                    <ExhibitionPreviewHeaderRightBox>
                                        <ExhibitionPreviewActiveUserBox>
                                            <ActiveUserIcon src={userIcon} />
                                            <ActiveUser>15명 관람중</ActiveUser>
                                        </ExhibitionPreviewActiveUserBox>

                                        <IconBox>
                                            <Icon src={heartIcon} />
                                        </IconBox>
                                        <IconBox>
                                            <Icon src={bookmarkIcon} />
                                        </IconBox>
                                        <IconBox>
                                            <Icon src={chatIcon} />
                                        </IconBox>
                                        <IconBox>
                                            <Icon src={notebookIcon} />
                                        </IconBox>
                                    </ExhibitionPreviewHeaderRightBox>
                                </ExhibitionPreviewHeader>


                                <ExhibitionPreviewImage src={images.length > 0 ? previewImages[currentIdx] : ''} />

                                <LeftMoveIconBox>
                                    <IconBox onClick={handleMoveLeft}>
                                        <Icon src={leftIcon} />
                                    </IconBox>
                                </LeftMoveIconBox>

                                <RightMoveIconBox>
                                    <IconBox onClick={handleMoveRight}>
                                        <Icon src={rightIcon} />
                                    </IconBox>
                                </RightMoveIconBox>

                                <ExhibitionPreviewFooter>
                                    <ExhibitionPreviewImageInfoBox>
                                        <ExhibitionPreviewImageTitle>{images.length > 0 ? titleInput[currentIdx] : ''}</ExhibitionPreviewImageTitle>
                                        <ExhibitionPreviewImageDescription>{images.length > 0 ? descriptionInput[currentIdx] : ''}</ExhibitionPreviewImageDescription>
                                    </ExhibitionPreviewImageInfoBox>

                                    <ExhibitionWriterBox>
                                        <WriterProfileImage src={ex1} />
                                        <WriterNickname>닉네임</WriterNickname>
                                    </ExhibitionWriterBox>
                                </ExhibitionPreviewFooter>

                            </ExhibitionPreviewBox>
                        </PreviewContainer>}


                    <ButtonBox>
                        <ShortButton text={'취소'} type={'white'} action={navigateToHomePage}></ShortButton>
                        <ShortButton text={'작성완료'} type={'black'} action={navigateToHomePage}></ShortButton>
                    </ButtonBox>
                </FormBox>

            </BodyBox>
        </Container>
    );
}

export default NewExhibition;