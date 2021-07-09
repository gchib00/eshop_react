import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../static/images/logo.svg'
import Cart from '../static/images/cart.svg'
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
`
const CategoryButton = styled.button`
  height: 56px;
  width: 97px;
  font-family: 'Raleway', bold;
  font-weight: bold;
  color: black;
  border: none;
  &:hover{
      border-bottom: 2px solid #5ECE7B;
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



class Header extends Component{

  showTech = () => {
    this.props.updateCategory('tech')
  }
  showClothes = () => {
    this.props.updateCategory('clothes')
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
  render(){
    return(
        <HeaderElement>
            <CategoryContainer>
                <CategoryButton onClick={this.showTech}>TECH</CategoryButton>
                <CategoryButton onClick={this.showClothes}>CLOTHES</CategoryButton>
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
                <Link to='/cart'>
                  <img src={Cart} alt='cart' />
                </Link>
            </ActionsMenuContainer>
        </HeaderElement>  
    )
  }
}

export default Header;