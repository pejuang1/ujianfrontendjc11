import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import { APIURL } from '../support/apiurl';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { Loginsuccessaction,Login_err } from '../redux/action'
import Loader from 'react-loader-spinner'

class Loginku extends Component {
    state = { 
        error:'',
        loading:false,
     }

    onloginclick=()=>{
        var username=this.refs.username.value
        var password=this.refs.password.value
        ////////////////////Loginthunk////////////////////////
        // this.props.Loginthunk(username,password)
        //redux biasa dibawah
        this.setState({loading:true})
        Axios.get(`${APIURL}users?username=${username}&password=${password}`)
        .then(res=>{
            if(res.data.length){
                localStorage.setItem('rizal',res.data[0].id)
                this.props.Loginsuccessaction(res.data[0])
            }else{
                this.setState({error:'Salah password'})
            }
            this.setState({loading:false})
        }).catch((err)=>{
            console.log(err)
            this.setState({loading:false})
        })
    }
    
    render() { 
        if(this.props.Authlog){
            return <Redirect to={'/'}/>
        }
        return ( 
            <form>
            <div className='d-flex justify-content-center'>
                <div style={{width:'500px', border:'1px solid black'}}>
                    <h1>
                    Login
                    </h1>
                    <div className='p-1 mt-4' style={{borderBottom:'1px solid black'}} className='rounded'>
                        <input type="text" ref='username' style={{border:'transparent'}} placeholder='username'/>
                    </div>
                    <div className='p-1 mt-4' style={{borderBottom:'1px solid black'}} className='rounded'>
                        <input type="password" ref='password' style={{border:'transparent'}} placeholder='password'/>
                    </div>
                    {this.props.Auth.error===''?
                    null
                    :
                    <div className='alert alert-danger closex'>
                        {this.props.Auth.error} <span onClick={this.props.Login_err} className='float-right font-weight-bold'>X</span>
                        {/* onClick={()=>this.setState({error:''})} */}
                    </div>
                    }
                    <div>
                    {this.props.Auth.loading?
                        <Loader
                        type="Puff"
                        color="#00BFFF"
                        heigh={50}
                        width={50}
                        />
                        :
                        <button onClick={this.onloginclick} className='btn btn-primary mt-2'>Login</button>
                    }
                    </div>
                    <div className='mt-2'>
                        <Link to={'/register'}> register </Link>jika belum punya akun
                    </div>
                </div>
            </div>
                    </form>
         );
    }
}
const MapstateToprops=(state)=>{
    return {
        Authlog:state.Auth.login,
        Auth:state.Auth
    }
} 

export default connect(MapstateToprops,{Loginsuccessaction,Login_err}) (Loginku);