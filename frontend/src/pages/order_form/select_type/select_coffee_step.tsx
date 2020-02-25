import React from 'react';
import { Row } from 'ui/row/row';
import { Paragraph, TitleMedium } from 'ui/typography/typography';

export const SelectCoffeeStep = React.memo(({
  CoffeeKindSelect,
}: {
  CoffeeKindSelect: React.ComponentType,
}) => (
    <div>
      <Row>
        <TitleMedium>Coffee Type</TitleMedium>
        <Paragraph>What would you like to drink today?</Paragraph>
      </Row>
      <CoffeeKindSelect/>
    </div>
));
