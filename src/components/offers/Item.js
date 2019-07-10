import React from 'react';

const Item = ({ toggle, offer, imageName }) => {
    return(
        <div onClick={()=>toggle(offer)} className="promo__inner slide__inner" key={offer.pKey}>
            <div className="promo__img">
                <img src={`https://s3.wasabisys.com/hugo-images/2019/05/${imageName}`} alt={offer.Alt_Text} className="img-fluid d-block" />
            </div>

            <div className="promo__text--wrap">
                <h5 className="promo__title">
                    <span className="promo__overline">{offer.Overline1}</span>
                    <span className="promo__mainline">{offer.Mainline1}</span>
                </h5>
                <div className="promo__price--wrap">
                <span className="promo__price">{offer.Price}</span>
                </div>      
            </div>
            
            <button type="button" className="btn btn-primary btn-plus fg-white">
                <i className="fas fa-plus"></i>
            </button>
        </div>
    )
}

export default Item;