import React from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

export default class Product extends React.Component{

    constructor(props){

        const { search } = props.location;
        const status = queryString.parse(search)['status'];
        let statusArray = [];
        if( status!=undefined ){
            statusArray=status.split(',')!=undefined? status.split(','): [];
        }

        super(props);
        this.state = {
            status: statusArray
        }
    }

    static getDerivedStateFromProps( props,state ){
        let status = state.status;
        if( props.clear == true ){
            status = [];
        }
        return{
            status,
        }
    }

    render(){

        const { status } = this.state;

        return(
            <div className="filter-unit" data-direction="column" >
                <div className="filter-unit-row title">
                    <h3>商品狀況</h3>
                </div>
                <div className="filter-unit-row">
                    <ul className="filter-list-ul">
                        <li>
                            <label htmlFor="status_001">
                                <input type="checkbox" id="status_001" name="status" value="001" onChange={this.handleChange.bind(this)} checked={ status.includes('001') }/>
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">現貨</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="status_002">
                                <input type="checkbox" id="status_002" name="status" value="002" onChange={this.handleChange.bind(this)} checked={ status.includes('002') }/>
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">預購商品</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="status_003">
                                <input type="checkbox" id="status_003" name="status" value="003" onChange={this.handleChange.bind(this)} checked={ status.includes('003') }/>
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">免運費</div>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    handleChange = (e) => {

        let { status } = this.state;
        let { search } = this.props.location;
        const value = e.target.value;
        if( !status.includes(value) ){
            status = [ ...status, value ]
        }else{
            status = status.filter( filterItem => filterItem!=value );
        }
        this.setState({
            status
        },()=>{
            let searchObject = {};
            if( status.length!=0 ){
                searchObject = { ...queryString.parse(search),status: status.toString()};
                this.props.history.push({
                    search: `?${queryString.stringify(searchObject)}`
                })
            }else{
                searchObject = { ...queryString.parse(search) };
                delete searchObject['status'];
                this.props.history.push({
                    search: `?${queryString.stringify(searchObject)}`
                })
            }
        })
    }
}