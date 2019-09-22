import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default class Items extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemNum: props.data['itemNum'],
            price: props.data['price'],
            formObject: {
                programToken: props.data['token'],
                programNum: 1
            }
        }
    }

    render(){
        const { data } = this.props;
        const { itemNum, price, formObject } = this.state;
        return(
            <section className="planform-card">
                <form onSubmit={this.handleSubmit.bind(this, data['token'])}>
                    <ul className="table-row-list">
                        <li>
                            <label>方案名稱</label>
                            <div>{data['title']}</div>
                        </li>
                        <li>
                            <label>銷售價格</label>
                            <div>
                                <CurrencyFormat value={data['price']} displayType={'text'} thousandSeparator={true} prefix={'$'} /> / 組
                            </div>
                        </li>
                        <li>
                            <label>說明</label>
                            <div>
                                <p>{data['desc']}</p>
                            </div>
                        </li>
                        <li>
                            <label>購買組數</label>
                            <div className="input-box">
                                <CurrencyFormat value={formObject['programNum']} thousandSeparator={true} onValueChange={(values) => this.handleChange(values)}/>
                            </div>
                        </li>
                        <li>
                            <label>可上架總數</label>
                            <div>
                                <CurrencyFormat value={itemNum*formObject['programNum']} displayType={'text'} thousandSeparator={true} />
                            </div>
                        </li>
                        <li>
                            <label>總金額</label>
                            <div>
                                <CurrencyFormat value={price*formObject['programNum']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </div>
                        </li>
                    </ul>
                    <button type="submit">購買</button>
                </form>
            </section>
        );
    }

    handleChange = ( values ) => {
        const { formObject } = this.state;
        const { value } = values;
        this.setState({
            formObject: {
                ...formObject,
                programNum: Number(value)<=0? 1:value
            }
        })
    }

    handleSubmit = (token,e) => {
        e.preventDefault();
        if( this.props.returnBuyPlanform != undefined ){
            const { formObject } = this.state;
            this.props.returnBuyPlanform( formObject );
        }
    }
}

