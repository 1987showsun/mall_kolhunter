import React from 'react';
import { connect } from 'react-redux';

// Components
import Table from '../../../../../module/table';

class Format extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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
            data: props.data
        }
    }

    render(){

        const { data, tableHeadKey } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品規格</h4>
                    </article>
                    <div className="admin-content-container">
                        <Table 
                            tableHeadData={tableHeadKey}
                            tableBodyData={data}
                        />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )(Format);