import React from 'react';
import { connect } from 'react-redux';

// Components
import Table from '../../../../../module/table';

// Actions
import { deliveries } from '../../../../../actions/common';

class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            deliveries: [],
            data : props.data,
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
            data: props.data
        }
    }

    render(){

        const { tableHeadKey, data, deliveries } = this.state;
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
        console.log( regroupData );

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>運送方式</h4>
                    </article>
                    <div className="admin-content-container">
                        <Table 
                            tableHeadData={tableHeadKey}
                            tableBodyData={regroupData}
                        />
                    </div>
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( deliveries() ).then( res => {
            this.setState({
                deliveries: res['data']
            })
        });
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );