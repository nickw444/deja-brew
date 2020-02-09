import * as mobxReact from 'mobx-react';
import React from 'react';
import { SkeletonConfiguration } from './skeleton_configuration';


type Props = {
  skeleton: SkeletonConfiguration
}

@mobxReact.observer
export class Skeleton extends React.Component<Props> {
  render() {
    const { skeleton } = this.props;
    return (
        <div>
          <header>
            {skeleton.Header && <skeleton.Header/>}
          </header>
          <main>
            {skeleton.PageContent && <skeleton.PageContent/>}
          </main>
        </div>
    );
  }
}
