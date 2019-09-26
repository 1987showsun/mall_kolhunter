import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Compoents
import FormDescription from './update/depiction';

// Modules
import Loading from '../../../../../../module/loading';

export default class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: props.loading,
            status: props.status,
            update: false,
            id: props.id,
            data : props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        if( props.status!=state.status ) return{ status: props.status }
        return {
            loading: props.loading
        };
    }

    render(){

         const { loading, id, data, update, status } = this.state;

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
                                                <p key={`depiction_${i}`} dangerouslySetInnerHTML={{__html: item['content']}} />
                                            )
                                        }else{
                                            return(
                                                <div key={`depiction_${i}`} dangerouslySetInnerHTML={{__html: `<img src="${item['content']}" alt="" title="" />`}} className="depiction-img" />
                                            )
                                        }
                                    })
                                ):(
                                    <div className="list-no-data">請點選新增條件，新增所需條件</div>
                                )
                            ):(
                                <FormDescription 
                                    status={status}
                                    id={id}
                                    data={data}
                                    returnCancel={this.returnCancel.bind(this)}
                                    returnResult={this.returnResult.bind(this)}
                                />
                            )
                        }
                    </div>
                </section>
                <Loading loading={loading} />
            </React.Fragment>
        );
    }

    returnCancel = () => {
        this.setState({
            update: false,
        })
    }

    returnResult = ( data ) => {
        this.setState({
            data,
            update: false,
        })
    }
}