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

// Actions
import { createProduct, getCategories } from '../../../../../actions/vendor';


// Lang
import lang from '../../../../../lang/lang.json';

const categoriesItem = [
    {
        "id": "35096221867e8d90eaa1",
        "title": "喇叭",
        "children": []
    },
    {
        "id": "5c6c97b086b56e2214da",
        "title": "美妝保健",
        "children": [
            {
                "id": "3eb6a97e0862c384771d",
                "title": "專櫃彩妝"
            },
            {
                "id": "696693091caba66d7638",
                "title": "專櫃清潔保養"
            }
        ]
    },
    {
        "id": "366caff843e078734dd7",
        "title": "家電影音",
        "children": [
            {
                "id": "61f489640acc966f1a77",
                "title": "生活家電"
            },
            {
                "id": "b0ee832e400705ea0315",
                "title": "電視機"
            }
        ]
    },
    {
        "id": "b65e70aa1826f6ea901c",
        "title": "其他",
        "children": []
    }
]

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maxStep: 5,
            step: 1,
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
            }
        }
    }

    render(){
        const { formObject, maxStep, step } = this.state;
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
                            <Cover data={formObject['2']} onHandleChange={this.handleChange.bind(this)}/>
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
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( getCategories() ).then(res=>{
            console.log(res);
        });
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
        const { formObject, step, maxStep } = this.state;
        const { match } = this.props;
        const { type } = match['params'];
        console.log( type, formObject[step], step );
        //this.props.dispatch( createProduct( type, formObject[step], step ) );
        this.setState({
            step: step==maxStep? maxStep : step+1,
        })
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect(mapStateToProps)(Index);