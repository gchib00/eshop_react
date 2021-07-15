import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../static/images/logo.svg'
import Cart from '../static/images/cart.svg'
import CartOverlay from './CartOverlay'
import ModalOverlay from './ModalOverlay'

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
const SelectCurrency = styled.select`
    color: #43464E;
    border: none;
    font-size: 1.4rem;
    background: transparent;
    outline: 0px;
    margin-right: 18px;
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

  handleCurrancyChange = (e) => {
    if (e.target.value === 'USD'){
      this.props.changeCurrency(0)
    } 
    if (e.target.value === 'GBP'){
      this.props.changeCurrency(1)
    }
    if (e.target.value === 'AUD'){
      this.props.changeCurrency(2)
    }
    if (e.target.value === 'JPY'){
      this.props.changeCurrency(3)
    }
    if (e.target.value === 'RUB'){
      this.props.changeCurrency(4)
    }
  }

  cartDisplay = () => {
    this.setState({showCart: !this.state.showCart})
  }

  render(){
    return(
      <>
        <HeaderElement>
            <CategoryContainer>
              <div>
                  <Radio
                      type='radio'
                      checked={this.props.category === ''}
                      onClick={this.showAll}
                      id='allRadioBtn'
                      readOnly
                  />
                  <CategoryButton htmlFor='allRadioBtn'>ALL</CategoryButton>
              </div>
              <div>
                  <Radio
                      type='radio'
                      checked={this.props.category === 'tech'}
                      onClick={this.showTech}
                      id='techRadioBtn'
                      readOnly
                  />
                  <CategoryButton htmlFor='techRadioBtn'>TECH</CategoryButton>
              </div>
              <div>
                  <Radio
                      type='radio'
                      checked={this.props.category === 'clothes'}
                      onClick={this.showClothes}
                      id='clothesRadioBtn'
                      readOnly
                  />
                  <CategoryButton htmlFor='clothesRadioBtn'>CLOTHES</CategoryButton>
              </div>
            </CategoryContainer>
            <div>
              <Link to='/'><img src={Logo} alt='logo' /></Link>
            </div>
            <ActionsMenuContainer>
                <SelectCurrency onChange={this.handleCurrancyChange}>
                  <option value='USD'>$</option>
                  <option value='GBP'>£</option>
                  <option value='JPY'>¥</option>
                  <option value='RUB'>₽</option>
                </SelectCurrency>
                <CartIcon onClick={this.cartDisplay}>
                  <img src={Cart} alt='cart'/>
                  {this.props.items.length > 0? 
                    <ItemCounter>{this.props.items.length}</ItemCounter>  
                  :
                    null
                  }
                </CartIcon>
            </ActionsMenuContainer>
        </HeaderElement> 
        {this.state.showCart === true && this.props.items.length>0 ?
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
        :
          null
        } 
      </> 
    )
  }
}

export default Header;