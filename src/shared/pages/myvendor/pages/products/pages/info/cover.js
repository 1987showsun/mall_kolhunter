import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import FormCover from './update/cover';

// Modules
import BlockList from '../../../../../../module/blockList';
import Loading from '../../../../../../module/loading';

export default class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: props.loading || false,
            update: false,
            id: props.id,
            status: props.status,
            data: []
        }
    }

    static getDerivedStateFromProps(props, state) {

        let data = state.data;
        if( props.data!=undefined && data.length==0 ){
            data=[ ...props.data ];
        }

        return{
            loading: props.loading || false,
            id: props.id,
            data: data,
            status: props.status,
        }
    }

    render(){

        const { loading, id, data, update, status } = this.state;

        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>商品圖片</h4>
                    {
                        status=="none-auth" && !update &&
                            <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                編輯
                            </button>
                    }
                </article>
                {
                    data!=undefined &&
                        !update? (
                            <BlockList className="admin-product-img-ul">
                                {
                                    data.map( (item,i) => {
                                        return(
                                            <li key={item['image']} className={ i==0? 'product-main-cover':null }>
                                                <figure>
                                                    {
                                                        i==0 &&
                                                            <span className="admin-product-main">主圖</span>
                                                    }
                                                    <img src={item['image']} alt="" title="" />
                                                </figure>
                                            </li>
                                        )
                                    })
                                }
                            </BlockList>
                        ):(         
                            <FormCover 
                                status={status}
                                id={id}
                                data={data}
                                returnResult={this.returnResult.bind(this)}
                                returnCancel={this.returnCancel.bind(this)}
                            />
                        )
                }
                <Loading loading={loading} />
            </section>
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