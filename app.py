import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify

# Load API key
load_dotenv()
FAL_API_KEY = os.getenv("FAL_AI_API_KEY")

app = Flask(__name__)

FAL_AI_ENDPOINT = "https://fal.ai/models/fal-ai/cat-vton"  # Replace with your model ID

@app.route("/try-on", methods=["POST"])
def try_on():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    files = {"file": (image_file.filename, image_file.stream, image_file.content_type)}
    
    headers = {"Authorization": f"Bearer {FAL_API_KEY}"}
    
    response = requests.post(FAL_AI_ENDPOINT, headers=headers, files=files)
    
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
