from flask import Flask, request, jsonify
from flask_cors import CORS
from spellchecker import SpellChecker

# Step 1: Create Flask App
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React integration

# Step 2: Initialize the SpellChecker
spell = SpellChecker()

# Step 3: API endpoint for spell-checking (supports both POST and GET)
@app.route('/spellcheck', methods=['POST'])
def spellcheck():
    data = request.json  # Parse the JSON payload
    text = data.get('text', '')  # Extract the text field

    words = text.split()
    corrected_words = []

    # Step 4: Correct each word
    for word in words:
        corrected_word = spell.correction(word)
        corrected_words.append(corrected_word if corrected_word else word)

    # Step 5: Return corrected text as a JSON response
    corrected_text = ' '.join(corrected_words)
    return jsonify({"corrected_text": corrected_text})

# Step 6: Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
