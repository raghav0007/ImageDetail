import React, { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from "axios";
import AllImagesItem from "../components/AllImagesItem";
const baseURL = 'http://dev3.xicom.us/xttest/'


export default function Main() {

    useEffect(() => {
        GetImages(0)
    }, [])
    const [allImages, setAllImages] = useState()
    const [page, setpage] = useState(0)
    function GetImages(page) {

        const client = axios.create({
            baseURL,
        });
        // const token = await Keychain.getGenericPassword();

        const header = {
            //   Authorization: token.password,
            "Content-Type": "multipart/form-data",
        };
        const datas = new FormData();

        datas.append("user_id", 108);
        datas.append("offset", page);
        datas.append("type", "popular");
        console.log(client);
        client
            .post('getdata.php', datas
                , {
                    headers: header,
                }
            )
            .then((response) => {

                console.log("SuccessUpdate", response.data);
                let imageresponse=[];
                if(allImages!=undefined)
                {
                    allImages.map((i)=>{
                        imageresponse.push(i)
                    })
                    
                }
                if(response.data.images!=undefined)
                {
                    response.data.images.map((i)=>{
                        imageresponse.push(i)
                    })
                }
                setAllImages(imageresponse)
                console.log("dataas", datas);
            })
            .catch((error) => {
                console.log("FailureResponse", error, datas);
                Alert.alert("Try Again");
            });
    }

    const RenderItems = ({ item }) => <AllImagesItem data={item} />
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <FlatList
                data={allImages}
                renderItem={RenderItems}
                contentContainerStyle={{
                    paddingVertical: 40,
                    marginTop: 60
                }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} />
                )}
            />
            <TouchableOpacity
            activeOpacity={0.8}
                style={styles.moreButton}
                onPress={() => {
                    setpage(page + 1)
                    GetImages(page+1)
                }}>
                <Text style={{color:'black'}}>
                    Click here to load more
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    moreButton: {
        alignSelf: 'center',
        borderWidth: 1,
        marginBottom: 30,
        paddingVertical:5,
        paddingHorizontal:20
    }
})