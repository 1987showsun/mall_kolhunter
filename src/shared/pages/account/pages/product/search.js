import React from 'react';

const initQuery = {
    sort: "desc",
    sortBy: "created"
}

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                keywrod: "",
                sort: initQuery['sort'],
                sortBy: initQuery['sortBy']
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="container-unit-search">
                <form onSubmit={ this.handleSubmit.bind(this) }>
                    <div className="input-box">
                        <input type="text" name="keywrod" value={formObject['keywrod']} onChange={this.handleChange.bind(this)} />
                    </div>
                    <button type="submit">搜尋</button>
                </form>
                <div className="input-box select">
                    <select value={`${formObject['sort']}-${formObject['sortBy']}`} onChange={this.handleChange.bind(this)}>
                        <option value={`desc-created`}>創建時間由新到舊</option>
                        <option value={`incre-created`}>創建時間由舊到新</option>
                    </select>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        
    }

    handleSubmit = (e) => {

    }
}