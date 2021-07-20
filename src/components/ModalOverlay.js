import React, {PureComponent} from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  position: fixed; 
  overflow: auto; 
  width: 100%; 
  height: 100vh; 
  top: 0;
  overflow: auto; 
  background-color: rgba(0,0,0,0.3); 
  z-index: 2;
`   

class ModalOverlay extends PureComponent {
    removeModal = () => {
      this.props.cartDisplay()
    }
    render(){
        return(<Modal onClick={this.removeModal}/>)
    }
}
export default ModalOverlay