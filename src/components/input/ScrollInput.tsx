import styled from 'styled-components';
import downIcon from '../../assets/down.png';
import { useState, useRef, useEffect } from 'react';

const Container = styled.div`
    height: 40px;
    width: calc((100% / 3));

    display: flex;
    flex-direction: row;
    align-items: center;

    position: relative;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`
const ScrollInputTextBox = styled.div`
    width: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ScrollInputText = styled.div<{ selectedOption: string | null }>`
    font-size: 16px;
    color: ${({ selectedOption }) => (selectedOption ? 'black' : 'rgba(0, 0, 0, 0.3)')};
`

const ScrollInputIconBox = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ScrollInputIcon = styled.img`
    width: 20px;
    height: 20px;
`

const ScrollPanel = styled.div`
    width: 100%;
    max-height: 200px;

    display: flex;
    flex-direction: column;

    background-color: white;


    border-radius: 6px;
    border: 1.5px solid rgba(0, 0, 0, 0.2);

    position: absolute;
    overflow-y: auto;
    top: 45px;

    &::-webkit-scrollbar {
        display: none; 
    }

    z-index: 1000;
`

const Item = styled.div`
    flex-shrink: 0;
    height: 40px;
    width: 100%;

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

interface ScrollInputProps {
    title: string;
    options: string[];
    selectedOption: string;
    handleInputChange: (option: string) => void;
}

const ScrollInput: React.FC<ScrollInputProps> = (props) => {
    const { title, options, selectedOption, handleInputChange } = props;

    const [panelView, setPanelView] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null)

    const handleOptionSelect = (option: string) => {
        setPanelView(false)
        handleInputChange(option)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setPanelView(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    const handlePanelView = () => {
        setPanelView(!panelView)
    }

    return (
        <Container ref={containerRef} onClick={handlePanelView}>
            <ScrollInputTextBox>
                <ScrollInputText selectedOption={selectedOption}>{selectedOption ? selectedOption : title}</ScrollInputText>
            </ScrollInputTextBox>
            <ScrollInputIconBox>
                <ScrollInputIcon src={downIcon} />
            </ScrollInputIconBox>

            {panelView &&
                <ScrollPanel>
                    {options.map((option, index) => (
                        <Item key={index} onClick={() => handleOptionSelect(option)}>{option} </Item>

                    ))}
                </ScrollPanel>
            }
        </Container>
    )
}

export default ScrollInput;