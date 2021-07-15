import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

const SelectCurrency = styled.select`
    color: #43464E;
    border: none;
    font-size: 1.4rem;
    background: transparent;
    outline: 0px;
    margin-right: 18px;
`
const CURRENCY_QUERY = gql`
    query {
        currencies
    }
`
class CurrencySelector extends Component {

    getCurrencies = () => {
        const currencies = []
        if (!this.props.data.loading){
        this.props.data.currencies.map(currency => {
            //Add symbols to currencies before they are passed as options:
            let currencySymbol = ''
            if (currency === 'USD'){currencySymbol = '$'}
            if (currency === 'GBP'){currencySymbol = '£'}
            if (currency === 'JPY'){currencySymbol = '¥'}
            if (currency === 'RUB'){currencySymbol = '₽'}
            //If symbol is unavailable for currency, retain the original value:
            if (currencySymbol === ''){ currencySymbol = currency}
            return (currencies.push(
                <option value={currency} key={currency}>{currencySymbol}</option>
            ))
        })}
        return currencies
    }
    handleCurrancyChange = (e) => {
        const array = this.props.data.currencies
        const index = array.indexOf(e.target.value)
        this.props.changeCurrency(index)
      }
    render() {
        return (
            <SelectCurrency onChange={this.handleCurrancyChange}>{this.getCurrencies()}</SelectCurrency>
        )
    }
}
export default graphql(CURRENCY_QUERY)(CurrencySelector)
