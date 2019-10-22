import React, { Component } from 'react';
import firebase from "../config/fire";
import 'firebase/database';

export class FireBaseDB extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('users');
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            name: '',
            email: ''
        }
    }
    

    componentDidMount(){
        const ref = firebase.firestore().collection('users').doc('dpIO3blE7ZCaSzeIdMR7');
        // ref.forEach(element => {
        //     element.get().then((ele) => {
        //         console.log(ele);
        //     })
        // })
        ref.get().then((data)=>{
            console.log(data.data())
        });
        // firebase.database().ref('users').once('value').then(snapshot => {
        //     snapshot.forEach(element => {
        //         this.state.data.push({
        //             id: element.key,
        //             ...element.val()
        //         })
        //     })
        // })
    }

    submitForm = (e) => {
        e.preventDefault();
        const {name, email} = this.state;
        this.ref.add({
            name,
            email
        }).then(()=>{
            this.setState({
                name: '',
                email: ''
            })

        })
    }

    render() {
        return (
            <div>
                {console.log(this.state)}
                <form onSubmit={this.submitForm}>
                    <input type="text" placeholder="name" onChange={e => this.setState({name: e.target.value})} />
                    <input type="email" placeholder="email" onChange={e => this.setState({email: e.target.value})} />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default FireBaseDB
