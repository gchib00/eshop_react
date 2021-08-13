import PropagateLoader from "react-spinners/PropagateLoader";
import styled from 'styled-components'

const LoadingScreen = () => {
  const Container = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-top: 38vh;
  `

    return(
      <Container>
        <PropagateLoader size={14} color='#7fff5c'/>
      </Container>
    )
}

export default LoadingScreen