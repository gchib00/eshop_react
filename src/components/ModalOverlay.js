import React, {Component} from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 80px;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.3); 
`   

class ModalOverlay extends Component {

    removeModal = () => {
      this.props.cartDisplay()
    }
    
    render(){
        return(<Modal onClick={this.removeModal}/>)
    }

}

export default ModalOverlay