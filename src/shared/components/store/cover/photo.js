import React from 'react';

// Modules
import AvatarCropper from '../../../module/avatarCropper';

export default class Photo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            img: "https://static.kolhunter.com/kol/cyberImg-1429.jpg"
        }
    }

    render(){

        const { img } = this.state;

        return(
            <React.Fragment>
                <div className="figure-img">
                    <AvatarCropper
                        id= "headImg"
                        onChangeData= {this.onChangeData.bind(this)}
                    />
                    <img src={img} alt="" title="" />
                </div>
            </React.Fragment>
        );
    }

    onChangeData = ( src ) => {
        this.setState({
            img: src
        },()=>{
            
        })
    }
}