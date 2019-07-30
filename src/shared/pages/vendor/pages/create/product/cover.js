import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTimes, faMapPin }from '@fortawesome/free-solid-svg-icons';

// Components
import BlockList from '../../../../../module/blockList';
import AvatarCropper from '../../../../../module/avatarCropper';

export default class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            data: props.data
        }
    }

    render(){

        let { id,data } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品圖片</h4>
                    </article>
                    <BlockList className="admin-product-img-ul">
                        <li>
                            <AvatarCropper 
                                onChangeData= {this.onChangeData.bind(this)}
                            />
                        </li>
                        {
                            data.length!=0 &&
                                data.map( (item,i)=> {
                                    return(
                                        <li key={i} className={ item['sticky']==true? 'active':'' }>
                                            <figure>
                                                <img src={item['image']} alt="" title="" />
                                                <figcaption>
                                                    <ul className="btn-ul">
                                                        <li>
                                                            <button className="positioning" type="button" onClick={this.positioning.bind(this,i)}>
                                                                <i><FontAwesomeIcon icon={faMapPin} /></i>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={this.removeItem.bind(this,i)}>
                                                                <i><FontAwesomeIcon icon={faTimes} /></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    )
                                })
                        }
                    </BlockList>
                </section>
            </React.Fragment>
        );
    }

    onChangeData = (val) => {
        let { data } = this.state;
        data = [ ...data, { image: val, sticky: false} ];
        if( data.length==1 ){
            data[0]['sticky']=true;
        }
        this.setState({
            data
        },()=>{
            this.returnBack();
        });
    }

    removeItem = ( idx ) => {
        let { data } = this.state;
        data.splice(idx,1);
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    positioning = (idx) => {
        let { data } = this.state;
        data.map( (item,i) => {
            if( i==idx ){
                item['sticky'] = true;
            }else{
                item['sticky'] = false;
            }
            return item;
        })
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    returnBack = () => {
        const { data } = this.state;
        this.props.onHandleChange('2',data);
    }
}