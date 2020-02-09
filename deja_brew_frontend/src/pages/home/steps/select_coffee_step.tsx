import { GroupLabel, StepGroup } from 'pages/home/form_ui';
import React from 'react';

export const SelectCoffeeStep = React.memo(({
  CoffeeKindSelect,
}: {
  CoffeeKindSelect: React.ComponentType,
}) => (
    <StepGroup>
      <GroupLabel>What type of coffee would you like?</GroupLabel>
      <CoffeeKindSelect/>
    </StepGroup>
));
