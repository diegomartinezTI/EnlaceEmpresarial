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
  ,AsyncStorage
} from 'react-native';

class LogoutActivity extends React.Component {
 
   constructor () {  
        super()   
        this.animatedValue = new Animated.Value(0)   
        
    }  
    componentDidMount () {  
        this.animate();
        this.removeItemValue();

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



    async removeItemValue() {
      try {
        await AsyncStorage.removeItem('token');


        setTimeout(() => {this.props.navigation.navigate('Login')}, 2000);

        AsyncStorage.clear();

        return true;
      }
      catch(exception) {
        return false;
      }
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


    return (
      
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
                    <Animated.Image
                          style={{
                            height: 100,  
                    width: 80
                          }}
                          source={require('../images/logo.png')}
                        /> 
                     
                </View>
            </View> 
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
         paddingBottom:100
     } 
});
export default LogoutActivity;