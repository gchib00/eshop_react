import React,{Component} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 137px;;
    justify-content: space-between;
    margin-right: 1rem;
`
const ModifierBox = styled.div`
    display: block;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    border: 1px solid #1D1F22;
    text-align: center; 
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: black;
        color: white;
        transition: 300ms;
    }
`
const Modifier = styled.h1`
    font-family: 'Raleway';
    font-weight: 200;
    font-size: 1.6rem;
    position: relative;
    bottom: 1.28rem;
    user-select: none;
`
const Quantity = styled.h2`
    font-family: 'Raleway';
    font-weight: 200;
    font-size: 1rem;
`

class QuantityModifierSmall extends Component {
    add = () => {
        this.props.updateQuantity(this.props.item, +1)
    }
    subtract = () => {
        if (this.props.item.quantity > 0) {
            this.props.updateQuantity(this.props.item, -1)
        }
    }
    render(){
        return(
            <Container>
                <ModifierBox>
                    <Modifier onClick={this.add}>+</Modifier>
                </ModifierBox>
                <Quantity>{this.props.item.quantity}</Quantity>
                <ModifierBox>
                    <Modifier onClick={this.subtract}>-</Modifier>
                </ModifierBox>
            </Container>
        )
    }
}
export default QuantityModifierSmall