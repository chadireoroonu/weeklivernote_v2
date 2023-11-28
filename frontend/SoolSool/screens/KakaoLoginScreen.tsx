import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-root-toast";

const RESTAPI_KEY = process.env.RESTAPI_KEY;
const REDIRECT_URI = "https://soolsool.site/kakao/callback";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function KakaoLoginScreen({ navigation }) {
  const fetchAccessToken = async (code: string) => {
    console.log("fetchAccessToken 요청 성공");
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACK_URL + "/v1/user/login",
        {
          params: {
            code,
            grant_type: "authorization_code",
          },
        }
      );

      console.log("로그인에 성공했습니다");
      Toast.show("로그인에 성공했습니다", {
        duration: Toast.durations.SHORT,
        position: 0,
        shadow: true,
        animation: true,
        opacity: 0.8,
      });

      if (response.data.message) {
        const socialId = response.data.socialId;
        console.log("첫 회원이시군요!", response.data.socialId);
        navigation.navigate("Terms", { socialId: socialId });
      } else {
        console.log("이미 가입된 회원이니까 메인 화면으로");
        const accessToken = response.data.tokenInfo.accessToken;
        await AsyncStorage.setItem("accessToken", accessToken);
        const destLocation = response.data.gpsInfo;
        await AsyncStorage.setItem(
          "destLocation",
          JSON.stringify(destLocation)
        );
        // console.log("???!", response.data);
        // console.log("???", response.data.nickname);
        const alcoholLimit: number = response.data.alcoholLimit;
        const roundedAlcoholLimit = alcoholLimit.toFixed(1);
        await AsyncStorage.setItem("alcoholLimit", roundedAlcoholLimit);

        navigation.navigate("BottomTab");
      }
    } catch (e) {
      console.log("리다이렉트 페이지에서 실패", e);
    }
  };

  const handleShouldStartLoad = (event: any) => {
    const url = event.url;
    // url에 붙어오는 code= 가있다면 뒤부터 parse하여 인가 코드 get
    const exp = "code=";
    const searchIdx = url.indexOf(exp);
    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      console.log("인가 코드", code);
      fetchAccessToken(code);
      return false;
    }
    return true;
  };

  return (
    <WebView
      originWhitelist={["*"]}
      scalesPageToFit={false}
      source={{
        uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${RESTAPI_KEY}&redirect_uri=${REDIRECT_URI}`,
      }}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      javaScriptEnabled={true}
      onShouldStartLoadWithRequest={handleShouldStartLoad}
    />
  );
}

const styles = StyleSheet.create({});

export default KakaoLoginScreen;
