import React from 'react';
import altImage from '../../images/product-image_241w.png';

const Item = ({ toggle, offer, imageName }) => {
    return(
            <div onClick={()=>toggle(offer)} className="promo__inner slide__inner">
                <div className="promo__img">
                    <img src={imageName} onError={(e)=>{e.target.onerror = null; e.target.src=altImage}} alt={offer.AltText} className="img-fluid d-block" />
                </div>

                <div className="promo__text--wrap">
                    <h5 className="promo__title">
                        <span className="promo__overline">{offer.Overline1Web}</span>
                        <span className="promo__mainline">{offer.Mainline1Web}</span>
                    </h5>
                    <div className="promo__price--wrap">
                    <span className="promo__price">{offer.Price}</span>
                    </div>      
                </div>
                
                <button type="button" className="btn  btn-plus fg-white bg-teal">
                    <i className="fas fa-plus"></i>
                </button>
                {offer.Bug ? <div className="promo__bug bg-teal">{offer.Bug}</div> : <div></div>} 
            </div>
    )
}
    

export default Item;