import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Text,
  Button,
} from 'native-base';
import { Surface } from 'gl-react-native';
import ImageFilters from 'react-native-gl-image-filters';

import Filter from './Filter';

const width = Dimensions.get('window').width - 40;

const settings = [
  {
    name: 'hue',
    minValue: 0,
    maxValue: 6.3,
  },
  {
    name: 'blur',
    minValue: 0,
    maxValue: 30,
  },
  {
    name: 'sepia',
    minValue: -5,
    maxValue: 5,
  },
  {
    name: 'sharpen',
    minValue: 0,
    maxValue: 15,
  },
  {
    name: 'negative',
    minValue: -2.0,
    maxValue: 2.0,
  },
  {
    name: 'contrast',
    minValue: -10.0,
    maxValue: 10.0,
  },
  {
    name: 'saturation',
    minValue: 0.0,
    maxValue: 2,
  },
  {
    name: 'brightness',
    minValue: 0,
    maxValue: 5,
  },
  {
    name: 'temperature',
    minValue: 0.0,
    maxValue: 40000.0,
  },
];

const ImageFilter=()=> {
  state = {
    ...settings,
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
  };

  saveImage = async () => {
    if (!this.image) return;
    
    const result = await this.image.glView.capture();
    console.warn(result);
  };

  
    return (
      <Container>
        <Header>
          <Body>
            <Title>Image Filters</Title>
          </Body>
        </Header>
        <Content style={styles.content} showsVerticalScrollIndicator={false}>
          <Surface style={{ width, height: width }} ref={ref => (this.image = ref)}>
            <ImageFilters {...this.state} width={width} height={width}>
              {{ uri: 'https://i.imgur.com/5EOyTDQ.jpg' }}
            </ImageFilters>
          </Surface>
          {settings.map(filter => (
            <Filter
              key={filter.name}
              name={filter.name}
              minimum={filter.minValue}
              maximum={filter.maxValue}
              onChange={value => this.setState({ [filter.name]: value })}
            />
          ))}
          <Button
            rounded={false}
            style={styles.button}
            block
            onPress={this.saveImage}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }


const styles = StyleSheet.create({
  content: { marginTop: 20, marginHorizontal: 20 },
  button: { marginVertical: 20, borderRadius: 0 },
});

export default ImageFilter;