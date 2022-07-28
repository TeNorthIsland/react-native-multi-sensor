import GeolocationMe from '@react-native-community/geolocation';

const Geolocation = {
  requestAuthorization: () => {
    GeolocationMe.requestAuthorization();
  },
  getCurrentPosition: async function (success: any, error?: any) {
    GeolocationMe.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 10000,
    });
  },
};

export default Geolocation;
