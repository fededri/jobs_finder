import { Platform, NativeModules } from "react-native";


export const getlanguageCode = () => {
    let langRegionLocale = "en_US";
    
    // If we have an Android phone
    if (Platform.OS === "android") {
      langRegionLocale = NativeModules.I18nManager.localeIdentifier || "";
    } else if (Platform.OS === "ios") {
      return 'en';
    }
    
    // "en_US" -> "en", "es_CL" -> "es", etc
    let languageLocale = langRegionLocale.substring(0, 2); // get first two characters
    return languageLocale;
}

