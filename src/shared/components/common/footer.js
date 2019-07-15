import React from 'react';
import { connect } from 'react-redux';

// stylesheets
import './css/footer.scss';

class Footer extends React.Component{
    render(){
        return(
            <footer data-content="center">
                <section className="container">footer</section>
            </footer>
        );
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )(Footer);