import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useNavigation } from "@react-navigation/native";

const AllImagesItem = (props) => {
    const navigation = useNavigation();
    const data = props.data;
    const [aspectRatio, setAspectRatio] = useState(1);
    const [imageWidth, setImageWidth] = useState(Dimensions.get('window').width);
    const [imageHeight, setImageHeight] = useState(Dimensions.get('window').width * aspectRatio);

    useEffect(() => {
        const getImageSize = async () => {
            const response = await fetch(data.xt_image);
            const blob = await response.blob();
            const image = new Image();
            image.src = URL.createObjectURL(blob);
            image.onload = () => {
                const aspectRatio = image.width / image.height;
                setAspectRatio(aspectRatio);
                const width = Dimensions.get('window').width;
                const height = width / aspectRatio;
                setImageWidth(width);
                setImageHeight(height);
            };
        };
        getImageSize();
    }, [data.xt_image]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
            activeOpacity={0.8}
             onPress={() => {
                navigation.navigate('Details', {
                    urlImage: data.xt_image,
                    width:imageWidth,
                    height:imageHeight,
                })
            }}>
                <FastImage
                    source={{
                        uri: data.xt_image
                        
                    }}
                    resizeMode='contain'
                    style={{ width: imageWidth, height: imageHeight }}
                />
            </TouchableOpacity>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
    },
});

export default AllImagesItem;
