import React from 'react';

//Components
import Head from './head';
import Item from './item';
import Loading from '../../module/loading';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        
        super(props);
        this.state = {
            isSelectedAll: props.isSelectedAll || false,
            selectedBefore: [],
            className: props.className || "",
            head: props.tableHeadData || [],
            body: props.tableBodyData || []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if( props.tableBodyData!=state.body ){
            let selectedBefore = [];
            if( state.isSelectedAll ){
                selectedBefore = [...props.tableBodyData];
            }else{
                selectedBefore = [];
            }

            return{
                body: props.tableBodyData,
                selectedBefore
            }
        }
        return null;
    }

    render(){

        const { 
            className,
            head, 
            body, 
            isSelectedAll, 
            selectedBefore 
        } = this.state;

        return(
            <div className="table-wrap">
                <Loading loading={this.props.loading || false}/>
                <ul className={`table-ul ${className}`}>
                    <Head 
                        data={head}
                        body={body}
                        selectedBefore={selectedBefore}
                        isSelectedAll={isSelectedAll}
                        returnSelectedAll={this.returnSelectedAll.bind(this)}
                    />
                    {
                        body.length!=0 &&
                            <Item 
                                head= {head}
                                data= {body}
                                selectedBefore={selectedBefore}
                                isSelectedAll={isSelectedAll}
                                singleSelection= {this.singleSelection.bind(this)}
                                tableInputAction= {this.props.tableInputAction} 
                                tableSelectAction= {this.props.tableSelectAction}
                                tableButtonAction= {this.props.tableButtonAction}
                            />
                    }
                </ul>
                {
                    body.length==0 &&
                        <div className="tableNoData">??????????????????</div>
                }
            </div>
        );
    }

    // ??????
    returnSelectedAll = (status) => {
        this.setState({
            isSelectedAll: status,
            selectedBefore: status? [...this.state.body] : []
        },()=>{
            this.returnResult();
        })
    }

    // ??????
    singleSelection = ( val,selectedItem ) => {
        let { body } = this.state;
        let selectedBefore = [...this.state.selectedBefore];
        let selectIndex = -1;
        const checkSame = selectedBefore.some( (someItem,i) => {
            if( someItem['id']==selectedItem['id'] ){
                selectIndex = i;
                return true;
            }
        })
        if( !checkSame ){
            selectedBefore = [ ...selectedBefore, selectedItem ];
        }else{
            selectedBefore.splice( selectIndex, 1 );
        }

        // ??????????????????????????????
        let isSelectedAll = body.length==selectedBefore.length? true : false;

        this.setState({
            isSelectedAll,
            selectedBefore
        },()=>{
            this.returnResult();
        })
    }

    // ????????????
    returnResult = () => {
        if( this.props.returnCheckbox!=undefined ){
            const { selectedBefore } = this.state;
            this.props.returnCheckbox( selectedBefore );
        }
    }
}