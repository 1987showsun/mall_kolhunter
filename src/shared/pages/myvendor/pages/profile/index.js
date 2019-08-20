import React from 'react';

// Components
import Profile from './basic';
import Password from './password'

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            components: {
                basic: {
                    mainTitle: "基本資料",
                    component: Profile
                },
                password: {
                    mainTitle: "密碼修改",
                    component: Password
                }
            }
        }
    }

    render(){

        const { match, location } = this.props;
        const { components } = this.state;
        const _type = match['params']['type'] || 'basic';
        const Component = components[_type]['component'];
        const mainTitle = components[_type]['mainTitle'];

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ mainTitle }</h3>
                </section>
                <Component 
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        )
    }
}