import React, { Component } from "react";
import {   YellowBox
         , Platform
         , StyleSheet
         , Text
         , View
         , Button
         , TextInput
         , ScrollView
         , Image
         , Alert
         , ToastAndroid
         , Linking
         , AsyncStorage} from "react-native";

class FormRegisterActivity extends React.Component {
 	
	constructor(props){

    super(props);

    this.state = {number: '',month: '',cvv: '',year: '',name: '',dataPrice: 0};
  }

  webCall = async () =>{

    try{
        const typeRegister = await AsyncStorage.getItem('typeRegister');

        const url = 'https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?parametro=membership&typeRegister='+typeRegister;
        //alert(url);

        return fetch(url)
               .then((response) => response.json())
               .then((responseJson) => {
                 this.setState({
                   isLoading: false,
                   dataSource: responseJson.data
                 }, function() {
                   // In this block you can do something with new state.
                   this.setState({
                      dataPrice: this.state.dataSource.price
                   }); 
                 });
               })
               .catch((error) => {
                 console.error(error);
               });
        //alert(typeRegister);
       
      }catch(error){
        console.log(error + "something went wrong");
        alert("Error de conexión a internet #1");
      }

     

  }

  componentDidMount(){

    this.webCall();

    Alert.alert(
      'Enlace Empresarial',
      'Agradecemos su registro, lo invitamos a adquirir nuestra membresía que le da acceso a todos los beneficios como lo son Editoriales de prestigio, Red de negocios con más de 500 contactos, Redes Sociales y pertenecer al exclusivo Club Business EEM (On line). ',
      [
        
         
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        {
          text:'Aviso de privacidad',
          onPress: () => Linking.openURL('https://enlaceempresarial.com/blog/aviso-de-privacidad/')
        },
      ],
      {cancelable: false},
    );

  }

	render() {

    
    let {number,month,cvv,year,name,dataPrice} = this.state;

		/*return (
			<ScrollView style={styles.container}> 

      <View style={{margin:7}} />
          
        <View style={styles.centerView}>
          <Image  source={require('../images/tdc.png')} style={{width:100,height:100}} />     
        
           
          <View style={{flex:1, flexDirection: 'row'}}> 
             <TextInput
              style={styles.inputLargo}
              value={number}
              placeholder = "4912445588994455"
              refs = "textInput"
              onChangeText = {(number) => this.setState({number})}
            />
          </View>
          
          <View style={{flex:1, flexDirection: 'row'}}>  
            <TextInput
              style = {styles.input}
              value={month}
              placeholder = "MM"
              refs = "textInput"
              onChangeText = {(month) => this.setState({month})}
            />
            <TextInput
              style = {styles.input}
              value={year}
              placeholder = "AA"
              refs = "textInput"
              onChangeText = {(year) => this.setState({year})}
            />
                      
           
            <TextInput
              style = {styles.input}
              value={cvv}
              placeholder = "CVV"
              refs = "textInput"
              onChangeText = {(cvv) => this.setState({cvv})}
            />
          </View>

          <TextInput
            style={styles.inputLargo}
            value={name}
            placeholder = "NOMBRE COMPLETO"
            refs = "textInput"
            onChangeText = {(name) => this.setState({name})}
          />

        </View>
           
        <View style={{margin:7}} />  
          <Button   
            color='black'
            title='Pagar'
          /> 
          <View style={{margin:7}} />
			</ScrollView>

		);*/

     return(
 
            <View style = { styles.MainContainer }>
 
 
               <Image style={{width: 150, height: 150}} source={require('../images/logo.png')}/>
              <View style={{margin:17}} />
              <View>
                <Text style={styles.textInfo}>Precio: ${this.state.dataPrice}</Text>
                <Text style={styles.textInfo}>Banco: HSBC</Text>  
                <Text style={styles.textInfo}>N° Cta.: 6426007914</Text>
                <Text style={styles.textInfo}>CLABE:021420064260079146</Text>
                <Text style={styles.textInfo}>Nombre: José Ángel Hernández Villalpando</Text>
                <View style={{margin:17}} />
                <View style={{width:200,marginLeft: 50}}>
                  <Button 
                    onPress={() => this.props.navigation.navigate('Login')}
                    color='black'
                    title='Iniciar sesión'
                    style={{
                       width: 100,
                      justifyContent: 'center',
                    }}
                  /> 
                </View>
                
                <View style={{margin:40}} />
                <Text style={styles.textStyle}>Copyright © 2019</Text>
                <Text style={styles.textStyle}>Todos los derechos reservados </Text>
                <Text style={styles.textStyle}>Enlace Empresarial ® D.R. Mundial</Text>
                <Text style={styles.textStyle}>México: 01.800.53.63.525 WhatsApp: 55 3648 8529 </Text>
                <Text style={styles.textStyle}>Skype: Enlace Empresarial Mundial.</Text>
                <Text style={styles.textStyle}>https://www.enlaceempresarial.com</Text>
              </View>
               <View style={{margin:7}} />
 
            </View>
 
        );
	}
}
const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 50
    },
 
    bottomView:{
 
      width: '100%', 
      height: 50,  
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
 
    textStyle:{
      textAlign: 'center',
      color: '#5E5A5A',
      fontSize:12
    },
    textInfo:{
      fontSize:15,
      textAlign: 'center'
    }
});
export default FormRegisterActivity;