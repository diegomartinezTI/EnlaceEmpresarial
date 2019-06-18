import React, { Component } from "react";
import  { 
          YellowBox
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
        , AsyncStorage
        , ActivityIndicator
        , SafeAreaView
        , TouchableOpacity
        , TouchableHighlight
        , FlatList} from 'react-native';


import ic_menu from '../Image/list.png'
import Drawer from 'react-native-drawer'

import MyHeader from "./menu";

class FormActivity extends React.Component {
 	
	constructor(props){

    super(props);
 

    this.state = {number: '',month: '',cvv: '',year: '',name: '',isLoading: true, name: '', idUser: 0,dataSource: ''};
  }


  webCall=()=>{
    
    url = 'https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?parametro=listCart&idUser='+this.state.idUser;
    //alert(url);

    return fetch(url)
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
               isLoading: false,
               dataSource: responseJson.data
             }, function() {

               // In this block you can do something with new state.
             });
           })
           .catch((error) => {
             console.error(error);
           });
  }

   _retrieveData = async () => {
    try {
      const name   = await AsyncStorage.getItem('name');
      const idUser = await AsyncStorage.getItem('idUser');

      this.setState({
           name:name
          ,idUser:idUser
      })

      //alert(this.state.idUser);
      this.webCall();
    } catch (error) {
  // Error retrieving data
      alert(`error`)
      this.props.navigation.navigate('Login')
    }
  }
 

  componentWillMount(){
    this._retrieveData();
    
  }


  sumando(){
    suma = 0;

    this.state.dataSource.map((data) => {
      suma = suma + parseInt(data.precioUnitario);      
    })

    return (
         <Text>${suma}</Text> 
      );
  }


  renderDrawer() {
        //SlideMenu
        return ( <MyHeader  navigation={this.props.navigation}/>);
    }

    openDrawer() {
        this.drawer.open()
    }

    closeDrawer() {
        this.drawer.close()
    }

	render() {

    
    let {number,month,cvv,year,name} = this.state;

    if (this.state.isLoading) {
     return (
 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
         <ActivityIndicator size="large" />
 
       </View>
       
      );  
    }

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
        <View>{this.sumando()}</View>
			</ScrollView>

		);*/

    return(
 
          <SafeAreaView style={styles.safeAreaStyle}>
          <View style={styles.mainContainer}>
              <Drawer
                  ref={(ref) => this.drawer = ref}
                  content={this.renderDrawer()}
                  type='static'
                  tapToClose={true}
                  openDrawerOffset={0.35}
                  styles={drawerStyles}>
                  {/* //Main View */}
                  <View style={styles.headerContainer}>
                      <View style={styles.menuButton}>
                          <TouchableOpacity
                              onPress={this.openDrawer.bind(this)}>
                              <Image style={{ tintColor: 'white' }} source={ic_menu} />
                          </TouchableOpacity>
                      </View>
                      <Text style={styles.headerTitle}>Enlace Empresarial</Text>
                      <View style={styles.menuButton} />
                  </View>
                  
                  <View style={{width:'100%',backgroundColor: 'white',justifyContent: 'center',alignItems: 'center' }}>
                      <Image style={{width: 150, height: 150}} source={require('../images/logo.png')}/>
                      <View style={{margin:17}} />
                     
                      <Text style={styles.textInfo}>Total a depositar: {this.sumando()}</Text>
                      <Text style={styles.textInfo}>Banco: HSBC</Text>  
                      <Text style={styles.textInfo}>N° Cta.: 6426007914</Text>
                      <Text style={styles.textInfo}>CLABE:021420064260079146</Text>
                      <Text style={styles.textInfo}>Nombre: José Ángel Hernández Villalpando</Text>

                      <View style={{margin:17}} />
                       
                  
                    <View style={{margin:40}} />
                    <Text style={styles.textStyle}>Copyright © 2019</Text>
                    <Text style={styles.textStyle}>Todos los derechos reservados </Text>
                    <Text style={styles.textStyle}>Enlace Empresarial ® D.R. Mundial</Text>
                    <Text style={styles.textStyle}>México: 01.800.53.63.525 WhatsApp: 55 3648 8529 </Text>
                    <Text style={styles.textStyle}>Skype: Enlace Empresarial Mundial.</Text>
                    <Text style={styles.textStyle}>https://www.enlaceempresarial.com</Text>
                    
                    <View style={{margin:7}} />
                </View>
              
            </Drawer>


          </View>
      </SafeAreaView>
 
        );
	}
}
/*const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: "#F5FCFF",
		marginTop: 15
	},
  centerView:{
    justifyContent: "center",
    alignItems: "center"
  },
  input:{
    width: '30%',
    borderColor: 'gray', 
    borderBottomWidth: 1
  },
  inputLargo:{
    width: '90%',
    borderColor: 'gray', 
    borderBottomWidth: 1
  },
   MainContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 50
  },
  textStyle:{
    fontSize: 10
  }

});*/

const drawerStyles = {
    drawer: {
        flex: 1.0,
        backgroundColor: '#3B5998',
    },
    main: {
        flex: 1.0,
        backgroundColor: 'white'
    }
}

const styles = {
  mainContainer: {
      flex: 1.0,
      backgroundColor: 'white'
  },
  safeAreaStyle: {
      flex: 1.0,
      backgroundColor: '#3B5998',
  },
  headerContainer: {
      height: 44,
      flexDirection: 'row',
      justifyContect: 'center',
      backgroundColor: 'black',
  },
  headerTitle: {
      flex: 1.0,
      textAlign: 'center',
      alignSelf: 'center',
      color: 'white'
  },
  menuButton: {
      marginLeft: 8,
      marginRight: 8,
      alignSelf: 'center',
      tintColor: 'white'
  },
  menuContainer: {
      flex: 1.0,
      backgroundColor: 'black',
  },
  menuTitleContainer: {
      alignItem:'center',
      height: 60,
      width:'100%',
      flexDirection:'row',
  },
  menuTitle: {
      width:'100%',
      color: 'white',
      textAlign: 'center',
      fontSize: 17,
      alignSelf:'center',
  },imageView: {
 
    width: '20%',
    height: 100 ,
    margin: 7,
    borderRadius : 7
 
},
 
textView: {
 
    width:'15%', 
    textAlignVertical:'center',
    padding:2,
    color: '#000'
 
},
 
titleView: {
 
    width:'25%', 
    textAlignVertical:'center',
    padding:2,
    color: '#000',
    fontWeight: 'bold',
    color: 'black'
 
},
 
monthView: {
 
    width:'25%', 
    textAlignVertical:'center',
    padding:2,
    color: '#000',
    fontWeight: 'bold',
    color: 'black'
 
}
}
export default FormActivity;