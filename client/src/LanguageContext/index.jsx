import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Spanish from './translations/es.json';
import English from './translations/en.json';

const defaultValue = 'valor por defecto';
const Context = React.createContext(defaultValue);

const local = navigator.language;
let lang;
if (local === 'en-US') {
  lang = English;
} else {
  lang = Spanish;
}

const LanguageContext = (props) => {
  const { children } = props;
  const [locale, setLocate] = useState(local);
  const [messages, setMessages] = useState(lang);

  const selectLang = (e) => {
    const newLocale = e.target.value;
    setLocate(newLocale);
    if (newLocale === 'es') {
      setMessages(Spanish);
    } else {
      setMessages(English);
    }
  };

  return (
    <Context.Provider value={{ locale, selectLang }}>
      <IntlProvider messages={messages} locale={locale}>
        { children }
      </IntlProvider>
    </Context.Provider>
  );
};

export default LanguageContext;
