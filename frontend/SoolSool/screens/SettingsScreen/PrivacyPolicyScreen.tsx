import { WebView } from "react-native-webview";

const PrivacyPolicyScreen = () => {
  return (
    <WebView
      source={{
        uri: "https://sites.google.com/view/v2-weekliver-privacy-policy/",
      }}
      style={{ flex: 1 }}
    />
  );
};

export default PrivacyPolicyScreen;
