from flask import Flask, request, abort, url_for, redirect
from regression import regress

app = Flask(__name__, static_url_path = '')

@app.route("/", methods = ['GET'])
def homepage():
    return app.send_static_file('index.html')

@app.route("/regress", methods = ['POST'])
def send_regression():
    arguments = request.get_json()
    dependent_var = arguments['dep']
    independent_var = arguments['ind']
    different_data_lengths = len(dependent_var) != len(independent_var)
    if different_data_lengths:
        return abort(400, description = 'DIFFERENT_LENGTH')
    else:
        try:
            regression_results = regress(dependent_var, independent_var)
            return regression_results
        except Exception as e:
            print(e)
            return abort(400, 'INVALID_INPUT')

@app.route("/sample-data", methods = ['GET'])
def get_data():
    return app.send_static_file('sample-data.csv')

if __name__ == "__main__":
    app.run()
