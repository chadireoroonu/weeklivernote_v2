import { WebView } from "react-native-webview";

const ServiceTermsScreen = () => {
  return (
    <WebView
      source={{
        uri: "https://sites.google.com/view/v1-weekliver-service-terms/",
      }}
      style={{ flex: 1 }}
    />
  );
};

export default ServiceTermsScreen;
