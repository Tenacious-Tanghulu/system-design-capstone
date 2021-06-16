import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImageSlider from './ImageSlider.jsx';
import ProductCategory from './ProductCategory.jsx';
import Styles from './Styles.jsx';
import Size from './Size.jsx';
import Price from './Price.jsx';
import StarRating from './StarRating.jsx';
import StarRatings from 'react-star-ratings';
const helpers = require('./Helpers.js');

const Container = styled.div`
  display: flex;
  font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
  font-weight: light;
  font-size: 18px
  justify-content: flex-start;
  flex-flow: row wrap;
  padding-top: 10px;
  padding-bottom: 5px;
`;

const ImageGallery = styled.div`
  border-radius: 0px;
  width: 45%;
  padding: 2%;
`;

const ProductInformation = styled.div`
  font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 100;
  padding-top: 8px;
  width: 40%;
  padding: 2%;
`;

const StyleSelectorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 5%;
`;

const AdditionalProductDetails = styled.div`
  display: flex;
  font-family: 'Helvetica', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 100;
  background: none;
  padding-top: 1%;
`;

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      styles: [],
      category: '',
      description: '',
      slogan: '',
      features: '',
      originalPrice: 0,
      salePrice: 0,
      rating: 5,
      images: [{
        style_id: 142825,
        photos: {
          thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        }
      }],
      skus: [
        {quantity: 8, size: "XS"},
        {quantity: 16, size: "S"},
        {quantity: 17, size: "M"},
        {quantity: 10, size: "L"},
        {quantity: 15, size: "XL"}
      ],
      selectedStyleId: 0,
      selectedStyleName: '',
      selectedImages: [
        {thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},
        {thumbnail_url: "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"},
        {thumbnail_url: "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"}
      ]
    };
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getAllStyles = this.getAllStyles.bind(this);
    this.handleStylesSelectorClick = this.handleStylesSelectorClick.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
    this.getReviews();
  }

  getAllProducts() {
    // this function sets the first product ID of the product array as state
    const self = this;
    const productId = self.props.product_id;
    axios.get(`/api/products/${productId}`)
      .then(function (response) {
        // handle success
        self.setState({
          product: response.data.id,
          category: response.data.name,
          description: response.data.description,
          slogan: response.data.slogan,
          features: response.data.features
        })
        self.getAllStyles();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  getReviews() {
    const self = this;
    const productId = self.props.product_id;
    axios.get(`/reviews/meta/${productId}`)
      .then((response) => {
        let data = response.data;
        console.log(data);
        let totalNumberReviews = 0;
        let totalRatingValues = 0;

        for (const [key, value] of Object.entries(data.ratings)) {
          totalRatingValues = totalRatingValues +key*value;
          totalNumberReviews = totalNumberReviews + Number(value);
        }
        const averageRating = ((Math.round((totalRatingValues / Number(totalNumberReviews)) * 4) / 4));
        console.log(averageRating);
        self.setState({
          rating: averageRating
        })
    });
  }

  getAllStyles() {
    const self = this;
    const productId = self.props.product_id.toString();
    axios.get(`/api/products/${productId}/styles`)
      .then(function (response) {
        // handle success
        const results = response.data.results;
        const originalPrice = results[0].original_price;
        const salePrice = results[0].sale_price;
        const name = results[0].name;
        const style_id = results[0].style_id;
        const styleImages = [];
        for (var i = 0; i < results.length; i++) {
          const currentStyleInfo = {};
          const currentStyle = results[i];
          currentStyleInfo.style_id = currentStyle.style_id;
          currentStyleInfo.photos = currentStyle.photos[0];
          styleImages.push(currentStyleInfo);
        }
        const renderSelectedImages = helpers.getAllImagesForAllStyles(style_id, response.data.results);

        const renderSkus = helpers.getAllSkusPerStyle(style_id, response.data.results);

        self.setState({
          styles: response.data,
          images: styleImages,
          name: name,
          originalPrice: originalPrice,
          salePrice: salePrice,
          selectedStyleId: style_id,
          selectedImages: renderSelectedImages,
          skus: renderSkus
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  handleStylesSelectorClick(styleId) {
    const imagesAllStyles = helpers.getAllImagesForAllStyles(styleId, this.state.styles.results);

    const skusPerStyle = helpers.getAllSkusPerStyle(styleId, this.state.styles.results);

    const pricesNamePerStyle = helpers.getPricesNamePerStyle(styleId, this.state.styles.results);

    this.setState({
      selectedStyleId: styleId,
      selectedImages: imagesAllStyles,
      skus: skusPerStyle,
      name: pricesNamePerStyle.name,
      originalPrice: pricesNamePerStyle.originalPrice,
      salePrice: pricesNamePerStyle.salePrice
    })
  }

  render() {
    return (
      <div>
        <Container>
          <ImageGallery>
            <ImageSlider
              selectedImages={this.state.selectedImages}
            />
          </ImageGallery>
          <ProductInformation>
            <StarRating averageRating={this.state.rating}/>
            <ProductCategory
              currentCategory={this.state.category}
            />
            <Price
              originalPrice={this.state.originalPrice}
              salePrice={this.state.salePrice}
            />
            <div><strong>STYLE ></strong> {this.state.name}</div>
            <StyleSelectorGrid>
              <Styles
                images={this.state.images}
                handleStylesSelectorClick={this.handleStylesSelectorClick}
                selectedStyleId={this.state.selectedStyleId}
              />
            </StyleSelectorGrid>
            <Size
              skusPerStyle={this.state.skus}
            />
          </ProductInformation>
        </Container>
          <AdditionalProductDetails>
            <h3>{this.state.slogan}</h3>
            {this.state.description}
          </AdditionalProductDetails>
      </div>
    );
  }
}

export default ProductOverview;
