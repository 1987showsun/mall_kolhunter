import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

export default class Tab extends React.Component{
    render(){

        const { location } = this.props;
        const pathname = location['pathname'];
        const search = queryString.parse(location['search']);
        const tabType = search['tabType'] || 'hito';

        return(
            <ul className="product-tab">
                <li className={`${tabType=='hito'}`}>
                    <Link 
                        to={{
                            pathname,
                            search: `${ queryString.stringify({ ...search, tabType: 'hito' }) }`
                        }}
                    >
                        熱門商品
                    </Link>
                </li>
                <li className={`${tabType=='new'}`}>
                    <Link 
                        to={{
                            pathname,
                            search: `${ queryString.stringify({ ...search, tabType: 'new' }) }`
                        }}
                    >
                        最新商品
                    </Link>
                </li>
                <li className={`${tabType=='preset'}`}>
                    <Link 
                        to={{
                            pathname,
                            search: `${ queryString.stringify({ ...search, tabType: 'preset' }) }`
                        }}
                    >
                        推薦商品
                    </Link>
                </li>
            </ul>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate( prevProps,prevState ) {
        const prevPropsSearch = prevProps.location['search'];
        const { search } = this.props.location;
        const prevTabType = queryString.parse(prevPropsSearch)['tabType'] || "hito";
        const tabType = queryString.parse(search)['tabType'] || "hito";
        if( prevTabType!=tabType ){
            this.callAPI();
        }
    }

    callAPI = () => {
        const { search } = this.props.location;
        const tabType = queryString.parse(search)['tabType'] || "hito";
        if( this.props.reCallAPI!=undefined ){
            this.props.reCallAPI();
        }
    }
}