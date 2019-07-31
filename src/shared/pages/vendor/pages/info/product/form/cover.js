import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTimes, faMapPin }from '@fortawesome/free-solid-svg-icons';

// Components
import BlockList from '../../../../../../module/blockList';
import AvatarCropper from '../../../../../../module/avatarCropper';

// Actions
import { createProduct } from '../../../../../../actions/vendor';

class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0,
            id: props.id,
            status: props.status,
            data: props.data
        }
    }

    render(){

        let { data,status,selectedIndex } = this.state;

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
                                        <li key={i} className={ selectedIndex==i? 'active':'' }>
                                            <figure>
                                                <img src={item['image']} alt="" title="" />
                                                {
                                                    status=="none-auth" &&
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
        let nowDate = new Date();
        data = [ 
            ...data, 
            { 
                id: '',
                image: val, 
                modified: nowDate.valueOf()
            }
        ];
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
        this.setState({
            selectedIndex: idx
        })
    }

    handleSubnit = (e) => {
        e.preventDefault();
        const { id, data, selectedIndex } = this.state;
        const indexData = data.filter( (filterItem,i) => i==selectedIndex);
        const otherData = data.filter( (filterItem,i) => i!=selectedIndex);
        const reorganizationData = {
            id: id,
            images: [...indexData, ...otherData]
        };

        this.props.dispatch( createProduct('product', reorganizationData , 2 , 'post' ) ).then( res => {
            switch( res['status'] ){
                case 200:
                    const result = res['data']['img'];
                    this.props.returnResult(result);
                    break;
            }
        });
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );