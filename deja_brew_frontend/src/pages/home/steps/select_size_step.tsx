import { GroupLabel, StepGroup } from 'pages/home/form_ui';
import React from 'react';
import { LinkButton, PrimaryButton, SecondaryButton } from 'ui/button/button';

export const SelectSizeStep = React.memo(({
  SizeSelect,
  onSubmitClick,
  onCustomizeClick,
  onBackClick,
  canSubmitOrder,
  orderTitle,
}: {
  SizeSelect: React.ComponentType,
  onSubmitClick(): void,
  onCustomizeClick(): void,
  onBackClick(): void,
  canSubmitOrder: boolean,
  orderTitle: string | undefined
}) => (
    <div>
      <LinkButton onClick={onBackClick}>&larr; Back</LinkButton>
      <StepGroup>
        <GroupLabel>What size would you like?</GroupLabel>
        <SizeSelect/>
        <div>
          {orderTitle && (<div><strong>Your Order:</strong> {orderTitle}</div>)}
          <div style={{ margin: '16px 0' }}>
            <PrimaryButton
                disabled={!canSubmitOrder}
                onClick={onSubmitClick}
            >
              Done
            </PrimaryButton>
          </div>
          <div style={{ margin: '16px 0' }}>
            <SecondaryButton
                disabled={!canSubmitOrder}
                onClick={onCustomizeClick}
            >
              Customize &rarr;
            </SecondaryButton>
          </div>
        </div>
      </StepGroup>
    </div>
));
