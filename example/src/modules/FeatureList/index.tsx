import React from 'react';
import { StyleSheet, View } from 'react-native';
import routers from '../../routes';
import { Button } from '@rneui/base';

const FeatureList: React.FC<any> = (props: any) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      {routers.map((item) => {
        return (
          <View style={styles.item} key={item.name}>
            <Button
              style={styles.itemButton}
              onPress={() => {
                navigation.navigate(item.name);
              }}
            >
              {item.name}
            </Button>
          </View>
        );
      })}
    </View>
  );
};

export default FeatureList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  item: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  itemButton: {
    width: 20,
  },
});
