import {React, useEffect} from 'react'
import {Button, Form, Input} from "antd";
import {Link} from "react-router-dom";
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import './index.css'
import 'antd/dist/antd.css';


export  function Login(props){
    const {checkLogin, isTrue} = props
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
    const onClickHandler =(values)=>{
        // e.preventDefault();
        console.log(values)
        // if(values.username==='trongduc2206'&&values.password==='Trongduc22062000') {

            // history.push("/map")
        // }
        checkLogin(values.username, values.password)
        console.log(isTrue);
        if(isTrue){
            console.log("login successfully")
            history.push('/map')
        }
    }
   const  onSignUpClick = () => {
        history.push("/signup")
    }
    useEffect(() => {
        if(isTrue) history.push('/map')
    },[isTrue]);
    return(
        <div style={{backgroundImage: 'url(https://anhdepfree.com/wp-content/uploads/2018/11/Blue-Wallpaper-hinh-nen-mau-xanh-13.jpg)', width:1366, height:657}}>

                <Form onFinish={onClickHandler} {...layout} style={{paddingTop:180, paddingLeft: 400}}  >
         <Form.Item lable="Username" name="username" >
             <Input/>
         </Form.Item>
         <Form.Item lable="Password" name="password">
             <Input.Password/>
         </Form.Item>
         <Form.Item {...tailLayout}>
             <Button type="primary" htmlType="submit">
                 Login
             </Button>
         </Form.Item>
        <Form.Item {...tailLayout} >
            <Button onClick={onSignUpClick}>Sign Up</Button>
        </Form.Item>



     </Form>


        </div>
    )
}
const mapStateToProps = state => {
    console.log(state.object.loginStatus)
    console.log(state.object.userName)
    return {
        isTrue : state.object.loginStatus
    }
}
const mapDispatchToProps = dispatch => {
    return {
        checkLogin: (u,p)=> dispatch({type:"CHECK_LOGIN_API",userName: u, passWord: p})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);