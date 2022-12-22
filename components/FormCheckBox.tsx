import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { Control, FieldPath, useController } from 'react-hook-form';
import { categories, PosterData, posterSizes } from '../lib/valSchemas';

interface Props {
  control: Control<PosterData>;
  name: FieldPath<PosterData>;
  options: typeof categories | typeof posterSizes;
}

const FormCheckBox = ({ options, control, name }: Props) => {
  const { field } = useController<PosterData>({ control, name });
  const { onChange } = field;
  const [value, setValue] = useState(field.value || []);

  return (
    <>
      {options.map((currentOption) => (
        <FormControlLabel
          key={currentOption}
          value={currentOption}
          label={currentOption}
          sx={{ flex: '0 0 10em' }}
          control={
            <Checkbox
              onChange={(e) => {
                let valueCopy = [...value];
                if (e.target.checked) {
                  valueCopy.push(currentOption);
                } else {
                  const index = valueCopy.findIndex(
                    (option) => option === currentOption
                  );
                  valueCopy.splice(index, 1);
                }
                setValue(valueCopy);
                onChange(valueCopy);
              }}
            />
          }
        />
      ))}
    </>
  );
};

export default FormCheckBox;
