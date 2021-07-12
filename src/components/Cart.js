import React, {Component} from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';


import PhotoSlider from './PhotoSlider'
import QuantityModifier from './QuantityModifier'
import OptionSelectorBox from './OptionSelectorBox'

const ItemContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: space-between;

    max-width: 1100px;
    min-height: 186px;
    border-top: 1px solid #E5E5E5;
    margin-left: 2rem;

    align-items: center;
`
const Title = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 27px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
`
const Price = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 18px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
`
const OptionBoxes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* margin: auto; */
    min-width: 160px;
`
const Side1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`
const Side2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`


class Cart extends Component {

    render(){
        // console.log('cart items:')
        // console.log(this.props.items)


        let items = this.props.items
        let index = this.props.selectedCurrency
        
        if (items.length < 1) {
            return <h1>Cart is empty</h1>
        }

        return(
            <>
                <h1>CART</h1>
                <br />
                
                {items.map(item => {

                    let currency = item.prices[index].currency
                    let price = item.prices[index].amount
                        if (currency === 'USD') {currency = '$'}
                        if (currency === 'GBP') {currency = '£'}
                        if (currency === 'JPY') {currency = '¥'}
                        if (currency === 'RUB') {currency = '₽'}

                    return(
                        <ItemContainer key={item.id}>
                            <Side1>
                                <Title>{item.name}</Title> 
                                <Price>{currency}{price}</Price>
                                <br />
                                <div>
                                    {item.attributes.length === 0 ? //needs to be checked, otherwise the program will break if product has no attribute
                                    <br /> //returning br tag or 'null' will fix the problem
                                    :
                                        item.attributes.map(attribute => {
                                            return(
                                                <div key={uuidv4()}>
                                                    {attribute.type === 'swatch' ?
                                                        null
                                                    :
                                                        <OptionBoxes>
                                                            <OptionSelectorBox 
                                                                attribute={attribute} 
                                                                saveOption={this.props.saveOption} 
                                                                product={item}
                                                                selectedOptions={this.props.selectedOptions}
                                                            />
                                                        </OptionBoxes>
                                                    }
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Side1>
                            <Side2>
                                <QuantityModifier item={item} updateQuantity={this.props.updateQuantity}/>
                                <PhotoSlider item={item} />
                            </Side2>
                        </ItemContainer>

                    ) 
                })}
            </>
        )
    }
}

export default Cart