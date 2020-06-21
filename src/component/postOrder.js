import React, { Component } from 'react';
import Header from './header';


class PostOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            givenname: "",
            surname: "",
            email: "",
            phone: "",
            amount: "",
            currency: "EUR",
            tokenDetails: {},
            shouldHide: true
        };
    }

    handleGivenNameChange = (e) => {
        this.setState({
            givenname: e.target.value
        })
    }

    handleSurNameChange = (e) => {
        this.setState({
            surname: e.target.value
        })
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePhoneChange = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    handleAmountChange = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    handleSubmit = (e) => {
        debugger;
        fetch("http://localhost:3004/orders", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                totalAmount: {
                    amount: this.state.amount,
                    currency: this.state.currency
                },
                consumer: {
                    phoneNumber: this.state.phone,
                    givenNames: this.state.givenname,
                    surname: this.state.surname,
                    email: this.state.email
                },
                merchant: {
                    redirectConfirmUrl: "https://staging.portal.scalapay.com/success-url",
                    redirectCancelUrl: "https://staging.portal.scalapay.com/failure-url"
                }
            })
        })
            .then(res => res.json())
            .then(json => {
                debugger;
                console.log(json);
                this.setState({ tokenDetails: json })
            });

        e.preventDefault()
        this.setState({ givenname: '', surname: '', phone: '', email: '', amount: '', currency: '', message: 'Order Posted Successfully', shouldHide: false })
    }

    render() {
        debugger;
        console.log(this.state.tokenDetails);
        return (
            <div className="container" >
                <div className="jumbotron">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <form class="list-group" onSubmit={this.handleSubmit}>

                            <div className="row">
                                <div className="col-sm-2">
                                    Given Name:
                        </div>
                                <div className="col-sm-1">
                                    <input type="text" onChange={this.handleGivenNameChange} value={this.state.givenname}></input>
                                </div>
                            </div><br />
                            <div className="row">
                                <div className="col-sm-2">
                                    Surname:
                        </div>
                                <div className="col-sm-1">
                                    <input type="text" onChange={this.handleSurNameChange} value={this.state.surname}></input>
                                </div>
                            </div><br />
                            <div className="row">
                                <div className="col-sm-2">
                                    Email:
                        </div>
                                <div className="col-sm-1">
                                    <input type="text" onChange={this.handleEmailChange} value={this.state.email}></input>
                                </div>
                            </div><br />
                            <div className="row">
                                <div className="col-sm-2">
                                    Phone:</div>
                                <div className="col-sm-1"><input type="text" onChange={this.handlePhoneChange} value={this.state.phone}></input>
                                </div>
                            </div ><br />
                            <div className="row">
                                <div className="col-sm-2">
                                    Total Amount:</div>
                                <div className="col-sm-1"><input type="text" onChange={this.handleAmountChange} value={this.state.amount}></input></div>
                            </div ><br />
                            <div className="row">
                                <div className="col-sm-2">
                                    Currency:</div>
                                <div className="col-sm-1"><input type="text" readOnly="true" value={this.state.currency}></input>
                                </div>
                            </div ><br />
                            <p><input type="submit" value="Post Order" ></input></p>

                        </form >
                    </div>
                    <div hidden={this.state.shouldHide} className="col-sm-5">
                        <p><strong><label id="lblMessage">{this.state.message}</label></strong></p>
                        <p><strong>Your token number:</strong> {this.state.tokenDetails.token}</p>
                        <p><strong>Token Expiry Date:</strong> {this.state.tokenDetails.expires}</p>
                        <p><strong>Your Checkout URL:</strong> {this.state.tokenDetails.checkoutUrl}</p>
                    </div>
                </div>
            </div >
        );
    }
}

export default PostOrder;