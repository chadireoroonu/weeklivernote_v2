import { WebView } from "react-native-webview";

const LocationTermsScreen = () => {
  return (
    <WebView
      source={{
        uri: "https://sites.google.com/view/v1-weekliver-location-terms/",
      }}
      style={{ flex: 1 }}
    />
  );
};

export default LocationTermsScreen;
