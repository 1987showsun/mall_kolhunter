/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import { connect }            from 'react-redux';
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome';
import { faFilter }           from '@fortawesome/free-solid-svg-icons';

// Components
import Subcategory            from './subcategory';
import PriceRange             from './priceRange';
import Delivery               from './delivery';
import Status                 from './status';

class Filter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            clear: false,
            filterSwitch: false,
            subCategory: props.subCategory
        }
    }

    static getDerivedStateFromProps( props, state) {
        return{
            subCategory: props.subCategory
        }
    }

    render(){

        const { clear, subCategory } = this.state;
        const { match, location, history } = this.props;

        return(
            <React.Fragment>
                <input type="checkbox" id="openFilterWrap" />
                <label htmlFor="openFilterWrap" className="openFilterWrapLabel">
                    <FontAwesomeIcon icon={faFilter} />
                    {/* <span class="openFilterWrapLabel-text">幫助</span> */}
                </label>
                <label htmlFor="openFilterWrap" className="openFilterWrapLabelMask" />
                <section className="container-col filter-wrap">
                    <div className="filter-wrap-all">
                        <article className="filter-row">
                            <div className="block-title">
                                <h2>分類清單</h2>
                            </div>
                            <Subcategory
                                subCategory= {subCategory}
                                match= {match}
                                location= {location}
                            />
                        </article>
                        <article className="filter-row">
                            <div className="block-title">
                                <h2>篩選條件</h2>
                            </div>
                            <PriceRange
                                clear={clear}
                                history={history}
                                match= {match}
                                location= {location}
                            />
                            {/* <Delivery
                                clear={clear}
                                history={history}
                                match= {match}
                                location= {location}
                            />
                            <Status 
                                clear={clear}
                                history={history}
                                match= {match}
                                location= {location}
                            /> */}
                        </article>
                        {/* <article className="filter-row sticky" data-content="center" style={{position: "sticky", bottom: "0px"}}>
                            <ul className="action-ul">
                                <li>
                                    <button type="button" className="clear" onClick={this.clearFilter.bind(this)}>重設</button>
                                </li>
                                <li>
                                    <label htmlFor="openFilterWrap" className="openFilterWrapLabelButton">套用</label>
                                </li>
                            </ul>
                        </article> */}
                    </div>
                </section>
            </React.Fragment>
        );
    }

    clearFilter = () => {
        const { history, location } = this.props;
        const { pathname } = location;
        this.setState({
            clear: true
        },()=>{
            history.push({
                pathname
            })
            this.setState({
                clear: false
            })
        })
    }
}

const mapStateToProps = state => {
    return{
        subCategory : state.common.categoriesList
    }
}

export default connect( mapStateToProps )( Filter );