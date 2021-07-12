import React, {Component} from 'react'
import styled from 'styled-components'


const OptionBox = styled.label`
    display: block;
    box-sizing: border-box;
    min-width: 63px;
    min-height: 45px;
    border: 1px solid #1D1F22;
    align-items: center;
    text-align: center; 
    background-color: white;
    cursor: pointer;
    padding: 10px;
    &:hover {
        background-color: black;
        color: white;
        transition: 300ms;
    }
`
const Input = styled.input`
    display: none;
    &:checked + label {
        background-color: black;
        color: white;
    }
`


class OptionSelectorBox extends Component {
    constructor(props){
        super(props)
        this.state={
            value: '',
            selectedOptions: this.props.selectedOptions
        }
    }
    

    onChange = (e) => {
        this.setState({value: e.target.value})
        this.props.saveOption(this.props.product, this.props.attribute, e.target.value) //passes data back to App
    }

    render(){
        const attribute = this.props.attribute

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
                        <OptionBox htmlFor={item.value + attribute.name}>{item.value}</OptionBox>
                    </div>
                )
            }) 
        )
    }
}

export default OptionSelectorBox