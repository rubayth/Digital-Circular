import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Landing extends React.Component {

    render(){
        return(
            <section id="hero" className="hero container-fluid">
                <div className="col-12 mt-5 pb-5 text-center">
                    <h3 className="fg-gray-1d">First time here?</h3>
                    <div className="py-5">
                    <Button onClick={ () => this.props.toggleStoreModal(this.props.storeModal)} className="btn btn-secondary" type="button">
                        <span className="">Select a store</span>
                    </Button>
                    </div>
                </div>
            </section>
        )
    }
    
}

function mapStateToProps({ storeModal }) {
    return {  storeModal };
}

export default connect(mapStateToProps, actions)(Landing);