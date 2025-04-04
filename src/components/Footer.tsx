import styled from 'styled-components';

import mailIcon from '../assets/mail.png';
import githubIcon from '../assets/github.png';
import discordIcon from '../assets/discord.png';



const Container = styled.footer`
    margin-top: 100px;
    width: 100%;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: black;
`;

const FooterContentBox = styled.div`
    width: 80%;
    height: 120px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
`;

const FooterContent = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

const FooterContentIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const FooterContentText = styled.div`
    margin-left: 10px;

    font-size: 16px;

    color: white;
`;



const Footer = () => {
    return (
        <Container>
            <FooterContentBox>
                <FooterContent>
                    <FooterContentIcon src={mailIcon}></FooterContentIcon>
                    <FooterContentText>jms3847@gmail.com</FooterContentText>
                </FooterContent>
                <FooterContent>
                    <FooterContentIcon src={githubIcon}></FooterContentIcon>
                    <FooterContentText>BenchPress200</FooterContentText>
                </FooterContent>
                <FooterContent>
                    <FooterContentIcon src={discordIcon}></FooterContentIcon>
                    <FooterContentText>정민성#0060</FooterContentText>
                </FooterContent>
            </FooterContentBox>
        </Container>
    );
}

export default Footer;