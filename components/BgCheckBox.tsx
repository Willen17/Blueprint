import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { Control, FieldPath, useController } from 'react-hook-form';
import { backgroundCategories, BackgroundData } from '../lib/valSchemas';

interface Props {
  control: Control<BackgroundData>;
  name: FieldPath<BackgroundData>;
  categories?: typeof backgroundCategories;
}

const BgCheckBox = ({ categories, control, name }: Props) => {
  const { field } = useController<BackgroundData>({
    control,
    name,
  });

  const { onChange } = field;
  const [value, setValue] = useState(field.value || []);

  return (
    <>
      {categories &&
        categories.map((currentOption, index) => (
          <FormControlLabel
            key={index}
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

export default BgCheckBox;
