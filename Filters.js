import React from 'react';
import {View,Image,TouchableOpacity,Button,StyleSheet,Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Rncamera from './Rncamera'
import {PESDK, PhotoEditorModal, Configuration} from 'react-native-photoeditorsdk'; 
import { useState } from 'react';

//PESDK.unlockWithLicense(require('./pesdk_license'));




const Filter=()=>{
   
    const [image , setImage]= useState('');
    const [cam, setCam]= useState(false)

    const imageUpload = image

    const CameraPic = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth:300,
            compressImageMaxHeight: 300,
            cropping: true,
            saveToPhotos: true,
        }).then(image => {
            console.log('imageeee', image);
            const imageUri = image.path
            setImage(imageUri)


        });
    }

    const GalleryPic = () => {
        // ImagePicker.openPicker({
        //     multiple: true
        //   }).then(images => {
        //     console.log('imageeeesssssssttttttttt',images);
        //     const imageUri=images.path
        //     console.log('pathhhhh',images.size)
        //     setImage(imageUri)

        //   });
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            const imageUri = image.path
            setImage(imageUri)

          });
    }
 
    // const CropImag = () =>{
    //     ImagePicker.openCropper({
    //         path: 'my-file-path.jpg',
    //         width: 300,
    //         height: 400
    //       }).then(image => {
    //         console.log(image);
    //       });
    // }

    const Diloge = () => {
        Alert.alert('Upload Story', 'Choose From',
            [
                {
                    text: 'Camera',
                    onPress: () => { CameraPic () }
                },
    
                {
                    text: 'Gallery',
                    onPress: () => { GalleryPic () }
                },
            ])
    }

    return(
    <View style={styles.mainViewStyle}>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity 
        onPress={Diloge}
        style={styles.touchStyle}>
      {image !=null?<Image source={{uri:image}} 
      style={styles.touchStyle}/>:null}
        </TouchableOpacity>


         <View style={{marginTop:20, padding: 5, marginVertical: 10, width: 250}} >
        <Button
        title='Click It' onPress={() =>{
             PESDK.openEditor(imageUpload);

        }}  />
        </View>
        <View style={{marginTop:5, padding: 5, marginVertical: 10, width: 250}}>
        <Button
        title='Launch Camera'
        onPress={()=>setCam(!cam)}/>
        {cam?<Rncamera/>:null}
        </View>
        <View style={{marginTop:5, padding: 5, marginVertical: 10, width: 250}}>
        <Button
        title='Choose Camera'/>
        </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
mainViewStyle:{
    justifyContent:'center',
    flex:1
},
    touchStyle:{
    height:200,
    width:200,
    borderRadius:45,
    borderColor:'black',
    borderWidth:1,
    backgroundColor:'white'
}
})

export default Filter;