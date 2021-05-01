import 'react-native-gesture-handler'
import React, { useState, useRef } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';


const cameraScreen=()=> {
    let cameraRef = useRef(null);
    const [camType, setCam] = useState(RNCamera.Constants.Type.back)
    const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off) 
   const takePicture = async () => {
        if (cameraRef) {
          const options = { quality: 0.5, base64: true };
          const data = await cameraRef.current.takePictureAsync(options);
          console.log(data.uri);
        }
      }

      const flipcamera = () =>{
          if (camType===RNCamera.Constants.Type.back){
              setCam(RNCamera.Constants.Type.front)
          }else{
              setCam(RNCamera.Constants.Type.back)
          }
      }

      const toggleflash =()=>{
          if (flash===RNCamera.Constants.FlashMode.off){
              setFlash(RNCamera.Constants.FlashMode.on)
          }else{
            setFlash(RNCamera.Constants.FlashMode.off)
          }
      }


      return (
        <View style={styles.container}>
          <RNCamera
            ref={cameraRef}
            style={styles.preview}
            type={camType}
            flashMode={flash}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={()=>flipcamera()} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>takePicture()} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Snap </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>toggleflash()} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Flash </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });
  
 export default cameraScreen;