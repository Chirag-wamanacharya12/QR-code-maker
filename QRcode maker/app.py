from flask import Flask, request, jsonify, render_template
import base64
import segno
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json
    url = data.get('url')
    qrcode = segno.make(url)
    buffer = BytesIO()
    qrcode.save(buffer, kind='png', scale=5)
    qrcode_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    return jsonify({'qrcode': qrcode_base64})

if __name__ == '__main__':
    app.run(debug=True)
