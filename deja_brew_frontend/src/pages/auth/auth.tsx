import React from 'react';
import { SecondaryButton } from 'ui/button/button';
import { Container } from '../../ui/container/container';
import styles from './auth.module.css';
import googleIcon from './assets/g-logo.png';

export const AuthPage = React.memo(() => (
    <Container>
      <div className={styles.authPage}>
        <p>Welcome to Deja-Brew!</p>
        <p>So that we know that you are, please sign in with your Canva Google account</p>
        <SecondaryButton title="Sign in with Google" iconSrc={googleIcon}>
          Sign in with Google
        </SecondaryButton>
      </div>
    </Container>
));
