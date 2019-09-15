import sys
import os
sys.path.append(os.path.dirname(os.path.realpath(__file__)) + "/../")

import app
import unittest
import importlib

class APITest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_api(self):
        test_data = json.dumps({'dep': [43, 21, 25, 42, 57, 59], 'ind': [99, 65, 79, 75, 87, 81]})
        response = self.app.post('/regress', data = test_data, content_type = 'application/json')
        print(response)

if __name__ == "__main__":
    unittest.main()
