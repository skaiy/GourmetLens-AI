
import { PhotoStyle, Preset, Language } from './types';

interface TranslationData {
  header: {
    title: string;
    subtitle: string;
  };
  input: {
    newShoot: string;
    quickStart: string;
    styleLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    descLabel: string;
    descPlaceholder: string;
    generateBtn: string;
    generatingBtn: string;
    proTipTitle: string;
    proTipDesc: string;
  };
  gallery: {
    title: string;
    countSuffix: string;
    emptyTitle: string;
    emptyDesc: string;
    clickToEdit: string;
  };
  modal: {
    download: string;
    originalRequest: string;
    magicEditTitle: string;
    magicEditDesc: string;
    magicEditExample: string;
    editPlaceholder: string;
    applyBtn: string;
    editingBtn: string;
    history: string;
  };
  styles: Record<PhotoStyle, { label: string; desc: string }>;
  errors: {
    generate: string;
    edit: string;
  };
  presets: Preset[];
}

// --- Base Translations (English) ---
const baseEn: Omit<TranslationData, 'presets'> = {
  header: { title: "GourmetLens AI", subtitle: "Global Edition" },
  input: {
    newShoot: "New Shoot", quickStart: "Cuisine Presets", styleLabel: "Photography Style",
    nameLabel: "Dish Name", namePlaceholder: "e.g., Truffle Mushroom Risotto",
    descLabel: "Visual Description", descPlaceholder: "Describe ingredients, plating, garnish, and mood...",
    generateBtn: "Generate Photo", generatingBtn: "Creating...",
    proTipTitle: "Pro Tip", proTipDesc: "Mention 'steam', 'dripping sauce', or 'crispy skin' for realism."
  },
  gallery: {
    title: "Portfolio", countSuffix: "shots", emptyTitle: "No photos yet",
    emptyDesc: "Select a preset to start", clickToEdit: "Click to Edit"
  },
  modal: {
    download: "Download", originalRequest: "Original Request", magicEditTitle: "AI Magic Edit",
    magicEditDesc: "Tweak the image with text.", magicEditExample: "Ex: 'Add steam', 'Warmer light'.",
    editPlaceholder: "Describe edit...", applyBtn: "Apply Edit", editingBtn: "Editing...", history: "Versions"
  },
  styles: {
    [PhotoStyle.RUSTIC]: { label: 'Rustic / Dark', desc: 'Moody, wood textures, dramatic.' },
    [PhotoStyle.MODERN]: { label: 'Bright / Modern', desc: 'Clean white, minimalist.' },
    [PhotoStyle.SOCIAL]: { label: 'Social Media', desc: 'Top-down, pop colors.' }
  },
  errors: { generate: "Generation failed.", edit: "Edit failed." }
};

// --- Helpers ---
const createTrans = (overrides: Partial<Omit<TranslationData, 'presets'>>, presets: Preset[]): TranslationData => {
  return { ...baseEn, ...overrides, styles: { ...baseEn.styles, ...(overrides.styles || {}) }, presets };
};

// --- Specific Presets Definitions ---

const presetsMap: Record<Language, Preset[]> = {
  // English Variations
  'en': [
    { id: 'en1', label: '🇺🇸 Burger', dishName: 'Smashburger', style: PhotoStyle.SOCIAL, description: 'Double patty smashburger, melting cheddar, brioche bun, dripping sauce, caramelized onions, vibrant colors.' },
    { id: 'en2', label: '🇬🇧 Breakfast', dishName: 'Full English', style: PhotoStyle.RUSTIC, description: 'Fried eggs, sausages, bacon, baked beans, grilled tomato, mushrooms, toast, tea, rustic styling.' }
  ],
  'en-GB': [
    { id: 'gb1', label: '🇬🇧 Classic', dishName: 'Fish and Chips', style: PhotoStyle.RUSTIC, description: 'Golden beer-battered cod, thick cut chips, mushy peas, tartar sauce, lemon wedge, newspaper styled paper, wooden table.' },
    { id: 'gb2', label: '🇬🇧 Roast', dishName: 'Sunday Roast', style: PhotoStyle.RUSTIC, description: 'Roast beef, yorkshire pudding, roast potatoes, gravy, seasonal vegetables, moody lighting.' }
  ],
  'en-US': [
    { id: 'us1', label: '🇺🇸 BBQ', dishName: 'Texas Brisket', style: PhotoStyle.RUSTIC, description: 'Smoked brisket slices, smoke ring, butcher paper, pickles, onions, white bread, dramatic lighting.' },
    { id: 'us2', label: '🇺🇸 Dessert', dishName: 'New York Cheesecake', style: PhotoStyle.MODERN, description: 'Classic tall slice, strawberry topping, graham cracker crust, clean white plate, studio lighting.' }
  ],
  
  // Germanic
  'de': [
    { id: 'de1', label: '🇩🇪 Classic', dishName: 'Wiener Schnitzel', style: PhotoStyle.MODERN, description: 'Golden breaded veal cutlet, lemon slice, potato salad with parsley, cranberry sauce, bright lighting.' },
    { id: 'de2', label: '🇩🇪 Street', dishName: 'Currywurst', style: PhotoStyle.SOCIAL, description: 'Sliced bratwurst, curry ketchup powder, fries, paper tray, street food aesthetic.' }
  ],
  'nl': [
    { id: 'nl1', label: '🇳🇱 Sweet', dishName: 'Stroopwafel', style: PhotoStyle.RUSTIC, description: 'Fresh stroopwafel on top of a steaming coffee mug, caramel dripping, cozy atmosphere.' },
    { id: 'nl2', label: '🇳🇱 Snack', dishName: 'Bitterballen', style: PhotoStyle.SOCIAL, description: 'Deep fried ragout balls, mustard dip, beer glass in background, pub lighting.' }
  ],
  
  // Asian (East)
  'zh-CN': [
    { id: 'cn1', label: '🇨🇳 Sichuan', dishName: 'Mapo Tofu', style: PhotoStyle.RUSTIC, description: 'Spicy chili oil, soft tofu, minced beef, sichuan peppercorns, green garlic, clay pot, steam rising.' },
    { id: 'cn2', label: '🇨🇳 Dim Sum', dishName: 'Xiao Long Bao', style: PhotoStyle.MODERN, description: 'Steamed soup dumplings in bamboo steamer, delicate skin, ginger vinegar dip, soft natural light.' }
  ],
  'zh-TW': [
    { id: 'tw1', label: '🇹🇼 Classic', dishName: 'Braised Pork Rice', style: PhotoStyle.RUSTIC, description: 'Minced pork belly braised in soy sauce over white rice, pickled cucumber, braised egg, ceramic bowl.' },
    { id: 'tw2', label: '🇹🇼 Street', dishName: 'Bubble Tea', style: PhotoStyle.SOCIAL, description: 'Brown sugar boba milk tea, tapioca pearls, tiger stripes syrup pattern, condensation on cup, sunlight.' }
  ],
  'ja': [
    { id: 'jp1', label: '🇯🇵 Sushi', dishName: 'Omakase Nigiri', style: PhotoStyle.MODERN, description: 'Premium tuna otoro, uni, and sea bream nigiri, minimalist wood counter, focused lighting.' },
    { id: 'jp2', label: '🇯🇵 Warm', dishName: 'Hakata Ramen', style: PhotoStyle.RUSTIC, description: 'Rich tonkotsu broth, thin noodles, chashu pork, wood ear mushrooms, green onions, steam rising.' }
  ],
  'ko': [
    { id: 'kr1', label: '🇰🇷 Stew', dishName: 'Kimchi Jjigae', style: PhotoStyle.RUSTIC, description: 'Boiling spicy kimchi stew, tofu, pork belly, scallions, stone pot (dolsot), steam, side dishes.' },
    { id: 'kr2', label: '🇰🇷 Rice', dishName: 'Bibimbap', style: PhotoStyle.SOCIAL, description: 'Rice bowl topped with colorful sautéed vegetables, beef, fried egg, gochujang paste, sesame seeds, top-down view.' }
  ],

  // Asian (Southeast)
  'vi': [
    { id: 'vi1', label: '🇻🇳 Soup', dishName: 'Pho Bo', style: PhotoStyle.MODERN, description: 'Beef noodle soup, rare steak slices, rice noodles, clear rich broth, basil, bean sprouts, lime, hoisin sauce.' },
    { id: 'vi2', label: '🇻🇳 Sandwich', dishName: 'Banh Mi', style: PhotoStyle.SOCIAL, description: 'Crispy baguette, paté, pork roll, pickled carrots, daikon, cilantro, chili, street food vibe.' }
  ],
  'th': [
    { id: 'th1', label: '🇹🇭 Noodles', dishName: 'Pad Thai', style: PhotoStyle.SOCIAL, description: 'Stir-fried rice noodles, shrimp, crushed peanuts, bean sprouts, lime wedge, vibrant colors, banana leaf.' },
    { id: 'th2', label: '🇹🇭 Curry', dishName: 'Tom Yum Goong', style: PhotoStyle.RUSTIC, description: 'Spicy sour shrimp soup, lemongrass, galangal, kaffir lime leaves, chili oil floating, copper pot.' }
  ],
  'id': [
    { id: 'id1', label: '🇮🇩 Rice', dishName: 'Nasi Goreng', style: PhotoStyle.SOCIAL, description: 'Indonesian fried rice, sweet soy sauce, fried egg on top, chicken satay side, kerupuk crackers.' },
    { id: 'id2', label: '🇮🇩 Meat', dishName: 'Beef Rendang', style: PhotoStyle.RUSTIC, description: 'Slow cooked beef in coconut milk and spices, dark rich brown color, tender texture, banana leaf plating.' }
  ],
  'ms': [
    { id: 'ms1', label: '🇲🇾 Iconic', dishName: 'Nasi Lemak', style: PhotoStyle.SOCIAL, description: 'Coconut rice, sambal chili, fried anchovies, peanuts, cucumber, boiled egg, banana leaf wrapping.' },
    { id: 'ms2', label: '🇲🇾 Noodles', dishName: 'Laksa', style: PhotoStyle.RUSTIC, description: 'Spicy coconut curry noodle soup, prawns, tofu puffs, bean sprouts, laksa leaf garnish.' }
  ],
  'fil': [
    { id: 'ph1', label: '🇵🇭 Classic', dishName: 'Chicken Adobo', style: PhotoStyle.RUSTIC, description: 'Chicken braised in soy sauce and vinegar, garlic, peppercorns, bay leaves, served with white rice.' },
    { id: 'ph2', label: '🇵🇭 Dessert', dishName: 'Halo-Halo', style: PhotoStyle.SOCIAL, description: 'Shaved ice dessert, purple yam ice cream (ube), leche flan, sweetened beans, evaporated milk, tall glass.' }
  ],

  // European (Latin)
  'fr': [
    { id: 'fr1', label: '🇫🇷 Main', dishName: 'Coq au Vin', style: PhotoStyle.RUSTIC, description: 'Chicken braised with wine, lardons, mushrooms, and pearl onions, rich dark sauce, copper pot.' },
    { id: 'fr2', label: '🇫🇷 Pastry', dishName: 'Croissant', style: PhotoStyle.MODERN, description: 'Golden flaky butter croissant, honeycomb interior structure, coffee cup, marble table, morning light.' }
  ],
  'it': [
    { id: 'it1', label: '🇮🇹 Pasta', dishName: 'Spaghetti Carbonara', style: PhotoStyle.MODERN, description: 'Al dente spaghetti, creamy egg and pecorino sauce, crispy guanciale, black pepper, no cream, white plate.' },
    { id: 'it2', label: '🇮🇹 Pizza', dishName: 'Pizza Margherita', style: PhotoStyle.SOCIAL, description: 'Neapolitan style, leopard spotted crust, san marzano tomato, fresh mozzarella di bufala, basil.' }
  ],
  'es': [
    { id: 'es1', label: '🇪🇸 Rice', dishName: 'Paella Valenciana', style: PhotoStyle.SOCIAL, description: 'Saffron rice, rabbit, chicken, green beans, garrofon beans, cooked in large steel pan, outdoor light.' },
    { id: 'es2', label: '🇪🇸 Tapas', dishName: 'Jamón Ibérico', style: PhotoStyle.RUSTIC, description: 'Thinly sliced acorn-fed ham, glossy fat, wooden board, crusty bread with tomato.' }
  ],
  'es-419': [ // Latin America generic
    { id: 'la1', label: '🇲🇽 Taco', dishName: 'Tacos al Pastor', style: PhotoStyle.SOCIAL, description: 'Corn tortillas, marinated pork, pineapple, cilantro, onion, salsa verde, lime wedges.' },
    { id: 'la2', label: '🇦🇷 Grill', dishName: 'Asado', style: PhotoStyle.RUSTIC, description: 'Grilled beef ribs, chorizo, blood sausage, chimichurri sauce, wooden board, fire background.' }
  ],
  'pt-PT': [
    { id: 'pt1', label: '🇵🇹 Sweet', dishName: 'Pastel de Nata', style: PhotoStyle.MODERN, description: 'Portuguese egg tart, blistered caramelized top, flaky pastry, sprinkled cinnamon, coffee.' },
    { id: 'pt2', label: '🇵🇹 Fish', dishName: 'Bacalhau à Brás', style: PhotoStyle.RUSTIC, description: 'Shredded cod, onions, shoestring potatoes, scrambled eggs, parsley, black olives.' }
  ],
  'pt-BR': [
    { id: 'br1', label: '🇧🇷 Stew', dishName: 'Feijoada', style: PhotoStyle.RUSTIC, description: 'Black bean stew with pork, sausage, served with white rice, orange slices, kale, farofa.' },
    { id: 'br2', label: '🇧🇷 Snack', dishName: 'Pão de Queijo', style: PhotoStyle.MODERN, description: 'Brazilian cheese breads, golden crust, chewy interior, basket, breakfast setting.' }
  ],
  'ro': [
    { id: 'ro1', label: '🇷🇴 Roll', dishName: 'Sarmale', style: PhotoStyle.RUSTIC, description: 'Cabbage rolls stuffed with minced meat and rice, tomato sauce, sour cream, polenta side.' },
    { id: 'ro2', label: '🇷🇴 Sweet', dishName: 'Papanasi', style: PhotoStyle.MODERN, description: 'Fried donuts with cottage cheese, topped with sour cream and blueberry jam.' }
  ],

  // Eastern Europe / Nordic
  'ru': [
    { id: 'ru1', label: '🇷🇺 Soup', dishName: 'Borscht', style: PhotoStyle.RUSTIC, description: 'Deep red beetroot soup, dollop of sour cream, dill garnish, rye bread, garlic cloves.' },
    { id: 'ru2', label: '🇷🇺 Dough', dishName: 'Pelmeni', style: PhotoStyle.MODERN, description: 'Meat dumplings, butter, vinegar, black pepper, fresh herbs, ceramic bowl.' }
  ],
  'pl': [
    { id: 'pl1', label: '🇵🇱 Dumpling', dishName: 'Pierogi Ruskie', style: PhotoStyle.RUSTIC, description: 'Dumplings filled with potato and cheese, topped with caramelized onions and bacon bits.' },
    { id: 'pl2', label: '🇵🇱 Soup', dishName: 'Zurek', style: PhotoStyle.RUSTIC, description: 'Sour rye soup, white sausage, boiled egg, served in a bread bowl.' }
  ],
  'uk': [
    { id: 'ua1', label: '🇺🇦 Main', dishName: 'Chicken Kyiv', style: PhotoStyle.MODERN, description: 'Breaded chicken breast rolled with garlic butter, dill, mashed potatoes, cut open butter flowing.' },
    { id: 'ua2', label: '🇺🇦 Soup', dishName: 'Ukrainian Borscht', style: PhotoStyle.RUSTIC, description: 'Red beet soup, cabbage, meat, beans, sour cream, pampushky garlic bread.' }
  ],
  'cs': [
    { id: 'cz1', label: '🇨🇿 Meat', dishName: 'Svíčková', style: PhotoStyle.RUSTIC, description: 'Braised beef sirloin, creamy root vegetable sauce, bread dumplings, cranberry jam, lemon slice.' },
    { id: 'cz2', label: '🇨🇿 Sweet', dishName: 'Trdelník', style: PhotoStyle.SOCIAL, description: 'Grilled chimney cake, sugar and walnut coating, steam, street market background.' }
  ],
  'hu': [
    { id: 'hu1', label: '🇭🇺 Stew', dishName: 'Goulash', style: PhotoStyle.RUSTIC, description: 'Rich beef and vegetable stew, plenty of paprika, potato, carrots, rustic bread.' },
    { id: 'hu2', label: '🇭🇺 Sweet', dishName: 'Dobos Torte', style: PhotoStyle.MODERN, description: 'Multi-layered sponge cake with chocolate buttercream, hard caramel top, elegant slice.' }
  ],
  'sv': [
    { id: 'se1', label: '🇸🇪 Classic', dishName: 'Swedish Meatballs', style: PhotoStyle.MODERN, description: 'Meatballs, creamy gravy, lingonberry jam, mashed potatoes, pickled cucumber.' },
    { id: 'se2', label: '🇸🇪 Sweet', dishName: 'Semla', style: PhotoStyle.SOCIAL, description: 'Cardamom bun filled with almond paste and whipped cream, dusted with powdered sugar.' }
  ],
  'da': [
    { id: 'dk1', label: '🇩🇰 Lunch', dishName: 'Smørrebrød', style: PhotoStyle.SOCIAL, description: 'Open faced rye bread sandwich, pickled herring, onion, dill, egg, aesthetically arranged.' },
    { id: 'dk2', label: '🇩🇰 Sweet', dishName: 'Wienerbrød', style: PhotoStyle.MODERN, description: 'Danish pastry, custard center, icing glaze, flaky layers.' }
  ],
  'no': [
    { id: 'no1', label: '🇳🇴 Fish', dishName: 'Gravlaks', style: PhotoStyle.MODERN, description: 'Cured salmon, dill, mustard sauce (hovmästarsås), crispbread.' },
    { id: 'no2', label: '🇳🇴 Cheese', dishName: 'Brunost', style: PhotoStyle.RUSTIC, description: 'Brown cheese slices on waffle, strawberry jam, sour cream, cozy setting.' }
  ],
  'fi': [
    { id: 'fi1', label: '🇫🇮 Soup', dishName: 'Lohikeitto', style: PhotoStyle.RUSTIC, description: 'Creamy salmon soup, potatoes, leeks, plenty of fresh dill, rye bread.' },
    { id: 'fi2', label: '🇫🇮 Sweet', dishName: 'Karjalanpiirakka', style: PhotoStyle.MODERN, description: 'Karelian pie, rye crust, rice filling, egg butter topping.' }
  ],

  // Mediterranean / Middle East
  'tr': [
    { id: 'tr1', label: '🇹🇷 Grill', dishName: 'Adana Kebab', style: PhotoStyle.RUSTIC, description: 'Spicy minced meat skewer, grilled tomato, sumac onion salad, lavash bread, charcoal grill vibe.' },
    { id: 'tr2', label: '🇹🇷 Sweet', dishName: 'Baklava', style: PhotoStyle.MODERN, description: 'Layered phyllo pastry, pistachios, honey syrup, golden color, macro shot.' }
  ],
  'el': [
    { id: 'gr1', label: '🇬🇷 Main', dishName: 'Moussaka', style: PhotoStyle.RUSTIC, description: 'Layers of eggplant, minced meat, potatoes, thick béchamel sauce, golden baked top.' },
    { id: 'gr2', label: '🇬🇷 Street', dishName: 'Gyros', style: PhotoStyle.SOCIAL, description: 'Pita wrap, pork shavings, tzatziki, tomato, onion, fries inside, held in hand.' }
  ],
  'ar': [
    { id: 'ar1', label: '🇱🇧 Mezze', dishName: 'Hummus & Falafel', style: PhotoStyle.SOCIAL, description: 'Creamy hummus with olive oil swirl, crispy falafel balls, tabbouleh, pita bread, colorful spread.' },
    { id: 'ar2', label: '🇸🇦 Rice', dishName: 'Kabsa', style: PhotoStyle.RUSTIC, description: 'Spiced long grain rice, tender chicken, almonds, raisins, dried lime, large communal platter.' }
  ],
  'he': [
    { id: 'he1', label: '🇮🇱 Breakfast', dishName: 'Shakshuka', style: PhotoStyle.RUSTIC, description: 'Poached eggs in spicy tomato and pepper sauce, fresh herbs, crusty bread for dipping, cast iron pan.' },
    { id: 'he2', label: '🇮🇱 Street', dishName: 'Sabich', style: PhotoStyle.SOCIAL, description: 'Pita stuffed with fried eggplant, hard boiled egg, tahini, amba sauce, salad.' }
  ],
  'fa': [
    { id: 'ir1', label: '🇮🇷 Grill', dishName: 'Chelo Kabab', style: PhotoStyle.MODERN, description: 'Saffron steamed rice, butter cube, grilled ground meat skewer (koobideh), grilled tomato, sumac.' },
    { id: 'ir2', label: '🇮🇷 Stew', dishName: 'Ghormeh Sabzi', style: PhotoStyle.RUSTIC, description: 'Herb stew with beans and lamb, dried lime, deep green color, served with saffron rice.' }
  ],

  // India
  'hi': [
    { id: 'in1', label: '🇮🇳 Main', dishName: 'Butter Chicken', style: PhotoStyle.MODERN, description: 'Tandoori chicken in creamy tomato sauce (makhani), swirl of cream, kasuri methi, naan bread.' },
    { id: 'in2', label: '🇮🇳 Rice', dishName: 'Hyderabadi Biryani', style: PhotoStyle.RUSTIC, description: 'Basmati rice layered with spiced marinated meat, saffron, fried onions, mint, raita side.' }
  ],
  'mr': [
    { id: 'mr1', label: '🇮🇳 Street', dishName: 'Vada Pav', style: PhotoStyle.SOCIAL, description: 'Spicy potato fritter in bun, red garlic chutney, green chili, mumbai street vibe.' },
    { id: 'mr2', label: '🇮🇳 Sweet', dishName: 'Puran Poli', style: PhotoStyle.MODERN, description: 'Sweet flatbread stuffed with lentils and jaggery, ghee on top.' }
  ],
  'bn': [
    { id: 'bn1', label: '🇮🇳 Fish', dishName: 'Shorshe Ilish', style: PhotoStyle.RUSTIC, description: 'Hilsa fish in mustard sauce, green chili, turmeric, served with white rice.' },
    { id: 'bn2', label: '🇮🇳 Sweet', dishName: 'Rosogolla', style: PhotoStyle.MODERN, description: 'Spongy white cheese balls in light sugar syrup, clay pot.' }
  ],
  'gu': [
    { id: 'gu1', label: '🇮🇳 Snack', dishName: 'Dhokla', style: PhotoStyle.SOCIAL, description: 'Steamed yellow gram flour cake, mustard seeds tempering, coriander, green chutney.' },
    { id: 'gu2', label: '🇮🇳 Thali', dishName: 'Gujarati Thali', style: PhotoStyle.SOCIAL, description: 'Silver platter, many small bowls, dal, kadhi, shaak, roti, sweet, colorful arrangement.' }
  ],
  'ta': [
    { id: 'ta1', label: '🇮🇳 Breakfast', dishName: 'Masala Dosa', style: PhotoStyle.MODERN, description: 'Crispy golden rice crepe, potato filling, sambar, coconut chutney, banana leaf.' },
    { id: 'ta2', label: '🇮🇳 Rice', dishName: 'Pongal', style: PhotoStyle.RUSTIC, description: 'Savory rice and lentil porridge, cashews, peppercorns, curry leaves, ghee.' }
  ],
  'te': [
    { id: 'te1', label: '🇮🇳 Spicy', dishName: 'Gongura Mutton', style: PhotoStyle.RUSTIC, description: 'Spicy mutton curry with sorrel leaves, rich dark gravy, red chili.' },
    { id: 'te2', label: '🇮🇳 Snack', dishName: 'Pesarattu', style: PhotoStyle.MODERN, description: 'Green gram crepe, ginger chutney, onions, crisp texture.' }
  ],
  'kn': [
    { id: 'kn1', label: '🇮🇳 Breakfast', dishName: 'Bisi Bele Bath', style: PhotoStyle.RUSTIC, description: 'Spicy rice and lentil dish with vegetables, tamarind, ghee, boondi topping.' },
    { id: 'kn2', label: '🇮🇳 Sweet', dishName: 'Mysore Pak', style: PhotoStyle.MODERN, description: 'Rich sweet made of gram flour, sugar and ghee, porous texture, golden brown.' }
  ],
  'ml': [
    { id: 'ml1', label: '🇮🇳 Breakfast', dishName: 'Appam with Stew', style: PhotoStyle.MODERN, description: 'Lacy rice hopper with soft center, creamy vegetable coconut milk stew.' },
    { id: 'ml2', label: '🇮🇳 Feast', dishName: 'Sadya', style: PhotoStyle.SOCIAL, description: 'Traditional feast on banana leaf, rice, many curries, pickles, chips, payasam.' }
  ],

  // Africa
  'sw': [
    { id: 'sw1', label: '🇰🇪 Roast', dishName: 'Nyama Choma', style: PhotoStyle.RUSTIC, description: 'Roasted goat meat, kachumbari salad, ugali, salt pile, wooden board.' },
    { id: 'sw2', label: '🇰🇪 Fish', dishName: 'Samaki Wa Kupaka', style: PhotoStyle.RUSTIC, description: 'Grilled fish coated in rich coconut tamarind sauce, smoky char.' }
  ],
  'am': [
    { id: 'et1', label: '🇪🇹 Platter', dishName: 'Injera Beyaynetu', style: PhotoStyle.SOCIAL, description: 'Large injera bread topped with mounds of spicy lentil stews (wats), vegetables, colorful texture.' },
    { id: 'et2', label: '🇪🇹 Coffee', dishName: 'Ethiopian Coffee', style: PhotoStyle.RUSTIC, description: 'Traditional jebena pot, small cups, popcorn side, incense smoke, dark mood.' }
  ],

  // Baltics
  'et': [{ id: 'ee1', label: '🇪🇪 Fish', dishName: 'Kiluvõileib', style: PhotoStyle.MODERN, description: 'Sprat sandwich, dark rye bread, boiled egg, chives.' }, { id: 'ee2', label: '🇪🇪 Meat', dishName: 'Mulgikapsad', style: PhotoStyle.RUSTIC, description: 'Sauerkraut with pork and barley, boiled potatoes.' }],
  'lv': [{ id: 'lv1', label: '🇱🇻 Grey Peas', dishName: 'Pelēkie Zirņi', style: PhotoStyle.RUSTIC, description: 'Grey peas with bacon and onion sauce, kefir drink.' }, { id: 'lv2', label: '🇱🇻 Sweet', dishName: 'Rupjmaizes Kārtojums', style: PhotoStyle.MODERN, description: 'Layered rye bread trifle, cranberry jam, whipped cream.' }],
  'lt': [{ id: 'lt1', label: '🇱🇹 Potato', dishName: 'Cepelinai', style: PhotoStyle.RUSTIC, description: 'Large potato dumplings stuffed with meat, sour cream and bacon sauce.' }, { id: 'lt2', label: '🇱🇹 Soup', dishName: 'Šaltibarščiai', style: PhotoStyle.SOCIAL, description: 'Cold pink beet soup, cucumber, dill, boiled egg, boiled potatoes side.' }],
  
  // Others
  'ca': [{ id: 'ca1', label: '🇪🇸 Bread', dishName: 'Pa amb tomàquet', style: PhotoStyle.MODERN, description: 'Rustic bread rubbed with tomato, olive oil, salt.' }, { id: 'ca2', label: '🇪🇸 Veg', dishName: 'Calçots', style: PhotoStyle.RUSTIC, description: 'Grilled green onions, romesco sauce, newspaper, charcoal.' }],
  'hr': [{ id: 'hr1', label: '🇭🇷 Sea', dishName: 'Crni Rižot', style: PhotoStyle.MODERN, description: 'Black cuttlefish risotto, parsley, lemon, glossy texture.' }, { id: 'hr2', label: '🇭🇷 Meat', dishName: 'Ćevapi', style: PhotoStyle.RUSTIC, description: 'Grilled minced meat rolls, onion, ajvar, lepinja bread.' }],
  'sl': [{ id: 'sl1', label: '🇸🇮 Cake', dishName: 'Potica', style: PhotoStyle.MODERN, description: 'Rolled nut roll cake, walnut filling, spiral pattern.' }, { id: 'sl2', label: '🇸🇮 Sausage', dishName: 'Kranjska Klobasa', style: PhotoStyle.RUSTIC, description: 'Carniolan sausage, mustard, horseradish, bread.' }],
  'sk': [{ id: 'sk1', label: '🇸🇰 Potato', dishName: 'Bryndzové Halušky', style: PhotoStyle.RUSTIC, description: 'Potato dumplings with sheep cheese, bacon bits, chives.' }, { id: 'sk2', label: '🇸🇰 Soup', dishName: 'Kapustnica', style: PhotoStyle.RUSTIC, description: 'Sauerkraut soup, sausage, dried mushrooms, sour cream.' }],
  'bg': [{ id: 'bg1', label: '🇧🇬 Salad', dishName: 'Shopska Salad', style: PhotoStyle.SOCIAL, description: 'Tomatoes, cucumbers, peppers, mound of grated white sirene cheese.' }, { id: 'bg2', label: '🇧🇬 Pastry', dishName: 'Banitsa', style: PhotoStyle.MODERN, description: 'Filo pastry coil filled with cheese and eggs, golden brown.' }],
  'sr': [{ id: 'sr1', label: '🇷🇸 Meat', dishName: 'Pljeskavica', style: PhotoStyle.RUSTIC, description: 'Large spiced meat patty, kajmak cheese, onions, flatbread.' }, { id: 'sr2', label: '🇷🇸 Spread', dishName: 'Ajvar', style: PhotoStyle.MODERN, description: 'Red pepper relish, crusty bread, jar in background.' }],
};

// --- Main Export Construction ---
const transMap: Record<Language, TranslationData> = {} as any;

// Fill defaults first
const allLangs: Language[] = [
  'de', 'en', 'en-GB', 'en-US', 'fil', 'id', 'sw', 'ms', 'nl', 'vi', 
  'tr', 'ca', 'da', 'et', 'es', 'es-419', 'fr', 'hr', 'it', 'lv', 
  'lt', 'hu', 'no', 'pl', 'pt-BR', 'pt-PT', 'ro', 'sk', 'sl', 'fi', 
  'sv', 'cs', 'el', 'bg', 'ru', 'sr', 'uk', 'he', 'ar', 'fa', 
  'mr', 'hi', 'bn', 'gu', 'ta', 'te', 'kn', 'ml', 'th', 'am', 
  'zh-CN', 'zh-TW', 'ja', 'ko'
];

allLangs.forEach(lang => {
  // Default English, override generic presets, then override specific presets if exist
  transMap[lang] = createTrans({}, presetsMap[lang] || presetsMap['en']);
});

// --- Explicit Overrides for Major Languages (UI Text) ---

// Chinese
const zhUI = { header: { title: "美食镜头 AI", subtitle: "全球版" }, input: { newShoot: "新建拍摄", quickStart: "菜系示例", styleLabel: "风格", nameLabel: "菜名", namePlaceholder: "例如：宫保鸡丁", descLabel: "描述", descPlaceholder: "描述食材、光影...", generateBtn: "生成", generatingBtn: "生成中...", proTipTitle: "提示", proTipDesc: "描述质感如'酥脆'、'多汁'。" }, gallery: { title: "图库", countSuffix: "张", emptyTitle: "暂无图片", emptyDesc: "请开始生成", clickToEdit: "点击编辑" }, styles: { [PhotoStyle.RUSTIC]: { label: "复古/暗调", desc: "质感, 木纹" }, [PhotoStyle.MODERN]: { label: "现代/明亮", desc: "极简, 白色" }, [PhotoStyle.SOCIAL]: { label: "社交媒体", desc: "俯拍, 鲜艳" } } };
transMap['zh-CN'] = createTrans(zhUI, presetsMap['zh-CN']);
transMap['zh-TW'] = createTrans(zhUI, presetsMap['zh-TW']);

// Japanese
transMap['ja'] = createTrans({
  header: { title: "グルメレンズ AI", subtitle: "グローバル版" },
  input: { newShoot: "新規撮影", quickStart: "料理プリセット", styleLabel: "スタイル", nameLabel: "料理名", namePlaceholder: "例: 寿司", descLabel: "説明", descPlaceholder: "食材や雰囲気を入力...", generateBtn: "生成", generatingBtn: "生成中...", proTipTitle: "ヒント", proTipDesc: "シズル感を具体的に。" },
  styles: { [PhotoStyle.RUSTIC]: { label: "素朴/ダーク", desc: "落ち着いた雰囲気" }, [PhotoStyle.MODERN]: { label: "モダン/明るい", desc: "清潔感" }, [PhotoStyle.SOCIAL]: { label: "SNS風", desc: "真上から, ポップ" } }
}, presetsMap['ja']);

// Spanish
const esUI = { header: { title: "GourmetLens IA", subtitle: "Edición Global" }, input: { newShoot: "Nueva Foto", quickStart: "Ejemplos de Cocina", styleLabel: "Estilo", nameLabel: "Plato", namePlaceholder: "ej. Paella", descLabel: "Descripción", descPlaceholder: "Ingredientes, luz...", generateBtn: "Generar", generatingBtn: "Creando...", proTipTitle: "Consejo", proTipDesc: "Detalla las texturas." }, styles: { [PhotoStyle.RUSTIC]: { label: "Rústico", desc: "Dramático" }, [PhotoStyle.MODERN]: { label: "Moderno", desc: "Luminoso" }, [PhotoStyle.SOCIAL]: { label: "Social", desc: "Vibrante" } } };
transMap['es'] = createTrans(esUI, presetsMap['es']);
transMap['es-419'] = createTrans(esUI, presetsMap['es-419']);

// French
transMap['fr'] = createTrans({
  header: { title: "GourmetLens IA", subtitle: "Édition Globale" },
  input: { newShoot: "Nouvelle Photo", quickStart: "Exemples", styleLabel: "Style", nameLabel: "Plat", namePlaceholder: "ex. Ratatouille", descLabel: "Description", descPlaceholder: "Détails visuels...", generateBtn: "Générer", generatingBtn: "Création...", proTipTitle: "Astuce", proTipDesc: "Précisez l'éclairage." },
  styles: { [PhotoStyle.RUSTIC]: { label: "Rustique", desc: "Sombre, textures" }, [PhotoStyle.MODERN]: { label: "Moderne", desc: "Lumineux, épuré" }, [PhotoStyle.SOCIAL]: { label: "Réseaux Sociaux", desc: "Vue de haut" } }
}, presetsMap['fr']);

// German
transMap['de'] = createTrans({
  header: { title: "GourmetLens AI", subtitle: "Global Edition" },
  input: { newShoot: "Neues Foto", quickStart: "Beispiele", styleLabel: "Stil", nameLabel: "Gericht", namePlaceholder: "z.B. Schnitzel", descLabel: "Beschreibung", descPlaceholder: "Zutaten, Licht...", generateBtn: "Generieren", generatingBtn: "Erstellen...", proTipTitle: "Tipp", proTipDesc: "Beschreibe Texturen." },
  styles: { [PhotoStyle.RUSTIC]: { label: "Rustikal", desc: "Dunkel, Holz" }, [PhotoStyle.MODERN]: { label: "Modern", desc: "Hell, Minimalistisch" }, [PhotoStyle.SOCIAL]: { label: "Social Media", desc: "Draufsicht" } }
}, presetsMap['de']);

// Korean
transMap['ko'] = createTrans({
  header: { title: "고메렌즈 AI", subtitle: "글로벌 에디션" },
  input: { newShoot: "새 촬영", quickStart: "요리 예시", styleLabel: "스타일", nameLabel: "요리명", namePlaceholder: "예: 비빔밥", descLabel: "설명", descPlaceholder: "재료, 분위기...", generateBtn: "생성", generatingBtn: "생성 중...", proTipTitle: "팁", proTipDesc: "질감을 자세히 묘사하세요." },
  styles: { [PhotoStyle.RUSTIC]: { label: "러스틱", desc: "어두운, 분위기" }, [PhotoStyle.MODERN]: { label: "모던", desc: "밝은, 깔끔한" }, [PhotoStyle.SOCIAL]: { label: "SNS 스타일", desc: "항공샷, 팝 컬러" } }
}, presetsMap['ko']);

// Portuguese
const ptUI = { header: { title: "GourmetLens IA", subtitle: "Edição Global" }, input: { newShoot: "Nova Foto", quickStart: "Exemplos", styleLabel: "Estilo", nameLabel: "Prato", namePlaceholder: "ex. Feijoada", descLabel: "Descrição", descPlaceholder: "Ingredientes...", generateBtn: "Gerar", generatingBtn: "Criando...", proTipTitle: "Dica", proTipDesc: "Detalhe as texturas." }, styles: { [PhotoStyle.RUSTIC]: { label: "Rústico", desc: "Dramático" }, [PhotoStyle.MODERN]: { label: "Moderno", desc: "Clean" }, [PhotoStyle.SOCIAL]: { label: "Social", desc: "Vibrante" } } };
transMap['pt-PT'] = createTrans(ptUI, presetsMap['pt-PT']);
transMap['pt-BR'] = createTrans(ptUI, presetsMap['pt-BR']);

// Arabic
transMap['ar'] = createTrans({
  header: { title: "GourmetLens AI", subtitle: "النسخة العالمية" },
  input: { newShoot: "صورة جديدة", quickStart: "أمثلة", styleLabel: "النمط", nameLabel: "اسم الطبق", namePlaceholder: "مثال: كبسة", descLabel: "الوصف", descPlaceholder: "المكونات، الإضاءة...", generateBtn: "إنشاء", generatingBtn: "جارِ الإنشاء...", proTipTitle: "نصيحة", proTipDesc: "صف القوام بدقة." },
  styles: { [PhotoStyle.RUSTIC]: { label: "ريفي", desc: "إضاءة درامية" }, [PhotoStyle.MODERN]: { label: "عصري", desc: "خلفية بيضاء" }, [PhotoStyle.SOCIAL]: { label: "سوشيال ميديا", desc: "ألوان زاهية" } }
}, presetsMap['ar']);

// Hindi
transMap['hi'] = createTrans({
  header: { title: "GourmetLens AI", subtitle: "Global Edition" },
  input: { newShoot: "नई तस्वीर", quickStart: "उदाहरण", styleLabel: "शैली", nameLabel: "डिश का नाम", namePlaceholder: "जैसे: बटर चिकन", descLabel: "विवरण", descPlaceholder: "सामग्री, सजावट...", generateBtn: "बनाएं", generatingBtn: "बना रहा है...", proTipTitle: "टिप", proTipDesc: "बनावट का विवरण दें।" },
  styles: { [PhotoStyle.RUSTIC]: { label: "देसी/डार्क", desc: "नाटकीय प्रकाश" }, [PhotoStyle.MODERN]: { label: "आधुनिक", desc: "साफ, मिनिमल" }, [PhotoStyle.SOCIAL]: { label: "सोशल मीडिया", desc: "रंगीन" } }
}, presetsMap['hi']);

export const translations = transMap;
