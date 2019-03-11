import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';

const MaterialHeaderButton = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

export const MenuButtons = props => {
  return (
    <HeaderButtons
      HeaderButtonComponent={MaterialHeaderButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
      {...props}
    />
  );
};

export const Item = HeaderButtons.Item;
