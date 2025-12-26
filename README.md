# Isaiah Jones - Ad Campaign Marketing Website

A sophisticated, modern Flask website for Isaiah Jones' ad campaign marketing business.

## Features

- **Stunning Dark Theme** - Premium look with gold accents
- **Responsive Design** - Works beautifully on all devices
- **Smooth Animations** - Scroll reveals and micro-interactions
- **Contact Form** - Functional form with AJAX submission
- **SEO Ready** - Semantic HTML structure

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python app.py
```

### 3. Open in Browser

Navigate to `http://localhost:5000`

## Project Structure

```
adwebsite/
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
├── README.md           # This file
└── templates/
    └── index.html      # Main website template
```

## Customization

### Colors

Edit the CSS variables in `templates/index.html`:

```css
:root {
    --accent-gold: #d4a853;
    --accent-copper: #c17f59;
    --bg-primary: #0a0a0f;
    /* ... */
}
```

### Content

Update the following sections in `index.html`:
- Statistics in the hero section
- Service descriptions
- Process steps
- Testimonials
- Contact information

## Deployment

For production deployment:

1. Set `debug=False` in `app.py`
2. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```
3. Configure your contact form to send actual emails

## Tech Stack

- **Backend**: Flask 3.0
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Fonts**: Cormorant Garamond + Outfit (Google Fonts)
- **Animations**: CSS transitions + Intersection Observer

## License

© 2025 Isaiah Jones. All rights reserved.

# adwebsite
