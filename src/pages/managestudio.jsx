import React, { Component } from 'react';
import Axios from 'axios';
import {url} from '../components/url'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {LoginSuccessAction} from '../redux/action'
import { Table,Button,Modal,ModalBody,ModalFooter, ModalHeader } from 'reactstrap';

class Managestudio extends Component {
    state = { 
        datastudio:[],
        modaladd:false,
        indexedit:0,
        modaledit:false
     }

    componentDidMount(){
        Axios.get(`${url}studios`)
        .then((res)=>{
           this.setState({datastudio:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderStudio=()=>{
        return this.state.datastudio.map((val,index)=>{
            return (
                <tr key={index}>
                    <td style={{width:100}}>{index+1}</td>
                    <td style={{width:500}}>{val.nama}</td>
                    <td style={{width:300}}>{val.totalkursi}</td>
                    <td style={{width:100}}><Button onClick={()=>this.setState({modaledit:true,indexedit:index})} variant='info' className='btn btn-warning'>Edit</Button></td>
                
                 </tr>

            )
        })
    }

    addStudio=()=>{
        var iniref=this.refs
        var nama=iniref.nama.value
        var totalkursi=iniref.kursi.value
        var data={
            nama:nama,
            totalkursi
        }
        Axios.post(`${url}studios`,data)
        .then(()=>{
            Axios.get(`${url}studios`)
            .then((res)=>{
                this.setState({datastudio:res.data,modaladd:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    editStudio=()=>{
        var iniref=this.refs
        var id=this.state.datastudio[this.state.indexedit].id
        var nama=iniref.editnama.value
        var totalkursi=iniref.editkursi.value
        var data={
            nama:nama,
            totalkursi
        }
        Axios.put(`${url}studios/${id}`,data)
        .then(()=>{
            Axios.get(`${url}studios`)
            .then((res)=>{
                this.setState({datastudio:res.data,modaledit:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }


    render() { 
        const {datastudio,indexedit}=this.state
        const {length}=datastudio
        if(length===0){
            return <div>Loading..</div>
        }
        if (this.props.roleUser === "user") {
            return <Redirect to='/notfound' />;
          } 
        if(this.props.UserId) {
        return ( 
            <div>
                    <center>
                        <div>

            <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
            <ModalHeader>
                Tambah studio
            </ModalHeader>
            <ModalBody>
                <input type="text" ref='nama'  placeholder='Nama Studio' className='form-control mt-2'/>
                <input type="number" ref='kursi' placeholder='Jumlah Kursi' className='form-control mt-2'/>
                
            </ModalBody>
            <ModalFooter>
                
                <Button variant="success" onClick={this.addStudio} className='btn btn-primary'>Save</Button>
                <Button variant="danger" onClick={()=>this.setState({modaladd:false})} className='btn btn-warning'>Cancel</Button>
            </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaedit:false})}>
            <ModalHeader>
                Edit Data Studio
            </ModalHeader>
            <ModalBody>
                <input type="text" defaultValue={datastudio[indexedit].nama} ref='editnama'  placeholder='Nama Studio' className='form-control mt-2'/>
                <input type="number" defaultValue={datastudio[indexedit].totalkursi} ref='editkursi' placeholder='Jumlah Kursi' className='form-control mt-2'/>
                
            </ModalBody>
            <ModalFooter>
                
                <Button variant="success" onClick={this.editStudio} className='btn btn-primary'>Save</Button>
                <Button variant="danger" onClick={()=>this.setState({modaledit:false})} className='btn btn-warning'>Cancel</Button>
            </ModalFooter>
            </Modal>


            <div style={{marginLeft:120}} className='container'>
            <div style={{textAlign:'center', marginTop:'20px',paddingBottom:'15px'}}>
            <h3 style={{paddingBottom:'10px'}}>Manage Studio</h3>
            <Button onClick={()=>this.setState({modaladd:true})} className='btn btn-success'>Add</Button>
            </div>
            <center style={{marginBottom:'50px'}}>
                <div>
            <Table style={{width:500
            }} >
                <thead>
                    <tr>
                        <th style={{width:100}}>No.</th>
                        <th style={{width:500}}>Studio</th>
                        <th style={{width:300}}>Seat</th>
                        <th style={{width:100}}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderStudio()}
                </tbody>
            </Table>          
            </div>
            </center>
            </div>
            </div>
                </center>   
            </div>
         );
        } 
        return(
            <div>
                <Redirect to='/notfound' />
            </div>
        )
    }
}
 

const MapstateToprops=state=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id,
        roleUser:state.Auth.role
     
    }
}
export default connect(MapstateToprops,{LoginSuccessAction}) (Managestudio);