import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../redux/history';
import { Page, Grid, GalleryCard, Form } from "tabler-react";
import SiteWrapper from "./SiteWrapper";
import { acQueryItem } from '../redux/Landing/landing.action';

class LandingPage extends Component {
  componentDidMount() {
    this.IsAuthenticatedReroute();
    this.props.acQueryItem(10, 1);
  }

  IsAuthenticatedReroute = () => {
    if (this.props.auth) {
      history.push('/app');
    }
  };

  options = (
    <React.Fragment>
      <Form.Select className="w-auto mr-2">
        <option value="asc">Newest</option>
        <option value="desc">Oldest</option>
      </Form.Select>
    </React.Fragment>
  );

  render() {
    const ImageStyle = {
      minHeight: 600
    }
  
    const landingItemList = this.props.landingItemList;
    console.log(landingItemList);
    return (
      <div>
        <SiteWrapper>
          <Page.Content>
            <Page.Header
              options={this.options}
            />
            <div style={ImageStyle}>
              <Grid.Row className="row-cards">
                {landingItemList.map((item, key) => (
                  <Grid.Col sm={6} lg={4} key={key}>
                    <GalleryCard>
                      {/* <a href={key}>
                        <Form.ImageCheckItem
                          imageURL={item.image}
                        className={ImageStyle}
                        value={key}
                          col={{ width: 12, sm: 12, md: 12, lg: 12 }}
                        />
                      </a> */}
                      <img width={350} height={235} src={item.image} alt={item.productName} />
                      {/* <GalleryCard.Image
                        className={ImageStyle}
                        src={item.image}
                        alt={item.productName}
                      /> */}
                      <GalleryCard.Footer>
                        <GalleryCard.Details
                          fullName={item.productName}
                          dateString={'price: $' + item.price}
                        />
                        <GalleryCard.IconGroup>
                          <GalleryCard.IconItem name="eye" label={1} />
                          <GalleryCard.IconItem
                            name="heart"
                            label={1}
                            right
                          />
                        </GalleryCard.IconGroup>
                      </GalleryCard.Footer>
                    </GalleryCard>
                  </Grid.Col>
                ))}
              </Grid.Row>
            </div>
          </Page.Content>
        </SiteWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  landingItemList: state.landingReducer.landingItemList
});

const mapDispatchToProps = {
  acQueryItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
