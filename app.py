from flask import Flask
from flask import request
import importlib
regress = importlib.import_module('regression').regress

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/regress", methods = ['POST'])
def regression():
    arguments = request.get_json()
    regression_results = regress(arguments['dep'], arguments['ind'])
    return regression_results

if __name__ == "__main__":
  app.run()
