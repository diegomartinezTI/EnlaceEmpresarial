import React, { Component } from 'react';
import { Platform 
       , StyleSheet
       , Text
       , View
       , FlatList
       , TouchableOpacity
       , Image
       , SafeAreaView
       , ToastAndroid
       , AsyncStorage
       , ActivityIndicator
       , Alert
       , Button
       , Modal
       , ImageBackground } from 'react-native';
        
import ic_menu from '../Image/list.png'
import Drawer from 'react-native-drawer'

import MyHeader from "./menu";


console.disableYellowBox = true;

const menu = [
    { 'title': 'Inicio','goTo':'List' },
    { 'title': 'Carrito','goTo':'Carrito' },
    { 'title': 'Salir','goTo':'Out' }
]

export default class Home extends Component {

    constructor(props) {
      super(props)

      this.state = {
        isLoading: true
     
       }

    }


    getToken = async () =>{
      try{
        const token = await AsyncStorage.getItem('token');
        alert(token);
      }catch(error){
        console.log("something went wrong");
      }
    }

    componentWillMount(){
        this._retrieveData()
    }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {

        ToastAndroid.show('Bienvenido!', ToastAndroid.SHORT);

      }else{
        this.props.navigation.navigate('Login')
      }
    } catch (error) {
  // Error retrieving data
      alert(`error`)
      this.props.navigation.navigate('Login')
    }
  };
 
  GetItem (id) {
    
     AsyncStorage.setItem('idService',id);
     this.props.navigation.navigate('Item')
   
  }
   
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: 5,
         width: "100%",
         backgroundColor: "white",
       }}
     />
   );
 }
 
 webCall=()=>{
 
  return fetch('https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?parametro=servicios')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson.fruits
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
 
 }
 
 componentDidMount(){
 
  this.webCall();
  //this.getToken();
 
 }
    renderDrawer() {
        //SlideMenu
        return (<MyHeader  navigation={this.props.navigation}/>);
    }

    openDrawer() {
        this.drawer.open()
    }

    closeDrawer() {
        this.drawer.close()
    }

    render() {
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
                          style={{backgroundColor: 'white',marginTop: 8}} 
                          data={ this.state.dataSource } 
                          ItemSeparatorComponent = {this.FlatListItemSeparator} 
                          renderItem={({item}) =>  
                              <View style={{width: '100%',alignItems: 'center'}}>
                                <View style={styles.itemList}>
                                  <Image source = {{ uri: item.image }} style={styles.imageView} />
                                  <View style={{flex:1, flexDirection: 'column',width: '70%'}}>
                                    <Text   style={{fontWeight: 'bold',color: 'black'}} >{item.nameService}</Text>
                                    <Text  style={styles.textView} >{item.describeProduct.substring(0,80)}...</Text>
                                  </View>
                                    
                                  <View style={styles.go}>
                                    <TouchableOpacity 
                                    onPress={this.GetItem.bind(this, item.id)}
                                    underlayColor='#fff'>
                                      <Image 
                                        source={require('../images/go.png')}
                                      />
                                    </TouchableOpacity>
                                  </View>                     
                                  
                                </View>
                              </View>
                            }
                   
                          keyExtractor={(item, index) => index.toString()}
                          
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
        backgroundColor: 'white',
    },
    main: {
        flex: 1.0,
        backgroundColor: 'white'
    }
}

const styles = {
    mainContainer: {
        flex: 1.0, 
    },
    safeAreaStyle: {
        flex: 1.0,
        backgroundColor: 'white',
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
        tintColor: 'black'
    },
    menuContainer: {
        flex: 1.0,
        backgroundColor: 'white',
        
    },
    menuTitleContainer: {
        alignItem:'left',
        height: 60,
        width:'100%',
        flexDirection:'row',
    },
    menuTitle: {
        width:'100%',
        color: 'black',
        textAlign: 'left',
        fontSize: 17,
        alignSelf:'center',
    },
    imageView: {
 
    width: '20%',
    height: 110 ,
    margin: 7,
    borderRadius : 7
 
},
 
textView: {
 
    width:'100%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
},itemList:{
    width: '95%',
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5,
    marginTop: 2,
    borderLeftWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderTopWidth: 1,
    borderColor: 'rgba(169,169,169,1)'
  },go:{
      width: '10%'
      ,alignItems: 'center'
      ,justifyContent: 'center' 
      ,borderColor: 'rgba(169,169,169,1)'
  }
}