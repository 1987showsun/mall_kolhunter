import React from 'react';

//Components
import Head from './head';
import Item from './item';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isCheckedAll: false,
            selected: props.selected || [],
            selected: props.selected || [],
            head: props.tableHeadData || [],
            body: props.tableData || []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            body : props.tableBodyData || []
        }
    }

    render(){

        const { head, body, selected, isCheckedAll } = this.state;

        return(
            <div className="table-wrap">
                <ul className="table-ul">
                    <Head 
                        data={head}
                        body={body}
                        selected={selected}
                        isCheckedAll={isCheckedAll}
                        selectedAll={this.selectedAll.bind(this)}
                    />
                    <Item 
                        head= {head}
                        data= {body}
                        selected= {selected}
                        singleSelection= {this.singleSelection.bind(this)}
                        tableButtonAction= {this.props.tableButtonAction}
                    />
                </ul>
            </div>
        );
    }

    selectedAll = ( val ) => {
        let { selected, body } = this.state;
        const selectedLength = selected.length;
        const bodyLength = body.length;
        if( val!=true ){
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
        }else{
            body.map( item => {
                if( !selected.includes( item['id'] ) ){
                    selected = [ ...selected,item['id'] ];
                }
            });
        }

        this.setState({
            selected,
            isCheckedAll: body.length==selected.length
        },()=>{
            if(this.props.returnCheckBoxVal!=undefined){
                this.props.returnCheckBoxVal( selected );
            }
        })
    }
    
    singleSelection = (val) => {
        let { selected, body } = this.state;
        if( selected.includes(val) ){
            selected = selected.filter( item => item!=val );
        }else{
            selected = [ val,...this.state.selected ];
        }

        this.setState({
            selected,
            isCheckedAll: body.length==selected.length
        },()=>{
            if(this.props.returnCheckBoxVal!=undefined){
                this.props.returnCheckBoxVal( selected );
            }
        })
    }
}