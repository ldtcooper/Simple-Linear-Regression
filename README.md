# README

This project is a simple API which takes in two data series, a dependent variable and an independent variable, and performs a linear regression on the data to determine the correlation between them.

## Usage
This project leans primarily on the `/regress` route. It accepts a `POST` request with a body consisting of two arrays of numbers, an independent variable and a dependent variable.

Here is an example found in the tests and taken from [this article](https://www.statisticshowto.datasciencecentral.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation/):
```json
{
    "dep": [43, 21, 25, 42, 57, 59],
    "ind": [99, 65, 79, 75, 87, 81]
}
```

That will return the following JSON, comprising of the slope and the intercept of the regression line that best fits the input data:

```json
{
    "intercept": 65.1415715245131,
    "slope": 0.3852249832102082
}
```
