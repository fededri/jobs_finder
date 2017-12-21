import locale from './utils/locale';
import en from './en.json';
import es from './es.json';

export var language = '';


export const setCurrentLanguage = (localeLanguage) => {
    language = localeLanguage;
    console.log('Strings: new locale is ', language);
}

export const  t = (text) => {
    if (language === ''){
        language = 'en';
    }


    switch (language) {
        case 'en':
            return en[text];

        case 'es':
            return es[text];
    
        default:
            return '';
    }
}
