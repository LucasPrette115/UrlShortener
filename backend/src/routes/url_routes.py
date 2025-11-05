import os
from flask import Blueprint, jsonify, request, redirect
from src.services.url_service import shorten_url, get_original_url

url_bp = Blueprint('url_blueprint', __name__)

BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")

@url_bp.route("/api/shorten", methods=["POST"])
def shorten_url_route():
    data = request.get_json()
    original_url = data.get("url")
    
    if not original_url:
        return jsonify({"error": "Missing URL"}), 400
    
    short_code = shorten_url(original_url)
    return jsonify({"short": f"{BASE_URL}/{short_code}"})


@url_bp.route("/<short_code>", methods=["GET"])
def get_original_url_route(short_code):
    original_url = get_original_url(short_code)
    
    if not original_url:
        return jsonify({"error": "URL not found"}), 404
    
    return redirect(original_url)