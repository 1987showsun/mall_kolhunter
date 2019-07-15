import React from 'react';

// Components
import Cover from './cover';
import Basic from './basic';
import Freight from './freight';
import Format from './format';
import Depiction from './depiction';

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject : {
                cover: { // 圖片

                },
                basic: { // 基本

                },
                freight: [ 
                    // 運送方式
                ],
                format: [ 
                    // 規格
                ],
                depiction: [ 
                    // 敘述
                ]
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Cover cover={formObject['cover']}/>
                    <Basic basic={formObject['basic']}/>
                    <Freight freight={formObject['freight']}/>
                    <Format format={formObject['format']}/>
                    <Depiction data={formObject['depiction']}/>
                </form>
            </React.Fragment>
        );
    }

    handleSubmit = (e) => {

    }
}