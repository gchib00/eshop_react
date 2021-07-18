import React, {Component} from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';

const OptionBox = styled.label`
    display: block;
    box-sizing: border-box;
    min-width: 68px;
    border: 1px solid #1D1F22;
    align-items: center;
    text-align: center; 
    background-color: white;
    cursor: pointer;
    padding-top: 14px;
    padding-bottom: 14px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    &:hover {
        background-color: black;
        color: white;
        transition: 300ms;
    }
`
const ColorBox = styled.label`
    display: block;
    box-sizing: border-box;
    min-width: 66px;
    min-height: 48px;
    border: 1px solid #1D1F22;
    align-items: center;
    text-align: center; 
    cursor: pointer;
    padding-top: 14px;
    padding-bottom: 14px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background-color: black;
    opacity: 1;
    &:hover {
        border: 2px black solid;
    }
`
const Input = styled.input`
    display: none;
    &:checked + label {
        background-color: black;
        color: white;
    }
    &:checked + #colorbox {
        opacity: 0.7;
        border: 3px black solid;
    }
`

class CartOptionSelectorBox extends Component {
    onChange = (option) => {
        return this.props.updateCartItem(this.props.item, this.props.attribute.name, option)
    }
    populateOptions = (attribute, item) => {
        const productOptions = this.props.selectedOptions
        for (let i=0; i<productOptions.length; i++){
            if (productOptions[i].productName === this.props.item.product.name 
            && productOptions[i].attributeName === attribute 
            && productOptions[i].option === item) {
                return true
            }
        }
        return false
    }
    optionsToRender = (attribute) => {
        const array = []
        if (attribute.type === 'swatch') {
            attribute.items.map(item => array.push(
                <div key={uuidv4()+item.value}>
                    <Input
                        type='radio'
                        value={item.value} 
                        name={this.props.id+'color'}
                        defaultChecked={this.populateOptions(attribute.name, item.value)}
                        onClick={()=>this.onChange(item.value)}
                        id={this.props.id+item.value}
                    />
                    <ColorBox id='colorbox'
                        htmlFor={this.props.id+item.value} 
                        style={{backgroundColor: item.value}}
                    />
                </div>))
        } else { 
            attribute.items.map(item => array.push(
                <div key={uuidv4()+item.value}>
                    <Input
                        type='radio'
                        value={item.value} 
                        name={this.props.id+attribute.name}
                        defaultChecked={this.populateOptions(attribute.name, item.value)}
                        onClick={()=>this.onChange(item.value)}
                        id={this.props.id+item.value}
                    />
                    <OptionBox htmlFor={this.props.id+attribute.name} onClick={()=>this.onChange(item.value)}>{item.value}</OptionBox>
                </div>))
        }
        return array
    }
    render(){
        return(
            this.optionsToRender(this.props.attribute)
        )
    }
}
export default CartOptionSelectorBox