/* eslint-disable */

import { FormControlLabel, FormGroup, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { ENDORESMENTS_ID, ENDORSEMENTS_DICT } from "../constants/DataModelConstants";

export type EndorsementsListProps = {
  onChange: (data: { [key: string]: number[] }) => void;
  selectedList: number[];
};

export default function EndorsementsList({ onChange, selectedList }: EndorsementsListProps) {
  const onEndorsementChange = (checked: boolean, value: number) => {
    let newEndorsements = selectedList;
    if (checked) {
      // Alta 4.1, 5.1, 6.1/6.0, 6.2 are not compatible.
      // This means values 1, 2, 3, 4 can't be in the list together.
      let exclusiveEndorsements = [3, 4];
      if (exclusiveEndorsements.includes(value)) {
        newEndorsements = newEndorsements.filter((el) => {
          return !exclusiveEndorsements.includes(el);
        });
      }
      exclusiveEndorsements = [1, 2];
      if (exclusiveEndorsements.includes(value)) {
        newEndorsements = newEndorsements.filter((el) => {
          return !exclusiveEndorsements.includes(el);
        });
      }
      onChange({ [ENDORESMENTS_ID]: newEndorsements.concat(value) });
      return newEndorsements.concat(value);
    } else {
      newEndorsements.splice(newEndorsements.indexOf(value), 1);
      onChange({ [ENDORESMENTS_ID]: newEndorsements });
    }
  };

  return (
    <FormGroup sx={{ color: "var(--hudzz-input-text-color)" }}>
      <Typography variant="h6">Endorsements</Typography>
      <FormControlLabel
        checked={selectedList.includes(3)}
        label={ENDORSEMENTS_DICT[3]}
        control={
          <Checkbox
            checked={selectedList.includes(3)}
            onChange={() => {
              onEndorsementChange(!selectedList.includes(3), 3);
            }}
          />
        }
      />
      <FormControlLabel
        label={ENDORSEMENTS_DICT[4]}
        control={
          <Checkbox
            checked={selectedList.includes(4)}
            onChange={() => {
              onEndorsementChange(!selectedList.includes(4), 4);
            }}
          />
        }
      />
      <FormControlLabel
        label={ENDORSEMENTS_DICT[2]}
        control={
          <Checkbox
            checked={selectedList.includes(2)}
            onChange={() => {
              onEndorsementChange(!selectedList.includes(2), 2);
            }}
          />
        }
      />
      <FormControlLabel
        label={ENDORSEMENTS_DICT[1]}
        control={
          <Checkbox
            checked={selectedList.includes(1)}
            onChange={() => {
              onEndorsementChange(!selectedList.includes(1), 1);
            }}
          />
        }
      />
      <FormControlLabel
        sx={{ color: "var(--hudzz-input-text-color)" }}
        control={<Checkbox checked={true} disabled={true} />}
        label={ENDORSEMENTS_DICT[5]}
      />
      <FormControlLabel
        control={<Checkbox checked={true} disabled={true} />}
        label={ENDORSEMENTS_DICT[6]}
      />
    </FormGroup>
  );
}
