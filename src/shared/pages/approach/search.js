import React from 'react';
import { connect } from 'react-redux';

class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                search: ""
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="unit-guide">
                <div className="unit-guide-col left">販賣此商品家數：20</div>
                <div className="unit-guide-col right">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input-box">
                            <input type="text" name="search" value={formObject['search']} onChange={this.handleChange.bind(this)} />
                        </div>
                        <button type="submit">搜尋</button>
                    </form>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const formObject = { ...this.state.formObject, [name]: value };
        this.setState({
            formObject
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Search );