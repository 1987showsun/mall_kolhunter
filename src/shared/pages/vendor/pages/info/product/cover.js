import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import BlockList from '../../../../../module/blockList';
import FormCover from './form/cover';

export default class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update: false,
            id: props.id,
            status: props.status,
            data: props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            id: props.id,
            status: props.status,
        }
    }

    render(){

        const { id, data, update, status } = this.state;

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