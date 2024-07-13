const urlInput = document.getElementById('url');
const generateButton = document.getElementById('generate');
const downloadButton = document.getElementById('download');
const qrcodeContainer = document.getElementById('qrcode');
let lastGeneratedUrl = '';

urlInput.addEventListener('input', () => {
    const url = urlInput.value.trim();
    if (url && url !== lastGeneratedUrl) {
        generateButton.disabled = false;
    } else {
        generateButton.disabled = true;
    }
});

generateButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url && url !== lastGeneratedUrl) {
        lastGeneratedUrl = url;
        fetch(`/generate_qr`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        .then(response => response.json())
        .then(data => {
            qrcodeContainer.innerHTML = `<img id="qrImage" src="data:image/png;base64,${data.qrcode}" />`;
            generateButton.disabled = true;
            downloadButton.style.display = 'inline';
        });
    }
});

downloadButton.addEventListener('click', () => {
    const qrImage = document.getElementById('qrImage');
    if (qrImage) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qrcode.png';
        link.click();
    }
});
