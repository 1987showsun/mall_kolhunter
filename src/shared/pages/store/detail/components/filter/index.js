import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faFilter }from '@fortawesome/free-solid-svg-icons';

// Components
import Subcategory from './subcategory';
import PriceRange from './priceRange';
import Delivery from './delivery';
import Status from './status';

class Filter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filterSwitch: false,
        }
    }

    static getDerivedStateFromProps( props, state) {
        return{
        }
    }

    render(){

        const { subCategory } = this.state;
        const { match, location, history } = this.props;

        return(
            <React.Fragment>
                <input type="checkbox" id="openFilterWrap" />
                <label htmlFor="openFilterWrap" className="openFilterWrapLabel">
                    <FontAwesomeIcon icon={faFilter} />
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
                                history={history}
                                match= {match}
                                location= {location}
                            />
                            <Delivery 
                                history={history}
                                match= {match}
                                location= {location}
                            />
                            <Status 
                                history={history}
                                match= {match}
                                location= {location}
                            />
                        </article>
                        <article className="filter-row sticky" data-content="center" style={{position: "sticky", bottom: "0px"}}>
                            <ul className="action-ul">
                                <li>
                                    <button type="button" className="clear" onClick={this.clearFilter.bind(this)}>重設</button>
                                </li>
                                <li>
                                    <label htmlFor="openFilterWrap" className="openFilterWrapLabelButton">套用</label>
                                </li>
                            </ul>
                        </article>
                    </div>
                </section>
            </React.Fragment>
        );
    }

    clearFilter = () => {
        const { history, location } = this.props;
        const { pathname } = location;
        history.push({
            pathname
        })
    }
}

const mapStateToProps = state => {
    return{
        subCategory : state.common.categoriesList
    }
}

export default connect( mapStateToProps )( Filter );