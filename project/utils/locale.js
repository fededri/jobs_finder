import { Platform, NativeModules } from "react-native";
import Expo from 'expo';
import log from '../log';

export const getlanguageCode = async () => {
    let langRegionLocale = "en_US";

    langRegionLocale =  await Expo.Util.getCurrentLocaleAsync();
     
    // "en_US" -> "en", "es_CL" -> "es", etc
    let languageLocale = langRegionLocale.substring(0, 2); // get first two characters
    log("Locale is", languageLocale);
    return languageLocale;
}

