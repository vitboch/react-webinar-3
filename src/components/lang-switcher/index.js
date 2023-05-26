import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import {useTranslation} from '../../store/translator';
import './style.css';

function LangSwitcher() {
  const cn = bem('LangSwitcher');
  const {setLang} = useTranslation()

  return (
    <div className={cn()}>
      <button className={cn('btn')} onClick={() => setLang('ru')}>ru</button>
      <button className={cn('btn')} onClick={() => setLang('en')}>en</button>
    </div>
  )
}

export default memo(LangSwitcher);
