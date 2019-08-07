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
        const offer = _.map(this.props.allOffers, (offer) => {
            return (
                <div className="col-6 col-md-3" key={offer.ProductKey}>
                    <div className="promo slide promo--product">
                        <Item toggle={this.props.toggle} imageName={offer.Image1URL} offer={offer} key={offer.ProductKey}/>
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
                {this.props.allOffers.length
                ? <div>
                    <header className="page-header text-dark">
                        <div className="row">
                            <div className="col-12 col-md-9">
                                <h1 className="page-title">
                                Search results for: <span className="query-string font-weight-bold">{this.props.searchQuery}</span>
                                </h1>
                            </div>
                            <div className="col-12 col-md-3">
                                <button onClick={this.onBtnClick} className="btn btn-secondary">Back to Weekly Ad</button>
                            </div>
                        </div>
                    </header>
                    <section id="offer-grid" className="tierX my-5">
                        <div className="row">
                            {this.renderOffers()}
                        </div>
                    </section>
                </div>
                : <section className="no-results not-found" style={{minHeight: "600px"}}>
                    <div className="row">
                        <div className="col-12">
                            <header className="page-header text-dark px-3">
                                <h1 className="page-title">Nothing Found for <span className="search-query font-weight-bold">{this.props.searchQuery}</span>.</h1>
                            </header>
                            <div className="page-content text-dark p-5">
                                <p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
        )
    }
}

function mapStateToProps({ allOffers, searchQuery}) {
    return { 
      allOffers,
      searchQuery
    };
  }
export default connect(mapStateToProps, actions)(SearchResult);