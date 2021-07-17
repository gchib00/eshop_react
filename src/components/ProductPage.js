import React,{ PureComponent } from 'react'
import styled from 'styled-components'
import ProductDetails from './ProductDetails.js'
import {Redirect} from 'react-router-dom'

const MainContainer = styled.main`
    width: 80%;
    margin: auto;
    margin-top: 3rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
`
const SideImages = styled.div`
    display: grid;
    grid-template-rows: 100px 100px 100px 100px 100px;
    grid-template-columns: 120px;
    grid-gap: 20px;
`
const SideImage = styled.img`
    height: 100px;
    width: 110px;
`
const MainImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 511px;
    width: 610px;
`
const MainImage = styled.img`
    max-height: 511px;
    max-width: 610px;
`

class ProductPage extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            imgIndex: 0,
        }
    }
    populateImgArray = (product) =>{
        const array = []
        if (this.props.product.gallery === undefined){ //if it's still loading
            return null
        } else {
            this.props.product.gallery.map(img => array.push(img))
            return array
        }
    }
    updateImgIndex = (imgURL) => {
        // when side image is clicked, it will update 'imgIndex', which will cause the main image to change accordingly 
        this.setState({
            imgIndex: this.props.product.gallery.findIndex(img => img === imgURL)
        })
    }
    renderSideImages = (images) => {
        const array = []
        if (!images) {return <Redirect to='/' />}
        images.map(img => array.push(
            <SideImage 
                src={img} 
                alt='side'
                key={img}
                onClick={() => this.updateImgIndex(img)}
            />))
        return array
    }
    getMainImage = () => {
        if (!this.props.product.gallery){return <Redirect to='/' />}
        return this.props.product.gallery[this.state.imgIndex]
    }
    componentDidCatch(err){
        console.error(err)
        return <Redirect to='/' />
    }
    render(){
        const product = this.props.product
        const images = this.populateImgArray()
        return(
            <MainContainer>
                <SideImages>{this.renderSideImages(images)}</SideImages>
                <MainImageContainer>
                    <MainImage alt='main' src={this.getMainImage()} />
                </MainImageContainer>
                <ProductDetails 
                    product={product} 
                    selectedCurrency={this.props.selectedCurrency} 
                    addToCart={this.props.addToCart}
                    saveOption={this.props.saveOption}
                    selectedOptions={this.props.selectedOptions}
                    cartItems={this.props.cartItems}
                />                    
            </MainContainer>
        )
    }
}
export default ProductPage