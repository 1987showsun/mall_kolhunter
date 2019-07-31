import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import Table from '../../../../../module/table';
import FormFreight from './form/freight';

class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            update: false,
            //deliveries: !props.deliveries? []: props.deliveries,
            deliveries: [],
            data : props.data || [],
            tableHeadKey : [
                {
                    key: 'name',
                    type: 'text',
                    title: '貨運名稱',
                    option: []
                },
                {
                    key: 'cost',
                    type: 'number',
                    title: '費用',
                    className: 'number'
                }
            ]
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            status: props.status,
            //deliveries: !props.deliveries? []: props.deliveries,
            deliveries: [],
            data: props.data || []
        }
    }

    render(){

        const { tableHeadKey, data, deliveries, update } = this.state;
        const deliveriesFilterAfter = deliveries.filter( filterItem => {
            return data.some( someItem => someItem['deliveryID']==filterItem['id'] );
        })
        const regroupData = deliveriesFilterAfter.map( item => {
            const ddd = data.filter( mapItem => {
                if( mapItem['deliveryID']==item['id'] ){
                    return mapItem;
                }
            });
            return item = { ...item, cost: ddd[0]['deliveryCost'] };
        })

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
                                    tableHeadData={tableHeadKey}
                                    tableBodyData={regroupData}
                                />
                            </div>
                        </section>
                ):(
                    <FormFreight 
                        data={data}
                        returnCancel={this.returnCancel.bind(this)}
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
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );