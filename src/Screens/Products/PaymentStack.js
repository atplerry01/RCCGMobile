import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';

export default class ProductPaymentStack extends Component {

    constructor(props) {
        super(props);

        this.state = {
            model: {},
            amount: '',
            customerEmail: '',
            subAccountID: '',
            transRef: '',
            paymentItem: '',
            stackModel: {},
            userStore: {},
            paymentModel: {}
        }
    }

    onNavigationStateChange = navState => {
        const { stackModel, amount } = this.state;

        if (navState.url.indexOf('http://google.com/?page=close') === 0) {
            this.props.navigation.navigate('PaymentStatus', { stackModel: JSON.stringify(stackModel), amount: JSON.stringify(amount), gateway: JSON.stringify('flutterwave')});
        }
        
        if (navState.url.indexOf('https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/complete') === 0) {
            this.props.navigation.navigate('PaymentStatusModule', { stackModel: JSON.stringify(stackModel), amount: JSON.stringify(amount), gateway: JSON.stringify('flutterwave')});
        } else if (navState.url.indexOf('http://google.com/?page=close') === 0) {
            this.props.navigation.navigate('PaymentStatus', { stackModel: JSON.stringify(stackModel), amount: JSON.stringify(amount), gateway: JSON.stringify('flutterwave')});
        } else if (navState.url.indexOf('http://google.com/?page=success') === 0) {
            this.props.navigation.navigate('PaymentStatusModule', { stackModel: JSON.stringify(stackModel), amount: JSON.stringify(amount), gateway: JSON.stringify('flutterwave')});
        } else if (navState.url.indexOf('http://google.com/?page=failure') === 0) {
            this.props.navigation.navigate('PaymentStatusModule', { stackModel: JSON.stringify(stackModel), amount: JSON.stringify(amount), gateway: JSON.stringify('flutterwave')});
        }

        // https://qa.interswitchng.com/webpay/Demo/ResponsePage
        if (navState.url.indexOf('https://qa.interswitchng.com/webpay/Demo/ResponsePage') === 0) {
            this.props.navigation.navigate('PaymentStatusModule', { stackModel: JSON.stringify(stackModel), amount: JSON.stringify(amount), gateway: JSON.stringify('interswitch')});
        }
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const paySwichDetail = navigation.getParam('paydetail', 'NO-ID');
        const amount = navigation.getParam('amount', 'NO-ID');

        const userToken = await this.getStorageItem('@userToken');

        if (userToken && userToken !== 'none') {
            const userStore = JSON.parse(userToken);
            this.setState({ userStore })
        }

        if (paySwichDetail && paySwichDetail !== 'NO-ID') {
            const stackModel = JSON.parse(paySwichDetail);
            this.setState({ stackModel, amount });
        }
    }

    renderWebView() {

        const interTemp = this.webViewTemplate();

        return (<WebView
            source={{ html: interTemp, baseUrl: 'web/' }}
            onNavigationStateChange={this.onNavigationStateChange}
            scalesPageToFit
            javaScriptEnabled
            style={{ width: '100%', height: 300, resizeMode: 'cover', flex: 1 }}
            injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
            scalesPageToFit={false}
        />)

    }

    render() {
        return (
            <React.Fragment>
                {this.renderWebView()}
            </React.Fragment>
        );
    }

    webViewTemplate() {
        const { userStore, stackModel, amount } = this.state;

        let model = {};
        let flutterDisplay = 'none';
        let interswitchDisplay = 'none';

        if (stackModel) {
            model = {
                churchName: stackModel.churchName,
                itemName: stackModel.itemName,
                orderId: stackModel.orderId,
                orderId: stackModel.orderId,
                transRef: stackModel.transRef
            };
        }

        if (stackModel.gatewayFlutterwave && stackModel.gatewayFlutterwave.length >= 1) {
            model.flutterSubAccountID = stackModel.gatewayFlutterwave[0].subAccountID;
            flutterDisplay = 'block';
        }

        if (stackModel.gatewayInterswitch && stackModel.gatewayInterswitch.length >= 1) {
            interswitchDisplay = 'block';
            model.gatewayInterswitch = stackModel.gatewayInterswitch[0];
        }

        if (userStore) {
            model.email = userStore.email,
            model.fullName = userStore.fullName,
            model.phoneNumber = '' // TODO:*
        }

        const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <title>RCCG Payment Stack</title>
    
        <!-- Styles -->
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,300i,500,700" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    
        <style>
            .column {
                float: left;
                width: 50%;
                padding-right: 10px
            }
    
            /* Clear floats after the columns */
            .row:after {
                content: "";
                display: table;
                clear: both;
            }
            .clickMe {
                text-align: center;
                text-decoration: none;
                padding: 0.2em 0.4em;
            }
        </style>

        
        <style>
            body {
                color: #fff;
                font: 300 16px/1.6em "Ubuntu", sans-serif;
            }
    
            a {
                color: #00bb5c;
                text-decoration: none;
            }
    
            a:hover {
                color: #fff;
                text-decoration: none;
            }
    
            .button-solid {
                display: inline-block;
                max-width: 250px;
                height: 42px;
                padding-right: 34px;
                padding-left: 34px;
                border: 1px solid #00bb5c;
                border-radius: 50px;
                background-color: #00bb5c;
                color: #fff;
                font: 500 15px/40px "Ubuntu", sans-serif;
                transition: border .3s ease, background-color .3s ease, color .3s ease;
            }
    
            .button-solid.large {
                height: 54px;
                margin-top: 20px;
                padding-right: 38px;
                padding-left: 38px;
                border: 1px solid #00bb5c;
                border-radius: 50px;
                background-color: #00bb5c;
                font: 500 18px/51px "Ubuntu", sans-serif;
            }
    
            .button-solid:hover,
            .button-solid.large:hover {
                border: 1px solid #25c86a;
                background-color: transparent;
                color: #fff;
                text-decoration: none;
            }
    
            .button-outline {
                display: inline-block;
                max-width: 250px;
                height: 42px;
                padding-right: 34px;
                padding-left: 34px;
                border: 1px solid #fff;
                border-radius: 50px;
                background-color: transparent;
                color: #fff;
                font: 500 15px/40px "Ubuntu", sans-serif;
                transition: border .3s ease, background-color .3s ease, color .3s ease;
            }
    
            .button-outline:hover {
                border: 1px solid #25c86a;
                background-color: #25c86a;
            }
    
            .form-control-input {
                height: 40px;
                width: 100%;
                padding-left: 10px;
                background-color: #52555f;
                border: 1px solid #52555f;
                border-radius: 4px;
                color: #fff;
                font: 300 16px/1.6em "Ubuntu", sans-serif;
                -webkit-appearance: none;
                /* removes inner shadow on form inputs on ios safari */
            }
    
            .form-control-textarea {
                width: 100%;
                padding-left: 10px;
                border: 1px solid #52555f;
                border-radius: 4px;
                background-color: #52555f;
                color: #fff;
                font: 300 16px/1.6em "Ubuntu", sans-serif;
            }
    
            .form-control-submit-button {
                display: block;
                width: 100%;
                height: 40px;
                border: 1px solid #00bb5c;
                border-radius: 4px;
                background-color: #00bb5c;
                color: #fff;
                font: 500 16px/36px "Ubuntu", sans-serif;
                transition: background-color .3s ease, color .3s ease;
            }
    
            .form-control-submit-button:hover {
                background-color: transparent;
                color: #fff;
            }
    
            .form-control-input::-webkit-input-placeholder,
            .form-control-textarea::-webkit-input-placeholder {
                /* WebKit, Blink, Edge */
                color: #fff;
                opacity: 0.7;
            }
    
            .form-control-input:-moz-placeholder,
            .form-control-textarea:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #fff;
                opacity: 0.7;
            }
    
            .form-control-input::-moz-placeholder,
            .form-control-textarea::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #fff;
                opacity: 0.7;
            }
    
            .form-control-input:-ms-input-placeholder,
            .form-control-textarea:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #fff;
                opacity: 0.7;
            }
    
            .header {
                position: relative;
                width: 100%;
                min-height: 100%;
                background: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url("http://hr.goldenmemoria.com/images/header-background.jpg") center no-repeat;
                background-size: cover;
            }
    
            .header .header-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 100vh;
                padding-top: 30px;
                padding-bottom: 80px;
    
            }
    
            .header p {
                margin-top: 20px;
                margin-right: 10px;
                font: 300 20px/1.5em "Ubuntu", sans-serif;
            }
    
            .header .form-control-input {
                height: 42px;
            }
    
            .header .form-control-submit-button {
                height: 46px;
            }
        </style>
    </head>
    
    <body data-spy="scroll" data-target=".navbar-fixed-top">
    
        <header id="header" class="header">
            <div class="flex-container-wrapper">
                <div class="header-content">
                    <div class="container">
                        <div class="row">
                            <div class="header-content-wrapper">
    
                                <div class="col-md-6">
                                    <form id="RegistrationForm" data-toggle="validator">
                                        <p><strong>Payment Item</strong></p>
                                        <div class="form-group">
                                            <input type="text" value="${model.itemName}" 
                                            class="form-control-input" id="firstname"
                                                placeholder="First Name" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
    
                                        <p><strong>Amount</strong></p>
                                        <div class="form-group">
                                            <input type="text" value="${amount}" class="form-control-input" id="lastname"
                                                placeholder="Trans Amount" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
    
                                        <p><strong>Phone Number *</strong></p>
                                        <div class="form-group">
                                            <input type="text" class="form-control-input" id="phone"
                                                placeholder="Phone Number">
                                            <div class="help-block with-errors"></div>
                                        </div>
    
                                        <p><strong>Email Address</strong></p>
                                        <div class="form-group">
                                            <input type="email" value="${model.email}" 
                                            class="form-control-input" id="email" placeholder="Email" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
    
                                        <p><strong>Pay with</strong></p>

                                        <div class="row">
                                            <div class="column" style="display: ${flutterDisplay}">
                                                <a href="http://hr.goldenmemoria.com/paystack-flutter.html?email=${model.email}&amount=${amount}&phone=${model.phoneNumber}&flutterId=${model.flutterSubAccountID}&transRef=${model.transRef}" class="form-control-submit-button clickMe">Flutterwave</a>
                                            </div>

                                            <div class="column" style="display: ${interswitchDisplay}">
                                                <a href="http://hr.goldenmemoria.com/paystack-switch.php?email=${model.email}&fullName=${model.fullName}&itemName=${model.itemName}&amount=${amount * 100}&transRef=${model.transRef}" class="form-control-submit-button clickMe">Interswich</a>
                                            </div>
                                        </div>
    
                                        <div class="form-message">
                                            <div id="msgSubmit" class="h3 text-center hidden"></div>
                                        </div>
                                    </form>
                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    
    
    
    
        <script>
            const API_publicKey = "FLWPUBK-4cad8e638ee4de851cbdd4409ebbbf12-X";
    
            function payWithRave() {
                var x = getpaidSetup({
                    PBFPubKey: API_publicKey,
                    customer_email: "${model.email}",
                    amount: ${amount},
                    customer_phone: "${model.phoneNumber}",
                    currency: "NGN",
                    payment_options: "card",
                    subaccounts: [{
                        id: "${model.flutterSubAccountID}",
                        transaction_charge_type: "percentage_subaccount",
                        transaction_charge: "0.95"
                    }
                    ],
                    txref: "${model.transRef}",
    
                    onclose: function () { },
                    callback: function (response) {
                        var txref = response.tx.txRef; // collect flwRef returned and pass to a 					server page to complete status check.
                        
                        if (
                            response.tx.chargeResponseCode == "00" ||
                            response.tx.chargeResponseCode == "0"
                        ) {
                            // redirect to a success page
                            document.location.href = 'http://google.com',true;
                        } else {
                            // redirect to a failure page.
                            document.location.href = 'http://google.com',true;
                        }
    
                        x.close(); // use this to close the modal immediately after payment.
                        document.location.href = 'http://google.com',true;
                    }
                });
            }
        </script>
    
    </body>
    
    </html>`;

        return html;
    }


    removeStorageItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            
        }
    }

    saveStorageItem = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            
        }
    };

    getStorageItem = async (key) => {
        let result = '';
        try {
            result = await AsyncStorage.getItem(key) || 'none';
        } catch (error) {
            
        }
        return result;
    }

}
