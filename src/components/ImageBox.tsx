import { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';

import upIcon from '../assets/up.png';
import downIcon from '../assets/d.png';
import closeIcon from '../assets/close-large.png';

const Container = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    gap: 20px;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (max-width: 480px) {
        padding: 10px;
        width: calc(100% - 20px);
    }
`

const SmallHeaderBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;  

    @media (max-width: 480px) {
        gap: 10px;
    }
`;

const ImageIconBoxes = styled.div`
    display: flex;
    flex-direction: column;
`

const ImageIconBox = styled.div`
    width:40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (max-width: 480px) {
        width:30px;
        height: 30px;
    }
`

const ImageIcon = styled.img`
    width:24px;
    height:24px;
`

const Image = styled.img`
    width: 100px;
    height: 100px;

    object-fit: contain; 

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
`

const ImageInfoBox = styled.div`
    width: calc(100% - 80px - 100px - 60px);

    display: flex;
    flex-direction: column;
    gap:10px;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const ExhibitionImageTitle = styled.input`
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

const ExhibitionImageDescription = styled.textarea`
    padding: 12px;
    width: calc(100% - 24px);
    height: 80px;
    
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

const ExhibitionImageUserBox = styled.div`
    width: 150px;
    height: 40px;

    display: flex;
    flex-direction: column;

    position: relative;
`

const ExhibitionImageUserSearchInput = styled.input`
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% - 24px);
    height: 40px;

    font-size: 16px;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color:rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }


    @media (max-width: 480px) {
        font-size: 14px;
    }
`

const ExhibitionImageSearchUserList = styled.div`
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;

    top: 45px;
    position: absolute;

    background-color: white;

    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0.2);

    &::-webkit-scrollbar {
        display: none; 
    }
`

const ExhibitionImageSearchUser = styled.div`
    flex-shrink: 0;
    width: 100%;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`

interface ImageBoxProps {
    index: number;
    image: File;
    titleInput: string;
    handleTitleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    descriptionInput: string;
    handleDescriptionInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
    handleRemove: (id: number) => void;
    handleMoveUp: (index: number) => void;
    handleMoveDown: (index: number) => void;
}

const ImageBox: React.FC<ImageBoxProps> = (props) => {
    const { index, image, titleInput, handleTitleInputChange, descriptionInput, handleDescriptionInputChange, handleRemove, handleMoveUp, handleMoveDown } = props;

    const searchUserBoxRef = useRef<HTMLDivElement>(null)

    // 사이즈 감지
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // preview
    const [previewImage, setPreviewImage] = useState<(string | undefined)>(undefined);


    // 유저입력 리스트 뷰 상태관리변수
    const [searchUserList, setSearchUserList] = useState<boolean>(false);
    const [searchUser, setSearchUser] = useState<string>('');
    const [searchUserInput, setSearchUserInput] = useState<string>('');


    // 유저검색 패널 관리

    const handleSearchUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!value.includes(' ')) {
            setSearchUserInput(value);
        }
    }

    const handleUserSelect = (nickname: string) => {
        setSearchUserList(false);
        setSearchUser(nickname);
        setSearchUserInput(nickname);
    }

    const handleSearchUserInputBlur = () => {
        setSearchUserInput(searchUser);
    }

    const handleSearchUserList = () => {
        setSearchUserList(!searchUserList)
    }

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

    // URL로 만든 src로 로딩할 수 있는 preview이미지를 imageInput컴포넌트에서 관리하기 때문에 
    // preview 화면에서 보여줄 src를 위해 URL만드는 과정필요함
    // 이미지가 수정됐을 때마다 preview를 새로 만들어줘야 하므로 해당 useEffect사용
    useEffect(function convertToPreviewURL() {
        // invalid 이미지라면 해당 조건문 실행안됨
        if (image) {
            const previewURL = URL.createObjectURL(image);
            setPreviewImage(previewURL);

            return () => URL.revokeObjectURL(previewURL);
        }
    }, [image])

    // 사이즈 감지
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <Container>
            {!isMobile && <>
                <ImageIconBoxes>
                    <ImageIconBox onClick={() => handleMoveUp(index)}>
                        <ImageIcon src={upIcon} />
                    </ImageIconBox>
                    <ImageIconBox onClick={() => handleMoveDown(index)}>
                        <ImageIcon src={downIcon} />
                    </ImageIconBox>

                </ImageIconBoxes>

                <Image src={previewImage} />

                <ImageInfoBox>
                    <ExhibitionImageTitle
                        placeholder='제목'
                        value={titleInput}
                        onChange={(e) => handleTitleInputChange(e, index)}
                    />
                    <ExhibitionImageDescription
                        placeholder='설명'
                        value={descriptionInput}
                        onChange={(e) => handleDescriptionInputChange(e, index)}
                    />

                    <ExhibitionImageUserBox ref={searchUserBoxRef}>
                        <ExhibitionImageUserSearchInput
                            placeholder={searchUser ? searchUser : '작가 검색'}
                            onChange={handleSearchUserInputChange}
                            onBlur={handleSearchUserInputBlur}
                            value={searchUserInput}
                            onClick={handleSearchUserList}
                        />
                        {searchUserList && <ExhibitionImageSearchUserList>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>본인</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람1</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람2</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람3</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람4</ExhibitionImageSearchUser>

                        </ExhibitionImageSearchUserList>}

                    </ExhibitionImageUserBox>
                </ImageInfoBox>
                <ImageIconBox onClick={() => handleRemove(index)}>
                    <ImageIcon src={closeIcon} />

                </ImageIconBox>
            </>}
            {isMobile && <>
                <SmallHeaderBox>

                    <ImageIconBoxes>
                        <ImageIconBox onClick={() => handleMoveUp(index)}>
                            <ImageIcon src={upIcon} />
                        </ImageIconBox>
                        <ImageIconBox onClick={() => handleMoveDown(index)}>
                            <ImageIcon src={downIcon} />
                        </ImageIconBox>
                    </ImageIconBoxes>

                    <Image src={previewImage} />

                    <ImageIconBox onClick={() => handleRemove(index)}>
                        <ImageIcon src={closeIcon} />
                    </ImageIconBox>

                </SmallHeaderBox>

                <ImageInfoBox>
                    <ExhibitionImageTitle
                        placeholder='제목'
                        value={titleInput}
                        onChange={(e) => handleTitleInputChange(e, index)}
                    />
                    <ExhibitionImageDescription
                        placeholder='설명'
                        value={descriptionInput}
                        onChange={(e) => handleDescriptionInputChange(e, index)}
                    />

                    <ExhibitionImageUserBox ref={searchUserBoxRef}>
                        <ExhibitionImageUserSearchInput
                            placeholder={searchUser ? searchUser : '작가 검색'}
                            onChange={handleSearchUserInputChange}
                            onBlur={handleSearchUserInputBlur}
                            value={searchUserInput}
                            onClick={handleSearchUserList}
                        />
                        {searchUserList && <ExhibitionImageSearchUserList>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>본인</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람1</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람2</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람3</ExhibitionImageSearchUser>
                            <ExhibitionImageSearchUser onClick={(e) => handleUserSelect(e.currentTarget.textContent)}>사람4</ExhibitionImageSearchUser>

                        </ExhibitionImageSearchUserList>}

                    </ExhibitionImageUserBox>
                </ImageInfoBox>
            </>}

        </Container>

    )
}

export default ImageBox;