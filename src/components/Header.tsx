import React, { useState } from 'react';

import styled from 'styled-components';
import logo from '../assets/logo.png';
import ShortButton from '../components/ShortButton';
import menuIcon from '../assets/menu.png';


const HeaderContainer = styled.header`
    width: 100%;
    height: 80px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #F9FBFF;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;


    /* 태블릿 */
    @media (max-width: 768px) {
        height: 60px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        height: 50px;
    }
`;

const Logo = styled.img`
    margin-left: 19px;

    /* 태블릿 */
    @media (max-width: 768px) {
        margin-left: 10px;
        height: 35px;
    }

    /* 휴대폰 */
    @media (max-width: 480px) {
        margin-left: 10px;
        height: 30px; /* 로고 크기 더 축소 */
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

const HeaderMenu = styled.div<{ isOpen: false | true }>`
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

    const openMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <>
            <HeaderContainer>
                <Logo src={logo}></Logo>

                <HeaderButtonBox>
                    <ShortButton text="로그인" type="white"></ShortButton>
                    <ShortButton text="회원가입" type="black"></ShortButton>
                    <ShortButton text="고객센터" type="none"></ShortButton>
                </HeaderButtonBox>

                <HeaderMenuButtonBox onClick={openMenu}>
                    <HeaderMenuIcon src={menuIcon}>

                    </HeaderMenuIcon>
                </HeaderMenuButtonBox>

            </HeaderContainer>

            <HeaderMenu isOpen={isMenuOpen}>
                <MenuButton>로그인</MenuButton>
                <MenuButton>회원가입</MenuButton>
                <MenuButton>고객센터</MenuButton>

            </HeaderMenu>
        </>
    );
}

export default Header;