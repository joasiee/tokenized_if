import React from 'react';
import DEMO from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";
import logo from '../.../../../../../../assets/images/logo.png'

const navLogo = (props) => {
    // let toggleClass = ['mobile-menu'];
    // if (props.collapseMenu) {
    //     toggleClass = [...toggleClass, 'on'];
    // }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                <a href={DEMO.BLANK_LINK} className="b-brand">
                    <div className="b-bg">
                        <img src={logo} width="50px" height="50px" alt="Logo" />
                    </div>
                    <span className="b-title">SABER</span>
                </a>
                {/* <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a> */}
            </div>
        </Aux>
    );
};

export default navLogo;
