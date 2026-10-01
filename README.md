# Tamil Life Coach — Website

A modern, responsive, and emotionally engaging website for **Tamil Life Coach**, built completely from scratch using **Vanilla HTML5, Vanilla CSS3, and Vanilla JavaScript** without any external UI frameworks or build steps.

---

## 🎨 Brand Color System

| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Primary Purple | `#8719A8` | Main brand identity, buttons, headings, accents |
| **Secondary** | Soft Mauve | `#BF9CB5` | Soft backgrounds, cards, secondary accents |
| **Accent** | Bright Yellow | `#FEF702` | Highlights, badges, decorative elements, focal CTAs |
| **Deep** | Deep Brown | `#6E271D` | Typography, deep structural accents, footer |

---

## 📁 File Structure

```text
tamil-life-coach/
├── index.html                   # Semantic HTML5 structure
├── css/
│   └── style.css                # Custom CSS3 styles, variables & responsive design
├── js/
│   └── script.js                # Interactive logic & centralized WhatsApp messaging
├── assets/
│   ├── hero-life-coach.jpg      # Hero section portrait (Indian life coach / professional)
│   ├── about-coaching.jpg       # Mentorship & 1-on-1 coaching environment
│   ├── life-coaching.jpg        # Life coaching & clarity
│   ├── career-coaching.jpg      # Career coaching & professional roadmap
│   ├── confidence-building.jpg  # Confidence building & public speaking
│   ├── personal-development.jpg # Mindset & journaling
│   └── skill-development.jpg    # Modern skill learning & workshop
└── README.md                    # Project documentation
```

---

## 🚀 Easy Customizations

### 1. Replacing the Hero Image
The hero section uses a high-resolution, culturally aligned placeholder:
`assets/hero-life-coach.jpg`

To replace it with the final client portrait:
1. Save your new photo inside the `assets/` directory.
2. Name it `hero-life-coach.jpg` (or update the `src` attribute in `index.html` at the developer comment):
```html
<!--
  HERO IMAGE REPLACEMENT:
  Replace assets/hero-life-coach.jpg with the final brand image.
-->
<img src="assets/hero-life-coach.jpg" alt="Indian woman life coach" class="hero-image">
```

### 2. Changing the WhatsApp Number
The WhatsApp configuration is centralized in `js/script.js`:
```javascript
const WHATSAPP_NUMBER = "919962549549";
```
Simply edit this variable to update the recipient phone number across every CTA button on the website.

---

## 💻 Local Preview Instructions

You can preview this website in any web browser by opening `index.html` directly, or serving it with Python's built-in HTTP server:

```bash
# In the project directory:
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🏢 Credits

- **Client:** Tamil Life Coach ([tamillifecoaching.com](https://tamillifecoaching.com))
- **Website developed by:** [Digimaraa Technologies](https://digimaraa.com)
