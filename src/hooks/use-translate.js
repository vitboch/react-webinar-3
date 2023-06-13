import {useState, useCallback, useLayoutEffect, useMemo} from 'react';
import useServices from './use-services';

/**
 * Хук для локализации текстов, кода языка и отслеживания их изменения
 */
export default function useTranslate() {
  const services = useServices();
  const [key, setKey] = useState(0);

  const listener = useCallback(() => {
    setKey(prevState => prevState + 1);
  }, []);

  useLayoutEffect(() => {
    const id = services.i18n.subscribe(listener);

    return () => services.i18n.unsubscribe(id);
  }, []);

  return useMemo(() => ({
    lang: services.i18n.lang,
    setLang(lang) {
      services.i18n.lang = lang;
    },
    t: services.i18n.translate
  }), [key]);
}
