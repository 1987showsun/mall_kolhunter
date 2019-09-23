import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 39, 10, 43, 5, 1000]
      },
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 39, 10, 43, 5, 56]
      },
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 39, 10, 43, 5, 56]
      }
    ]
};

export default class Dashbord extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="admin-content-row" data-bgclolor="transparent" >
                    <ul className="admin-card-list">
                        <li>
                            <div className="card-wrap">
                                <div className="card-label">
                                    <h3>今日訂單數</h3>
                                </div>
                                <div className="card-content">
                                    <CurrencyFormat value={32} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card-wrap">
                                <div className="card-label">
                                    <h3>未付款訂單數</h3>
                                </div>
                                <div className="card-content">
                                    <CurrencyFormat value={12} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card-wrap">
                                <div className="card-label">
                                    <h3>未出貨數</h3>
                                </div>
                                <div className="card-content">
                                    <CurrencyFormat value={43} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card-wrap">
                                <div className="card-label">
                                    <h3>當月目前總營收</h3>
                                </div>
                                <div className="card-content">
                                    <CurrencyFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card-wrap">
                                <div className="card-label">
                                    <h3>總銷售營收</h3>
                                </div>
                                <div className="card-content">
                                    <CurrencyFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="admin-content-row">
                    <Bar 
                        ref="chart" 
                        data={data}
                        options= {{
                            maintainAspectRatio: true,
                            responsive: true,
                            defaultFontColor: "#000",
                        }}
                    />
                </div>        
            </React.Fragment>
        );
    }
}