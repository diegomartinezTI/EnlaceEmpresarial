import React from "react";
import Drawer from 'react-native-drawer'
import ic_menu from '../Image/list.png'
import { Platform, StyleSheet, Text, 
    View, FlatList, TouchableOpacity, 
    Image, SafeAreaView } from 'react-native';

const menu = [
    { 'title': 'Home' },
    { 'title': 'Wishlist' },
    { 'title': 'Avout us' },
    { 'title': 'Contact us' },
    { 'title': 'Log out' }
]

const openDrawer = () => {
        this.drawer.open()
    }

const closeDrawer = () => {
        this.drawer.close()
    }

const renderDrawer = () => {
        //SlideMenu
        return (
            <View style={styles.menuContainer}>

                <FlatList
                    style={{ flex: 1.0 }}
                    data={menu}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.menuTitleContainer}>
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        )
    }

const Menu = props => {
  return (
     <Drawer
        ref={(ref) => this.drawer = ref}
        content={renderDrawer()}
        type='static'
        tapToClose={true}
        openDrawerOffset={0.35}
        styles={drawerStyles}>
        {/* //Main View */}
        <View style={styles.headerContainer}>
            <View style={styles.menuButton}>
                <TouchableOpacity
                    onPress={openDrawer.bind(this)}>
                    <Image style={{ tintColor: 'white' }} source={ic_menu} />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Enlace Empresarial</Text>
            <View style={styles.menuButton} />
        </View>
    </Drawer>
  );
};

export default Menu;


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
    }
}