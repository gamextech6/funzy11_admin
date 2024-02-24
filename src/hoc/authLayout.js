import React from "react";
import loginImage from "../asset/loginImage.png";
const authLayout = (ChildComponent) => {
    class AuthLayout extends React.Component {
        constructor(props){
            super(props);
    
            this.state = {};
        }

        render(){
            return <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                        <img alt="hey" src={loginImage} className="img-fluid"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <ChildComponent {...this.props} />
                        </div>
                    </div>
                </div>
            </section>
        </>
        }
    }

    return AuthLayout;
}

export default authLayout;