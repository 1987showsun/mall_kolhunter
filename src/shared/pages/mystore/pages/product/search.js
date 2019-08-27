import React from 'react';
import queryString from 'query-string';

export default class Search extends React.Component{

    constructor(props){

        const { search } = props.location;

        super(props);
        this.state = {
            formObject: {
                keyword: "",
                sort: "",
                sortBy: ""
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return null;
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="container-unit-search">
                <form onSubmit={ this.handleSubmit.bind(this) }>
                    <div className="input-box">
                        <input type="text" name="keyword" value={formObject['keyword']} onChange={this.handleChange.bind(this)} />
                    </div>
                    <button type="submit">搜尋</button>
                </form>
                <div className="input-box select">
                    <select name="sort" value={`${formObject['sort']}-${formObject['sortBy']}`} onChange={this.handleChange.bind(this)}>
                        <option value={`desc-created`}>創建時間由新到舊</option>
                        <option value={`incre-created`}>創建時間由舊到新</option>
                    </select>
                </div>
            </div>
        );
    }

    componentDidMount() {

        const { formObject } = this.state;
        const { search } = this.props.location;

        this.setState({
            formObject: { 
                ...formObject,
                keyword: queryString.parse(search)['mspKeyword'] || '',
                sort: queryString.parse(search)['sort'] || 'desc',
                sortBy: queryString.parse(search)['sortBy'] || 'created'
            }
        })
    }

    handleChange = (e) => {
        const { formObject } = this.state;
        const name = e.target.name;
        const value = e.target.value;        
        if( name=='sort' ){
            this.setState({
                formObject: {
                    ...formObject,
                    sort: value.split('-')[0],
                    sortBy: value.split('-')[1],
                }
            },()=>{
                this.reCallAPI();
            })
        }else{
            this.setState({
                formObject: {
                    ...formObject,
                    [name]: value
                }
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.reCallAPI();
    }

    reCallAPI = () => {
        const { history, location } = this.props;
        const { formObject } = this.state;
        const search = queryString.parse( location['search'] );
        const searchQuery = {
            ...search,
            mspKeyword: formObject['keyword'],
            sort: formObject['sort'],
            sortBy: formObject['sortBy'],
        }
        if( formObject['keyword']=="" ){
            delete searchQuery['mspKeyword'];
        }
        history.push({
            search: queryString.stringify(searchQuery)
        })
    }
}