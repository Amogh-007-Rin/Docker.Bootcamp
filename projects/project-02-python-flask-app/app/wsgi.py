from flask import Flask, jsonify
import os, redis

app = Flask(__name__)
r = redis.from_url(os.environ["REDIS_URL"])

@app.get("/")
def index():
    hits = r.incr("hits")
    return jsonify(message="Flask + Redis", hits=hits)
