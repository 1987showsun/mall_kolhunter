import React from 'react';

//Components
import Head from './head';
import Item from './item';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){

        const isSelectedAll = props.isSelectedAll || false;
        const selected = isSelectedAll? props.tableBodyData : [];
        
        super(props);
        this.state = {
            isSelectedAll,
            selected,
            head: props.tableHeadData || [],
            body: props.tableBodyData || []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            body : props.tableBodyData || [],
            selected: state.selected || []
        }
    }

    render(){

        const { head, body, selected, isSelectedAll } = this.state;

        return(
            <div className="table-wrap">
                <ul className="table-ul">
                    <Head 
                        data={head}
                        body={body}
                        selected={selected}
                        isSelectedAll={isSelectedAll}
                        returnSelectedAll={this.returnSelectedAll.bind(this)}
                    />
                    {
                        body.length!=0 &&
                            <Item 
                                head= {head}
                                data= {body}
                                selected= {selected}
                                isSelectedAll={isSelectedAll}
                                singleSelection= {this.singleSelection.bind(this)}
                                tableButtonAction= {this.props.tableButtonAction}
                            />
                    }
                </ul>
                {
                    body.length==0 &&
                        <div className="tableNoData">暫無任何資料</div>
                }
            </div>
        );
    }

    componentDidMount() {
    }

    returnSelectedAll = (status) => {
        let { body, selected } = this.state;
        if( !status ){
            selected = [];
        }else{
            selected = [ ...body ];
        }
        this.setState({
            isSelectedAll: status,
            selected
        })
    }

    singleSelection = ( val,selectedItem ) => {
        let { body, selected } = this.state;
        let totalDataLength = body.length;
        let existenceIdx = -1;
        const checkForExistence = selected.some( (someItem,i) => {
            if( someItem['id']==selectedItem['id'] ){
                existenceIdx = i;
                return true;
            }
        })

        if( !checkForExistence ){
            selected = [ ...selected, selectedItem ];
        }else{
            selected.splice( existenceIdx,1 );
        }

        this.setState({
            selected,
            isSelectedAll: selected.length==totalDataLength
        })
    }
}