import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'PlayfairDisplay-Regular': require('../../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Bold': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
    'CormorantGaramond-Regular': require('../../assets/fonts/CormorantGaramond-Regular.ttf'),
    'CormorantGaramond-Medium': require('../../assets/fonts/CormorantGaramond-Medium.ttf'),
  });
};
