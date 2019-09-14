from flask import Flask
from flask import request
from flask import abort
import importlib
regress = importlib.import_module('regression').regress

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/regress", methods = ['POST'])
def regression():
    arguments = request.get_json()
    dependent_var = arguments['dep']
    independent_var = arguments['ind']
    different_data_lengths = len(dependent_var) != len(independent_var)
    if different_data_lengths:
        abort(400, description = 'DIFFERENT LENGTH DATA')
    else:
        regression_results = regress(dependent_var, independent_var)
        return regression_results

if __name__ == "__main__":
  app.run()
