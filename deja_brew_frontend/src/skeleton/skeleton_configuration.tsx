import * as mobx from 'mobx';
import React from 'react';

export class SkeletonConfiguration {
  @mobx.observable.ref
  Header: React.ComponentType | undefined;

  @mobx.observable.ref
  PageContent: React.ComponentType | undefined;
}
