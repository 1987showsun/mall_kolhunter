import React from 'react';
import FileBase64 from 'react-file-base64';

export default class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : props.data
        }
    }

    render(){

         const { data } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品敘述</h4>
                    </article>
                    <div className="admin-content-container">
                        {
                            data.length!=0?(
                                <ul className="depiction-ul">
                                    {
                                        data.map( (item,i)=> {
                                            return(
                                                <li key={i} dangerouslySetInnerHTML={{__html: item['description']}}></li>
                                            )
                                        })
                                    }
                                </ul>
                            ):(
                                <div className="list-no-data">請點選新增條件，新增所需條件</div>
                            )
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }
}