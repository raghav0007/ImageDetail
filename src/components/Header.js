import React from "react";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icons from "../costants/Icons";
import { useNavigation } from "@react-navigation/native";

export default function Header(){
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
            <TouchableOpacity
            activeOpacity={0.8}
             onPress={()=>navigation.goBack()}>
            <Image source={Icons.goBack} style={styles.back} />
            </TouchableOpacity>
            <Text style={styles.text}>Detail Screen</Text>
            <View style={styles.back} />
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:Platform.select({
            ios:40,
            android:30
        }),
        marginBottom:30,
        paddingHorizontal:10
    },
    back:{
        height:40,
        width:40
    },
    text:{
        fontSize:15,
        color:'black'
    }
})