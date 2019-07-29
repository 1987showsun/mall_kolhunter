import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import Table from '../../../../../module/table';
import FormFormat from './form/format';

class Format extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            update: false,
            data: props.data,
            tableHeadKey : [
                {
                    key: 'specDesc',
                    type: 'text',
                    title: '型號 / 尺寸'
                },
                {
                    key: 'specTitle',
                    type: 'text',
                    title: '商品貨號'
                },
                {
                    key: 'storageNum',
                    type: 'number',
                    title: '庫存數量',
                    className: 'number'
                }
            ]
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            status: props.status,
            data: props.data
        }
    }

    render(){

        const { data, tableHeadKey, update } = this.state;

        return(
            <React.Fragment>
                {
                    !update? (
                        <section className="admin-content-row">
                            <article className="admin-content-title">
                                <h4>商品規格</h4>
                                <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                            </article>
                            <div className="admin-content-container">
                                <Table 
                                    tableHeadData={tableHeadKey}
                                    tableBodyData={data}
                                />
                            </div>
                        </section>
                    ):(
                        <FormFormat 
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

export default connect( mapStateToProps )(Format);