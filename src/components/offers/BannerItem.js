import React from 'react';

class BannerItem extends React.Component{

    renderContent(){
        const {Href, Mainline1, Image1URL, ShowButton} = this.props.banner;
        if(Href)
            return(
                <a className="promo__link d-block" href={Href} target="_blank" rel="noopener noreferrer" tabIndex="0">
                    <div className="banner__wrap">
                        <img className="d-block img-fluid" src={Image1URL} alt={Mainline1}/>
                        {ShowButton
                        && <button className="banner__btn btn fg-white bg-teal" tabIndex="0">{ShowButton}</button> 
                        }
                        
                    </div>
                </a>
            )
        return(
            <div className="banner__wrap">
                <img className="d-block img-fluid" src={Image1URL} alt={Mainline1}/>
            </div>
        );
    }

    render(){
        return(
            <div className="promo__inner slide__inner">
                {this.renderContent()}
            </div>
        )
    }
    
}
    

export default BannerItem;