import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Cover from './cover';
import Basic from './basic';
import Freight from './freight';
import Format from './format';
import Depiction from './depiction';
import Confirm from '../../../../../module/confirm';

// Actions
import { createProduct } from '../../../../../actions/vendor';
import { categories } from '../../../../../actions/common';


// Lang
import lang from '../../../../../lang/lang.json';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            popupMsg: "",
            maxStep: 5,
            step: 1,
            id: "",
            formObject : {
                1: {
                    name: "",
                    categories: [],
                    price: 0,
                    priceSale: 0
                },
                2: [],
                3: [],
                4: [],
                5: []
            },
            categoriesItem: []
        }
    }

    render(){
        const { open, popupMsg, id, formObject, maxStep, step, categoriesItem } = this.state;
        const returnStep = () => {
            let returnView = [];
            for( let i=1 ;i<=maxStep ; i++){
                returnView.push( 
                    <li key={i} className={`${step==i}`}>
                        <span className={`step-number`}>{i}</span>
                        <div className="prompt">{ lang['zh-TW']['create']['product'][i] }</div>
                    </li>
                );
            }
            return returnView;
        }

        return(
            <React.Fragment>
                <div className="step-wrap">
                    <ul>
                        { returnStep() }
                    </ul>
                </div>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    {
                        step==1 &&
                            <Basic data={formObject['1']} categoriesItem={categoriesItem} onHandleChange={this.handleChange.bind(this)}/>
                    }
                    {
                        step==2 &&
                            <Cover id={id} data={formObject['2']} onHandleChange={this.handleChange.bind(this)}/>
                    }
                    {
                        step==3 &&
                            <Format data={formObject['3']} onHandleChange={this.handleChange.bind(this)}/>
                    }
                    {
                        step==4 &&
                            <Depiction data={formObject['4']} onHandleChange={this.handleChange.bind(this)}/>
                    }
                    {
                        step==5 &&
                            <Freight data={formObject['5']} onHandleChange={this.handleChange.bind(this)}/>
                    }
                    <div className="admin-form-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.handleCancel.bind(this)}>取消</button>
                            </li>
                            {
                                step!=1 &&
                                    <li>
                                        <button type="button" onClick={ this.onPrevious.bind(this) }>{lang['zh-TW']['Previous']}</button>
                                    </li>
                            }
                            <li>
                                <button type="submit">{ step!=5? lang['zh-TW']['Submit Next'] : lang['zh-TW']['Finish'] }</button>
                            </li>
                            <li>
                                <Link to="/myvendor/preview/product">預覽</Link>
                            </li>
                        </ul>
                    </div>
                </form>

                <Confirm
                    open={open}
                    method='alert'
                    container={popupMsg}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( categories() ).then(res=>{
            this.setState({
                categoriesItem: res['data']
            })
        });
    }

    handleConfirm = ( val ) => {
        this.setState({
            open: false,
            success: val
        },()=>{
            this.handleCancel();
        })
    }

    handleCancel = () => {
        this.props.history.push('/myvendor/categories/product/review');
    }

    handleChange = ( key, val ) => {
        let { formObject } = this.state;
        formObject = { ...formObject, [key]:val }
        this.setState({
            formObject
        })
    }

    onPrevious = (e) => {
        const { step } = this.state;
        this.setState({
            step: step-1,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, formObject, step, maxStep } = this.state;
        const { match } = this.props;
        const { type } = match['params'];
        
        switch( step ){

            case 1:
                break;

            case 2:
                formObject[step] = {
                    id : id,
                    images: formObject[step]
                }
                break;

            case 3:
                formObject[step] = {
                    id : id,
                    spec: formObject[step]
                }
                break;

            case 4:
                formObject[step] = {
                    id : id,
                    descriptions: formObject[step]
                }
                break;

            case 5:
                formObject[step] = {
                    id : id,
                    deliveries: formObject[step]
                }
                break;
        }

        this.props.dispatch( createProduct( type, formObject[step], step ) ).then( res => {
            switch( res['status'] ){
                case 200:
                    if( step==1 ){
                        this.setState({
                            step: step==maxStep? maxStep : step+1,
                            id: res['data']['id']
                        })
                    }else{
                        if( step>=5 ){
                            this.setState({
                                open: true,
                                popupMsg: '新增成功'
                            })
                        }else{
                            this.setState({
                                step: step==maxStep? maxStep : step+1
                            })
                        }
                    }
                    break;
            }
        });
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect(mapStateToProps)(Index);