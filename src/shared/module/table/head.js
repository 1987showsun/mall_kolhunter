import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

// Stylesheets
import './style.scss';

export default class Head extends React.Component{
    render(){

        const { data, isCheckedAll } = this.props;

        return(
            <li>
                {
                    data.map((headItem,i)=>{
                        if( headItem['key']=='checkbox' ){
                            return (
                                <div className="table-head" key={headItem['key']}>
                                    <label htmlFor="allSelect" className="checkbox-label">
                                        <input type="checkbox" id="allSelect" name="checkSelect" className="admin-checkbox" value="all" onChange={this.props.selectedAll.bind(this)} checked={isCheckedAll}/>
                                        <i className="checkbox_icon">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </i>
                                    </label>
                                </div>
                            )
                        }else{
                            return (
                                <div className={`table-head ${headItem['className']||''}`} key={headItem['key']}>{headItem['title']}</div>
                            )
                        }
                    })
                }
            </li>
        );
    }

    componentDidMount() {
        const { selected, body } = this.props;
        const bodyLength = body.length;
        const selectedLength = selected.length;
        if( bodyLength==selectedLength ){
            this.props.selectedAll(true);
        }
    }
}