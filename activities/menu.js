import React from "react";
import { Header } from "react-native-elements";
import {ImageBackground,View,FlatList,Image,TouchableOpacity,Text } from 'react-native';

const menu = [
    { 'title': 'Inicio','goTo':'List','image':require('../images/home.png') },
    { 'title': 'Carrito','goTo':'Carrito','image':require('../images/cart.png')  },
    { 'title': 'Salir','goTo':'Out','image':require('../images/out.png')  }
]



const MyHeader = ({ navigation,props }) => {

  return (
            <View style={styles.menuContainer}>

                <ImageBackground source={require('../images/back2.png')} blurRadius={0} style={{width: '100%',alignItems: 'center' }}> 
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
                </ImageBackground>
                <FlatList
                    style={{ flex: 1.0 }}
                    data={menu}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        const imagenes = item.image; 
                        return (
                            <TouchableOpacity 
                              style={styles.menuTitleContainer} 
                              onPress={() => navigation.navigate(item.goTo)}
                            > 
                             
                              <Image
                                    style={{
                                      height: 30,  
                                      width: 30,
                                      marginTop: 12,
                                      justifyContent: 'center'
                                    }}
                                    source={item.image}
                                  /> 
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        );
};

export default MyHeader;


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
 
    width:'90%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
}