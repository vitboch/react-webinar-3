import {memo} from 'react';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import LocaleSelect from '../locale-select';
import Navigation from '../navigation';
import NavProfile from '../../components/nav-profile';

function Navbar() {
  const {t} = useTranslate();

  return (
    <>
      <NavProfile/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
    </>
  );
}

export default memo(Navbar);
