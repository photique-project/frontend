import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

import Header from '../components/Header';
import HelperText from '../components/HelperText';
import ImageInput from '../components/input/ImageInput';
import ScrollInput from '../components/input/ScrollInput';
import ShortButton from '../components/button/ShortButton';
import Tag from '../components/Tag';
import Comment from '../components/Comment';

import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';
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
import menuIcon from '../assets/dot-menu.png';
import profileImage from '../assets/ex1.jpg';
import clockIcon from '../assets/clock.png';
import sendIcon from '../assets/send.png';
import cameraGrayIcon from '../assets/camera-gray.png';
import lensGrayIcon from '../assets/lens-gray.png';
import settingsGrayIcon from '../assets/settings-gray.png';
import locationGrayIcon from '../assets/location-gray.png';
import calendarGrayIcon from '../assets/calendar-gray.png';
import tagGrayIcon from '../assets/tag-gray.png';






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

const PreviewContainer = styled.div`
    margin-top: 40px;
    width: 100%;

    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        margin-top: 30px;
    }
`

const PreviewImageBox = styled.div`
    width: 100%;
    aspect-ratio: 4 / 3;

    display: flex;
    flex-direction: column;

    position: relative;

    border-radius: 10px;

    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
`

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;

    position: absolute;

    border-radius: 10px;
    object-fit: contain; 
`

const PreviewImageInfoBar = styled.div`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;

    opacity: 0;

    transition: all 0.3s ease;

    ${PreviewImageBox}:hover & {
        opacity: 1;
    }

    z-index: 999;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
`

const PreviewImageHitBox = styled.div`
    margin-left: 20px;
    height: 50px;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        margin-left: 10px;
        height: 35px;
        gap: 5px;
    }
`
const PreviewImageLikeBox = styled.div`
    margin-left: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 8px;

    @media (max-width: 768px) {
        margin-left: 10px;
        gap: 5px;
    }
`;

const PreviewImageLikeIcon = styled.img`
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const PreviewImageLikeValue = styled.div`
    font-size: 16px;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const PreviewImageViewBox = styled.div`
    margin-right: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 8px;

    @media (max-width: 768px) {
        margin-left: 10px;
        gap: 5px;
    }
`;

const PreviewImageViewIcon = styled.img`
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const PreviewImageViewValue = styled.div`
    font-size: 16px;    
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`



const PreviewImageMenuBox = styled.div`
    margin-right: 20px;
    width: 50px;
    height: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 25px;
    background-color: black;
    opacity: 0.6;

    @media (max-width: 768px) {
        margin-right: 10px;
        width: 35px;
        height: 35px;

        border-radius: 17.5px;
    }
`

const PreviewImageMenuIcon = styled.img`
    width: 30px;
    height: 30px;

    cursor: pointer;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`

const SingleWorkHeaderInfoBox = styled.div`
    margin-top: 50px;
    padding: 25px;
    width: calc(100%-50px);
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 950px) {
        flex-direction: column-reverse;
        align-items: flex-start;
        
        gap: 15px;
    }

    @media (max-width: 768px) {
        margin-top: 30px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`

const SingleWorkPhotographerInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 15px;

    @media (max-width: 768px) {
        gap: 7px;
    }

    @media (max-width: 550px) {
        flex-wrap: wrap;
    }
`

const PhotographerProfileImage = styled.img`
    width: 50px;
    height: 50px;

    border-radius: 7px;

    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
    }
`

const PhotographerProfile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;

    @media (max-width: 768px) {
        gap: 5px;
    }
`

const PhotographerNickname = styled.div`
    font-size: 16px;
    line-height: 17px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 14px;
    }
`

const PhotographerIntro = styled.div`
    font-size: 16px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 14px;
    }
`

const FollowButton = styled.button`
    width: 80px;
    height: 45px;

    font-size: 16px;

    background-color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        width: 60px;
        height: 35px;
        font-size: 14px;
    }

    @media (max-width: 550px) {
        width: 100%;
    }
`

const PostDateBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 5px;
`

const PostDateIcon = styled.img`
    width: 24px;
    height: 24px;

    @media (max-width: 950px) {
        width: 20px;
        height: 20px;
    }
`

const PostDate = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);

    @media (max-width: 950px) {
        font-size: 14px;
    }
`



const SingleWorkImageInfoBox = styled.div`
    margin-top: 15px;
    padding: 25px;
    width: calc(100%-50px);
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 30px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 768px) {
        margin-top: 10px;
        row-gap: 20px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`;

const SingleWorkImageInfo = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;

    gap: 10px;

    @media (max-width: 768px) {
        width: 100%;
        gap: 7px;
    }
`;

const SingleWorkItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`;

const SingleWorkItemIcon = styled.img`
    width: 26px;
    height: 26px;

    @media (max-width: 768px) {
        width: 18px;
        height: 18px;
    }
`

const SingleWorkItemText = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const SingleWorkItemValue = styled.div`
    font-size: 18px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const SingleWorkItemSettingsBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`

const SingleWorkItemSettings = styled.div`
    padding: 6px 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    background-color: rgba(0, 0, 0, 0.07);

    font-size: 18px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const SingleWorkTagBox = styled.div`
    margin-top: 15px;
    padding: 25px;
    width: calc(100%-50px);

    display: flex;
    flex-direction: column;

    gap: 10px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 768px) {
        margin-top: 10px;
        gap: 7px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`


const SingleWorkFooterBox = styled.div`
    margin-top: 15px;
    margin-bottom: 40px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 1100px) {
        gap: 15px;
    }

    @media (max-width: 768px) {
        margin-top: 10px;
        gap: 10px;
    }
`

const SingleWorkDescriptionBox = styled.div`
    padding: 40px;
    width: calc((100% - 30px) / 2 - 80px);
    

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    @media (max-width: 1100px) {
        width: calc(100% - 80px);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const SingleWorkTitle = styled.div`
    font-size: 20px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const SingleWorkDescription = styled.div`
    margin-top: 20px;

    font-size: 16px;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.6);
    

    white-space: pre-wrap;

    @media (max-width: 768px) {
        margin-top: 10px;
        font-size: 14px;
        line-height: 20px;
    }
`

const SingleWorkCommentBox = styled.div`
    padding: 40px;
    width: calc((100% - 15px) / 2 - 80px);
    

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    @media (max-width: 1100px) {
        width: calc(100% - 80px);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const CommentListBox = styled.div`
    margin-top: 20px;
    width: 100%;
    max-height: 400px;

    display: flex;
    flex-direction: column;
    gap: 15px;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    @media (max-width: 768px) {
        margin-top: 15px;
        gap:10px;
    }
`

const CommentWriterProfileImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 7px;

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`

const CommentInputBox = styled.div`
    margin-top:30px;
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 10px;
`

const CommentInput = styled.textarea`
    width: calc(100% - 20px - 10px - 20px);
    height: 80px;
    padding: 10px;

    resize: none;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const CommentInputCompleteButtonBox = styled.div`
    margin-top: 10px;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 480px) {
        align-items: center;
    }
`;

const CommentInputCompleteButton = styled.div`
    padding: 8px 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;


    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    background-color: rgba(0, 0, 0, 0.7);

    &:hover {
        background-color: black;
    }

    @media (max-width: 768px) {
        width: calc(100% - 16px);
    }
`

const CommentInputCompleteButtonIcon = styled.img`
    width: 16px;
    height: 16px;

    @media (max-width: 768px) {
        width: 12px;
        height: 12px;
    }
`

const CommentInputCompleteButtonText = styled.div`
    font-size: 16px;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`



const NewSingleWork = () => {
    const apertureOptions = ["미입력", "f/1.4", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16", "f/22"]
    const shutterSpeedOptions = ["미입력", "1/1000", "1/500", "1/250", "1/125", "1/60", "1/30", "1/15", "1/8", "1/4", "1/2", "1"]
    const isoOptions = ["미입력", "100", "200", "400", "800", "1600", "3200", "6400"]
    const navigate = useNavigate();

    const [writeView, setWriteView] = useState<boolean>(true);
    const [preview, setPreview] = useState<boolean>(false);

    // 이미지 입력값 상태관리 변수
    const [validImage, setValidImage] = useState<boolean | null>(null);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageHelperText, setImageHelperText] = useState<string>('사진*');
    const [imageHelperTextColor, setImageHelperTextColor] = useState<'black' | 'red'>('black');
    const [imageDisabled, setImageDisabled] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

    // 카메라 이름 입력값 상태관리 변수
    const [validCameraInput, setValidCameraInput] = useState<boolean | null>(null);
    const [cameraInput, setCameraInput] = useState<string>('');
    const [cameraHelperText, setCameraHelperText] = useState<string>('카메라*');
    const [cameraHelperTextColor, setCamareHelperTextColor] = useState<'black' | 'red'>('black');
    const [cameraInputDisabled, setCameraInputDisabled] = useState<boolean>(false);

    // 렌즈 입력값 상태관리 변수
    const [validLensInput, setValidLensInput] = useState<boolean | null>(null);
    const [lensInput, setLensInput] = useState<string>('');
    const [lensInputDisabled, setLensInputDisabled] = useState<boolean>(false);

    // 조리개 입력값 상태관리 변수
    const [apertureInput, setApertureInput] = useState<string>('');
    const [apertureInputDisabled, setApertureInputDisabled] = useState<boolean>(false);

    // 셔터스피드 입력값 상태관리 변수
    const [shutterSpeedInput, setShutterSpeedInput] = useState<string>('');
    const [shutterSpeedInputDisabled, setShutterSpeedInputDisabled] = useState<boolean>(false);

    // iso 입력값 상태관리 변수
    const [isoInput, setIsoInput] = useState<string>('');
    const [isoInputDisabled, setIsoInputDisabled] = useState<boolean>(false);

    // 위치 입력값 상태관리 변수
    const [validLocationInput, setValidLocationInput] = useState<boolean | null>(null);
    const [locationInput, setLocationInput] = useState<string>('');
    const [locationInputDisabled, setLocationInputDisabled] = useState<boolean>(false);

    // 날짜 입력값 상태관리 변수
    const [validDateInput, setValidDateInput] = useState<boolean | null>(null);
    const [dateHelperText, setDateHelperText] = useState<string>('사진*');
    const [dateHelperTextColor, setDateHelperTextColor] = useState<'black' | 'red'>('black');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dateInputDisabled, setDateInputDisabled] = useState<boolean>(false);

    // 태그 입력값 상태관리 변수
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [isComposing, setIsComposing] = useState(false);

    // 제목 입력값 상태관리 변수
    const [validTitleInput, setValidTitleInput] = useState<boolean | null>(null);
    const [titleInput, setTitleInput] = useState<string>('');
    const [titleHelperText, setTitleHelperText] = useState<string>('제목*');
    const [titleHelperTextColor, setTitleHelperTextColor] = useState<'black' | 'red'>('black');
    const [titleInputDisabled, setTitleInputDisabled] = useState<boolean>(false);

    // 설명 입력값 상태관리 변수
    const [validDescriptionInput, setValidDescriptionInput] = useState<boolean | null>(null);
    const [descriptionInput, setDescriptionInput] = useState<string>('');
    const [descriptionHelperText, setDescriptionHelperText] = useState<string>('설명*');
    const [descriptionHelperTextColor, setDescriptionHelperTextColor] = useState<'black' | 'red'>('black');
    const [descriptionInputDisabled, setDescriptionInputDisabled] = useState<boolean>(false);

    // URL로 만든 src로 로딩할 수 있는 preview이미지를 imageInput컴포넌트에서 관리하기 때문에 
    // preview 화면에서 보여줄 src를 위해 URL만드는 과정필요함
    // 이미지가 수정됐을 때마다 preview를 새로 만들어줘야 하므로 해당 useEffect사용
    useEffect(function convertToPreviewURL() {
        if (image) {
            const previewURL = URL.createObjectURL(image);
            setPreviewImage(previewURL);

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
        const inputValue = e.target.value.substring(0, 50);
        setCameraInput(inputValue);
    }

    // 렌즈 입력
    const handleLensInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.substring(0, 50);
        setLensInput(inputValue);
    }

    // 설정값 입력
    const handleApertureInputChange = (option: string) => {
        setApertureInput(option);
    }

    const handleShutterSpeedInputChange = (option: string) => {
        setShutterSpeedInput(option);
    }

    const handleIsoInputChange = (option: string) => {
        setIsoInput(option);
    }


    // 위치 입력
    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.substring(0, 50);
        setLocationInput(inputValue);
    }


    // 날짜 입력
    const handleDataInputChange = (date: Date) => {
        console.log(date)
        setSelectedDate(date);
    }

    // 날짜 문자열 변환
    const formatDate = (date: Date) => {
        return date ? format(date, "yyyy-MM-dd") : '날짜를 입력하세요';
    };


    // 태그 입력
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!value.includes(' ')) {
            setTagInput(value);
        }
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

    // 제목 입력
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.substring(0, 30);
        setTitleInput(inputValue);
    };

    // 설명 입력
    const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value.substring(0, 500);
        setDescriptionInput(inputValue);
    };






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
        navigate('/home');
    };

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

                            <ImageInput width={'100%'} ratio={'4/3'} marginTop={5} image={image} setImage={setImage} setValidImage={setValidImage} inputDisabled={imageDisabled} />

                            <InputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={cameraIcon} />
                                        <SmallInputTitle>카메라*</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <SmallInput
                                        placeholder='예: Sony A7C'
                                        value={cameraInput}
                                        onChange={handleCameraInputChange}
                                    />
                                </SmallInputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={lensIcon} />
                                        <SmallInputTitle>렌즈</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <SmallInput
                                        placeholder='예: Sony FE 24-70mm f/2.8 GM'
                                        value={lensInput}
                                        onChange={handleLensInputChange}
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
                                            selectedOption={apertureInput}
                                            handleInputChange={handleApertureInputChange}
                                        />
                                        <ScrollInput
                                            title={'셔터'}
                                            options={shutterSpeedOptions}
                                            selectedOption={shutterSpeedInput}
                                            handleInputChange={handleShutterSpeedInputChange}
                                        />
                                        <ScrollInput
                                            title={'ISO'}
                                            options={isoOptions}
                                            selectedOption={isoInput}
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
                                        value={locationInput}
                                        onChange={handleLocationInputChange}
                                    />
                                </SmallInputBox>

                                <SmallInputBox>
                                    <SmallInputLabelBox>
                                        <SmallInputIcon src={calendarIcon} />
                                        <SmallInputTitle>날짜*</SmallInputTitle>
                                    </SmallInputLabelBox>
                                    <DataSelectButton
                                        selected={selectedDate}
                                        onChange={handleDataInputChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="날짜를 선택하세요"
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
                                    />
                                    {tags.length > 0 &&
                                        <TagBox>
                                            {tags.map((tag, index) => (
                                                <Tag key={index} text={tag} handleTagRemove={() => handleRemoveTag(tag)}></Tag>
                                            ))}
                                        </TagBox>
                                    }
                                </LongInputBox>

                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <LongInputTitle>제목*</LongInputTitle>
                                    </LongInputLabelBox>
                                    <LongInput
                                        placeholder='작품 제목을 입력해주세요 (30자 이내)'
                                        value={titleInput}
                                        onChange={handleTitleInputChange}
                                    />
                                </LongInputBox>

                                <LongInputBox>
                                    <LongInputLabelBox>
                                        <LongInputTitle>설명*</LongInputTitle>
                                    </LongInputLabelBox>
                                    <DescriptionInput
                                        placeholder='작품 설명을 입력해주세요 (500자 이내)'
                                        value={descriptionInput}
                                        onChange={handleDescriptionInputChange}
                                    ></DescriptionInput>
                                </LongInputBox>


                            </InputBox>


                        </WriteViewContainer>
                    }

                    {preview &&
                        <PreviewContainer>
                            <PreviewImageBox>

                                <PreviewImageInfoBar>
                                    <PreviewImageHitBox>

                                        <PreviewImageLikeBox>
                                            <PreviewImageLikeIcon src={heartIcon} />
                                            <PreviewImageLikeValue>605.7K</PreviewImageLikeValue>
                                        </PreviewImageLikeBox>

                                        <PreviewImageViewBox>
                                            <PreviewImageViewIcon src={viewIcon} />
                                            <PreviewImageViewValue>23K</PreviewImageViewValue>
                                        </PreviewImageViewBox>

                                    </PreviewImageHitBox>

                                    <PreviewImageMenuBox>
                                        <PreviewImageMenuIcon src={menuIcon}></PreviewImageMenuIcon>
                                    </PreviewImageMenuBox>
                                </PreviewImageInfoBar>

                                <PreviewImage src={previewImage} />
                            </PreviewImageBox>

                            <SingleWorkHeaderInfoBox>

                                <SingleWorkPhotographerInfo>
                                    <PhotographerProfileImage src={profileImage}></PhotographerProfileImage>
                                    <PhotographerProfile>
                                        <PhotographerNickname>닉네임</PhotographerNickname>
                                        <PhotographerIntro>Professional Photographer</PhotographerIntro>
                                    </PhotographerProfile>
                                    <FollowButton>팔로우</FollowButton>
                                </SingleWorkPhotographerInfo>

                                <PostDateBox>
                                    <PostDateIcon src={clockIcon} />
                                    <PostDate>게시일: 2024-01-15 13:45</PostDate>
                                </PostDateBox>


                            </SingleWorkHeaderInfoBox>


                            <SingleWorkImageInfoBox>

                                <SingleWorkImageInfo>
                                    <SingleWorkItem>
                                        <SingleWorkItemIcon src={cameraGrayIcon} />
                                        <SingleWorkItemText>카메라</SingleWorkItemText>
                                    </SingleWorkItem>
                                    {/* 미입력처리 ㄱ */}
                                    <SingleWorkItemValue>
                                        {cameraInput}
                                    </SingleWorkItemValue>
                                </SingleWorkImageInfo>


                                <SingleWorkImageInfo>
                                    <SingleWorkItem>
                                        <SingleWorkItemIcon src={lensGrayIcon} />
                                        <SingleWorkItemText>렌즈</SingleWorkItemText>
                                    </SingleWorkItem>

                                    <SingleWorkItemValue>
                                        {lensInput ? lensInput : '미입력'}
                                    </SingleWorkItemValue>
                                </SingleWorkImageInfo>

                                <SingleWorkImageInfo>
                                    <SingleWorkItem>
                                        <SingleWorkItemIcon src={settingsGrayIcon} />
                                        <SingleWorkItemText>설정값</SingleWorkItemText>
                                    </SingleWorkItem>

                                    <SingleWorkItemSettingsBox>
                                        <SingleWorkItemSettings>{apertureInput}</SingleWorkItemSettings>
                                        <SingleWorkItemSettings>
                                            {shutterSpeedInput ? `${shutterSpeedInput}` : ''}
                                            {shutterSpeedInput === '미입력' || !shutterSpeedInput ? '' : 's'}
                                        </SingleWorkItemSettings>
                                        <SingleWorkItemSettings>
                                            {isoInput === '미입력' || !isoInput ? '' : 'ISO '}
                                            {isoInput ? `${isoInput}` : ''}
                                        </SingleWorkItemSettings>
                                    </SingleWorkItemSettingsBox>
                                </SingleWorkImageInfo>

                                <SingleWorkImageInfo>
                                    <SingleWorkItem>
                                        <SingleWorkItemIcon src={locationGrayIcon} />
                                        <SingleWorkItemText>위치</SingleWorkItemText>
                                    </SingleWorkItem>

                                    <SingleWorkItemValue>
                                        {locationInput ? locationInput : '미입력'}
                                    </SingleWorkItemValue>
                                </SingleWorkImageInfo>

                                <SingleWorkImageInfo>
                                    <SingleWorkItem>
                                        <SingleWorkItemIcon src={calendarGrayIcon} />
                                        <SingleWorkItemText>날짜</SingleWorkItemText>
                                    </SingleWorkItem>

                                    <SingleWorkItemValue>
                                        {formatDate(selectedDate)}
                                    </SingleWorkItemValue>
                                </SingleWorkImageInfo>


                            </SingleWorkImageInfoBox>


                            <SingleWorkTagBox>
                                <SingleWorkItem>
                                    <SingleWorkItemIcon src={tagGrayIcon} />
                                    <SingleWorkItemText>태그</SingleWorkItemText>
                                </SingleWorkItem>
                                <SingleWorkItemSettingsBox>
                                    {tags.length > 0 ? tags.map((tag, index) => (
                                        <SingleWorkItemSettings key={index} >{tag}</SingleWorkItemSettings>
                                    )) : '미입력'}
                                </SingleWorkItemSettingsBox>
                            </SingleWorkTagBox>


                            <SingleWorkFooterBox>

                                <SingleWorkDescriptionBox>
                                    <SingleWorkTitle>{titleInput}</SingleWorkTitle>
                                    <SingleWorkDescription>
                                        {descriptionInput}
                                    </SingleWorkDescription>
                                </SingleWorkDescriptionBox>


                                <SingleWorkCommentBox>
                                    <SingleWorkTitle>댓글</SingleWorkTitle>

                                    <CommentListBox>

                                        <Comment />
                                        <Comment />
                                        <Comment />

                                    </CommentListBox>



                                    <CommentInputBox>
                                        <CommentWriterProfileImage src={profileImage} />
                                        <CommentInput placeholder='댓글을 입력하세요' />
                                    </CommentInputBox>

                                    <CommentInputCompleteButtonBox>
                                        <CommentInputCompleteButton>
                                            <CommentInputCompleteButtonIcon src={sendIcon} />
                                            <CommentInputCompleteButtonText>댓글 작성</CommentInputCompleteButtonText>
                                        </CommentInputCompleteButton>
                                    </CommentInputCompleteButtonBox>


                                </SingleWorkCommentBox>


                            </SingleWorkFooterBox>

                        </PreviewContainer>
                    }

                    <ButtonBox>
                        <ShortButton text={'취소'} type={'white'} action={navigateToHomePage}></ShortButton>
                        <ShortButton text={'작성완료'} type={'black'} action={navigateToHomePage}></ShortButton>
                    </ButtonBox>


                </FormBox>
            </BodyBox>

        </Container>
    )
}

export default NewSingleWork;