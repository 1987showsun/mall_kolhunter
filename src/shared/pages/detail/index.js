import React from 'react';

// Components
import Cover from './cover';

// Stylesheets
import './public/stylesheets/style.scss';

export default class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="row">
                    <section className="container detail-content" >
                        <div className="container-row">
                            <Cover />
                        </div>
                        <div className="container-row">
                            <div className="detail-cover-wrap detail-container">
                                <img src="https://s.yimg.com/zp/MerchandiseSpec/5F91429D51-Gd-7919955.jpg" alt="" title="" />
                                <img src="https://s.yimg.com/zp/MerchandiseSpec/597A9E9928-Gd-7919955.jpg" alt="" title="" />
                                <img src="https://s.yimg.com/zp/MerchandiseSpec/03BC7657AB-Gd-7919955.jpg" alt="" title="" />
                                <img src="https://s.yimg.com/zp/MerchandiseSpec/FBE484BBC8-Gd-7919955.jpg" alt="" title="" />
                                <img src="https://s.yimg.com/zp/MerchandiseSpec/8011678333-Gd-7919955.jpg" alt="" title="" />
                                <img src="https://s.yimg.com/zp/MerchandiseSpec/E65B98D952-Gd-7919955.jpg" alt="" title="" />
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}