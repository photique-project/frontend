import { useState } from 'react';

import styled from 'styled-components';

import ShortButton from '../components/ShortButton';
import LoginModal from '../components/LoginModal';

import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';


const Container = styled.header`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #F9FBFF;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    /* 모바일 */
    @media (max-width: 480px) {
        height: 50px;
    }
`;

const Logo = styled.img`
    margin-left: 10px;
    height: 35px;

    /* 휴대폰 */
    @media (max-width: 480px) {
        margin-left: 10px;
        height: 30px; 
    }
`;

const HeaderButtonBox = styled.div`
    width: 310px;
    height: 80px;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* 태블릿 */
    @media (max-width: 768px) {
        display: none;
    }
`;

const HeaderMenuButtonBox = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    
    display: none;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }

    /* 태블릿 */
    @media (max-width: 768px) {
        display: flex;
    }
`;

const HeaderMenuIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const HeaderMenu = styled.div<{ isOpen: boolean }>`
    width: 240px;
    height: 100%;
    margin-top: 60px;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); 

    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')}); 
    transition: transform 0.3s ease-in-out; 

    @media (max-width: 240px) {
        width: 100%;
    }

    @media (min-width: 769px) {
        visibility: hidden;
    }
`;

const MenuButton = styled.div`
    margin-top: 10px;
    width: 95%;
    height: 40px;

    display: flex;
    flex-direction: column;

    color: white;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    line-height: 14px;

    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);

    const openMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const showLoginModal = () => {
        if (isLoginModalOpen) {
            setLoginModalOpen(false);
            return;
        }

        setLoginModalOpen(true);
    }


    return (
        <>
            <Container>
                <Logo src={logo}></Logo>

                <HeaderButtonBox>
                    <ShortButton text="로그인" type="white" action={showLoginModal}></ShortButton>
                    <ShortButton text="회원가입" type="black" action={showLoginModal}></ShortButton>
                    <ShortButton text="고객센터" type="none" action={showLoginModal}></ShortButton>
                </HeaderButtonBox>

                <HeaderMenuButtonBox onClick={openMenu}>
                    <HeaderMenuIcon src={menuIcon} />
                </HeaderMenuButtonBox>

            </Container>

            <HeaderMenu isOpen={isMenuOpen}>
                <MenuButton>로그인</MenuButton>
                <MenuButton>회원가입</MenuButton>
                <MenuButton>고객센터</MenuButton>
            </HeaderMenu>

            <LoginModal display={isLoginModalOpen} closeModal={showLoginModal} />
        </>
    );
}

export default Header;