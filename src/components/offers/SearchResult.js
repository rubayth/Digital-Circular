import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import Item from './Item';

class SearchResult extends React.Component{
    constructor(props) {
        super(props);
        this.onBtnClick = this.onBtnClick.bind(this);
    }

    renderOffers() {
        const offer = _.map(this.props.offerData, (offer) => {
            //Just a freaking hack for the images to show...we need to fix.
            if (offer.Image1URL !== null) {
            var imageName = offer.Image1URL.substring(offer.Image1URL.lastIndexOf('/') + 1);
            }
            else {
            return false;
            }
            return (
                <div class="col-6 col-md-3">
                    <div class="promo slide promo--product">
                        <Item toggle={this.props.toggle} imageName={imageName} offer={offer} key={offer.ProductKey}/>
                    </div>
                </div>
            )
        })
        return offer;
    }

    onBtnClick(){
        this.props.searchOffers("");
    }
    render(){
        return(
            <div>
                <header class="page-header text-dark">
                    <div class="row">
                        <div class="col-12 col-md-9">
                            <h1 class="page-title">
                            Search results for: <span class="query-string font-weight-bold">{this.props.searchQuery}</span>
                            </h1>
                        </div>
                        <div class="col-12 col-md-3">
                            <button onClick={this.onBtnClick} class="btn btn-secondary">Back to Weekly Ad</button>
                        </div>
                    </div>
                </header>
                <section id="offer-grid" class="tierX my-5">
                <div class="row">
                    {this.renderOffers()}
                </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps({ currentOffers, searchQuery}) {
    return { 
      offerData: currentOffers,
      searchQuery
    };
  }
export default connect(mapStateToProps, actions)(SearchResult);