import { History } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { Container } from 'ui/container/container';
import styles from './skeleton.module.css';

export const Skeleton = React.memo(({
  Header,
  Content,
  AppTabs,
  history,
}: {
  Header: React.ComponentType,
  Content: React.ComponentType,
  AppTabs: React.ComponentType,
  history: History,
}) => (
    <Router history={history}>
      <div className={styles.headerContainer}>
        <Header/>
      </div>
      <main className={styles.contentContainer}>
        <Container>
          <Content/>
        </Container>
      </main>
      <AppTabs/>
    </Router>
));
