import React, {Component} from 'react'
import styled from 'styled-components'
import ColorSelectorBox from './ColorSelectorBox'

const ItemContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: space-between;

    max-width: 1100px;
    height: 186px;
    border: 1px solid black;
    margin-left: 2rem;
`
const Title = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    align-items: center;
    color: #1D1F22;
`
const Price = styled.p`
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 18px;
    align-items: center;
    color: #1D1F22;
`
const AttributeTitle = styled.h2`
    display: flex;
    flex: flex-start;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
`
const OptionBox = styled.button`
    box-sizing: border-box;
    min-width: 63px;
    min-height: 45px;
    border: 1px solid #1D1F22;
    align-items: center;
    text-align: center; 
    background-color: white;
    &:hover {
        background-color: black;
        color: white;
        transition: 300ms;
    }
`
const OptionBoxes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: auto;
`


class Cart extends Component {

    render(){
        let items = this.props.items
        let index = this.props.selectedCurrency

        return(
            <>
                <h1>CART</h1>
                <br />
                {items.length < 1 ?  null  :
                    items.map(item => {
                        return(
                            <ItemContainer>
                                <div>
                                    <Title>{item.name}</Title>
                                    <Price>{item.prices[index].currency} {item.prices[index].amount}</Price>
                                    <br />
                                    <div>
                                    {item.attributes.length === 0 ? //needs to be checked, otherwise the program will break if product has no attribute
                                        <br /> //returning br tag or 'null' will fix the problem
                                    :
                                        item.attributes.map(attribute => {
                                            return(
                                                <div>
                                                    {attribute.type === 'swatch' ?
                                                        // <OptionBoxes>
                                                        //     {attribute.items.map(item => {
                                                        //         return <ColorSelectorBox color={item.value} />
                                                        //     })}
                                                        // </OptionBoxes>
                                                        null
                                                    :
                                                        <OptionBoxes>
                                                            {attribute.items.map(item => {
                                                                return <OptionBox>{item.value}</OptionBox>
                                                            })}
                                                        </OptionBoxes>
                                                    }
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                           </ItemContainer>
                        )
                    })
                }
            </>
        )
    }
}

export default Cart