import React, {PureComponent} from 'react'
import styled from 'styled-components'
import ChevronLeft from '../static/images/left.svg'
import ChevronRight from '../static/images/right.svg'

const SliderContainer = styled.div`
    width: 141px;
    height: 185px;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    z-index: 1;
`
const Left = styled.img`
    position: relative;
    z-index: 9;
    bottom: 56%;
`
const Right = styled.img`
    position: relative;
    z-index: 9;
    bottom: 56%;
    left: 95px;
`

class PhotoSlider extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            index: 0
        }
    }
    moveLeft = () =>{
        if (this.state.index === 0) {
            return null
        }
        return this.setState({index: this.state.index-1})
    }
    moveRight = () => {
        if (this.state.index === this.props.item.gallery.length-1) {
            return null
        }
        return this.setState({index: this.state.index+1})
    }
    render(){
        let photos = this.props.item.gallery
        return(
            <SliderContainer>
                <Image src={photos[this.state.index]} />
                <Left onClick={this.moveLeft} src={ChevronLeft} alt='left'/>
                <Right onClick={this.moveRight} src={ChevronRight} alt='right'/>
            </SliderContainer>
        )
    }
}
export default PhotoSlider