import translate from './translate';

class I18n {
  constructor(services, config = {}) {
    this._lang = config.defaultLang;
    this._subcribId = 0;
    this._listeners = {};
  }

  subscribe(listener) {
    const id = this._subcribId + 1;
    this._subcribId = id;
    this._listeners[id] = listener;
    return id;
  }

  unsubscribe(id) {
    delete this._listeners[id];
  }

  render() {
    Object.keys(this._listeners).forEach(key => {
      const render = this._listeners[key];
      if (render) render();
    });
  }

  get translate() {
    return (text, plural) => translate(this._lang, text, plural);
  }

  get lang() {
    return this._lang;
  }

  set lang(lang) {
    this._lang = lang;
    this.render();
  }
}

export default I18n;
