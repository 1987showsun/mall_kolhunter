/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Subcategory extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            list: props.list
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            list: props.list
        }
    }

    render(){

        const { list } = this.state;
        const { location, match } = this.props;
        const mainId = match['params']['main'] || "";
        const subId = match['params']['sub'] || "";
        const navData = list.filter( filterItem => filterItem['id']==mainId );

        return(            
            <ul className="filter-nav-ul">
                {
                    navData.length!=0 &&
                        <li className={`${ subId=="" }`}>
                            <Link to={`/categories/${navData[0]['id']}`}>
                                所有商品
                            </Link>
                        </li>
                }
                {
                    navData.length!=0 &&
                        navData[0]['children'].map( item => {
                            return(
                                <li key={item['id']} className={`${ item['id']==subId }`}>
                                    <Link 
                                        to={{
                                            pathname: `/categories/${navData[0]['id']}/${item['id']}`
                                        }}
                                    >
                                        {item['title']}
                                    </Link>
                                </li>
                            )
                        })
                }
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return{
        list: state.common.categoriesList
    }
}

export default connect( mapStateToProps )( Subcategory );