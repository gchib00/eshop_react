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

class OptionSelectorBox extends Component {
    constructor(props){
        super(props)
        this.state={
            selectedOptions: this.props.selectedOptions,
        }
    }

    onChange = (option) => {
        this.props.saveOption(this.props.product, this.props.attribute, option) //passes data back to App
    }

    populateOptions = (attribute, item) => {
        const selectedOptions = this.props.selectedOptions

        for (let i=0; i<selectedOptions.length; i++){
            if (selectedOptions[i].product.name === this.props.product.name 
             && selectedOptions[i].attribute.name === attribute 
             && selectedOptions[i].option === item) {
                return true
            }
        }
    }


    render(){

        const attribute = this.props.attribute        
        if (attribute.type === 'swatch') {
            return(
                attribute.items.map(item => {
                    return(
                        <div key={uuidv4()}>
                            <Input
                                type='radio'
                                value={item.value} 
                                name={attribute.name}
                                defaultChecked={this.populateOptions(attribute.name, item.value)}
                                onClick={()=>this.onChange(item.value)}
                                id={item.value + attribute.name} //this is the easiest way to make sure that id is always unique
                            />
                            <ColorBox id='colorbox'
                                htmlFor={item.value + attribute.name} 
                                style={{backgroundColor: item.value}}
                            />
                        </div>
                    )
                }) 
            )
        } else {
            return(
                attribute.items.map(item => {
                    return(
                        <div key={uuidv4()}>
                            <Input
                                type='radio'
                                value={item.value} 
                                name={attribute.name}
                                defaultChecked={this.populateOptions(attribute.name, item.value)}
                                onClick={()=>this.onChange(item.value)}
                                id={item.value + attribute.name}
                            />
                            <OptionBox htmlFor={item.value + attribute.name}>{item.value}</OptionBox>
                        </div>
                    )
                }) 
            )
        }













        // return(
        //     attribute.items.map(item => {
        //         return(
        //             <div key={uuidv4()}>
        //                 <Input
        //                     type='radio'
        //                     value={item.value} 
        //                     name={attribute.name}
        //                     defaultChecked={this.populateOptions(attribute.name, item.value)}
        //                     onClick={()=>this.onChange(item.value)}
        //                     id={item.value + attribute.name} //this is the easiest way to make sure that id is always unique
        //                 />
        //                 <OptionBox htmlFor={item.value + attribute.name}>{item.value}</OptionBox>
        //             </div>
        //         )
        //     }) 
        // )
    }
}

export default OptionSelectorBox