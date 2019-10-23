import React from 'react';

// Modules
import AvatarCropper from '../../../module/avatarCropper';

export default class Photo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            src: ""
        }
    }

    static getDerivedStateFromProps( props,state ){
        if( state.src=="" ){
            return {
                src: props.photo
            }
        }
        return null;
    }

    render(){

        const { src } = this.state;

        return(
            <React.Fragment>
                <div className="figure-img">
                    <AvatarCropper
                        id= "headImg"
                        className= "store-cover-lable"
                        onChangeData= {this.onChangeData.bind(this)}
                    />
                    <img src={src} alt="" title="" />
                </div>
            </React.Fragment>
        );
    }

    onChangeData = ( src ) => {
        this.setState({
            src: src
        },()=>{
            this.props.updateInfo( 'photo', src );
        })
    }
}