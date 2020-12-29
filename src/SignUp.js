import {React, useEffect} from 'react'
import {Button, Form, Input} from 'antd'
import {connect} from "react-redux";
import {Login} from "./Login";
import {Link, useHistory} from "react-router-dom";


export  function SignUp(props){
    const {isTrue, checkSignup, resetSignupStatus}= props
    let history = useHistory();

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 12,
        },

    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    const onSubmitHandler = (values) => {
        console.log(values)
        checkSignup(values.username, values.password, values.confirmPassword)
    }
    useEffect(() => {
        if(isTrue) history.push('/login')
        resetSignupStatus();
    },[isTrue]);
    return (
        <div style={{backgroundImage: 'url(https://anhdepfree.com/wp-content/uploads/2018/11/Blue-Wallpaper-hinh-nen-mau-xanh-13.jpg)', width:1366, height:657}}>
            <div style={{paddingBottom: 100, paddingTop:10}}>
                <Button type='primary' >
                  <Link to="/login" >Back To Login</Link>
                </Button>
            </div>
            <Form {...layout} style={{paddingTop:100, paddingLeft: 400}} onFinish={onSubmitHandler}>
                <Form.Item lable="Username" name="username" >
                    <Input placeholder="username" />
                </Form.Item>
                <Form.Item lable="Password" name="password">
                    <Input.Password placeholder="password"/>
                </Form.Item>
                <Form.Item lable="ConfirmPassword" name="confirmPassword">
                    <Input.Password placeholder="confirm your password"/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>

        </div>


    )
}
const mapStateToProps = state => {
    // console.log(state.object.loginStatus)
    // console.log(state.object.userName)
    return {
        isTrue : state.object.signupStatus
    }
}
const mapDispatchToProps = dispatch => {
    return {
        checkSignup: (u,p,c)=> dispatch({type:"CHECK_SIGNUP_API",userName: u, passWord: p, confirmPassword: c}),
        resetSignupStatus : () => dispatch({type:"RESET_SIGNUP_STATUS"})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);