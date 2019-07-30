import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Compoents
import FormDescription from './form/depiction';

export default class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            update: false,
            data : props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        if( props.data!=state.data ) return{ data: props.data }
        if( props.status!=state.status ) return{ status: props.status }
        return null;
    }

    render(){

         const { data, update, status } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品敘述</h4>
                        {
                            status=="none-auth" &&
                                <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                        }
                    </article>
                    <div className="admin-content-container">
                        {
                            !update? (
                                data.length!=0?(
                                    data.map( (item,i)=> {
                                        if( item['type']=='html' ){
                                            return(
                                                <p key={i} dangerouslySetInnerHTML={{__html: item['description']}}></p>
                                            )
                                        }else{
                                            return(
                                                <p key={i} dangerouslySetInnerHTML={{__html: `<img src="${item['description']}" alt="" title="" />`}}></p>
                                            )
                                        }
                                    })
                                ):(
                                    <div className="list-no-data">請點選新增條件，新增所需條件</div>
                                )
                            ):(
                                <FormDescription 
                                    status={status}
                                    data={data}
                                    returnCancel={this.returnCancel.bind(this)}
                                />
                            )
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }

    returnCancel = () => {
        this.setState({
            update: false,
        })
    }
}