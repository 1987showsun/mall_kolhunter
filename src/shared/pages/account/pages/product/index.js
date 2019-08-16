import React from 'react';

// Components
import Tab from './tab';
import Search from './search';
import Table from '../../../../module/table';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor( props ){
        super(props);
        this.state = {
            tableHeadData: [
                {
                    key: 'status',
                    type: 'button',
                    title: '狀態（點擊加入販售）',
                    text: {
                        "off": '未販賣',
                        "on": '販賣中'
                    },
                    className: "status-width"
                },
                {
                    key: 'cover',
                    type: 'img',
                    title: '圖片',
                    className: 'img-width'
                },
                {
                    key: 'name',
                    type: 'link',
                    title: '名稱',
                    className: 'table-min-width',
                    path: '/myvendor/info/product'
                },
                {
                    key: 'brand',
                    type: 'text',
                    title: '品牌'
                },
                {
                    key: 'price',
                    type: 'number',
                    title: '售價'
                },
                {
                    key: 'sellPrice',
                    type: 'number',
                    title: '特價'
                }
            ]
        }
    }

    render(){

        const { tableHeadData } = this.state;
        const { location, match, history } = this.props;

        return(
            <React.Fragment>
                <Tab 
                    match= {match}
                    history= {history}
                    location= {location}
                />
                <section className="container-unit">
                    <Search />
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {[]}
                    />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
    }

    componentDidUpdate( prevProps,prevState ) {
        
    }
}