import firebase from 'firebase';
import React,{Component} from 'react';
import { StyleSheet,View } from 'react-native';
import {Header,Button,Spinner,Card,CardSection} from './components/common'; {/* automatically import from index.js file*/}
import LoginForm from './components/LoginForm';
export default class  App extends Component{
  state={loggedIn:null};
  componentWillMount(){
    const config={
      apiKey: "AIzaSyB2YDzVJXkbn2E7kWIwYWfgH2FH_P03Lk0",
      authDomain: "authentication-17a47.firebaseapp.com",
      databaseURL: "https://authentication-17a47.firebaseio.com",
      projectId: "authentication-17a47",
      storageBucket: "authentication-17a47.appspot.com",
      messagingSenderId: "256438208151"
    }
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{flexDirection:'row'}}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
