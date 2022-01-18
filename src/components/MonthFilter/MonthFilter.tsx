import React from "react";
import { Button } from "@material-ui/core";

interface Month {
  month: string;
  action(id: number): void;
  identifier: number;
}
const MonthFilter: React.FC<Month> = (props) => {
  const { month, action, identifier } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      type="button"
      onClick={() => action(identifier)}
    >
      {month}
    </Button>
  );
};

export default MonthFilter;
