import React from 'react';
import { connect } from 'react-redux';

// Modules
import Loading from '../../../../../../../module/loading';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Recipient extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            data: props.data
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            loading: props.loading,
            data: props.data
        }
    }

    render(){

        const { loading, data } = this.state;

        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>收件資料</h4>
                </article>
                <ul className="table-row-list">
                    <li>
                        <label>收件人</label>
                        <div>{data['deliveryName']||""}</div>
                    </li>
                    <li>
                        <label>聯絡電話</label>
                        <div>{data['deliveryPhone']||""}</div>
                    </li>
                    <li>
                        <label>聯絡地址</label>
                        <div>{`${data['deliveryZipCode'] || ""} ${data['deliveryCity'] || ""}${data['deliveryDist'] || ""}${data['deliveryAddress'] || ""}`}</div>
                    </li>
                </ul>
                <Loading loading={loading} />
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

export default connect( mapStateToProps )( Recipient );