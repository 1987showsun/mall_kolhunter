import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import FormBasic from './form/basic';

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update: false,
            status: props.status,
            data: props.data,
            categories: props.categories
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            status: props.status,
            data: props.data,
            categories: props.categories
        }
    }

    render(){

        const { status, data, update, categories } = this.state;

        const renderCategories = () => {
            let ddd = [];
            data['categories'].map( item => {
                ddd = [ ...ddd , <span className="categories-item">{item['title']}</span> ];
            })
            return ddd;
        }

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                        <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                            <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                            編輯
                        </button>
                    </article>
                        {
                            !update? (
                                <ul className="table-row-list">
                                    <li>
                                        <label>商品名稱：</label>
                                        <div>{data['name']}</div>
                                    </li>
                                    <li>
                                        <label>商品分類：</label>
                                        <div>
                                            { renderCategories() }
                                        </div>
                                    </li>
                                    <li>
                                        <label>原價：</label>
                                        <div>
                                            <CurrencyFormat value={Math.round(data['price'])} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                        </div>
                                    </li>
                                    <li>
                                        <label>特價：</label>
                                        <div>
                                            { 
                                                data['sellPrice']!=undefined? (
                                                    <CurrencyFormat value={Math.round(data['sellPrice'])} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                ):(
                                                    'N/A'
                                                )
                                            }
                                        </div>
                                    </li>
                                </ul>
                            ):(
                                <FormBasic
                                    status={status}
                                    update={update}
                                    data={data}
                                    categories= {categories}
                                    returnCancel={this.returnCancel.bind(this)}
                                    returnStatus={this.returnStatus.bind(this)}
                                />
                            )
                        }
                </section>
            </React.Fragment>
        );
    }

    returnStatus = ( val ) => {
        const {data} = this.state;
        this.setState({
            update: false,
            data: {...data,...val}
        })
    }

    returnCancel = () => {
        this.setState({
            update: false,
        })
    }
}