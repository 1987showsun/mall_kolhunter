import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTimes, faMapPin }from '@fortawesome/free-solid-svg-icons';

// Components
import BlockList from '../../../../../../module/blockList';
import AvatarCropper from '../../../../../../module/avatarCropper';

export default class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            data: props.data
        }
    }

    render(){
        let { data,status } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubnit.bind(this)}>
                    <BlockList className="admin-product-img-ul">
                        {
                            status=="none-auth" &&
                                <li>
                                    <AvatarCropper 
                                        onChangeData= {this.onChangeData.bind(this)}
                                    />
                                </li>
                        }
                        {
                            data.length!=0 &&
                                data.map( (item,i)=> {
                                    return(
                                        <li key={i} className={ item['sticky']==true? 'active':'' }>
                                            <figure>
                                                <img src={item['imagePath']} alt="" title="" />
                                                {
                                                    status=="none-auth" &&
                                                        <figcaption>
                                                            <ul className="btn-ul">
                                                                {/* <li>
                                                                    <button className="positioning" type="button" onClick={this.positioning.bind(this,i)}>
                                                                        <i><FontAwesomeIcon icon={faMapPin} /></i>
                                                                    </button>
                                                                </li> */}
                                                                <li>
                                                                    <button type="button" onClick={this.removeItem.bind(this,i)}>
                                                                        <i><FontAwesomeIcon icon={faTimes} /></i>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </figcaption>
                                                }
                                            </figure>
                                        </li>
                                    )
                                })
                        }
                    </BlockList>
                    <ul className="action-ul">
                        <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                        <li><button className="basic">更新</button></li>
                    </ul>
                </form>
            </React.Fragment>
        );
    }

    onChangeData = (val) => {
        let { data } = this.state;
        data = [ ...data, { imagePath: val, sticky: false} ];
        if( data.length==1 ){
            data[0]['sticky']=true;
        }
        this.setState({
            data
        });
    }

    removeItem = ( idx ) => {
        let { data } = this.state;
        data.splice(idx,1);
        this.setState({
            data
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
        })
    }

    handleSubnit = () => {
        const { data } = this.state;
    }
}