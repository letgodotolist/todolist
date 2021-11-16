import React from 'react';
import './Login.css';
const Login = props => {
    return (
    
    <div>
        
        <form action="/userlogin/check" method="post">

            <div className="wrap">
                <div id="login_box">
                    <h1>ToDoList</h1>
                    <div id="login_content">
                        <div className="login_ip">
                        <input type="text" name="email" placeholder="Email"></input>
                        </div>
                        <div className="login_ip">
                        <input type="password" name="password" placeholder="Password"></input>
                        </div>
                        <button type="submit">로그인</button>
                    </div>
                </div>
            </div>

            {/* <table>
                <tr>
                    <td><label>email :</label></td>
                    <td><input type="text" name="email"/></td>
                </tr>
                <tr>
                    <td><label>password :</label></td>
                    <td><input type="text" name="password"/></td>
                </tr>
            </table>
            <td><input type="submit" value="로그인" name=""/></td> */}
        </form>
        <script src="./signin.js" type="text/javascript"></script>
     </div>
    )
}

export default Login;