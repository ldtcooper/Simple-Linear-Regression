# README

This project is a simple API which takes in two data series, a dependent variable and an independent variable, and performs a linear regression on the data to determine the correlation between them. You can play around with the project [here](https://www.logan-cooper.com/Simple-Linear-Regression/).

While the frontend is hosted on GitHub pages within my personal website, the API itself is an AWS Lambda function accessed through API Gateway.

## API Usage
This project leans primarily on the `/regress` route. It accepts a `POST` request with a body consisting of two arrays of numbers, an independent variable and a dependent variable.

Here is an example taken from [this article](https://www.statisticshowto.datasciencecentral.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation/) where `dep` is age and `ind` is glucose levels:
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
## Frontend Usage
On the frontend, a user can upload a CSV or TSV file with the data they want to regress. All of the data save that in the first column should be numerical. For example, the above glucose data in CSV form would look like this:

```
age,43,21,25,42,57,59
glucose,99,65,79,75,87,81
```

The convention here is for the top row to be the dependent variable and for the bottom to be the independent variable. If any more rows are uploaded, they will be ignored. Uploading a dataset in which the rows are different lengths will trigger an error.
