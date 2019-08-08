import React from 'react';
import { connect } from 'react-redux';

// Lang
import lang from '../../lang/lang.json';

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
                <div className="unit-guide-col left">{lang['zh-TW']['label']['number of stores']}：20</div>
                <div className="unit-guide-col right">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input-box">
                            <input type="text" name="search" value={formObject['search']} onChange={this.handleChange.bind(this)} placeholder={lang['zh-TW']['placeholder']['store name']}/>
                        </div>
                        <button type="submit">{lang['zh-TW']['button']['search']}</button>
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