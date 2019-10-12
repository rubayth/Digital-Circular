import React from 'react';
import UnderStripe from './UnderStripe';

const Header = () => {
    return(
        <header className="global-header">
          <div className="overstripe d-none d-lg-block container-fluid">
            <div className="row m-0 py-0">
              <div className="col-8 offset-4 text-right">
                <div className="user-account-menu d-inline-block">
                  <span className="sign-in">
                    <a href="/#">
                      Sign In
                    </a>
                  </span>
                  |
                  <span className="create-account">
                    <a href="/#">
                      Create Account
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="main-header container-fluid position-relative">
            <div className="containerX">
              <div className="row align-items-end pt-3 px-0">
                <nav
                  id="mobile-nav"
                  className="mobile-nav__main position-absolute p-4"
                >
                  <ul className="mobile-nav-list">
                    <li className="current--item menu__weekly-ad nav-item">
                      <a
                        href="/#"
                        aria-current="page"
                      >
                        <span className="link-text">Weekly Ad</span>
                      </a>
                    </li>
                    <li className="menu__shop nav-item">
                      <a href="/#">
                        <span className="link-text">Shop</span>
                      </a>
                    </li>
                    <li className="menu__recipes nav-item">
                      <a href="/#">
                        <span className="link-text">Recipes</span>
                      </a>
                    </li>
                    <li className="menu__coupons nav-item">
                      <a href="/#">
                        <span className="link-text">Coupons</span>
                      </a>
                    </li>
                    <li className="menu__about nav-item">
                      <a href="/#">
                        <span className="link-text">About</span>
                      </a>
                    </li>
                  </ul>{" "}
                </nav>
                <div className="col-2 d-lg-none pt-3 pt-lg-0 px-lg-0 align-self-start">
                  <a href="/#" id="mobile-nav__toggle" className="d-inline-block">
                    <i className="fa fa-2x fa-bars"></i>
                  </a>
                </div>
                <nav className="nav__main col-8 col-lg-12 px-lg-3">
                  <a
                    href="/#"
                    className="logo__link d-block d-lg-inline-flex"
                  >
                    <img
                      src="https://circular-kroger.purered.net/wp-content/themes/prdc-kroger/assets/images/logo.png"
                      alt="Local Shop "
                      className="align-self-center logo"
                    />
                  </a>
                  <ul className="main-nav-list nav justify-content-end d-none d-lg-flex">
                    <li className="current--item menu__weekly-ad nav-item">
                      <a
                        href="/#"
                        aria-current="page"
                      >
                        <span className="link-text">Weekly Ad</span>
                      </a>
                    </li>
                    <li className="menu__shop nav-item">
                      <a href="/#">
                        <span className="link-text">Shop</span>
                      </a>
                    </li>
                    <li className="menu__recipes nav-item">
                      <a href="/#">
                        <span className="link-text">Recipes</span>
                      </a>
                    </li>
                    <li className="menu__coupons nav-item">
                      <a href="/#">
                        <span className="link-text">Coupons</span>
                      </a>
                    </li>
                    <li className="menu__about nav-item">
                      <a href="/#">
                        <span className="link-text">About</span>
                      </a>
                    </li>
                  </ul>{" "}
                </nav>
                <div className="col-2 d-lg-none align-self-center"></div>
              </div>
              <div className="user-options d-none d-md-block"></div>
            </div>{" "}
          </div>
          <UnderStripe />
        </header>
        
    )
}

export default Header;