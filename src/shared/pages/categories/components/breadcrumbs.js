/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Breadcrumbs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: props.categories,
            formObject: {
                sort: "desc",
                order: "price"
            }
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            categories: props.categories
        }
    }

    render(){

        const { categories, formObject } = this.state;
        const { match } = this.props;
        const mainId = match['params']['main'];
        const current = categories.filter( filterItem => filterItem['id']==mainId );

        return(
            <div className="path-breadcrumbs">
                <ul>
                    <li>
                        <Link to="/">首頁</Link>
                    </li>
                    {
                        categories.length!=0 &&
                            <li>{current[0]['title']}</li>
                    }
                </ul>
                <div className="input-box select">
                    <select name="sortMethod" value={`${formObject['sort']}-${formObject['order']}`} onChange={this.handleChangeSort.bind(this)}>
                        <option value="desc-price">價格由高到低</option>
                        <option value="asc-price">價格由低到高</option>
                        <option value="desc-time">創建時間由新到舊</option>
                        <option value="asc-time">創建時間由舊到新</option>
                    </select>
                </div>
            </div>
        );
    }

    handleChangeSort = ( e ) => {
        const { match, location, history } = this.props;
        const value = e.target.value;
        this.setState({
            formObject: {
                ...this.state.formObject,
                sort: value.split('-')[0],
                order: value.split('-')[1]
            }
        },()=>{
            const { pathname, search } = location;
            const query = { 
                ...queryString.parse(search), 
                sort: this.state.formObject['sort'],
                order: this.state.formObject['order'],
            }
            history.push({
                pathname,
                search: queryString.stringify(query)
            })
        })
    }
}

const mapStateToProps = state => {
    return{
        categories: state.common.categoriesList
    }
}

export default connect( mapStateToProps )( Breadcrumbs );