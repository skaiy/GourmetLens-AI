# 📸 GourmetLens AI

> **The Virtual Food Photographer for the World.**  
> Instantly generate professional, high-end food photography for menus and social media using Google's latest Generative AI models.

![App Screenshot](https://via.placeholder.com/1200x600?text=GourmetLens+AI+Dashboard)

## 🌍 Global Edition (54 Languages)

GourmetLens AI is designed for a global audience. It completely adapts its interface and culinary knowledge base to **54 different languages**, allowing users from Tokyo to Rio de Janeiro to describe dishes in their native tongue.

**Key Features:**
*   **54-Language Support:** Full UI translation including RTL support for Arabic, Hebrew, Farsi, and Urdu.
*   **Universal Menu Presets:** A curated list of global culinary icons (e.g., *Sushi, Tacos, Paella, Burgers*) that are culturally contextualized and translated for every supported language.
*   **Style Control:** Switch between **Rustic/Dark**, **Bright/Modern**, and **Social Media (Top-Down)** aesthetics.

## 🤖 AI Powered By Google

This application leverages the cutting-edge capabilities of the **Google GenAI SDK**:

*   **Image Generation:** Uses **`imagen-4.0-generate-001`** to create hyper-realistic food textures, lighting, and plating.
*   **Magic Editor:** Uses **`gemini-2.5-flash-image`** to interpret natural language edit requests (e.g., *"Add steam rising," "Make the lighting warmer"*) and modify existing images on the fly.

## 🚀 Getting Started

### Prerequisites

*   Node.js installed.
*   A Google AI Studio API Key with access to `imagen-4.0` and `gemini-2.5-flash`.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/skaiy/GourmetLens-AI.git
    cd gourmetlens-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_ai_studio_api_key_here
    ```

4.  **Run the Application**
    ```bash
    npm start
    ```

## 📖 Usage Guide

1.  **Select Language:** Click the globe icon in the top right to select one of the 54 supported languages.
2.  **Choose a Preset (Optional):** Click a "Quick Start" cuisine button (e.g., 🍕 Pizza, 🍣 Sushi) to auto-fill the prompt with a professionally crafted description in your selected language.
3.  **Customize:**
    *   **Dish Name:** e.g., "Truffle Mushroom Risotto".
    *   **Description:** Describe ingredients, mood, and lighting.
    *   **Style:** Select Rustic, Modern, or Social.
4.  **Generate:** Click "Generate Photo".
5.  **Edit:** Click any generated image to open the **Magic Editor**. Type a command like *"Remove the napkin"* or *"Add a glass of wine"* to refine the shot.

## 🌐 Supported Languages

GourmetLens AI supports the following locales:

*   **English** (US, UK)
*   **East Asian:** Chinese (Simplified/Traditional), Japanese, Korean
*   **European:** Spanish, French, German, Italian, Portuguese (PT/BR), Russian, Dutch, Polish, Ukrainian, and more.
*   **Middle Eastern:** Arabic, Hebrew, Farsi, Turkish.
*   **South Asian:** Hindi, Bengali, Marathi, Tamil, Telugu, Kannada, Gujarati, Malayalam.
*   **Southeast Asian:** Vietnamese, Thai, Indonesian, Malay, Filipino.
*   **African:** Swahili, Amharic.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **AI:** @google/genai SDK

## 📄 License

Distributed under the GNU General Public License v3.0. See `LICENSE` for more information.

---

*Built with ❤️ and 🥘 by GourmetLens Team*