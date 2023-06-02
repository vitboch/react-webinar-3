import {memo} from 'react';
import PageLayout from '../../components/page-layout';
import Navbar from '../../containers/navbar';
import LoginForm from '../../components/login-form';

function Login() {

  return (
    <PageLayout>
      <Navbar/>
      <LoginForm/>
    </PageLayout>
  );
}

export default memo(Login);
