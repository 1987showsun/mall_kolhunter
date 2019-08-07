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
            loading,
            head, 
            body, 
            isSelectedAll, 
            selectedBefore 
        } = this.state;

        return(
            <div className="table-wrap">
                <Loading loading={this.props.loading || false}/>
                <ul className="table-ul">
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

    // 全選
    returnSelectedAll = (status) => {
        this.setState({
            isSelectedAll: status,
            selectedBefore: status? [...this.state.body] : []
        },()=>{
            this.returnResult();
        })
    }

    // 單選
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

        // 判斷單選有無全部選取
        let isSelectedAll = body.length==selectedBefore.length? true : false;

        this.setState({
            isSelectedAll,
            selectedBefore
        },()=>{
            this.returnResult();
        })
    }

    // 回傳結果
    returnResult = () => {
        if( this.props.returnCheckbox!=undefined ){
            const { selectedBefore } = this.state;
            this.props.returnCheckbox( selectedBefore );
        }
    }
}