import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../static/images/logo.svg'
import Cart from '../static/images/cart.svg'
import CartOverlay from './CartOverlay'
import ModalOverlay from './ModalOverlay'
import CurrencySelector from './CurrencySelector'
import { Link } from 'react-router-dom'

const HeaderElement = styled.header`
  height: 80px;
  width: 100%;
  background-color: #FFFFFF;
 
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Raleway', sans-serif;

`
const CategoryContainer = styled.div`
  height: 56;
  width: 234px;
  margin-left: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`
const Radio = styled.input`
    display: none;
    &:checked + label {
        color: #5ECE7B;
        border-bottom: 2px solid #5ECE7B;
    }
`
const CategoryButton = styled.label`
  display: block;
  box-sizing: border-box;
  min-height: 35px;
  min-width: 97px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: black;
  border: none;
  text-align: center;
  &:hover{
      border-bottom: 2px solid #5ECE7B;
      color: #5ECE7B;
  }
  background: transparent;
`
const ActionsMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 24px;
  width: 80px;
  padding: 40px;
  margin-right: 3rem;
`
const CartIcon = styled.div`
  position: relative;
  top: 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`
const ItemCounter = styled.span`
  text-align: center;
  position: absolute;
  bottom: 14px;
  left: 15px;
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 50%;
  color: white;
`

class Header extends Component{
  constructor(props){
    super(props)
    this.state={
      showCart: false
    }
  }
  showTech = () => {
    this.props.updateCategory('tech')
  }
  showClothes = () => {
    this.props.updateCategory('clothes')
  }
  showAll = () => {
    this.props.updateCategory('') //if query receives empty title string, it will fetch items of all category
  }
  cartDisplay = () => {
    this.setState({showCart: !this.state.showCart})
  }
  cartItemAmount = (totalItems) => {
    if(totalItems.length > 0){
      let itemCounter = 0;
      totalItems.map(item => {
        return itemCounter+=item.quantity
      })
      return(<ItemCounter>{itemCounter}</ItemCounter>)  
    }
    return null
  }
  showCartOverlay = () => {
    if (this.state.showCart === true && this.props.items.length>0) {
      return(
        <div>
          <CartOverlay 
            items={this.props.items} 
            selectedCurrency={this.props.selectedCurrency}
            updateQuantity={this.props.updateQuantity}
            saveOption={this.props.saveOption}
            selectedOptions={this.props.selectedOptions}
          />
          <ModalOverlay cartDisplay={this.cartDisplay} />
        </div>
      )
    }
    return null
  }
  render(){
    return(
      <>
        <HeaderElement>
            <CategoryContainer>
              <div>
                <Link to='/'>
                  <Radio
                    type='radio'
                    checked={this.props.category === ''}
                    onClick={this.showAll}
                    id='allRadioBtn'
                    readOnly
                />
                </Link>
                <CategoryButton htmlFor='allRadioBtn'>ALL</CategoryButton>
              </div>
              <div>
                <Link to='/'>
                  <Radio
                      type='radio'
                      checked={this.props.category === 'tech'}
                      onClick={this.showTech}
                      id='techRadioBtn'
                      readOnly
                  />
                </Link>
                <CategoryButton htmlFor='techRadioBtn'>TECH</CategoryButton>
              </div>
              <div>
                <Link to='/'>
                  <Radio
                      type='radio'
                      checked={this.props.category === 'clothes'}
                      onClick={this.showClothes}
                      id='clothesRadioBtn'
                      readOnly
                  />
                </Link>
                <CategoryButton htmlFor='clothesRadioBtn'>CLOTHES</CategoryButton>
                  
              </div>
            </CategoryContainer>
            <Link to='/'><img src={Logo} alt='logo' /></Link>
            <ActionsMenuContainer>
                <CurrencySelector changeCurrency={this.props.changeCurrency} /> 
                <CartIcon onClick={this.cartDisplay}>
                  <img src={Cart} alt='cart'/>
                  {this.cartItemAmount(this.props.items)}
                </CartIcon>
            </ActionsMenuContainer>
        </HeaderElement>
        {this.showCartOverlay()} 
      </> 
    )
  }
}
export default Header;