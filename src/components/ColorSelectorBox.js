import React, {Component} from 'react'
import styled from 'styled-components'

const ColorOptionBox = styled.button`
    box-sizing: border-box;
    min-width: 63px;
    min-height: 45px;
    border: 1px solid #1D1F22;
    align-items: center;
    text-align: center; 
    content: none;
    &:hover {
        opacity: 0.3;
        transition: 300ms;
    }
`

class ColorSelectorBox extends Component {
    render(){
        const color = this.props.color
        return(
            <ColorOptionBox style={{backgroundColor: color}} />
        )
    }
}

export default ColorSelectorBox