const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (evt) => {
        Papa.parse(evt.target.result, {
            complete: (csv) => {
                console.log(csv);
            }
        });
    };

    reader.onerror = (evt) => {
        console.error('Error reading CSV File');
    };
};

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file-upload').onchange = handleFileUpload;
});
