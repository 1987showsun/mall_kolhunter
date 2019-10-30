// 捐贈
import React       from 'react';
import { connect } from 'react-redux';

class Donation extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                invoiceLoveCode: 510
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <ul className="card-form-list">
                <li>
                    <label>受贈單位</label>
                    <div className="input-box select full-W" value={formObject['invoiceLoveCode']}>
                        <select onChange={this.handleChange.bind(this)}>
                            <option value="510">社團法人台灣一起夢想公益協會</option>
                            <option value="88432">喜憨兒社會福利基金會</option>
                            <option value="13579">陽光社會福利基金會</option>
                            <option value="321">中華民國唐氏症基金會</option>
                            <option value="4545">台灣全民食物銀行協會</option>
                        </select>
                    </div>
                </li>
            </ul>
        );
    }

    componentDidMount() {
        this.returnForm();
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject: { ...this.state.formObject, [name]:value }
        },()=>{
            this.returnForm();
        })
    }

    returnForm = () => {
        if( this.props.returnForm!=undefined ){
            const { formObject } = this.state;
            this.props.returnForm( formObject );
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )(Donation);