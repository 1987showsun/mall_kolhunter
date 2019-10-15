import React from 'react';

// Modules
import AvatarCropper from '../../../module/avatarCropper';

export default class BGImg extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cover: ""
        }
    }

    static getDerivedStateFromProps( props,state ){
        if( state.cover=="" ) return{ cover: props.cover };
        return null;
    }

    render(){

        const { cover } = this.state;

        return(
            <React.Fragment>
                <div className="store-cover-background-img" style={{'backgroundImage':`url(${cover})`}} />
                <AvatarCropper
                    id= "bgImg"
                    proportion= {[16,9]}
                    onChangeData= {this.callAPIFunction.bind(this)}
                />
            </React.Fragment>
        );
    }

    callAPIFunction = ( src ) => {
        this.setState({
            cover: src
        },()=>{
            this.props.updateInfo( 'cover', src );
        })
    }
}