import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            method: props.method || 'normal',
            current: Number( props.current ) || 1,
            limit: Number( props.limit ) || 30,
            total: Number( props.total ) || 0
        }
    }

    render(){

        const { location } = this.props;
        const { pathname, search } = location;
        const { total, method } = this.state;
        const searchObject = queryString.parse(search);
        const limit = Number(searchObject['limit']) || this.state.limit;
        const current = Number(searchObject['page']) || this.state.current;
        const pageVal = Math.ceil(total/limit);

        if( method=='normal' ){
            const totalPage = () => {
                let returnView = [];
                for( let i=1 ; i<=pageVal ; i++ ){
                    returnView.push(
                        <li key={i} className={`${current==i}`}>
                            <Link to={{
                                pathname: pathname,
                                search: `?${ queryString.stringify({...searchObject,page:i}) }`,
                                hash: "",
                            }}>
                                {i}
                            </Link>
                        </li>
                    );
                }

                return returnView;
            }

            return(
                <div className="pagination-wrap">
                    <ul>
                        {totalPage()}
                    </ul>
                </div>
            );
        }else{
            return(
                <div className="pagination-wrap">
                    {
                        pageVal<=current?(
                            <div className="noData">暫無更多資料</div>
                        ):(
                            <Link className="loadMore" to={{
                                pathname: pathname,
                                search: `?${ queryString.stringify({...searchObject,page: current+1}) }`,
                                hash: "",
                            }}>載入更多</Link>
                        )
                    }
                </div>
            );
        }
    }
}