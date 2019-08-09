import React from 'react';
import { connect } from 'react-redux';

class Program extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <React.Fragment>
                <ul className="purchase-ul">
                    <li>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <h3>方案 Ａ</h3>
                            <div className="program-block-content">
                                <p>上架一商品售價3萬元<br/>由廠商自行編輯產品介紹等所有上架資訊</p>
                            </div>
                            <div className="input-box">
                                <select onChange={this.handleChange.bind(this)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <button type="submit" onSubmit={this.handleSubmit.bind(this)}>購買此方案</button>
                        </form>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    handleChange = (e) => {
        
    }

    handleSubmit = (e) => {
        
    }
}

const mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps)(Program);