import React, { Component } from "react";
import { Dimensions
       , AsyncStorage
       , Platform
       , StyleSheet
       , Text
       , View
       , Button
       , TextInput
       , ScrollView
       , Image
       , Alert
       , ActivityIndicator
       , ImageBackground
       , TouchableOpacity } from "react-native";

var { height, width } = Dimensions.get('window');

var ancho  = (width - 40);

class LoginActivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: 'diegomp1407@gmail.com',password: '123456',isLoading: false};

  }
  
  pruebas=()=>{ 

    if(this.state.username != "" && this.state.password != ""){
      this.setState({
         isLoading: true
       });
      url = 'https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?usuario='+this.state.username+'&pass='+this.state.password+'&parametro=login';
      return fetch(url)
         .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
               isLoading: true,
               dataSource: responseJson.userData
             }, function() {

              this.setState({
                 isLoading: false
               });
              //alert(url);
               // In this block you can do something with new state.
              if(this.state.dataSource.name != ""){
                AsyncStorage.setItem('name',this.state.dataSource.name);
                AsyncStorage.setItem('idUser',this.state.dataSource.id);
                AsyncStorage.setItem('typeRegister',this.state.dataSource.typeRegister);
                AsyncStorage.setItem('token',this.state.dataSource.token);
                this.props.navigation.navigate('List');
              }else{
                this.props.navigation.navigate('Login');
                alert("Verifica tus credenciales...");
              }

             });
         
         })
         .catch((error) => {
           console.error(error);
           alert("Error en conexión de internet...");
         });
    }else{
      alert("Ingresa los datos correctos...");
    }
 
  }


  

  render() {
    let {username,password} = this.state;

    if (this.state.isLoading) {
     return (
 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
         <ActivityIndicator size="large" />
 
       </View>
       
     ); 
 
   }
    
    return (
      <ImageBackground
          source={require('../images/back4.png')} blurRadius={0} style={styles.container}> 
          <View style={{margin:20}} /> 
        
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
        <Text style={styles.titulo}>Enlace Empresarial</Text>

        
        <View style={{borderRadius: 20,width: '90%',position: 'absolute',bottom:50}}>
          <TextInput 
              value={username}
              placeholder = "Correo electrónico"
              refs = "textInput"
              onChangeText = {(username) => this.setState({username})}
              style={styles.input}
            />
            <View style={{margin:4}} />
           <TextInput 
              value={password}
              placeholder = "Contraseña"
              refs = "textInput"
              onChangeText = {(password) => this.setState({password})}
              secureTextEntry={ true }
              style={styles.input}
            />  


            <View style={{margin:7}} /> 

            <TouchableOpacity
              style={styles.buttons}
              onPress={this.pruebas.bind(this)}
              underlayColor='#fff'>
                <Text style={styles.textButton}> Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={{margin:10}} />

            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Register')}
              underlayColor='#fff'>
              <Text style={{color:'white',textAlign: 'center',width: '100%',fontWeight: 'bold'}}>Registrarse</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity
              style={styles.buttons}
              onPress={() => this.props.navigation.navigate('Register')}
              underlayColor='#fff'>
                <Text style={styles.textButton}> Registrarse</Text>
            </TouchableOpacity>*/}
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,  
    alignItems: "center" 
  } ,
  centro:{
    padding:10,
    backgroundColor: 'rgba(255, 255, 255,.5)',
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
    width: '90%',
    marginTop: 50
  },
  inputs: {
    width: '90%', 
    borderRadius: 10
  },
  input:{
    width:'100%',
    borderWidth: 0, 
    borderRadius: 20, 
    fontSize: 16,
    fontFamily: 'Iowan Old Style',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255,.3)'
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
  },titulo:{
    width:'80%',
    borderWidth: 0, 
    borderRadius: 20, 
    fontSize: 26,
    fontFamily: 'Iowan Old Style',
    textAlign: 'center',
    color: 'white'
  }
});
export default LoginActivity;