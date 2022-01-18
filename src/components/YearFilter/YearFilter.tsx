import React from "react";
import { Button } from "@material-ui/core";
import yearStyles from "./YearFilter.module.scss";
interface Year {
  year: number;
  action(id: number): void;
  identifier: number;
}
const YearFilter: React.FC<Year> = (props) => {
  const { year, action, identifier } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      type="button"
      className={yearStyles["month-filter"]}
      onClick={() => action(identifier)}
    >
      {year}
    </Button>
  );
};

export default YearFilter;
