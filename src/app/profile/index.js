import {memo} from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Navbar from '../../containers/navbar';
import UserCard from '../../components/user-card';

function Profile() {
  const user = useSelector(state => state.user);
  const {t} = useTranslate();

  return (
    <PageLayout>
      <Navbar/>
      <UserCard user={user} t={t}/>
    </PageLayout>
  );
}

export default memo(Profile);
