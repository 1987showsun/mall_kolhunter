/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React               from 'react';
import { connect }         from 'react-redux';

// Components
import Thead               from './table/thead';
import Tbody               from './table/tbody';
import PopupWarp           from './popup';

// Modules
import Table               from '../../../../../../../module/table-new';
import Loading             from '../../../../../../../module/loading';
import Popup               from '../../../../../../../module/popup';

class Products extends React.Component{

    constructor(props){
        super(props);
        this.state     = {
            loading                 : false,
            info                    : props.info,
            update                  : false,
            popupStatus             : false,
            changeStatusActionType  : null,
            wantChangeItem          : null,
            selectUpdateFormObject  : {
                deliveryCode           : "",
                deliveryCompany        : "",
                deliveryStatus         : "init"
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            loading  : props.loading,
            info     : props.info,
        }
    }

    render(){

        const { info, location } = this.props;
        const { loading, changeStatusActionType, wantChangeItem, popupStatus } = this.state;
        const { orderDetail=[] } = info;

        return(
            <>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品清單</h4>
                    </article>
                    <Table
                        thead = {<Thead />}
                    >
                        {
                            orderDetail.map(item => {
                                return(
                                    <Tbody 
                                        {...item}
                                        key         = {item['id']} 
                                        handleClick = {( actionType, val ) => {
                                            this.setState({
                                                popupStatus            : true,
                                                changeStatusActionType : actionType,
                                                wantChangeItem         : {...val}
                                            });
                                        }}
                                    />
                                );
                            })
                        }
                    </Table>
                    <Loading loading={loading} />
                </section>

                <Popup
                    className           = {`${changeStatusActionType}-popup-wrap`}
                    popupStatus         = {popupStatus}
                    returnPopupStatus   = {() => {
                        this.setState({
                            popupStatus: false
                        })
                    }}
                >
                    <PopupWarp
                        location        = {location}
                        actionType      = {changeStatusActionType}
                        oederData       = {info}
                        itemData        = {wantChangeItem}
                        handleCancel    = {() => {
                            this.setState({
                                popupStatus: false
                            })
                        }}
                    />
                </Popup>
            </>
        );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Products );