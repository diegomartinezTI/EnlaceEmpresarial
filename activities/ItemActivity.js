import React, {Component} from 'react';

import {
  AsyncStorage,
  ToastAndroid,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Button,
  Animated,
  Easing,
  Image,
  YellowBox,
  ScrollView,
  WebView,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import ic_menu from '../Image/list.png'
import Drawer from 'react-native-drawer'
import { CheckBox } from 'react-native-elements'; 

import MyHeader from "./menu";

class ItemActivity extends React.Component {
 
  constructor (props) {  
    super(props)    

    this.state = {
      isLoading     : true,
      imageURL      : '',
      checked       : false,
      checkedFeb    : false,
      checkedMar    : false,
      checkedAbr    : false,
      checkedMay    : false,
      checkedJun    : false,
      checkedJul    : false,
      checkedAgo    : false,
      checkedSep    : false,
      checkedOct    : false,
      checkedNov    : false,
      checkedDic    : false,
      checkedYear   : false, 
      costoFisica   : 0,
      costoMoral    : 0,
      costoGobierno : 0,
      description   : '',
      months        : [],
      unitario      : 0,
      cargado : 0,
      inCart : ' pagado o en carrito de compras.',
      typeService : '',
      precio: '####',
      nameService:''
    }

     
  }  

  

  _retrieveData = async () => {

    try {
      const value = await AsyncStorage.getItem('idService');
      const idUser = await AsyncStorage.getItem('idUser');

      //alert("service => "+ value);
      //alert(idUser);
      if (value !== null) {
        
        return fetch('https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?parametro=buscaServicioId&id='+value+'&user='+idUser)
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
                isLoading     : false,
                dataSource    : responseJson.data,
                imageURL      : responseJson.data.image,
                costoFisica   : responseJson.data.costoFisica,
                costoMoral    : responseJson.data.costoMoral,
                costoGobierno : responseJson.data.costoGobierno,
                description   : responseJson.data.describeProduct,
                months        : responseJson.data.months.split(","),
                typeService   : responseJson.data.typeService,
                precio        : responseJson.data.precio,
                nameService   : responseJson.data.nameService,
                cargado       : 1
             }, function() { 
                //alert(this.state.nameService);
             });
           })
           .catch((error) => {
             console.error(error);
           });

      }else{
        alert(`error url`);
        //this.props.navigation.navigate('Login')
      }
    } catch (error) {
  // Error retrieving data
      alert(`error async`)
      //this.props.navigation.navigate('Login')
      console.log("error async => " + error);
    }
  }
  
   
  componentDidMount(){ 
    this._retrieveData();
    this.getMonthActive();
   
  }

 

  getMonthActive(mes){

    var SampleNameArray = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    var Payments = [];
    var month = new Date().getMonth()+1;

    for(let i = month; i < 12; i++){

      Payments.push(SampleNameArray[i]);

    }

    //alert(result);
    return result = Payments.indexOf(mes);
     
  }  

  addCart= async () => {
    Enero      = this.state.checked;
    Febrero    = this.state.checkedFeb;
    Marzo      = this.state.checkedMar;
    Abril      = this.state.checkedAbr;
    Mayo       = this.state.checkedMay;
    Junio      = this.state.checkedJun;
    Julio      = this.state.checkedJul;
    Agosto     = this.state.checkedAgo;
    Septiembre = this.state.checkedSep;
    Octubre    = this.state.checkedOct;
    Noviembre  = this.state.checkedNov;
    Diciembre  = this.state.checkedDic;
    year       = this.state.checkedYear;

    cadena = "";
    cont = 0;
    if(Enero == true ){
     cadena += '1|';
     cont = cont + 1;
    }
    if(Febrero == true ){
     cadena += '2|';
     cont = cont + 1;
    }
    if(Marzo == true ){
     cadena += '3|';
     cont = cont + 1;
    }
    if(Abril == true ){
     cadena += '4|';
     cont = cont + 1;
    }
    if(Mayo == true ){
     cadena += '5|';
     cont = cont + 1;
    }
    if(Junio == true ){
     cadena += '6|';
     cont = cont + 1;
    }
    if(Julio == true ){
     cadena += '7|';
     cont = cont + 1;
    }
    if(Agosto == true ){
     cadena += '8|';
     cont = cont + 1;
    }
    if(Septiembre  == true){
     cadena += '9|';
     cont = cont + 1;
    }
    if(Octubre == true ){
     cadena += '10|';
     cont = cont + 1;
    }
    if(Noviembre == true ){
     cadena += '11|';
     cont = cont + 1;
    }
    if(Diciembre  == true){
     cadena += '12|';
     cont = cont + 1;
    }
    if(year  == true){
     cadena += '0|';
     cont = cont + 1;
    }

      
    try {
      const idService    = await AsyncStorage.getItem('idService');
      const idUser       = await AsyncStorage.getItem('idUser');
      const typeRegister = await AsyncStorage.getItem('typeRegister');



      unitario = 0;
 
      if(typeRegister == "Física"){
        unitario = this.state.costoFisica;
      }
      if(typeRegister == "Moral"){
        unitario = this.state.costoMoral;
      }
      if(typeRegister == "Gobierno"){
        unitario = this.state.costoGobierno;
      }
       
      total = cont * unitario; 

      if (idService !== null) {
        url = 'https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?parametro=addCart&idProduct='+idService+'&idUser='+idUser+'&precioUnitario='+unitario+'&totalProducto='+total+'&estado=1&months='+cadena;  
        
        return fetch(url)
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
                isLoading     : true,
                dataSource    : responseJson.fruits
               
             }, function() { 
                this.setState({
                    isLoading     : false,
                 });
                this._retrieveData();
                alert("Agregado correctamente al carrito...");
                this.props.navigation.navigate('Carrito');


             });
           })
           .catch((error) => {
             console.error(error);
           });


      }else{
        this.props.navigation.navigate('Login')
      }
    } catch (error) {
  // Error retrieving data
      alert(`error`)
      this.props.navigation.navigate('Login')
    }


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

    let {checkedJun} = this.state;

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
          
        </View>   
      ); 
    }

    if (this.state.cargado == 1) {

      if(this.state.typeService == "Editoriales"){
      
         return (
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
                        
                      <ScrollView>  
                        <View style={{width:'100%',alignItems: 'center' }}>
                            
                            <Image source = {{ uri: this.state.imageURL }} style={{width: '100%',height: 200}}/>
                            <View style={{margin:7}} /> 

                            <View style={{width: '100%',alignItems: 'center'}}>
                              
                                <Text style={styles.titleItem}>{this.state.nameService}</Text>
                               
                            </View>

                            <View style={{ width: '95%',overflow:'hidden',marginTop: 10 }}>
                              <Text style={{width: '100%',textAlign:  'center'}}>{this.state.description}</Text>

                            </View>


                            <View style={{margin:10}} />
                            <Text style={{textAlign:'center', width: '80%',fontSize: 25}}>${this.state.precio}</Text>

                            <View style={{margin:7}} />
                            <View style={{flex:1, flexDirection: 'column',textAlign:'left', width: '100%'}}>


                                {this.getMonthActive("Enero") >= 0 ? (parseInt(this.state.months.indexOf('1')) >= 0 ? <Text style={styles.added}> Enero {this.state.inCart}</Text> : <CheckBox 
                                            title='Enero' 
                                            checked={this.state.checked}
                                            containerStyle={styles.chkMonths}
                                            checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                            onPress={() => this.setState({ checked: !this.state.checked })}
                                          />) : null}
                                
                                {this.getMonthActive("Febrero") >= 0 ? (parseInt(this.state.months.indexOf('2')) >= 0 ? <Text style={styles.added}> Febrero {this.state.inCart}</Text> : <CheckBox
                                    title='Febrero'
                                    checked={this.state.checkedFeb}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedFeb: !this.state.checkedFeb })}
                                  />) : null}

                                  {this.getMonthActive("Marzo") >= 0 ? (parseInt(this.state.months.indexOf('3')) >= 0 ? <Text style={styles.added}> Marzo {this.state.inCart}</Text> : <CheckBox
                                    title='Marzo'
                                    checked={this.state.checkedMar}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedMar: !this.state.checkedMar })}
                                  />) : null}

                                  {this.getMonthActive("Abril") >= 0 ? (parseInt(this.state.months.indexOf('4')) >= 0 ? <Text style={styles.added}> Abril {this.state.inCart}</Text> : <CheckBox
                                    title='Abril'
                                    checked={this.state.checkedAbr}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedAbr: !this.state.checkedAbr })}
                                  />) : null}

                                  {this.getMonthActive("Mayo") >= 0 ? (parseInt(this.state.months.indexOf('5')) >= 0 ? <Text style={styles.added}> Mayo {this.state.inCart}</Text> : <CheckBox
                                    title='Mayo'
                                    checked={this.state.checkedMay}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedMay: !this.state.checkedMay })}
                                  />) : null}

                                  {this.getMonthActive("Junio") >= 0 ? (parseInt(this.state.months.indexOf('6')) >= 0 ? <Text style={styles.added}> Junio {this.state.inCart}</Text> : <CheckBox
                                    title='Junio'
                                    checked={this.state.checkedJun}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedJun: !this.state.checkedJun })}
                                  />) : null}
                                  {this.getMonthActive("Julio") >= 0 ? (parseInt(this.state.months.indexOf('7')) >= 0 ? <Text style={styles.added}> Julio {this.state.inCart}</Text> : <CheckBox
                                    title='Julio'
                                    checked={this.state.checkedJul}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedJul: !this.state.checkedJul })}
                                  />) : null}

                                  {this.getMonthActive("Agosto") >= 0 ? (parseInt(this.state.months.indexOf('8')) >= 0 ? <Text style={styles.added}> Agosto {this.state.inCart}</Text> : <CheckBox
                                    title='Agosto'
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    checked={this.state.checkedAgo}
                                    containerStyle={styles.chkMonths}
                                    onPress={() => this.setState({ checkedAgo: !this.state.checkedAgo })}
                                  />) : null}

                                  {this.getMonthActive("Septiembre") >= 0 ? (parseInt(this.state.months.indexOf('9')) >= 0 ? <Text style={styles.added}> Septiembre {this.state.inCart}</Text> : <CheckBox
                                    title='Septiembre'
                                    checked={this.state.checkedSep}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedSep: !this.state.checkedSep })}
                                  />) : null}

                                  {this.getMonthActive("Octubre") >= 0 ? (parseInt(this.state.months.indexOf('10')) >= 0 ? <Text style={styles.added}> Octubre {this.state.inCart}</Text> : <CheckBox
                                    title='Octubre'
                                    checked={this.state.checkedOct}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedOct: !this.state.checkedOct })}
                                  />) : null}

                                  {this.getMonthActive("Noviembre") >= 0 ? (parseInt(this.state.months.indexOf('11')) >= 0 ? <Text style={styles.added}> Noviembre {this.state.inCart}</Text> : <CheckBox
                                    title='Noviembre'
                                    checked={this.state.checkedNov}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedNov: !this.state.checkedNov })}
                                  />) : null} 

                                  {this.getMonthActive("Diciembre") >= 0 ? (parseInt(this.state.months.indexOf('12')) >= 0 ? <Text style={styles.added}> Diciembre {this.state.inCart}</Text> : <CheckBox
                                    title='Diciembre'
                                    checked={this.state.checkedDic}
                                    containerStyle={styles.chkMonths}
                                    checkedIcon={<Image source={require('../images/check.png')}  style={{width:20,height:20}} />}
                                    uncheckedIcon={<Image source={require('../images/uncheck.png')} style={{width:20,height:20}} />}
                                    onPress={() => this.setState({ checkedDic: !this.state.checkedDic })}
                                  />) : null} 

                              <View style={{margin:7}} />
                              
                               
                            </View>

                            <View style={{width: '80%',margin:10,backgroundColor: 'white'}}>
                              <Button 
                                onPress={this.addCart.bind()}
                                color='black'
                                title='Agregar al carrito' 
                                style={{width:'100%',borderRadius: 5}}
                              />
                            </View> 
                        </View>
                      </ScrollView>
                    </Drawer>
                </View>
              </SafeAreaView>
        
          );  
        }else{
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
                  <ScrollView>
                    <View style={{width:'100%',backgroundColor: 'white',justifyContent: 'center',alignItems: 'center' }}>
                      <Image source = {{ uri: this.state.imageURL }} style={styles.imageView} />
    
                      <View style={{ height: 150, width: '80%',overflow:'hidden' }}>
                        <WebView
                          source={{ html: "<p style='text-align: justify;'>"+this.state.description+"</p>" }}
                          scalesPageToFit={true}
                        />
                      </View>
                      <View style={{margin:7}} />
                      <View style={{flex:1, flexDirection: 'column'}}> 
                        {(parseInt(this.state.months.indexOf('0')) >= 0 ? <Text style={styles.added}> Año en curso {this.state.inCart}</Text> : <CheckBox 
                          title='Año en curso' 
                          checked={this.state.checkedYear} 
                          onPress={() => this.setState({ checkedYear: !this.state.checkedYear })}
                        />)}

                      </View>
                      <View style={{width: '80%',margin:10,backgroundColor: 'white'}}>
                        <Button 
                              onPress={this.addCart.bind()}
                              color='black'
                              title='Agregar al carrito' 
                              style={{width:'100%',borderRadius: 5}}
                          />
                      </View>
                    </View>
                </ScrollView>
               
                </Drawer>
              </View>
            </SafeAreaView>
          );
        }
    }  
  }
}

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
    } ,
 
textView: {
 
    width:'90%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
},
    added:{
      padding: 5
      ,borderWidth: 0
      ,backgroundColor: 'white'
      ,borderWidth: 1
      ,borderColor: 'rgba(169,169,169,1)'
      ,borderRadius: 5
      ,backgroundColor: 'rgba(0,0,0,.1)'
      ,color:'black'
    },
    imageView: {
      width: '100%',
      height: 250 ,
      margin: 7,
      borderRadius : 7,
      marginLeft: -10
    },
    TextStyle:{
      fontSize : 25,
      textAlign: 'center'
   },
   textshadow:{
    fontSize:100,
    color:'#FFFFFF',
    fontFamily:'Times New Roman',
    paddingLeft:30,
    paddingRight:30,
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },
  titleItem:{
    backgroundColor: 'rgba(0,0,0,.7)'
    ,padding: 10
    ,marginTop: -40
    ,color:'white'
    ,fontSize: 20
  },
  chkMonths:{ 
     padding: 5
    ,borderWidth: 0
    ,backgroundColor: 'white'
    ,borderWidth: 1
    ,borderColor: 'rgba(169,169,169,1)'
    ,borderRadius: 5
    ,backgroundColor: 'rgba(0,0,0,.1)'
    ,color:'white'
  }
}
export default ItemActivity;