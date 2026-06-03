from flask import Flask, jsonify
app = Flask(__name__)

@app.get("/")
def orders():
    return jsonify([{"id": 101, "item": "widget"}])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
