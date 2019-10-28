import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import Table from '../../../../../../module/table';
import FormFreight from './update/freight';

// Modules
import Loading from '../../../../../../module/loading';

class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update       : false,
            loading      : props.loading || false,
            status       : props.status,
            id           : props.id,
            deliveries   : props.deliveries,
            data         : [],
            tableHeadKey : [
                {
                    key        : 'name',
                    type       : 'text',
                    title      : '貨運名稱',
                    option     : []
                },
                {
                    key        : 'deliveryCost',
                    type       : 'number',
                    title      : '費用',
                    className  : 'number'
                }
            ]
        }
    }

    static getDerivedStateFromProps(props, state) {

        let deliveries = [];
        let data       = state.data;
        if( props.deliveries!=state.deliveries ){
            deliveries= [ ...props.deliveries ];
        }
        if( props.data!=undefined && data.length==0 ){
            data = [ ...props.data ];
        }

        return{
            deliveries,
            data,
            id       : props.id,
            loading  : props.loading || false,
            status   : props.status,
        }
    }

    render(){

        const { loading, id, tableHeadKey, data, deliveries, update } = this.state;

        return(
            <React.Fragment>
                {
                    !update? (
                        <section className="admin-content-row">
                            <article className="admin-content-title">
                                <h4>運送方式</h4>
                                <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                            </article>
                            <div className="admin-content-container">     
                                <Table 
                                    tableHeadData= {tableHeadKey}
                                    tableBodyData= {data.map( (item,i) => {
                                        return{
                                            name         : item['deliveryName'],
                                            deliveryCost : item['deliveryCost']
                                        }
                                    })}
                                />
                                <Loading loading={loading} />
                            </div>
                        </section>
                    ):(
                        <FormFreight 
                            id           = {id}
                            data         = {data}
                            deliveries   = {deliveries}
                            returnCancel = {this.returnCancel.bind(this)}
                            returnResult = {this.returnResult.bind(this)}
                        />
                    )
                }
            </React.Fragment>
        );
    }

    returnCancel = () => {
        this.setState({
            update: false,
        })
    }

    returnResult = ( data ) => {
        const { deliveries } = this.state;
        this.setState({
            data: data.map( item => {
                const comparison = deliveries.filter( filterItem => item['deliveryID']==filterItem['id'] );
                return{
                    ...item,
                    deliveryName: comparison.length>0? comparison[0]['name']:"",
                }
            }),
            update: false,
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );