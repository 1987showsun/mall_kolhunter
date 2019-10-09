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
            loading: props.loading || false,
            status: props.status,
            update: false,
            id: props.id,
            deliveries: props.deliveries,
            data : [],
            tableHeadKey : [
                {
                    key: 'name',
                    type: 'text',
                    title: '貨運名稱',
                    option: []
                },
                {
                    key: 'deliveryCost',
                    type: 'number',
                    title: '費用',
                    className: 'number'
                }
            ]
        }
    }

    static getDerivedStateFromProps(props, state) {

        let deliveries = [];
        let data = state.data;
        if( props.deliveries!=state.deliveries ){
            deliveries= [ ...props.deliveries ];
        }

        if( props.data!=undefined && data.length==0 ){
            data = [ ...props.data ];
        }

        return{
            deliveries,
            data,
            id: props.id,
            loading: props.loading || false,
            status: props.status,
        }
    }

    render(){

        const { 
            loading,
            id,
            tableHeadKey,
            data,
            deliveries,
            update
        } = this.state;
        const reorganizationBodyData = data.map( (item,i) => {
            const findThing = deliveries.findIndex( (findItem) => {
                return findItem['id']==item['deliveryID'];
            });
            if( findThing!=-1 ){
                return{
                    name: deliveries[findThing]['name'],
                    deliveryCost: item['deliveryCost']
                }
            }
        }).filter( filterItem => filterItem!=undefined );

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
                                    tableBodyData= {reorganizationBodyData}
                                />
                                <Loading loading={loading} />
                            </div>
                        </section>
                    ):(
                        <FormFreight 
                            id={id}
                            data={data}
                            deliveries={deliveries}
                            returnCancel={this.returnCancel.bind(this)}
                            returnResult={this.returnResult.bind(this)}
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
        this.setState({
            data,
            update: false,
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );