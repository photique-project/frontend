import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledWrapper = styled.div`
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    position: relative;
    width: 100px;
    height: 100px;
    perspective: 800px;
}

.crystal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    opacity: 0;
    transform-origin: bottom center;
    transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg);
    animation: spin 4s linear infinite, emerge 2s ease-in-out infinite alternate,
        fadeIn 0.3s ease-out forwards;
    border-radius: 10px;
    visibility: hidden;
}

@keyframes spin {
    from {
        transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg);
    }
    to {
        transform: translate(-50%, -50%) rotateX(45deg) rotateZ(360deg);
    }
}

@keyframes emerge {
    0%,
    100% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

@keyframes fadeIn {
    to {
        visibility: visible;
        opacity: 0.8;
    }
}

.crystal:nth-child(1) {
    background: linear-gradient(45deg, #1a1a1a, #333333); /* 매우 어두운 회색 */
    animation-delay: 0s;
}

.crystal:nth-child(2) {
    background: linear-gradient(45deg, #333333, #4d4d4d);
    animation-delay: 0.3s;
}

.crystal:nth-child(3) {
    background: linear-gradient(45deg, #4d4d4d, #666666);
    animation-delay: 0.6s;
}

.crystal:nth-child(4) {
    background: linear-gradient(45deg, #666666, #999999);
    animation-delay: 0.9s;
}

.crystal:nth-child(5) {
    background: linear-gradient(45deg, #999999, #cccccc);
    animation-delay: 1.2s;
}

.crystal:nth-child(6) {
    background: linear-gradient(45deg, #cccccc, #f2f2f2); /* 가장 밝은 회색 */
    animation-delay: 1.5s;
}`;

const Text = styled.div`
    font-size: 16px;
    font-weight: 700;
`

const Loader = () => {
    return (
        <><Container>
            <StyledWrapper>
                <div className="container">
                    <div className="loader">
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                        <div className="crystal" />
                    </div>
                </div>
            </StyledWrapper>
            <Text>Loading</Text>
        </Container>
        </>
    );
}


export default Loader;
