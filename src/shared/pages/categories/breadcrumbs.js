import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Breadcrumbs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: props.categories,
            filterSort : 0
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            categories: props.categories
        }
    }

    render(){

        const { categories, filterSort } = this.state;
        const { location, match } = this.props;
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
                    <select name="filterSort" value={filterSort} onChange={this.handleChangeSort.bind(this)}>
                        <option value="">價格由高到低</option>
                        <option value="">價格由低到高</option>
                    </select>
                </div>
            </div>
        );
    }

    handleChangeSort = () => {

    }
}

const mapStateToProps = state => {
    return{
        categories: state.common.categoriesList
    }
}

export default connect( mapStateToProps )( Breadcrumbs );