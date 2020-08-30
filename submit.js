const state = {};

const setMessage = (id, newClass, msg) => {
    const errorTag = document.getElementById(id);
    errorTag.className = newClass;
    errorTag.textContent = msg;
};

const setError = (msg) => setMessage('error', 'upload__error', msg);
const removeError = () => setMessage('error', 'upload__error--invisible', '');
const setSuccess = (msg) => setMessage('success', 'upload__success', 'Data uploaded successfully!');
const removeSuccess = () => setMessage('success', 'upload__success', '');
const setValues = ({ slope, intercept }) => {
    document.getElementById('coefficient').textContent = slope;
    document.getElementById('constant').textContent = intercept;
    document.getElementById('values').className = 'results__regression-values';
};

const handleFileUpload = (e) => {
    removeError();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (evt) => {
        Papa.parse(evt.target.result, {
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (r) => {
                const csv = r.data.slice(0,2); // we can only handle two rows
                // scan csv data for problems
                const lengthDifference = csv[0].length !== csv[1].length;
                if (lengthDifference) {
                    setError('Error: Your data series are not the same length. Plese check your data and try again.');
                    document.getElementById('submit-btn').disabled = true;
                    return;
                }

                const verifyBody = (data) => {
                    const allNumbers = data.map((el) => {
                        el = Number(el);
                        if (isNaN(el)) {
                            const numberError = 'All non-title data points must be numbers';
                            setError(numberError);
                            document.getElementById('submit-btn').disabled = true;
                            document.getElementById('file-upload').value = '';
                            throw new Error(numberError);
                        }

                        return el;
                    });

                    return allNumbers;
                };

                // package data for API
                const requestBody = csv.reduce((acc, val, i) => {
                    const bodyData = verifyBody(val.slice(1));
                    const key = i === 0 ? 'dep' : 'ind';
                    acc[key] = bodyData;
                    return acc;
                }, {});

                // package data for chart
                const yData = csv[1].slice(1);
                const chartData = csv[0].slice(1).map((x, i) => {
                    const y = yData[i];
                    return { x, y };
                });
                const seriesNames = { x: csv[0][0], y: csv[1][0] };

                state.requestBody = requestBody;
                state.chartData = chartData;
                state.seriesNames = seriesNames;
                document.getElementById('submit-btn').disabled = false;
                setSuccess();
            }
        });
    };

    reader.onerror = (evt) => {
        setError('Error reading CSV File');
    };
};

const handleDataSubmission = (e) => {
    removeSuccess();
    removeError();
    if (!state.requestBody) {
        setError('Please upload a file');
    } else {
        fetch('https://nxalqwxrnh.execute-api.us-west-1.amazonaws.com/Prod/regress', {
            method: 'POST',
            body: JSON.stringify(state.requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((r) => {
            if (r.ok) {
                r.json().then((regressionLine) => {
                    setValues(regressionLine);
                    scatterPlot(state.chartData, regressionLine, state.seriesNames);
                });
            } else if (r.status === 400) {
                setError('It appears that you have uploaded some invalid data. Please double-check your data and try again');
            } else {
                setError('An API error occured. Please try again later.');
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file-upload').onchange = handleFileUpload;
    document.getElementById('submit-btn').onclick = handleDataSubmission;
});
