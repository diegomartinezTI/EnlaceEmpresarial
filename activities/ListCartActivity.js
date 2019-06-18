import React, { Component } from 'react';
 
import {  Modal
        , StyleSheet
        , Platform
        , View
        , ActivityIndicator
        , FlatList
        , Text
        , Image
        , Alert
        , YellowBox
        , TouchableHighlight
        , AsyncStorage
        , RefreshControl
        , Button
        , SafeAreaView
        , TouchableOpacity
        , BackHandler
        , ToastAndroid} from 'react-native';


import ic_menu from '../Image/list.png'
import Drawer from 'react-native-drawer'

import MyHeader from "./menu";



 
export default class ListCartActivity extends Component {
 
 constructor(props) {
 
   super(props);
 
   this.state = {
 
     isLoading: true,
     name: '', 
     idUser: 0
 
   } 
 
 }
 
  GetItem (service_name) {
    
    Alert.alert(
      service_name,
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
   
  }
   
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
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


           });
         })
         .catch((error) => {
           console.error(error);
         });
 
 }
 
getMonthActive(mes){

    var SampleNameArray = ["Año en curso","Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    result = SampleNameArray[(mes)]     
    
    return result
     
}  

  sumando(){
    suma = 0;

    this.state.dataSource.map((data) => {
      suma = suma + parseInt(data.precioUnitario);
      
    })

    return (
         <Text style={{width:'100%',textAlign: 'right',fontSize: 28}}>${suma}</Text> 
      );
  }

  alertDelete(id){

    Alert.alert(
      '',
      '¿Estás seguro que deseas removerlo de tu carrito de compras? ',
      [
        
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteItem(id)},
      ],
      {cancelable: false},
    );

  }

  deleteItem(id){
    
    url = 'https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?parametro=deleteItem&idItem='+id;
   
    return fetch(url)
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
               isLoading: true,
               dataResponse: responseJson.data
             }, function() {
               this.setState({
                isLoading: false
               });
               
               if (this.state.dataResponse.deleted == 1){
                  this.webCall(); 
                  alert("Eliminado correctamente...");
               }else{
                  alert("Ocurrió un error al intentar remover del carrito, vuelve a intentarlo, verifica tu conexión de internet o comunicate con EEM.");
               }
               
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
  };

  componentWillMount(){
    this._retrieveData();
    
  }

  handleBackButton() {
        //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }


   componentDidMount() {
    this._retrieveData();

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
 
   if (this.state.isLoading) {
     return (
 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
         <ActivityIndicator size="large" />
 
       </View>
       
     ); 
 
   }
 
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
                  
                  <FlatList 
                      data = { this.state.dataSource }
                      
                      ItemSeparatorComponent = {this.FlatListItemSeparator}
               
                      renderItem={({item}) => 
                          
                          <View style={{flex:1, flexDirection: 'row'}}> 

                            <TouchableHighlight onPress={() => this.alertDelete(item.id)}>
                              <Image  source={require('../images/minus.png')} style={{width:20,height:20,marginTop: 50}} />
                            </TouchableHighlight>
                            <Image source = {{ uri: item.image }} style={styles.imageView} />
                          
                            <Text style={styles.titleView}>{item.nameService}</Text>
                            <Text style={styles.monthView} >{this.getMonthActive(item.months)}</Text>
                            <Text onPress={this.GetItem.bind(this, item.nameService)} style={styles.textView} > ${item.precioUnitario}</Text>
                            
                          </View>
                      
                        }
               
                      keyExtractor={(item, index) => index.toString()}
                      
                      />

                  <View>{this.sumando()}</View>

                  <Button  
                      onPress={() => this.props.navigation.navigate('Form')}
                      color='black'
                      title='Realizar pago'
                      style={{
                          width: 500,
                          justifyContent: 'center'
                        }}
                    /> 
                  
              </Drawer>


          </View>
      </SafeAreaView>
   );
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