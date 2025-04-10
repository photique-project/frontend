import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import ENDPOINTS from '../api/endpoints';
import { FetchRequestOptions } from '../types/http';
import useAuthStore from '../zustand/store';
import useFetch from '../hooks/useFetch';
import ToastMessage from './ToastMessage';
import Comment from './Comment';
import Loader from './Loader';

import closeIcon from '../assets/white-close.png';
import viewIcon from '../assets/view.png';
import menuIcon from '../assets/dot-menu.png';
import clockIcon from '../assets/clock.png';
import sendIcon from '../assets/send.png';
import cameraGrayIcon from '../assets/camera-gray.png';
import lensGrayIcon from '../assets/lens-gray.png';
import settingsGrayIcon from '../assets/settings-gray.png';
import locationGrayIcon from '../assets/location-gray.png';
import calendarGrayIcon from '../assets/calendar-gray.png';
import tagGrayIcon from '../assets/tag-gray.png';
import pencilIcon from '../assets/pencil.png'
import trashIcon from '../assets/trash-red.png';
import alertIcon from '../assets/alert.png';
import loadingIcon from '../assets/loading-large.png';
import heartIcon from '../assets/heart.png';
import heartFillIcon from '../assets/heart-fill.png';
import leftBlackIcon from '../assets/left-black.png';
import rightBlackIcon from '../assets/right-black.png';
import categoryGrayIcon from '../assets/category-gray.png';



const Container = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: row;

    position:fixed;
    left: 0;
    top: 0;

    background-color: rgba(0, 0, 0, 0.7);

    z-index: 999;
`

const CloseIcon = styled.img`
    width: 50px;
    height: 50px;

    top: 20px;
    right: 40px;

    position: fixed;
    
    cursor: pointer;

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;

        top: 5px;
        right: 10px;
    }
`;

const BodyBox = styled.div`
    margin-top:20px;
    width: 100%;
    height: calc(100% - 20px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 768px) {
        padding: 10px;
        width: calc(100% - 20px);
        justify-content: center;

        margin-top:30px;
        height: calc(100% - 30px);
    }
`

const SideBarBox = styled.div`
    padding: 40px;  
    width: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    @media (max-width: 768px) {
        display: none;
    }
`;

const MainBox = styled.div`
    width: calc(100% - 80px);
    padding: 40px;

    display: flex;
    flex-direction: column;

    position: relative;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none; 
    }

    background-color: #F9FBFF;

    @media (max-width: 768px) {
        width: calc(100% - 20px);
        padding: 10px;
    }
`

const ImageBox = styled.div`
    width: 100%;
    aspect-ratio: 16/9;

    display: flex;
    flex-direction: column;

    position: relative;

    border-radius: 10px;

    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
`

const ImageHeader = styled.div`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;

    opacity: 0;

    transition: all 0.3s ease;

    ${ImageBox}:hover & {
        opacity: 1;
    }

    z-index: 999;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
`

const ImageHitBox = styled.div`
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
const ImageLikeBox = styled.div`
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

const swing = keyframes`
  0% { transform: rotate(0deg) scale(1.2); }
  25% { transform: rotate(-15deg) scale(1.2); }
  50% { transform: rotate(15deg) scale(1.2); }
  75% { transform: rotate(-10deg) scale(1.2); }
  100% { transform: rotate(0deg) scale(1.2); }
`;

const ImageLikeIcon = styled.img`
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }

    cursor: pointer;

    &:hover {
    transform: scale(1.2);
    animation: ${swing} 0.5s ease-in-out infinite;
  }
`;


const ImageLikeValue = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const ImageViewBox = styled.div`
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

const ImageViewIcon = styled.img`
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const ImageViewValue = styled.div`
    font-size: 16px;    
    color: white;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const ImageMenuBox = styled.div`
    margin-right: 20px;
    width: 50px;
    height: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    border-radius: 25px;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        margin-right: 10px;
        width: 35px;
        height: 35px;

        border-radius: 17.5px;
    }
`

const ImageMenuIcon = styled.img`
    width: 30px;
    height: 30px;

    cursor: pointer;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`

const SingleWorkOptionBox = styled.div`
    padding: 5px;
    top: 60px;
    right: 0;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    

    position: absolute;
    background-color: white;
`

const SingleWorkOption = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;

    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const SingleWorkOptionIcon = styled.img`   
    width: 20px;
    height: 20px;
`

const SingleWorkOptionText = styled.div`
    font-size: 16px;
    white-space: nowrap;
`

const Image = styled.img`
    width: 100%;
    height: 100%;

    position: absolute;

    border-radius: 10px;
    object-fit: contain; 
`

const InfoHeaderBox = styled.div`
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

const PhotographerInfoBox = styled.div`
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

const FollowButton = styled.button<{ isFollowing: boolean }>`
    padding-left: 10px;
    padding-right: 10px;
    height: 45px;

    font-size: 16px;

    position: relative;

    background-color: ${({ isFollowing }) => isFollowing ? "white" : "black"};
    color: ${({ isFollowing }) => isFollowing ? "black" : "white"};
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: ${({ isFollowing }) => isFollowing ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.7)"};
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

const FollowMessageBox = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    border-radius: 10px;
    color: white;

    position: absolute;
    bottom: 100%;
    left: 100%;

    background-color: rgba(0, 0, 0, 0.3);

    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    ${FollowButton}:hover & {
        opacity: 1;
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

const ImageInfoBodyBox = styled.div`
    margin-top: 15px;
    padding: 25px;
    width: calc(100%-50px);
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
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

const ImageInfo = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;

    gap: 10px;

    @media (max-width: 768px) {
        width: 100%;
        gap: 7px;
    }
`;

const ImageInfoItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`;

const ImageInfoItemIcon = styled.img`
    width: 26px;
    height: 26px;

    @media (max-width: 768px) {
        width: 18px;
        height: 18px;
    }
`

const ImageInfoItemText = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const ImageInfoItemValue = styled.div`
    font-size: 18px;
    font-weight: 700;

    word-wrap: break-word;   
    overflow-wrap: break-word;
    white-space: normal;  

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const ImageInfoItemTagBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`

const ImageInfoItemTag = styled.div`
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

const ImageInfoTagBox = styled.div`
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

const ImageInfoFooter = styled.div`
    margin-top: 15px;
    margin-bottom: 40px;
    width: 100%;

    display: flex;
    position: relative;
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

const DescriptionBox = styled.div`
    padding: 40px;
    width: calc((100% - 30px) / 2 - 80px);
    

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 1100px) {
        width: calc(100% - 80px);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const Description = styled.div`
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

const CommentBox = styled.div`
    padding: 40px;
    width: calc((100% - 15px) / 2 - 80px);
    
    display: flex;
    flex-direction: column;
    position: relative;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 1100px) {
        width: calc(100% - 80px);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const CommentTitle = styled.div`
    font-size: 20px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const CommentListBox = styled.div`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: column;
    position: relative;
    gap: 15px;

    &::-webkit-scrollbar {
        width: 0px;
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

    &:hover {
        &::-webkit-scrollbar {
            width: 3px; 
        }
    }
`

const CommentPageNavBox = styled.div`
    margin-top: 10px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    border-radius: 1px solid #000000;
`

const CommentPageBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 10px;

    justify-content: center;
`

const CommentPrevPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CommentNextPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: 700;
`

const CommentPage = styled.div<{ isSelected?: boolean }>`
    width: 40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    font-weight: 700;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;

    background-color: ${({ isSelected }) => (isSelected ? "black" : "white")};
    color: ${({ isSelected }) => (isSelected ? "white" : "black")};

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "black" : "rgba(0, 0, 0, 0.07)")};
    }
`

const CommentQuickPageBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;   
    gap: 15px;

    justify-content: center;
`

const CommentFirstPage = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);

    cursor: pointer;
    &:hover {
        color: black;
    }
`

const CommentLastPage = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);

    cursor: pointer;
    &:hover {
        color: black;
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
    margin-top:10px;
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 10px;
`

const CommentInput = styled.textarea<{ commentUpdateMode: boolean }>`
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
        box-shadow: ${({ commentUpdateMode }) =>
        commentUpdateMode ? "0 0 5px #a574c2" : "0 0 5px rgba(0, 0, 0, 0.6)"};
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
    flex-direction: row;
    justify-content: right;

    gap: 5px;

    cursor: pointer;

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

const CommentInputUpdateButtonBox = styled.div`
    padding: 8px 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    background-color: #a574c2;
    
    &:hover {
        background-color: #8836b7;
    }

    @media (max-width: 768px) {
        width: calc(100% - 16px);
    }
`

const CommentInputUpdateButtonText = styled.div`
    font-size: 16px;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const CommentInputUpdateCancelButtonBox = styled.div`
    padding: 8px 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    background-color: white;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }

    @media (max-width: 768px) {
        width: calc(100% - 16px);
    }
`

const CommentInputUpdateCancelButtonText = styled.div`
    font-size: 16px;
    color:black;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const DeleteBackground = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
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
    width: calc(100%-24px);
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

const LoadingBox = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`



interface SingleWorkUpdateState {
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

interface Tag {
    name: string;
}

interface SingleWork {
    id: number;
    writer: {
        id: number,
        nickname: string;
        profileImage: string;
        introduction: string;
    };
    image: string;
    camera: string;
    lens: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
    location: string;
    category: string;
    date: string;
    tags: Tag[];
    title: string;
    description: string;
    likeCount: number;
    viewCount: number;
    createdAt: string;
    isLiked: boolean;
    isFollowing: boolean;
}

interface Writer {
    id: number;
    nickname: string;
    profileImage: string;
}

interface CommentData {
    id: number;
    writer: Writer;
    content: string;
    createdAt: string;
}

interface CommentPageData {
    content: CommentData[];
    pageable: {
        pageNumber: number;
    }
    totalPages: number;
}

interface SingleWorkProps {
    singleWorkId: number;
    close: (singleWorkId?: number) => void;
}



const SingleWork: React.FC<SingleWorkProps> = (props) => {
    const { singleWorkId, close } = props;
    const user = useAuthStore.getState().user;
    const categoryMap: { [key: string]: string } = {
        "landscape": "풍경",
        "portrait": "인물",
        "animal": "동물",
        "plant": "식물",
        "architecture": "건축",
        "travel": "여행",
        "food": "음식",
        "sports": "스포츠",
        "blackAndWhite": "흑백",
        "nightscape": "야경",
        "street": "길거리",
        "abstract": "추상",
        "event": "이벤트",
        "fashion": "패션",
    };

    const navigate = useNavigate();

    // 단일작품 옵션모달
    const optionModalRef = useRef<HTMLDivElement>(null);
    const [optionModalDisplay, setOptionModalDisplay] = useState<boolean>(false);
    const [deleteModalDisplay, setDeleteModalDisplay] = useState<boolean>(false);
    const [deleteModalInput, setDeleteModalInput] = useState<string>('');


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (optionModalRef.current && !optionModalRef.current.contains(event.target as Node)) {
                setOptionModalDisplay(false);
            }
        }

        if (optionModalDisplay) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optionModalDisplay]);

    // 토스트 메시지 상태관리 변수
    const [toastMessageDisplay, setToastMessageDisplay] = useState<boolean>(false);
    const [firstText, setFirstText] = useState<string>('');
    const [secondText, setSecondText] = useState<string>('');
    const [isSucess, setIsSucess] = useState<boolean>(null);

    // 단일작품 조회 상태관리
    const [singleWork, setSingleWork] = useState<SingleWork>(null);

    // 댓글 상태관리변수
    const [commentCurrentPage, setCommentCurrentPage] = useState<number>(0);
    const [commentTotalPage, setCommentTotalPage] = useState<number>(0);
    const [commentPageGroup, setCommentPageGroup] = useState<number>(0);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [commentInput, setCommentInput] = useState<string>('');
    const [commentUpdateMode, setCommentUpdateMode] = useState<boolean>(false);
    const [commentUpdateTargetId, setCommentUpdateTargetId] = useState<number | null>(null);

    const {
        loading: commentUpdateLoading,
        statusCode: commentUpdateStatusCode,
        fetchRequest: commentUpdateRequest
    } = useFetch<void>();

    const handleCommentUpdateRequest = () => {
        if (commentInput.trim().length < 1) {
            return;
        }

        const requestBody = {
            writerId: useAuthStore.getState().userId,
            content: commentInput.trim()
        }

        const method = ENDPOINTS.SINGLE_WORK.UPDATE_COMMENT.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.UPDATE_COMMENT.URL;

        const options: FetchRequestOptions = {
            url: url(singleWork.id, commentUpdateTargetId),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        commentUpdateRequest(options);
    }

    useEffect(function handleCommentUpdateResponse() {
        if (commentUpdateStatusCode === 204) {
            setToastMessageDisplay(true);
            setFirstText('댓글 수정완료 !');
            setSecondText('댓글을 다시 불러옵니다');
            setIsSucess(true);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
                handleCommentupdateMode()
                handleCommentPageRequest();
            }, 3000);

            return;
        }

        if (commentUpdateStatusCode === 400) {
            setToastMessageDisplay(true);
            setFirstText('댓글수정 실패 !');
            setSecondText('입력값을 확인해주세요');
            setIsSucess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);

            return;
        }

        if (commentUpdateStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('댓글수정 실패 !');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSucess(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                window.location.reload();
            }, 3000);

            return;
        }

        if (commentUpdateStatusCode === 403) {
            return;
        }

        if (commentUpdateStatusCode === 404) {
            return;
        }

        if (commentUpdateStatusCode === 500) {
            return;
        }

    }, [commentUpdateStatusCode]);

    const handleCommentupdateMode = (input?: string, commentId?: number) => {
        if (input) {
            setCommentInput(input);
            setCommentUpdateTargetId(commentId);
        } else {
            setCommentInput('');
        }
        setCommentUpdateMode(!commentUpdateMode);
    }

    const handleCommentInputChange = (e?: React.ChangeEvent<HTMLTextAreaElement>, value?: string) => {
        const input = e.target.value.substring(0, 300);
        setCommentInput(input);
    }

    const {
        loading: commentPageLoading,
        statusCode: commentPageStatusCode,
        data: commentPageData,
        fetchRequest: commentPageRequest
    } = useFetch<CommentPageData>();


    const handleCommentPageRequest = (page = 0) => {
        const method = ENDPOINTS.SINGLE_WORK.GET_COMMENT_PAGE.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.GET_COMMENT_PAGE.URL;

        const options: FetchRequestOptions = {
            url: url(singleWorkId, 'createdAt,desc', page, 5),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        commentPageRequest(options);
    }

    useEffect(function handleInitCommentPageRequest() {
        handleCommentPageRequest();
    }, []);

    useEffect(function handleCommentPageResponse() {
        if (commentPageData) {
            setCommentCurrentPage(commentPageData.pageable.pageNumber);
            setCommentPageGroup(Math.floor(commentPageData.pageable.pageNumber / 5)); // 5로 나눴을 때 몫이 해당 그룹
            setCommentTotalPage(commentPageData.totalPages);
            setComments(commentPageData.content)
        }

    }, [commentPageData]);

    const {
        loading: commentCreateLoading,
        statusCode: commentCreateStatusCode,
        fetchRequest: commentCreateRequest
    } = useFetch<CommentPageData>();

    const handleCommentCreateRequest = () => {
        // 앞뒤 공백 제거했을 때 댓글 길이가 0일경우
        if (commentInput.trim().length < 1) {
            return;
        }

        const body = {
            writerId: useAuthStore.getState().userId,
            content: commentInput.trim(),
        }

        const method = ENDPOINTS.SINGLE_WORK.WRITE_COMMENT.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.WRITE_COMMENT.URL;

        const options: FetchRequestOptions = {
            url: url(singleWork.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: body,
        }

        commentCreateRequest(options);
    }

    useEffect(function commentCreateResponse() {
        if (commentCreateStatusCode) {
            if (commentCreateStatusCode == 201) {
                handleCommentPageRequest();
                setCommentInput('')
                return;
            }

            if (commentCreateStatusCode == 400) {
                setToastMessageDisplay(true);
                setFirstText('댓글작성 실패 !');
                setSecondText('입력값을 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    setToastMessageDisplay(false);
                }, 3000);

                return;
            }

            if (commentCreateStatusCode == 401) {
                setToastMessageDisplay(true);
                setFirstText('댓글작성 실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    window.location.reload();
                }, 3000);
                return;
            }

            if (commentCreateStatusCode == 403) {
                return;
            }

            if (commentCreateStatusCode == 404) {
                return;
            }

            if (commentCreateStatusCode == 500) {
                return;
            }

        }
    }, [commentCreateStatusCode])







    // 삭제모달 입력값 함수
    const handleDeleteModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteModalInput(e.target.value);
    }

    // 삭제 모달 함수
    const handleDeleteModalDisplay = () => {
        setDeleteModalDisplay(!deleteModalDisplay);
    }

    // 옵션 모달 함수
    const handleOptionModalDisplay = () => {
        setOptionModalDisplay(!optionModalDisplay);
    }

    // 단일작품 닫는 함수
    const handleClose = () => {
        close();
    }

    // 단일작품 데이터 조회 useFetch
    const {
        loading: singleWorkLoading,
        statusCode: singleWorkStatusCode,
        data: singleWorkData,
        fetchRequest: singleWorkRequest
    } = useFetch<SingleWork>();

    const handleSingleWorkDetailsRequest = () => {
        const method = ENDPOINTS.SINGLE_WORK.GET_DETAILS.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.GET_DETAILS.URL;

        const options: FetchRequestOptions = {
            url: url(singleWorkId, user.id ? user.id : 0),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        singleWorkRequest(options);
    }

    useEffect(function handleInitSingleWorkDetailsRequest() {
        handleSingleWorkDetailsRequest();
    }, []);

    useEffect(function handleSingleWorkDetailResponse() {
        if (singleWorkStatusCode) {
            if (singleWorkStatusCode === 200) {

                return;
            }
        }

    }, [singleWorkStatusCode]);

    useEffect(function handleSingleWorkDetailResponse() {
        if (singleWorkData) {
            singleWorkData.category = categoryMap[singleWorkData.category];
            setSingleWork(singleWorkData);
        }

    }, [singleWorkData]);


    // 삭제 요청
    const {
        loading: singleWorkDeleteLoading,
        statusCode: singleWorkDeleteStatusCode,
        fetchRequest: singleWorkDeleteRequest
    } = useFetch<void>();

    const handleDeleteSingleWork = () => {
        if (deleteModalInput !== '삭제') {
            return;
        }

        const method = ENDPOINTS.SINGLE_WORK.REMOVE.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.REMOVE.URL;

        const options: FetchRequestOptions = {
            url: url(singleWork.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        singleWorkDeleteRequest(options);
    }

    useEffect(function singleWorkDeleteResponse() {
        if (singleWorkDeleteStatusCode === 204) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 삭제완료 !');
            setSecondText('현재 창이 닫힙니다');
            setIsSucess(true);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                window.location.reload();
            }, 3000);
            return;
        }
        // 나머지 에러처리
        if (singleWorkDeleteStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 삭제실패 !');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                window.location.reload();
            }, 3000);
            return;
        }

        if (singleWorkDeleteStatusCode === 403) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 삭제실패 !');
            setSecondText('인가되지 않은 접근입니다');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

        if (singleWorkDeleteStatusCode === 404) {
            setToastMessageDisplay(true);
            setFirstText('단일작품 삭제실패 !');
            setSecondText('해당 단일작품 또는 작성자 데이터를 찾을 수 없습니다');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }


        if (singleWorkDeleteStatusCode === 500) {
            setToastMessageDisplay(true);
            setFirstText('서버에러 !');
            setSecondText('잠시 후 다시 시도해주세요');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

    }, [singleWorkDeleteStatusCode]);


    // 단일작품 좋아요 추가 요청 
    const {
        loading: likeLoading,
        statusCode: likeStatusCode,
        fetchRequest: likeRequest
    } = useFetch<void>();

    // 단일작품 좋아요 삭제 요청 
    const {
        loading: dislikeLoading,
        statusCode: dislikeStatusCode,
        fetchRequest: dislikeRequest
    } = useFetch<void>();

    const handleLikeRequest = () => {
        const method = singleWork.isLiked ? 'DELETE' : 'POST';
        const request = singleWork.isLiked ? dislikeRequest : likeRequest;

        const requestBody = {
            userId: user.id,
        }

        const url = ENDPOINTS.SINGLE_WORK.LIKE.URL;

        const options: FetchRequestOptions = {
            url: url(singleWork.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        request(options);
    }

    useEffect(function handleLikeResponse() {
        if (likeStatusCode) {
            if (likeStatusCode == 201) {
                setSingleWork(prevState => ({
                    ...prevState,
                    isLiked: true,
                    likeCount: prevState.likeCount + 1
                }));
                return;
            }

            if (likeStatusCode == 401) {
                setToastMessageDisplay(true);
                setFirstText('좋아요 추가실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);
                setDeleteModalDisplay(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    window.location.reload();
                }, 3000);
                return;

            }

            if (likeStatusCode == 403) {
                return;
            }

            if (likeStatusCode == 404) {
                return;
            }

            if (likeStatusCode == 409) {
                return;
            }

            if (likeStatusCode == 500) {
                return;
            }
        }
    }, [likeStatusCode])


    useEffect(function handleDislikeResponse() {
        if (dislikeStatusCode) {
            if (dislikeStatusCode == 204) {
                setSingleWork(prevState => ({
                    ...prevState,
                    isLiked: false,
                    likeCount: prevState.likeCount - 1
                }));
                return;
            }

            if (dislikeStatusCode == 401) {
                // 모달 띄우고 홈페이지로 리다이렉트
                setToastMessageDisplay(true);
                setFirstText('좋아요 삭제 실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    window.location.reload();
                }, 3000);
                return;
            }

            if (dislikeStatusCode == 403) {
                return;
            }

            if (dislikeStatusCode == 404) {
                return;
            }

            if (dislikeStatusCode == 500) {
                return;
            }
        }
    }, [dislikeStatusCode])


    // 작가 팔로우 & 언팔요청
    const {
        loading: followLoading,
        statusCode: followStatusCode,
        fetchRequest: followRequest
    } = useFetch<void>();

    const {
        loading: unfollowLoading,
        statusCode: unfollowStatusCode,
        fetchRequest: unfollowRequest
    } = useFetch<void>();

    const handleFollowRequest = () => {
        const method = singleWork.isFollowing ? 'DELETE' : 'POST';
        const request = singleWork.isFollowing ? unfollowRequest : followRequest;

        const requestBody = {
            followingId: singleWork.writer.id,
        }

        const url = ENDPOINTS.USER.FOLLOW.URL;

        const options: FetchRequestOptions = {
            url: url(user.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        request(options);
    }

    useEffect(function handleFollowResponse() {
        if (followStatusCode) {
            if (followStatusCode == 201) {
                setSingleWork(prevState => ({
                    ...prevState,
                    isFollowing: true,
                }));
                return;
            }

            if (followStatusCode == 401) {
                setToastMessageDisplay(true);
                setFirstText('팔로우 요청 실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);
                setDeleteModalDisplay(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    window.location.reload();
                }, 3000);
                return;

            }

            if (followStatusCode == 403) {
                return;
            }

            if (followStatusCode == 404) {
                return;
            }

            if (followStatusCode == 409) {
                return;
            }

            if (followStatusCode == 500) {
                return;
            }
        }
    }, [followStatusCode])


    useEffect(function handleUnfollowResponse() {
        if (unfollowStatusCode) {
            if (unfollowStatusCode == 204) {
                setSingleWork(prevState => ({
                    ...prevState,
                    isFollowing: false,
                }));
                return;
            }

            if (unfollowStatusCode == 401) {
                // 모달 띄우고 홈페이지로 리다이렉트
                setToastMessageDisplay(true);
                setFirstText('언팔로우 요청 실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    window.location.reload();
                }, 3000);
                return;
            }

            if (unfollowStatusCode == 403) {
                return;
            }

            if (unfollowStatusCode == 404) {
                return;
            }

            if (unfollowStatusCode == 500) {
                return;
            }
        }
    }, [unfollowStatusCode])


    // 태그 객체배열을 문자열 배열로 변환
    const transformTagsToStrings = (tags: Tag[]): string[] => {
        return tags.map(tag => tag.name);
    };

    // 수정페이지로 이동
    const navigateToUpdateSingleWorkPage = () => {
        const singleWorkUpdateState = {
            id: singleWork.id,
            writer: {
                id: singleWork.writer.id,
                nickname: singleWork.writer.nickname,
                introduction: singleWork.writer.introduction,
                profileImage: singleWork.writer.profileImage,
            },
            image: singleWork.image,
            createdAt: singleWork.createdAt,
            camera: singleWork.camera,
            lens: singleWork.lens,
            aperture: singleWork.aperture,
            shutterSpeed: singleWork.shutterSpeed,
            iso: singleWork.iso,
            location: singleWork.location,
            category: singleWork.category,
            date: singleWork.date,
            tags: transformTagsToStrings(singleWork.tags),
            title: singleWork.title,
            description: singleWork.description,
        }

        navigate(`/singleworks/${singleWorkId}/update`, { state: { singleWorkUpdateState } });
    }


    return (
        <Container>
            <CloseIcon src={closeIcon} onClick={handleClose} />


            <BodyBox>
                <SideBarBox />
                {singleWorkLoading &&
                    <LoadingBox>
                        <Loader fontColor={'white'} />
                    </LoadingBox>
                }


                {!singleWorkLoading && singleWork && <>
                    <MainBox>
                        <ImageBox>
                            <ImageHeader>
                                <ImageHitBox>
                                    <ImageLikeBox>
                                        <ImageLikeIcon src={singleWork.isLiked ? heartFillIcon : heartIcon} onClick={handleLikeRequest} />
                                        <ImageLikeValue>{singleWork.likeCount}</ImageLikeValue>
                                    </ImageLikeBox>

                                    <ImageViewBox>
                                        <ImageViewIcon src={viewIcon} />
                                        <ImageViewValue>{singleWork.viewCount}</ImageViewValue>
                                    </ImageViewBox>

                                </ImageHitBox>

                                {useAuthStore.getState().user.id === singleWork.writer.id &&
                                    <ImageMenuBox
                                        onClick={handleOptionModalDisplay}
                                        ref={optionModalRef}
                                    >
                                        <ImageMenuIcon src={menuIcon}></ImageMenuIcon>

                                        {optionModalDisplay &&
                                            <SingleWorkOptionBox>
                                                <SingleWorkOption onClick={navigateToUpdateSingleWorkPage}>
                                                    <SingleWorkOptionIcon src={pencilIcon} />
                                                    <SingleWorkOptionText>수정하기</SingleWorkOptionText>
                                                </SingleWorkOption>
                                                <SingleWorkOption
                                                    onClick={handleDeleteModalDisplay}
                                                >
                                                    <SingleWorkOptionIcon src={trashIcon} />
                                                    <SingleWorkOptionText style={{ color: '#f50000' }}>삭제하기</SingleWorkOptionText>
                                                </SingleWorkOption>
                                            </SingleWorkOptionBox>
                                        }

                                    </ImageMenuBox>
                                }
                            </ImageHeader>

                            <Image src={singleWork.image} />

                        </ImageBox>


                        <InfoHeaderBox>

                            <PhotographerInfoBox>
                                <PhotographerProfileImage src={singleWork.writer.profileImage} />

                                <PhotographerProfile>
                                    <PhotographerNickname>{singleWork.writer.nickname}</PhotographerNickname>
                                    {singleWork.writer.introduction && <PhotographerIntro>{singleWork.writer.introduction}</PhotographerIntro>}
                                </PhotographerProfile>

                                <FollowButton
                                    onClick={handleFollowRequest}
                                    isFollowing={singleWork.isFollowing}
                                >
                                    {singleWork.isFollowing ? '팔로잉' : '팔로우'}

                                    <FollowMessageBox>
                                        {singleWork.isFollowing ? '현재 팔로우하고 있는 작가입니다' : '팔로우 요청하고 작가의 소식을 받아보세요 !'}
                                    </FollowMessageBox>
                                </FollowButton>
                            </PhotographerInfoBox>

                            <PostDateBox>
                                <PostDateIcon src={clockIcon} />
                                <PostDate>게시일: {singleWork.createdAt}</PostDate>
                            </PostDateBox>

                        </InfoHeaderBox>



                        <ImageInfoBodyBox>
                            <ImageInfo>
                                <ImageInfoItem>
                                    <ImageInfoItemIcon src={cameraGrayIcon} />
                                    <ImageInfoItemText>카메라</ImageInfoItemText>
                                </ImageInfoItem>

                                <ImageInfoItemValue>{singleWork.camera}</ImageInfoItemValue>
                            </ImageInfo>

                            <ImageInfo>
                                <ImageInfoItem>
                                    <ImageInfoItemIcon src={lensGrayIcon} />
                                    <ImageInfoItemText>렌즈</ImageInfoItemText>
                                </ImageInfoItem>

                                <ImageInfoItemValue>{singleWork.lens ? singleWork.lens : '미입력'}</ImageInfoItemValue>
                            </ImageInfo>

                            <ImageInfo>
                                <ImageInfoItem>
                                    <ImageInfoItemIcon src={settingsGrayIcon} />
                                    <ImageInfoItemText>설정값</ImageInfoItemText>
                                </ImageInfoItem>

                                <ImageInfoItemTagBox>
                                    <ImageInfoItemTag>{singleWork.aperture}</ImageInfoItemTag>
                                    <ImageInfoItemTag>{singleWork.shutterSpeed}</ImageInfoItemTag>
                                    <ImageInfoItemTag>{singleWork.iso === '미입력' ? '미입력' : `ISO ${singleWork.iso}`}</ImageInfoItemTag>
                                </ImageInfoItemTagBox>
                            </ImageInfo>

                            <ImageInfo>
                                <ImageInfoItem>
                                    <ImageInfoItemIcon src={locationGrayIcon} />
                                    <ImageInfoItemText>위치</ImageInfoItemText>
                                </ImageInfoItem>

                                <ImageInfoItemValue>{singleWork.location ? singleWork.location : '미입력'}</ImageInfoItemValue>
                            </ImageInfo>


                            <ImageInfo>
                                <ImageInfoItem>
                                    <ImageInfoItemIcon src={categoryGrayIcon} />
                                    <ImageInfoItemText>카테고리</ImageInfoItemText>
                                </ImageInfoItem>

                                <ImageInfoItemTagBox>
                                    <ImageInfoItemTag>{singleWork.category}</ImageInfoItemTag>
                                </ImageInfoItemTagBox>
                            </ImageInfo>


                            <ImageInfo>
                                <ImageInfoItem>
                                    <ImageInfoItemIcon src={calendarGrayIcon} />
                                    <ImageInfoItemText>날짜</ImageInfoItemText>
                                </ImageInfoItem>

                                <ImageInfoItemValue>{singleWork.date}</ImageInfoItemValue>
                            </ImageInfo>

                        </ImageInfoBodyBox>


                        <ImageInfoTagBox>
                            <ImageInfoItem>
                                <ImageInfoItemIcon src={tagGrayIcon} />
                                <ImageInfoItemText>태그</ImageInfoItemText>
                            </ImageInfoItem>

                            <ImageInfoItemTagBox>
                                {singleWork.tags.map((tag, index) => (
                                    <ImageInfoItemTag key={index}>{tag.name}</ImageInfoItemTag>
                                ))}
                            </ImageInfoItemTagBox>

                        </ImageInfoTagBox>


                        <ImageInfoFooter>
                            <DescriptionBox>
                                <Title>{singleWork.title}</Title>
                                <Description>
                                    {singleWork.description}
                                </Description>
                            </DescriptionBox>

                            <CommentBox>
                                <CommentTitle>댓글</CommentTitle>

                                <CommentInputBox>
                                    <CommentWriterProfileImage src={useAuthStore.getState().user.profileImage} />
                                    <CommentInput
                                        placeholder='댓글을 입력해주세요 (300자 이내)'
                                        value={commentInput}
                                        onChange={handleCommentInputChange}
                                        commentUpdateMode={commentUpdateMode}
                                    />
                                </CommentInputBox>


                                <CommentInputCompleteButtonBox>
                                    {commentUpdateMode &&
                                        <>
                                            <CommentInputUpdateCancelButtonBox onClick={() => handleCommentupdateMode()}>
                                                <CommentInputUpdateCancelButtonText>취소</CommentInputUpdateCancelButtonText>
                                            </CommentInputUpdateCancelButtonBox>
                                            <CommentInputUpdateButtonBox onClick={handleCommentUpdateRequest}>
                                                <CommentInputUpdateButtonText>수정하기</CommentInputUpdateButtonText>
                                            </CommentInputUpdateButtonBox>
                                        </>
                                    }
                                    {!commentUpdateMode &&
                                        <CommentInputCompleteButton
                                            onClick={handleCommentCreateRequest}
                                        >
                                            <CommentInputCompleteButtonIcon src={sendIcon} />
                                            <CommentInputCompleteButtonText>댓글작성</CommentInputCompleteButtonText>
                                        </CommentInputCompleteButton>
                                    }
                                </CommentInputCompleteButtonBox>

                                <CommentListBox>
                                    {comments.map((comment, index) => (
                                        <Comment
                                            key={comment.id}
                                            data={comment}
                                            singleWorkId={singleWorkId}
                                            handleCommentPageRequest={handleCommentPageRequest}
                                            handleCommentupdateMode={handleCommentupdateMode}
                                        />
                                    ))}

                                    {commentTotalPage > 0 &&
                                        <CommentPageNavBox>

                                            <CommentPageBox>
                                                <CommentPage
                                                    onClick={
                                                        () => {
                                                            // 현재 페이지가 첫번째 페이지 이후 페이지라면
                                                            if (commentCurrentPage > 0) {
                                                                handleCommentPageRequest(commentCurrentPage - 1)
                                                            }
                                                        }
                                                    }
                                                >
                                                    <CommentPrevPageIcon src={leftBlackIcon} />
                                                </CommentPage>

                                                {Array.from({ length: commentTotalPage }, (_, index) => (
                                                    <>
                                                        {commentPageGroup === Math.floor(index / 5) &&
                                                            <CommentPage
                                                                key={index + 1}
                                                                isSelected={index + 1 == commentCurrentPage + 1}
                                                                onClick={() => handleCommentPageRequest(index)}
                                                            >
                                                                {index + 1}
                                                            </CommentPage>
                                                        }
                                                    </>
                                                ))}

                                                <CommentPage
                                                    onClick={
                                                        () => {
                                                            // 현재 페이지가 마지막 페이지보다 이전 페이지라면
                                                            if (commentCurrentPage < commentTotalPage - 1) {
                                                                handleCommentPageRequest(commentCurrentPage + 1)
                                                            }
                                                        }
                                                    }>
                                                    <CommentNextPageIcon src={rightBlackIcon} />
                                                </CommentPage>

                                            </CommentPageBox>

                                            <CommentQuickPageBox>
                                                <CommentFirstPage
                                                    onClick={() => { handleCommentPageRequest(0) }}
                                                >
                                                    시작 페이지
                                                </CommentFirstPage>
                                                <CommentLastPage
                                                    onClick={() => { handleCommentPageRequest(commentTotalPage - 1) }}
                                                >

                                                    마지막 페이지
                                                </CommentLastPage>
                                            </CommentQuickPageBox>
                                        </CommentPageNavBox>}

                                </CommentListBox>

                            </CommentBox>
                        </ImageInfoFooter>





                    </MainBox>

                </>
                }
                <SideBarBox />

            </BodyBox>


            {deleteModalDisplay &&
                <DeleteBackground>
                    {singleWorkDeleteLoading &&
                        <LoadingIcon src={loadingIcon} />
                    }
                    {!singleWorkDeleteLoading &&
                        <DeleteBox>
                            <DeleteBoxTitleBox>
                                <AlertIcon src={alertIcon} />
                                <DeleteBoxTitle>게시글 삭제 확인</DeleteBoxTitle>
                            </DeleteBoxTitleBox>

                            <DeleteBoxContent>이 작업은 되돌릴 수 없습니다.</DeleteBoxContent>
                            <DeleteBoxContent>게시글과 관련된 모든 데이터가 영구적으로 삭제됩니다.</DeleteBoxContent>

                            <DeleteBoxInput
                                placeholder='"삭제"를 입력하세요'
                                value={deleteModalInput}
                                onChange={handleDeleteModalInputChange}
                            />

                            <DeleteBoxButtonBox>
                                <DeleteBoxCancelButton onClick={handleDeleteModalDisplay}>취소</DeleteBoxCancelButton>
                                <DeleteBoxDeleteButton onClick={handleDeleteSingleWork}>삭제</DeleteBoxDeleteButton>
                            </DeleteBoxButtonBox>

                        </DeleteBox>
                    }
                </DeleteBackground>
            }

            {toastMessageDisplay &&
                <ToastMessage
                    firstText={firstText}
                    secondText={secondText}
                    isSuccess={isSucess}
                />}
        </Container>
    )
}

export default SingleWork;