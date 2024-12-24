import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import ShortButton from '../components/ShortButton';
import LoginModal from '../components/LoginModal';

import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';


const Container = styled.header`
    width: 100%;
    height: 80px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    background-color: #F9FBFF;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    @media (max-width: 768px) {
        height: 60px;
    }

    @media (max-width: 480px) {
        height: 50px;
    }
`;

const Logo = styled.img`
    margin-left: 20px;
    height: 35px;

    @media (max-width: 480px) {
        margin-left: 10px;
        height: 30px; 
    }
`;

const HeaderButtonBox = styled.div`
    height: 80px;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap:10px;

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

    z-index: 999;

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
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [loginModalDisplay, setLoginModalDisplay] = useState<'flex' | 'none'>('none');

    const navigateToJoinPage = () => {
        navigate('/join');
    };

    const navigateToIntroPage = () => {
        navigate('/');
    };

    const navigateToHomePage = () => {
        navigate('/home');
    };

    const openMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const showLoginModal = () => {
        if (loginModalDisplay === 'flex') {
            setLoginModalDisplay('none');
            return;
        }

        setLoginModalDisplay('flex');
    }


    return (
        <>
            <Container>
                <Logo src={logo} onClick={navigateToHomePage}></Logo>

                <HeaderButtonBox>
                    <ShortButton text="로그인" type="white" action={showLoginModal}></ShortButton>
                    <ShortButton text="회원가입" type="black" action={navigateToJoinPage}></ShortButton>
                    <ShortButton text="About" type="none" action={navigateToIntroPage}></ShortButton>
                    <ShortButton text="고객센터" type="none" action={showLoginModal}></ShortButton>
                </HeaderButtonBox>

                <HeaderMenuButtonBox onClick={openMenu}>
                    <HeaderMenuIcon src={menuIcon} />
                </HeaderMenuButtonBox>

            </Container>

            <HeaderMenu isOpen={isMenuOpen}>
                <MenuButton onClick={showLoginModal}>로그인</MenuButton>
                <MenuButton onClick={navigateToJoinPage}>회원가입</MenuButton>
                <MenuButton onClick={navigateToIntroPage}>About</MenuButton>
                <MenuButton>고객센터</MenuButton>
            </HeaderMenu>

            <LoginModal display={loginModalDisplay} closeModal={showLoginModal} />
        </>
    );
}

export default Header;