import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class UnderStripe extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  render() {
    return (
      <div className="understripe container-fluid mt-2">
        <div className="row m-0">
          <div className="col-6 col-md-12">
            <h2 className="understripe__headline text-md-center py-3 my-0">
              Weekly Ad
            </h2>
          </div>
          <div className="col-6 d-md-none text-right">
            <div className="py-3">
              <div className="user-store" data-id="1638">
                <button
                  className="user-store__btn"
                  type="button"
                  onClick={() =>
                    this.props.toggleStoreModal(this.props.storeModal)
                  }
                >
                  <i className="map-marker fas fa-map-marker-alt"></i>
                  <span className="user-store__name">
                    {" "}
                    {this.props.storeInfo.store_number
                      ? this.props.storeInfo.name +
                        "#" +
                        this.props.storeInfo.store_number
                      : "No Store Selected"}
                  </span>
                  <span className="user-store__city d-none d-md-inline">
                    Stone Mountain{" "}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storeModal, storeInfo }) {
  return {
    storeModal,
    storeInfo
  };
}

export default withCookies(
  connect(
    mapStateToProps,
    actions
  )(UnderStripe)
);
