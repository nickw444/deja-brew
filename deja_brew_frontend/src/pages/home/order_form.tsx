import { FormLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import React from 'react';
import { CoffeeKindUtil, MilkUtil, SizeUtil } from 'services/order/order_service_objects';
import { labelForCoffeeKind, labelForMilk, labelForSize } from 'ui/labels/labels';
import styles from './order_form.module.css';

export const OrderForm = React.memo(() => (
    <form>
      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Size</FormLabel>
        <RadioGroup aria-label="gender" name="gender1">
          {SizeUtil.values().map(size => (
              <FormControlLabel value={size} control={<Radio/>} label={labelForSize(size)}/>
          ))}
        </RadioGroup>
      </FormControl>


      <div className={styles.controlContainer}>
        <FormControl className={styles.formControl}>
          <InputLabel id="coffee-select-label">Coffee Type</InputLabel>
          <Select labelId="coffee-select-label" id="coffee-select">
            {CoffeeKindUtil.values().map(kind => (
                <MenuItem value={kind}>{labelForCoffeeKind(kind)}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.controlContainer}>
        <FormControl className={styles.formControl}>
          <InputLabel id="milk-select-label">Milk Type</InputLabel>
          <Select labelId="milk-select-label" id="milk-select">
            {MilkUtil.values().map(milk => (
                <MenuItem value={milk}>{labelForMilk(milk)}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControlLabel
            control={<Checkbox color="primary"/>}
            label="Decaf"
        />
      </div>
      <div>
        <FormControlLabel
            control={<Checkbox color="primary"/>}
            label="Iced"
        />
      </div>
      <div>
        <FormControlLabel
            control={<Checkbox color="primary"/>}
            label="Honey"
        />
      </div>
      <div>
        <FormControlLabel
            control={<Checkbox color="primary"/>}
            label="Sugar"
        />
      </div>
      <div>
        <FormControlLabel
            control={<Checkbox color="primary"/>}
            label="Sugar x2"
        />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">Order</Button>
      </div>
    </form>
));
