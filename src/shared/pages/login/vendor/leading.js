import React from 'react';
import { Link } from 'react-router-dom';

// Lang
import lang from '../../../public/lang/lang.json';

export default class Leading extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="leading-wrap">
                    <div className="leading-wrap-head">
                        <h3>只需<i>3</i>步驟，加入供應商好簡單</h3>
                    </div>
                    <ul className="leading-step-ul">
                        <li>
                            <figure>
                                <img src="" title="" alt=""/>
                                <figcaption>STEP 1</figcaption>
                            </figure>
                        </li>
                        <li>
                            <figure>
                                <img src="" title="" alt=""/>
                                <figcaption>STEP 2</figcaption>
                            </figure>
                        </li>
                        <li>
                            <figure>
                                <img src="" title="" alt=""/>
                                <figcaption>STEP 3</figcaption>
                            </figure>
                        </li>
                    </ul>
                    <div className="leading-action">
                        <button className="cancel" type="button" onClick={this.back.bind(this)}>{lang['zh-TW']['back']}</button>
                        <Link to="/vendor/signup" className="next">{lang['zh-TW']['set off']}</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    back = () => {
        history.back();
    }
} 