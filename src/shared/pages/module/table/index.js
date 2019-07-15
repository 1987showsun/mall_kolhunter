import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

//Components
import Head from './head';
import Item from './item';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selected: props.selected || [],
            head: props.tableHeadData || [],
            body: props.tableData || []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            head : props.tableHeadData || [],
            body : props.tableBodyData || []
        }
    }

    render(){

        const { head,body,selected } = this.state;

        return(
            <div className="table-wrap">
                <ul className="table-ul">
                    <Head 
                        data={head}
                        selectedAll={this.selectedAll.bind(this)}
                    />
                    <Item 
                        onTClick= {this.props.onTClick}
                        head= {head}
                        data= {body}
                        selected= {selected}
                        selectedAction= {this.selectedAction.bind(this)}
                    />
                </ul>
            </div>
        );
    }

    selectedAll = () => {
        let { selected, body } = this.state;
        const selectedLength = selected.length;
        const bodyLength = body.length;

        switch( selectedLength ){
            case 0:
                body.map( item => {
                    selected = [ ...selected,item['id'] ];
                })
                break;
            
            case bodyLength:
                selected = [];
                break;
            
            default:
                body.map( item => {
                    if( !selected.includes( item['id'] ) ){
                        selected = [ ...selected,item['id'] ];
                    }
                });
        }

        this.setState({
            selected
        },()=>{
            console.log('sssss',selected);
        })
    }

    selectedAction = (val) => {
        let { selected } = this.state;
        if( selected.includes(val) ){
            selected = selected.filter( item => item!=val );
        }else{
            selected = [ val,...this.state.selected ];
        }
        this.setState({
            selected
        },()=>{
            console.log(selected);
        })
    }
}