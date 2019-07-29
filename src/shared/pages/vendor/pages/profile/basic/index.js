import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import FormBasic from './form/basic';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update: false,
        }
    }

    render(){

        const { update } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品圖片</h4>
                        {
                            !update &&
                                <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                        }
                    </article>
                    {
                        !update? (
                            <ul className="table-row-list">
                                <li>
                                    <label>公司名稱</label>
                                    <div className="">
                                        數位軸股份有限公司
                                    </div>
                                </li>
                                <li>
                                    <label>統一編號</label>
                                    <div className="">
                                        22222222
                                    </div>
                                </li>
                                <li>
                                    <label>聯絡人</label>
                                    <div className="">
                                        Sam
                                    </div>
                                </li>
                                <li>
                                    <label>聯絡電話</label>
                                    <div className="">
                                        0912-123-123
                                    </div>
                                </li>
                                <li>
                                    <label>聯絡信箱</label>
                                    <div className="">
                                        Sam@dpc.tw
                                    </div>
                                </li>                        
                                <li>
                                    <label>公司地址</label>
                                    <div className="">
                                        台北市園山區長安西路一段6號3樓
                                    </div>
                                </li>
                            </ul>
                        ):(
                            <FormBasic 
                                returnCancel={ this.returnCancel.bind(this) }
                            />
                        )
                    }
                </section>
            </React.Fragment>
        );
    }

    handleChange = (e) => {

    }

    returnCancel = () => {
        this.setState({
            update: false
        })
    }
}