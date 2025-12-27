from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    """Render the main landing page."""
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submissions."""
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # In production, you would send an email or save to database
    print(f"New contact: {name} ({email}): {message}")
    
    return jsonify({'success': True, 'message': 'Thank you! I\'ll be in touch soon.'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)


