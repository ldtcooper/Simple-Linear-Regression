const state = {};

const setError = (errorMsg) => {
    const errorTag = document.getElementById('error');
    errorTag.className = 'upload__error';
    errorTag.textContent = errorMsg;
};

const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (evt) => {
        Papa.parse(evt.target.result, {
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (r) => {
                const csv = r.data.slice(0,2); // we can only handle two rows
                if (csv[0].length !== csv[1].length) {
                    setError('Your data series are not the same length. Plese check your data and try again.');
                }

                // package data for API
                const requestBody = csv.reduce((acc, val, i) => {
                    const bodyData = val.slice(1);
                    const key = i === 0 ? 'dep' : 'ind';
                    acc[key] = bodyData;
                    return acc;
                }, {});

                // package data for chart
                const chartData = csv[0].slice(1).map((x, i) => {
                    const y = csv[1][i];
                    return { x, y };
                });
                const seriesNames = { x: csv[0][0], y: csv[1][0] };

                state.requestBody = requestBody;
                state.chartData = chartData;
                state.seriesNames = seriesNames;
                document.getElementById('submit-btn').disabled = false;
            }
        });
    };

    reader.onerror = (evt) => {
        setError('Error reading CSV File');
    };
};

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file-upload').onchange = handleFileUpload;
});
