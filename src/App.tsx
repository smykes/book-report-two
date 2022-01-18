import React, { useEffect, useState } from "react";
import MonthFilter from "./components/MonthFilter/MonthFilter";
import YearFilter from "./components/YearFilter/YearFilter";
import BookComponent from "./components/BookComponent/BookComponent";

import BookData from "./data/books.json";
import MONTHS from "./constants";
import BookType from "./types/index";
import {
  filterBooksByRead,
  getYearsByBookData,
  filterReadBooksByMonthAndYear,
  filterReadBooksByYear,
  getPageCounts,
} from "./utils/functions/helpers";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

import "./App.scss";

function App() {
  const [activeYears, setActiveYears] = useState<number[] | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [currentData, setCurrentData] = useState<BookType[] | undefined>();
  const [pagesRead, setPagesRead] = useState<number | undefined>();

  function handleYearClick(identifier: number) {
    console.log(identifier);
    setSelectedYear(identifier);
  }
  function handleMonthClick(identifier: number) {
    console.log(identifier);
    setSelectedMonth(identifier);
  }
  useEffect(() => {
    console.log("effect");
    const readBooks = filterBooksByRead(BookData);
    const historicallyActiveYears = getYearsByBookData(readBooks);
    setActiveYears(historicallyActiveYears);

    if (!selectedYear && !selectedMonth) {
      setCurrentData(readBooks);
      setPagesRead(0);
    }
    if (selectedYear && !selectedMonth) {
      const finishedBooks = filterReadBooksByMonthAndYear(
        readBooks,
        null,
        selectedYear
      );
      setCurrentData(finishedBooks);
      setPagesRead(getPageCounts(finishedBooks));
    }
    if (!selectedYear && selectedMonth) {
      const finishedBooks = filterReadBooksByMonthAndYear(
        readBooks,
        selectedMonth,
        null
      );
      setCurrentData(finishedBooks);
      setPagesRead(getPageCounts(finishedBooks));
    }
    if (selectedYear && selectedMonth) {
      const finishedBooks = filterReadBooksByMonthAndYear(
        readBooks,
        selectedMonth,
        selectedYear
      );
      setCurrentData(finishedBooks);
      setPagesRead(getPageCounts(finishedBooks));
    }
  }, [selectedMonth, selectedYear]);

  const activeYearComponents = activeYears?.map((year: number) => {
    return (
      <YearFilter
        key={year}
        year={year}
        identifier={year}
        action={handleYearClick}
      />
    );
  });

  const monthComponents = MONTHS.map((month: string, index: number) => {
    return (
      <MonthFilter
        key={`month-${index}`}
        month={month}
        identifier={index + 1}
        action={handleMonthClick}
      />
    );
  });

  const bookComponent = currentData?.map((book: BookType, index: number) => {
    return (
      <BookComponent key={book["Book Id"]} title={book.Title} bn={index} />
    );
  });

  return (
    <div className="App">
      <header>
        <h1>Book Report</h1>
      </header>
      <main>
        {/* Books Finished */}
        {/* Books Per Period:Month */}
        {/* Books Per Period: Week*/}
        {/* Pages Reade Period */}
        <div className="card-wrapper">
          <Card>
            <CardContent>
              <h3>Books Read</h3>
              <h5>{currentData && currentData.length}</h5>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3>Pages Read</h3>
              <h5>{pagesRead && pagesRead}</h5>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h5>Test</h5>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h5>Test</h5>
            </CardContent>
          </Card>
        </div>
        <div>
          {" "}
          <h2>
            {selectedMonth
              ? `Viewing ${MONTHS[selectedMonth - 1]}`
              : "Viewing All Months"}{" "}
            {selectedYear ? `${selectedYear}` : "All Years"}
          </h2>
        </div>
        <div className="month-wrapper">
          <Button
            variant="contained"
            color="primary"
            type="button"
            aria-label="Reset All Years"
            onClick={() => setSelectedYear(undefined)}
          >
            Reset
          </Button>
          {activeYears && activeYearComponents}
        </div>
        <br />

        <div className="month-wrapper">
          <Button
            variant="contained"
            color="primary"
            type="button"
            aria-label="Reset All Months"
            onClick={() => setSelectedMonth(undefined)}
          >
            Reset
          </Button>
          {MONTHS && monthComponents}
        </div>
        {currentData && bookComponent}
        {currentData?.length === 0 && <h4>Pre Kindle or just a Slacker</h4>}
      </main>
    </div>
  );
}

export default App;
