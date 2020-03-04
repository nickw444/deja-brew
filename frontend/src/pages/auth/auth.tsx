import React from 'react';
import { SecondaryButton } from 'ui/button/button';
import { Container } from 'ui/container/container';
import { GoogleIcon } from 'ui/icons/icons';
import { Row } from 'ui/row/row';
import { Paragraph, TitleMedium } from 'ui/typography/typography';
import styles from './auth.module.css';

export const AuthPage = React.memo(() => {
  const onSignInClick = React.useCallback(() =>
      window.location.href = '/login/google', []);
  return (
      <Container>
        <div className={styles.authPage}>
          <Row>
            <TitleMedium>Welcome to Déjà Brew!</TitleMedium>
          </Row>
          <Row>
            <Paragraph>
              So that we know that you are, please sign in with your Canva Google account
            </Paragraph>
          </Row>
          <Row>
            <SecondaryButton
                onClick={onSignInClick}
                title="Sign in with Google"
                Icon={GoogleIcon}
            >
              Sign in with Google
            </SecondaryButton>
          </Row>
        </div>
      </Container>
  );
});
