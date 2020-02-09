import { GroupLabel, StepGroup } from 'pages/home/form_ui';
import React from 'react';
import { LinkButton, PrimaryButton } from 'ui/button/button';
import styles from './customize_step.module.css';

export const CustomizeStep = React.memo(({
  ExtraShotStepper,
  SugarStepper,
  MilkSelect,
  ExtrasSelect,
  onSubmitClick,
  onBackClick,
  canSubmitOrder,
  orderTitle,
  orderSubtitle,
}: {
  ExtraShotStepper: React.ComponentType,
  SugarStepper: React.ComponentType,
  MilkSelect: React.ComponentType,
  ExtrasSelect: React.ComponentType,
  onSubmitClick(): void,
  onBackClick(): void,
  canSubmitOrder?: boolean
  orderTitle: string | undefined,
  orderSubtitle: string | undefined,
}) => (
    <div>
      <LinkButton onClick={onBackClick}>&larr; Back</LinkButton>
      <StepGroup>
        <GroupLabel>Milk?</GroupLabel>
        <MilkSelect/>
      </StepGroup>
      <StepGroup>
        <GroupLabel>Any Extras?</GroupLabel>
        <ExtrasSelect/>
      </StepGroup>
      <div className={styles.stepperGroup}>
        <StepGroup>
          <GroupLabel>Sugar</GroupLabel>
          <SugarStepper/>
        </StepGroup>
        <StepGroup>
          <GroupLabel>Extra Shot</GroupLabel>
          <ExtraShotStepper/>
        </StepGroup>
      </div>
      {orderTitle && (
          <div>
            <strong>Your Order:</strong>{orderTitle}
            {orderSubtitle}
          </div>
      )}
      <div className={styles.buttonContainer}>
        <PrimaryButton
            onClick={onSubmitClick}
            disabled={!canSubmitOrder}
        >
          Submit Order
        </PrimaryButton>
      </div>
    </div>
));
