import React from 'react';
import { connect } from 'react-redux';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Orderer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            data: props.data
        }
    }

    render(){

        const { data } = this.state;

        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>購買人資料</h4>
                </article>
                <ul className="table-row-list">
                    <li>
                        <label>訂購人</label>
                        <div>零八九五七</div>
                    </li>
                    <li>
                        <label>聯絡電話</label>
                        <div>02-27991234</div>
                    </li>
                    <li>
                        <label>聯絡電話</label>
                        <div>0912123123</div>
                    </li>
                    <li>
                        <label>信箱</label>
                        <div>test@test.com</div>
                    </li>
                    <li>
                        <label>聯絡地址</label>
                        <div>11419 台北市內湖區成功路100號100樓之1</div>
                    </li>
                </ul>
            </section>
        );
    }

    handleChange = (e) => {

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Orderer );