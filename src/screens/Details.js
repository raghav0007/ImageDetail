import React from "react";
import { Alert, Dimensions, Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from "react-native-fast-image";
import Header from "../components/Header";
import { Formik } from 'formik';
import * as yup from 'yup';
import { ApplicationInput } from "../components/ApplicationInput";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const baseURL = 'http://dev3.xicom.us/xttest/'

export default function Details(props) {
    const imageurl = props.route.params?.urlImage
    const imageHeight = props.route.params?.height
    const imageWidth = props.route.params?.width


    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const LoginValidationSchema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('last Name is required'),
        phoneNumber: yup.string().required('Phone Number is required'),
        email: yup.string()
            .required('Email is required')
            .matches(emailregex, "Enter a valid Email Address"),

    })
    function startSubmit(value) {
        console.log('Values', value);
        const client = axios.create({
            baseURL,
        });
        const header = {
            "Content-Type": "multipart/form-data",
        };
        const datas = new FormData();
    
        datas.append("first_name", value.firstName);
        datas.append("last_name", value.lastName);
        datas.append("email", value.email);
        datas.append("phone", value.phoneNumber);
        datas.append("user_image", {
            uri: imageurl,
            name: 'Image.jpg',
            type: 'image/jpg',
        });
    
        client.post('savedata.php', datas, {
            headers: header
        })
        .then((response) => {
            console.log('success', response);
            Alert.alert("Success")
        })
        .catch((error) => {
            console.log('error', error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        });
    }
    
console.log('props.route.params?.width',props.route.params?.width,props.route.params?.height);
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>


            <ScrollView>
                <Header />
                <FastImage
                    source={{
                        uri: imageurl
                    }}
                    resizeMode='contain'
                    style={{ width: props.route.params?.width, height: props.route.params?.height }}
                />
                <Formik
                    validationSchema={LoginValidationSchema}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        email: ''
                    }}
                    onSubmit={(value) => {
                        startSubmit(value)
                    }}
                >{({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched
                }) => (
                    <View>
                        <ApplicationInput
                            label={'First Name'}
                            val={values.firstName}
                            
                            onchange={handleChange("firstName")}
                            onBlur={handleBlur("firstName")}
                            onError={
                                errors.firstName && touched.firstName
                                    ? errors.firstName
                                    : null
                            }
                        />
                        <ApplicationInput
                            label={'Last Name'}
                            val={values.lastName}
                            onchange={handleChange("lastName")}
                            onBlur={handleBlur("lastName")}
                            onError={
                                errors.lastName && touched.lastName
                                    ? errors.lastName
                                    : null
                            }
                        />
                        <ApplicationInput
                            label={'Phone'}
                            keyboardType={'number-pad'}
                            val={values.phoneNumber}
                            onchange={handleChange("phoneNumber")}
                            onBlur={handleBlur("phoneNumber")}
                            onError={
                                errors.phoneNumber && touched.phoneNumber
                                    ? errors.phoneNumber
                                    : null
                            }
                        />
                        <ApplicationInput
                            label={'Email'}
                            keyboardType={'email-address'}
                            val={values.email}
                            onchange={handleChange("email")}
                            onBlur={handleBlur("email")}
                            onError={
                                errors.email && touched.email
                                    ? errors.email
                                    : null
                            }
                        />
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={{color:'black'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                )}

                </Formik>

            </ScrollView>
        </TouchableWithoutFeedback>
    )

}
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 20,
        marginRight: 20
    }
})