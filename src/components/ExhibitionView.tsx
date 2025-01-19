import styled from 'styled-components';
import ExhibitionCard from './ExhibitionCard';

const Container = styled.div`
    margin-top: 40px;
    margin-bottom: 100px;
    width: 1200px;
    
    display: flex;
    justify-content: center;

    flex-direction: row;
    flex-wrap: wrap;

    gap: 30px;

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100%  - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
`



const ExhibitionView = () => {
    return (

        <Container>
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />
            <ExhibitionCard />


        </Container>


    )
}

export default ExhibitionView;