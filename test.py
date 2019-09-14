import unittest
import importlib
regress = importlib.import_module('regression').regress

class TestRegress(unittest.TestCase):
    def test_regress(self):
        # test data taken from https://www.statisticshowto.datasciencecentral.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation/
        test_data_x = [43, 21, 25, 42, 57, 59]
        test_data_y = [99, 65, 79, 75, 87, 81]
        expected_result = { 'intercept': 65.1416, 'slope': 385225 }
        actual_result = regress(test_data_x, test_data_y)
        self.assertEqual(expected_result['slope'], actual_result['slope'])
        self.assertEqual(expected_result['intercept'], actual_result['intercept'])

if __name__ == '__main__':
    unittest.main()
