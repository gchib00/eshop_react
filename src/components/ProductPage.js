import React,{ PureComponent } from 'react'
import styled from 'styled-components'
import ProductDetails from './ProductDetails.js'

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
    width: 120px;
`
const MainImage = styled.img`
    height: 510px;
    width: 610px;
`

class ProductPage extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            imgIndex: 0,
        }
    }
    populateImgArray = (array) =>{
        array = this.props.product.gallery.map(img => array.push(img))
    }
    updateImgIndex = (imgURL) => {
        // when side image is clicked, it will update 'imgIndex', which will cause the main image to change accordingly 
        this.setState({
            imgIndex: this.props.product.gallery.findIndex(img => img === imgURL)
        })
    }
    renderSideImages = (images) => {
        const array = []
        images.map(img => array.push(
            <SideImage 
                src={img} 
                alt='side'
                key={img}
                onClick={() => this.updateImgIndex(img)}
            />))
        return array
    }
    render(){
        const product = this.props.product
        let images = []
        this.populateImgArray(images)

        return(
            <MainContainer>
                <SideImages>{this.renderSideImages(images)}</SideImages>
                <MainImage alt='main' src={product.gallery[this.state.imgIndex]} />
                <ProductDetails 
                    product={product} 
                    selectedCurrency={this.props.selectedCurrency} 
                    addToCart={this.props.addToCart}
                    saveOption={this.props.saveOption}
                    selectedOptions={this.props.selectedOptions}
                />                    
            </MainContainer>
        )
    }
}
export default ProductPage