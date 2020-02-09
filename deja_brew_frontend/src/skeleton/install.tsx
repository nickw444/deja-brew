import { IObservableValue } from 'mobx';
import React from 'react';
import { Skeleton } from './skeleton';
import { SkeletonConfiguration } from './skeleton_configuration';

export function installSkeleton({
  app,
}: {
  app: IObservableValue<React.ComponentType>,
}): {
  skeleton: SkeletonConfiguration
} {
  const skeleton = new SkeletonConfiguration();
  app.set(() => <Skeleton skeleton={skeleton}/>);

  return { skeleton };
}
