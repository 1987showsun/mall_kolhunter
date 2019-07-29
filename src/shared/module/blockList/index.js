import React from 'react';
import $ from 'jquery';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.listWrap = React.createRef();
        this.state = {
            setRWDStyle: 1,
        }
    }

    static getDerivedStateFromProps(){
        return null;
    }

    render(){

        const { setRWDStyle } = this.state;
        const { className } = this.props;

        return(
            <div ref={this.listWrap} className="product-list-wrap">
                <ul className={`list-ul ${className||""} RWD-${setRWDStyle}`}>
                    { this.props.children }
                </ul>
            </div>
        );
    }

    componentDidMount() {
        const theBlockToResponseTo = this.listWrap['current'];
        this.setState({
            setRWDStyle : RWD(theBlockToResponseTo)
        });
        $(window).resize(()=>{ 
            this.setState({
                setRWDStyle : RWD(theBlockToResponseTo)
            });
        });
    }
}

const RWD = ( theBlockToResponseTo ) => {
    let returnStyle = 0;
    const parent_w = $(theBlockToResponseTo).parent().width();
    if( parent_w>=1000  ){
        returnStyle = 1;
    }else if( parent_w<1000 && parent_w>=780 ){
        returnStyle = 2;
    }else if( parent_w<780 && parent_w>=480 ){
        returnStyle = 3;
    }else{
        returnStyle = 4;
    }
    return returnStyle;
}