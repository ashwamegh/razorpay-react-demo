import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment_amount: 0,
      refund_id: 0
    };

    this.paymentHandler = this.paymentHandler.bind(this);
    this.refundHandler = this.refundHandler.bind(this);
    // this.rzp = new Razorpay({
    //   key_id: process.env.key_id,
    //   key_secret: process.env.key_secret
    // });
  }

  paymentHandler(e) {
    e.preventDefault();

    const { payment_amount } = this.state;
    const self = this;
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      amount: payment_amount*100, // 2000 paise = INR 20
      name: 'Payments',
      description: 'Donate yourself some time',
      handler(response) {
        self.setState({
          refund_id: response.razorpay_payment_id
        });
      },
      prefill: {
        name: 'Shashank Shekhar',
        email: 'ss@localtrip.in',
      },
      notes: {
        address: 'Goa,India',
      },
      theme: {
        color: '#9D50BB',
      },
    };
    const rzp1 = new Razorpay(options);

    rzp1.open();

    // const orderDetails = {
    //   amount: payment_amount, //Fetches the amount from react state - required
    //   currency: "INR", // currently INR is supported only - optional
    //   receipt: 12333, // Your system order reference id. - required
    //   payment_capture: true, //Whether the payment should be captured automatically or not. Default false
    //   notes: "Testing razopay payments" // A key-value pair - optional
    // };

    // this.rzp.orders
    //   .create(orderDetails)
    //   .then(response => {
    //     console.log("**********Order Created***********");
    //     console.log(response);
    //     console.log("**********Order Created***********");
    //     order_id = response.id;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  refundHandler(e) {
    e.preventDefault();
    const { refund_id } = this.state;
  }

  render() {
    const { payment_amount, refund_id } = this.state;
    return (
      <div className="wrapper">
        <div className="payments">
          <div className="payments-title">
            <h1>Test Payments</h1>
          </div>
          <div className="payments-form">
            <form action="#" onSubmit={this.paymentHandler}>
              <p>
                <label htmlFor="pay_amount" className="pay_amount">
                  Amount to be paid
                </label>
              </p>
              <input
                type="number"
                value={payment_amount}
                className="pay_amount"
                placeholder="Amount in INR"
                onChange={e =>
                  this.setState({ payment_amount: e.target.value })
                }
              />
              <p>
                <button type="submit">Pay Now</button>
              </p>
            </form>
          </div>
        </div>
        <div className="refunds">
          <div className="refunds-title">
            <h1>Test Refunds</h1>
          </div>
          <div className="refunds-form">
            <form action="#" onSubmit={this.refundHandler}>
              <p>
                <label htmlFor="refund_amount" className="refund_amount">
                  Payment Transaction ID
                </label>
              </p>
              <input
                value={refund_id}
                type="text"
                className="refund_amount"
                onChange={e => this.setState({ refund_id: e.target.value })}
              />
              <p>
                <button type="submit">Refund Now</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
