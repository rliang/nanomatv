/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  PixelRatio,
  View,
  ScrollView,
  FlatList,
  TouchableNativeFeedback,
  ToastAndroid,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import NativeTachyons, { styles as s } from 'react-native-style-tachyons';

import data from './data';

NativeTachyons.build({}, StyleSheet);

class DetailsScreen extends Component {
  static navigatorStyle = {
    screenBackgroundColor: 'white',
    statusBarColor: '#f7f7f7',
    statusBarTextColorScheme: 'dark',
  };
  render() {
    return (
      <ScrollView>
        <Text style={[s.f4, s.tj, s.pa3, {color: 'black'}]}>{this.props.text}</Text>
      </ScrollView>
    );
  }
}

class ListScreen extends Component {
  onItemPress(item) {
    if (item.abstract)
      this.props.navigator.push({
        title: 'Resumo',
        screen: 'DetailsScreen',
        passProps: {text: item.abstract},
      });
    else
      ToastAndroid.show('Resumo indisponível.', ToastAndroid.SHORT);
  }
  getItemKey(item, index) {
    return index.toString();
  }
  renderItem({item}) {
    return (
      <TouchableNativeFeedback onPress={this.onItemPress.bind(this, item)}>
        <View style={[s.flx_i, s.flx_row, s.aic, s.pa2]}>
          <Text style={[s.min_w3, s.f4, s.tc]}>{item.time}</Text>
          <View style={[s.flx_i, s.flx_col, s.pa2]}>
            <Text style={[s.f5]}>{item.type}</Text>
            <Text style={[s.f4, s.b, {color: 'black'}]}>{item.title}</Text>
            <Text style={[s.f5]}>{item.who}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
  renderItemSeparator() {
    return (
      <View style={[s.bb, {borderBottomColor: '#ddd'}]}/>
    );
  }
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this.getItemKey.bind(this)}
        renderItem={this.renderItem.bind(this)}
        ItemSeparatorComponent={this.renderItemSeparator.bind(this)}
      />
    );
  }
}

class MainScreen extends Component {
  static navigatorStyle = {
    navBarHideOnScroll: true,
    selectedTopTabIndicatorHeight: PixelRatio.get() * 2,
    selectedTopTabIndicatorColor: 'red',
    statusBarColor: '#f5f5f5',
    statusBarTextColorScheme: 'dark',
  };
  render() {
    return null;
  }
}

Navigation.registerComponent('DetailsScreen', () => DetailsScreen);
Navigation.registerComponent('ListScreen', () => ListScreen);
Navigation.registerComponent('MainScreen', () => MainScreen);

Navigation.startSingleScreenApp({
  screen: {
    title: 'V NanoMat: FAPESP 2017/11785-0',
    screen: 'MainScreen',
    topTabs: ['27/09', '28/09'].map(key => ({
      screenId: 'ListScreen',
      title: key,
      passProps: {data: data[key]},
    })),
  },
});
