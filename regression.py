import json


def sum_squared(variable_list):
    """Takes in an array and returns the sum of an array with each element squared"""
    return sum([el * el for el in variable_list])


def reg_intercept(sum_independent, sum_dependent, sum_dependent_squared, sum_ind_times_dep, n):
    """Calculates the intercept of the regression line"""
    return (
        (
            (sum_independent * sum_dependent_squared) -
            (sum_dependent * sum_ind_times_dep)
        ) / (
            (n * sum_dependent_squared) - (sum_dependent * sum_dependent)
        )
    )


def reg_slope(sum_ind_times_dep, sum_independent, sum_dependent, sum_dependent_squared, n):
    """Calculates the slope of the regression line"""
    return (
        (
            (n * sum_ind_times_dep) - (sum_independent * sum_dependent)
        ) / (
            (n * sum_dependent_squared) - (sum_dependent * sum_dependent)
        )
    )


def regress(dependent_var, independent_var):
    """
    Takes in two arrays of values and returns a slope
    and intercept for the line of best fit in dict form
    """
    if len(dependent_var) != len(independent_var):
        return

    sum_dependent = sum(dependent_var)
    sum_independent = sum(independent_var)

    sum_dependent_squared = sum_squared(dependent_var)
    sum_independent_squared = sum_squared(independent_var)

    independent_times_dependent = []
    # assumes lists will be same length -- will be caught before this stage
    for i in range(len(dependent_var)):
        ind = independent_var[i]
        dep = dependent_var[i]
        independent_times_dependent.append(ind * dep)

    sum_ind_times_dep = sum(independent_times_dependent)
    n = len(dependent_var)
    slope = reg_slope(sum_ind_times_dep, sum_independent,
                      sum_dependent, sum_dependent_squared, n)
    intercept = reg_intercept(
        sum_independent, sum_dependent, sum_dependent_squared, sum_ind_times_dep, n)
    return {'slope': slope, 'intercept': intercept}


def lambda_handler(event, context):
    body = json.loads(event['body'])
    dependent_var = body['dep']
    independent_var = body['ind']
    different_data_lengths = len(dependent_var) != len(independent_var)
    if different_data_lengths:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'DIFFERENT_LENGTHS'})
        }
    else:
        try:
            regression_results = json.dumps(
                regress(dependent_var, independent_var))
            return {
                'statusCode': 200,
                'body': regression_results
            }
        except Exception as e:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'INVALID_INPUT'})
            }
