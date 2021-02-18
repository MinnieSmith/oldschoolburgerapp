import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';
import { Component } from 'react';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            // each time the request gets sent, the error gets cleared
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            //the first function returns the response, the second, the error
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }
        componentWillUnmount() {
            //prevents unnecessary re-rendering and memory leaks in componentWillMount() 
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {/* turnary expression - will output error message if there is an
                        error otherwise null */}
                        {this.state.error ? this.state.error.message : null}
                        Something didn't work!
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }

    }
}

export default withErrorHandler;