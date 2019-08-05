import React from 'react';
import { connect } from 'react-redux';

// Components
import AvatarCropper from '../../../../../module/avatarCropper';

class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data || ""
        }
    }

    static getDerivedStateFromProps( props,state ){
        return null;
    }

    render(){
        const { data } = this.state;
        return(
            <div className="user-cover">
                <AvatarCropper 
                    onChangeData= {this.onChangeData.bind(this)}
                />
                <img src={data} alt="" title="" />
            </div>
        );
    }

    onChangeData = ( src ) => {
        this.setState({
            data: src
        },()=>{
            
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );