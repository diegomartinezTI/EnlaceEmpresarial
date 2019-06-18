import React, {Component} from 'react';

import {
   Platform
  ,StyleSheet
  ,Text
  ,View
  ,Button 
  ,Animated
  ,Easing
  ,Image
  ,YellowBox
  ,ImageBackground
  ,AsyncStorage 
} from 'react-native';

class HomeActivity extends React.Component {
 
   constructor () {  
        super()   
        this.animatedValue = new Animated.Value(0)   
        
    }  


    async getToken(){
      try{
        let token = await AsyncStorage.getItem('token');
        //alert("Token => " + token);

        if (token !== null) {

          //setTimeout(() => {this.props.navigation.navigate('List')}, 3000);

          this.setState({
             isLoading: true
           });
          url = 'https://diegosproyects.000webhostapp.com/servicesApp/ws_app_eem.php?parametro=searchByToken&token='+token;
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
                    //alert("by token =>" + this.state.dataSource.token);
                    setTimeout(() => {this.props.navigation.navigate('List')}, 3000);
                  }else{
                    this.props.navigation.navigate('Login');
                    alert("Verifica tus credenciales...");
                  }

                 });
             
             })
             .catch((error) => {
                this.props.navigation.navigate('Login')
               console.error(error);
             });

        }else{
          setTimeout(() => {this.props.navigation.navigate('Login')}, 5000);
        }
      }catch(error){
        console.log("something went wrong");
      }
    }

    componentDidMount () {  
        this.animate();
        this.getToken();
    }//animate method is call from componentDidMount  
    animate () {  
        this.animatedValue.setValue(0)  
        Animated.timing(  
            this.animatedValue,  
            {  
                toValue: 1,  
                duration: 2000,  
                easing: Easing.linear  
            }  
        ).start(() => this.animate())  
    }  


  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {

        setTimeout(() => {this.props.navigation.navigate('List')}, 3000);

      }else{
        setTimeout(() => {this.props.navigation.navigate('Login')}, 5000);
      }
    } catch (error) {
  // Error retrieving data
      //alert(`error`)
      setTimeout(() => {this.props.navigation.navigate('Login')}, 5000);
    }
  };

  componentWillMount(){
      //this._retrieveData()
      //
  }


  render() {
    const marginLeft = this.animatedValue.interpolate({  
      inputRange: [0, 1],  
      outputRange: [0, 300]  
    })  
    const opacity = this.animatedValue.interpolate({  
      inputRange: [0, 0.5, 1],  
      outputRange: [0, 1, 0]  
    })  
    const movingMargin = this.animatedValue.interpolate({  
      inputRange: [0, 0.2, 1],  
      outputRange: [0, 300, 0]  
    })  
    const textSize = this.animatedValue.interpolate({  
      inputRange: [0.2, 0.6,0.9],  
      outputRange: [20, 28, 28]  
    })  
    const rotateX = this.animatedValue.interpolate({  
      inputRange: [0, 0.1, 1],  
      outputRange: ['0deg', '360deg', '0deg']  
    })  

    //setTimeout(() => {this.props.navigation.navigate('Login')}, 3000);

    return (
      <ImageBackground source={require('../images/back2.png')} blurRadius={0} style={styles.container}> 
        <View style={styles.container}>  
                      <Animated.View
                      style={{  
                          marginLeft,  
                          height: 10,  
                          width: 10,  
                          backgroundColor: '#c8b57a'}} />
                  <Animated.View
                      style={{   
                          height: 10,  
                          width: 10,  
                          marginLeft: movingMargin,
                          backgroundColor: '#c8b57a'}} />
                
                <View style={styles.downContainer}>
                    <View style={{margin:20}} />
                     <View style={{backgroundColor: 'rgba(255, 255, 255,.5)',borderRadius: 100,padding: 20}}>
                        <Image
                          style={{
                            height: 80,  
                            width: 80,
                            justifyContent: 'center',
                            marginTop: -10
                          }}
                          source={require('../images/logo.png')}
                        />
                      </View>
                       
                  </View>
              </View> 
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
     container: {  
        flex: 1,  
        paddingTop: 10, 
    },

     downContainer:
     {
         flex: 1,
         justifyContent: 'center', // Used to set Text Component Vertically Center
         alignItems: 'center', // Used to set Text Component Horizontally Center
         paddingBottom:80
     } 
});
export default HomeActivity;