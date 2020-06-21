import React, { Component } from 'react';
import Header from './header';


class GetConfiguration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shouldHide: true,
            configurationDetail: {
                minimumAmount: {},
                maximumAmount: {}
            }
        };
        this.handleConfiguration = this.handleConfiguration.bind(this);
    }

    handleConfiguration = () => {
        fetch("http://localhost:3004/configurations")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({ configurationDetail: json })
            });

        this.setState({ shouldHide: false });
    }


    render() {

        return (
            <div className="container">
                <div className="jumbotron">
                    <Header />
                </div>
                <div>

                    <p><button className="badge badge-primary badge-pill"
                        onClick={this.handleConfiguration.bind(this)}>Get Configuration Details</button></p>
                    <p hidden={this.state.shouldHide}>
                        <p><h2>Configuration Details:</h2></p>
                        <p><strong>Type:</strong> {this.state.configurationDetail.type}</p>
                        <p><strong>Description:</strong> {this.state.configurationDetail.description}</p>
                        <p><strong>MinimumAmount:</strong> {this.state.configurationDetail.minimumAmount.amount}</p>
                        <p><strong>MaximumAmount:</strong> {this.state.configurationDetail.maximumAmount.amount}</p>
                        <p><strong>Number of Payments:</strong> {this.state.configurationDetail.numberOfPayments}</p>
                        <p><strong>Promotion URL:</strong> {this.state.configurationDetail.promotionUrl}</p>
                    </p>
                </div>
            </div >
        );
    }
}

export default GetConfiguration;