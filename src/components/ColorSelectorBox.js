import React, {Component} from 'react'
import styled from 'styled-components'

const ColorOptionBox = styled.label`
    display: block;
    box-sizing: border-box;
    min-width: 63px;
    min-height: 45px;
    border: 1px solid #1D1F22;
    align-items: center;
    text-align: center; 
    &:hover {
        opacity: 0.3;
        transition: 300ms;
    }
`
const Input = styled.input`
    display: none;
    &:checked + label {
        opacity: 0.3;
    }
`

class ColorSelectorBox extends Component {
    constructor(props){
        super(props)
        this.state={
            value: '',
        }
    }

    onChange = (e) => {
        this.setState({value: e.target.value})
    }

    render(){
        const attribute = this.props.attribute
        console.log(`current (color) value is ${this.state.value}`)

        return(
            attribute.items.map(item => {
                return(
                    <div>
                        <Input
                            type='radio'
                            value={item.value} 
                            name={attribute.name}
                            checked={this.state.value === item.value}
                            onChange={this.onChange}
                            id={item.value + attribute.name} //this is the easiest way to make sure that id is always unique
                        />
                        <ColorOptionBox htmlFor={item.value + attribute.name} style={{backgroundColor: item.value}}/>
                    </div> 
                )
            }) 
        )
    }
}

export default ColorSelectorBox