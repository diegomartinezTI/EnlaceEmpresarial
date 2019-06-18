import React, { Component } from "react";

import { AsyncStorage
       , YellowBox
       , Platform
       , StyleSheet
       , Text
       , View
       , Button
       , ScrollView
       , Image
       , Alert
       , ToastAndroid
       , ImageBackground 
       , Picker
       , TouchableOpacity } from "react-native";

import { Dropdown } from 'react-native-material-dropdown';
import { Input,Icon } from 'react-native-elements' 

class RegisterActivity extends React.Component {
 	
	constructor(props){

    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);

    this.state = {username: '',email: '',rfc: '',phone: '',company: '',pass: '',confirm: '',data: 'Física con actividad empresarial'};
  }

  register=()=>{

    name    = this.state.username;
    email   = this.state.email;
    rfc     = this.state.rfc;
    phone   = this.state.phone;
    company = this.state.company;
    pass    = this.state.pass;
    confirm = this.state.confirm;
    data    = this.state.data;


    if (!this.validateEmail(email) || email == "" ) {
      alert("Correo incorrecto");
      cont = 1
    } 

    cont = 0;

    if(name == ""  || rfc == "" || phone == "" || company == "" || pass == "" || confirm == "" || data == ""){
      ToastAndroid.show('Aún faltan campos por llenar...', ToastAndroid.LONG);
      cont = 1
    }

    if(pass != confirm){
      ToastAndroid.show('Las contraseñas no coinciden...', ToastAndroid.LONG);

      cont = 1 
    }

    if(cont == 0){
      url = 'https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?name='+name+'&mail='+email+'&rfc='+rfc+'&company='+company+'&tipoRegistro='+data+'&pass='+pass+'&tel='+phone+'&parametro=register'
      
      return fetch(url)
         .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
               isLoading: false,
               dataSource: responseJson.data
             }, function() { 

              if(this.state.dataSource.state == 1 || this.state.dataSource.state == "1"){
                //alert("Bienvenido "+ name + " has sido " +this.state.dataSource.message);
                AsyncStorage.setItem('idUser',this.state.dataSource.id);
                AsyncStorage.setItem('typeRegister',this.state.dataSource.typeRegister);
                this.props.navigation.navigate('FormRegister');
              }else{
                alert(this.state.dataSource.message);
              }

             });
         
         })
         .catch((error) => {
           console.error(error);
           alert(error);
         });


    }

  }

  getPicker(){

    alert(this.state.data);

  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

	render() {

  

    let {username,email,rfc,phone,company,pass,confirm} = this.state;

		return (
      <ImageBackground  source={require('../images/back4.png')} blurRadius={0} style={styles.container}>
        <ScrollView style={{width: '100%'}}> 
          <View style={{alignItems: "center",width: '100%'}}>
            
            <View style={{backgroundColor: 'rgba(255, 255, 255,.3)',borderRadius: 100,padding: 30}}>
              <Image
                style={{
                  height: 80,  
                  width: 80,
                  justifyContent: 'center'
                }}
                source={require('../images/logo.png')}
              />
            </View>

            <View style={{margin:10}} />

            <View style={{padding: 30}}>
              <View style={styles.fila}>
                <Image
                  source={require('../images/user.png')}
                  fadeDuration={0}
                  style={{width: 30, height: 30,marginTop: 10}}
                />
                <Input 
                  value={username}
                  placeholder = "Nombre completo"
                  refs = "Input"
                  onChangeText = {(username) => this.setState({username})} 
                  style={{width: '90%',borderBottomWidth: 0}}
                />
              </View>              
            

            <View style={styles.fila}>
              <Image
                source={require('../images/mail.png')}
                fadeDuration={0}
                style={{width: 30, height: 30,marginTop: 10}}
              />
              <Input 
                value={email}
                placeholder = "Correo electrónico"
                refs = "Input"
                onChangeText = {(email) => this.setState({email})}
              />
            </View>

            <View style={styles.fila}>
              <Image
                source={require('../images/rfc.png')}
                fadeDuration={0}
                style={{width: 30, height: 30,marginTop: 10}}
              />
              <Input
                value={rfc}
                placeholder = "RFC"
                refs = "Input"
                onChangeText = {(rfc) => this.setState({rfc})}
              />
            </View>

            <View style={styles.fila}>
              <Image
                source={require('../images/phone.png')}
                fadeDuration={0}
                style={{width: 30, height: 30,marginTop: 10}}
              />
              <Input 
                value={phone}
                placeholder = "Teléfono"
                refs = "Input"
                onChangeText = {(phone) => this.setState({phone})}
              />
            </View>

            <View style={styles.fila}>
              <Image
                source={require('../images/razon.png')}
                fadeDuration={0}
                style={{width: 30, height: 30,marginTop: 10}}
              />
              <Input 
                value={company}
                placeholder = "Razón social"
                refs = "Input"
                onChangeText = {(company) => this.setState({company})}
              />
            </View>

            <View style={styles.fila}>
              <Image
                source={require('../images/person.png')}
                fadeDuration={0}
                style={{width: 30, height: 30,marginTop: 10}}
              /> 

              <Picker
                selectedValue={this.state.data}
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({data: itemValue})
                }
              >
                <Picker.Item label="Física con actividad empresarial" value="Física con actividad empresarial" />
                <Picker.Item label="Moral" value="Moral" />
                <Picker.Item label="Instituciones y organizaciones" value="Instituciones y organizaciones" />
              </Picker>
            </View>

            <View style={styles.fila}>
              <Image
                source={require('../images/key.png')}
                fadeDuration={0}
                style={{width: 30, height: 30,marginTop: 10}}
              />
               <Input
                style = {styles.input}
                value={pass}
                placeholder = "Contraseña"
                refs = "Input"
                onChangeText = {(pass) => this.setState({pass})}
                secureTextEntry={ true }
              />
            </View>


            <View style={styles.fila}>
              <Image
                source={require('../images/key.png')}
                fadeDuration={0}
                style={{width: 30, height: 30,marginTop: 10}}
              />
              <Input
                style = {styles.input}
                value={confirm}
                placeholder = "Confirma contraseña"
                refs = "Input"
                onChangeText = {(confirm) => this.setState({confirm})}
                secureTextEntry={ true }

              />
            </View>

            <View style={{margin:15}} />

            <TouchableOpacity
              style={styles.buttons}
              onPress={this.register.bind()} 
              underlayColor='#fff'>
                <Text style={styles.textButton}> Registrarse</Text>
            </TouchableOpacity>

             {/*<Button 
              onPress={this.register.bind()} 
              color='black'
              title='Registrarse'
            />*/}
          </View>
        </View>
        </ScrollView>
      </ImageBackground>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: "#F5FCFF", 
    justifyContent: "center",
    alignItems: "center"
	},
  titles:{
    fontSize: 15,
    color: 'black'
  } ,
  campo:{
    width: '80%'
  },
  viewItem:{
    width: '100%',
    flexDirection: 'row'
  },
  icono:{
    width: '10%',
    justifyContent: 'center',
    marginTop: 8,
    height: 30
  },
  fila:{
    flexDirection: 'row'
    ,width: '100%'
    ,backgroundColor: 'rgba(255, 255, 255,.3)'
    ,marginTop: 5
    ,borderRadius: 20
  },
  buttons:{
    backgroundColor:'black'
   ,borderRadius:20
   ,borderWidth: 1
   ,borderColor: 'black'
   ,height: 50
   ,textAlignVertical:'center'
  },
  textButton:{
    color: '#fff'
    ,textAlign: 'center'
    ,marginTop: 15
    ,fontSize: 15
  }
});
export default RegisterActivity;