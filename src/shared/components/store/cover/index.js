import React from 'react';

// Components
import Photo from './photo';
import Name from './name';
import Digital from './digital';
import Action from './action';

// Modules
import AvatarCropper from '../../../module/avatarCropper';

// Stylesheets
import './public/stylesheets/style.scss';

 export default class Index extends React.Component{

    constructor(props){

        const actionSwitchDisplay = () => {
            if( Boolean(props.actionSwitchDisplay) || typeof props.actionSwitchDisplay=='boolean' ){
                return props.actionSwitchDisplay;
            }else{
                return true;
            }
        }

        super(props);
        this.state = {
            actionSwitchDisplay: actionSwitchDisplay(),
            className: props.className || "",
            bgImgSrc: ""
        }
    }

     render(){

        const { data } = this.props;
        const { actionSwitchDisplay, className, bgImgSrc } = this.state;
        
        return(
            <div className={`row store-cover-wrap ${className}`}>
                <div className="store-cover-background-img" style={{'backgroundImage':`url(${bgImgSrc})`}} />
                <section className="container store-cover">
                    <AvatarCropper
                        id= "bgImg"
                        onChangeData= {this.callAPIFunction.bind(this)}
                    />
                    <figure>
                        <Photo />
                        <figcaption>
                            <Name 
                                name= { data['name']!=undefined? data['name'] : "" }
                                editFormDisplay= {this.props.editFormDisplay}
                            />
                            <Digital />
                            {
                                actionSwitchDisplay &&
                                    <Action />
                            }
                        </figcaption>
                    </figure>
                </section>
            </div>
        );
    }

    callAPIFunction = ( src ) => {
        this.setState({
            bgImgSrc: src
        })
    }
}