import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Platform } from "react-native";

export function ApplicationInput  ({
  label,
  val,
  onchange,
  keyboardType,
  maxLength,
  wordCounter,
  Counter,
  inputStyle,
  labelTextStyle,
  onBlur,
  onError,
})  {
  const [focused, setFocused] = useState(false);
  const customOnBlur = (e) => {
    setFocused(false);
    onBlur ? onBlur(e) : null;
  };
  const customOnFocus = () => {
    setFocused(true);
  };
  return (
    <View style={{ ...styles.inputStyle, ...inputStyle }}>
      <View style={styles.labelTextRow}>
       
          <Text style={{ ...styles.labelTextStyle, ...labelTextStyle }}>
            {label}
          </Text>
       

        {wordCounter && <Text>{Counter}/100</Text>}
      </View>
      <View style={styles.flexView}>
        <TextInput
          onBlur={(e) => customOnBlur(e)}
          onFocus={customOnFocus}
          style={[styles.commonInputStyle,{
            borderWidth: 1,
            color: "#3F4254",
          }]}
          value={val}
          onChangeText={(text) => (onchange ? onchange(text) : null)}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
         {onError ? (
        <Text
          style={
            {
              color: "#DC3546",
              fontSize:12
            }
          }
        >
          {onError}
        </Text>
      ) : null}
      </View>
     
    </View>
  );
};
const styles = StyleSheet.create({
inputStyle:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal:20,
    alignItems:'center',
    marginTop:20
},
  labelTextStyle: {
    paddingBottom:6,
    fontSize: 15,
    color: "#3F4254",
    
  },
  flexView: {
    width: "60%",
    alignItems: "center",
    
  },
  commonInputStyle: {
    width: "100%",
    // borderRadius: 8,
    paddingHorizontal:5,
    fontSize: 15,
    height:40
  },
  labelTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

