import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

// Components
import Cover from './cover';

// Stylesheets
import './public/stylesheets/style.scss';

// Actions
import { ssrApproachProduct, mallApproachProduct } from '../../actions/categories';

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ){
        const pathnameArray = pathname.split('/').filter( item => item!="" );
        query = { ...query, productToken: pathnameArray[1] };
        return ssrApproachProduct(NODE_ENV,pathname,{ ...query, productToken: pathnameArray[1] });
    }

    constructor(props){
        super(props);
        this.state = {
            imageData: [],
            info: {
                token: "",
                name: "",
                celebrityNum: 0,
                images: [],
                description: [],
                delivery: [],
                spec: [],
                onSale: false,
                price: 0,
                sellPrice: 0
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            imageData: props.images,
            info: {
                ...state.info,
                token: props.token,
                name: props.name,
                celebrityNum: props.celebrityNum,
                images: props.images,
                description: props.description,
                delivery: props.delivery,
                spec: props.spec,
                onSale: props.onSale,
                price: props.price,
                sellPrice: props.sellPrice
            }
        }
    }

    render(){

        const { location, match, history } = this.props;
        const { info } = this.state;
        const { description } = info;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 - ${info['name']}`}</title>
                    <meta name="keywords" content={`網紅電商,網紅獵人,幫你賣,電商,網購}`} />
                    <meta name="description" content={``} />
                </Helmet>
                <div className="row">
                    <section className="container detail-content" >
                        <div className="container-row">
                            {
                                info['token']!=""? (
                                    <Cover 
                                        match= {match}
                                        history= {history}
                                        location= {location}
                                        data= {info}
                                    />
                                ):(
                                    <div> Loading... </div>
                                )
                            }
                        </div>
                        <div className="container-row">
                            <div className="detail-cover-wrap detail-container">
                                {
                                    description.map( item => {
                                        switch( item['type'] ){
                                            case "image":
                                                return <img key={item['sort']} src={item['content']} alt="" title="" />;

                                            case "html":
                                                return (
                                                    <div key={item['sort']} className="detail-container-text">
                                                        <p>{item['content']}</p>
                                                    </div>
                                                );
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const query = {
            ...queryString.parse( search ),
            productToken: match['params']['id'] || ""
        }
        this.props.dispatch( mallApproachProduct( pathname, query ) ).then( res => {

        });
    }
}

const mapStateToProps = state => {
    return{
        ...state.approach
    }
}

export default connect( mapStateToProps )( Index );