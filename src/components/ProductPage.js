import React,{ Component } from 'react'
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


class ProductPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgIndex: 0,
        }
    }

    populateImgArray = async (array) =>{
        array = await this.props.product.gallery.map(img => array.push(img))
    }

    updateImgIndex = (imgURL) => {
        // when side image is clicked, it will update 'imgIndex', which will cause the main image to change accordingly 
        this.setState({
            imgIndex: this.props.product.gallery.findIndex(img => img === imgURL)
        })
    }

    render(){
        const product = this.props.product
        let images = []
        this.populateImgArray(images)

        return(
            <MainContainer>
                <div>
                    <SideImages>
                        {
                            images.map(img => {
                                return  <SideImage 
                                            src={img} 
                                            alt='side'
                                            key={img}
                                            onClick={() => this.updateImgIndex(img)}
                                        />
                            })
                        }
                    </SideImages>
                </div>
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