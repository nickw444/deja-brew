import React from 'react';
import { SecondaryButton } from 'ui/button/button';
import { Container } from 'ui/container/container';
import { GoogleIcon } from 'ui/icons/icons';
import styles from './auth.module.css';

export const AuthPage = React.memo(() => {
  const onSignInClick = React.useCallback(() =>
      window.location.href = '/login/google', []);
  return (
      <Container>
        <div className={styles.authPage}>
          <p>Welcome to Deja-Brew!</p>
          <p>So that we know that you are, please sign in with your Canva Google account</p>
          <SecondaryButton
              onClick={onSignInClick}
              title="Sign in with Google"
              Icon={GoogleIcon}
          >
            Sign in with Google
          </SecondaryButton>
        </div>
      </Container>
  );
});
