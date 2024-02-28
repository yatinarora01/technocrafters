
     //Function to translate the content when the page language changes
 
     function googleTranslateElementInit() {
        // Initialize Google Translate widget
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'hi,en,pa,mr,ta',  // Specify languages you want to support
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');

        // Translate content when the page language changes
        google.translate.TranslateService.getInstance().addEventListener('pageLanguageChanged', function (e) {
            var selectedLanguage = e.target.getLanguage();
            var elementsToTranslate = document.querySelectorAll('[data-lang]');

            elementsToTranslate.forEach(function (element) {
                var lang = element.getAttribute('data-lang');
                translateText(lang, selectedLanguage, function (translatedText) {
                    element.innerHTML = translatedText;
                });
            });
        });
    }

    // Function to translate text using Google Translate API
    function translateText(sourceLanguage, targetLanguage, callback) {
        var apiUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLanguage + '&tl=' + targetLanguage + '&dt=t&q=';

        fetch(apiUrl + document.querySelector('[data-lang="' + sourceLanguage + '"]').innerText)
            .then(response => response.json())
            .then(data => {
                var translatedText = data[0][0][0];
                callback(translatedText);
            })
            .catch(error => console.error('Error:', error));
    }




const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Define question-answer pairs
const questionAnswerMap = new Map([
['hello', "Hi there! How can I assist you today?"],
['how are you', "I'm good , but thanks for asking!"],
['india a cultural country', "India is incredibly diverse, boasting a rich tapestry of cultures shaped by its long history, varied geography, and the influence of numerous civilizations and religions."],
['is india a cultural diverse country', "India is the birthplace of several major religions, including Hinduism, Buddhism, Jainism, and Sikhism. Each religion has its own traditions, rituals, and festivals that significantly contribute to India's cultural landscape."],
['is india language diverse country', "India is home to over 1,600 languages, with Hindi and English being the official languages at the national level. Other major languages include Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Malayalam, and Punjabi, each with its own literature, dialects, and cultural nuances."],
['cuisine of india', "Indian cuisine is renowned worldwide for its diversity and flavors. Each region of India has its own distinct culinary traditions, ingredients, and cooking styles. Spices play a crucial role in Indian cooking, with dishes ranging from spicy curries to aromatic biryanis and sweets like gulab jamun and jalebi"],
['art and craft of india', "India has a rich tradition of arts and crafts, including classical music, dance forms such as Bharatanatyam, Kathak, Odissi, and Kuchipudi, traditional painting styles like Madhubani and Tanjore,"],
['festival and celebrations in india', "India celebrates a multitude of festivals throughout the year, reflecting its cultural diversity and religious plurality. Diwali, Holi, Eid, Christmas, Durga Puja, Navratri, Pongal, and Baisakhi are among the many festivals celebrated with great fervor and enthusiasm across the country."],

['significance of diwali in indian culture?', "Diwali, also known as the Festival of Lights, holds great significance in Indian culture. It symbolizes the victory of light over darkness and good over evil. People celebrate Diwali by lighting oil lamps, decorating their homes, exchanging gifts, and enjoying festive meals. It also marks the return of Lord Rama to Ayodhya after defeating the demon king Ravana, as described in the epic Ramayana."],

['what are some traditional indian dances?', "India boasts a rich diversity of traditional dances, each with its own unique style and cultural significance. Some popular Indian dances include Bharatanatyam (from Tamil Nadu), Kathak (from North India), Kathakali (from Kerala), Odissi (from Odisha), Kuchipudi (from Andhra Pradesh), and Mohiniyattam (from Kerala). These dances often depict stories from Hindu mythology and are performed during festivals, weddings, and other special occasions."],
['what is the importance of saree in indian culture?', "The saree is a traditional Indian garment worn by women and holds deep cultural significance. It is not just a piece of clothing but a symbol of tradition, grace, and elegance. The way a saree is draped varies from region to region in India, reflecting the diversity of the country. Sarees are worn on various occasions such as weddings, festivals, and religious ceremonies, and they come in a wide range of fabrics, designs, and colors."],
['what are some famous landmarks in indian culture?', "India is home to numerous iconic landmarks that reflect its rich cultural heritage and history. Some famous landmarks include the Taj Mahal in Agra, a symbol of eternal love and one of the Seven Wonders of the World; the Jaipur City Palace in Rajasthan, showcasing exquisite Rajasthani architecture; the Red Fort in Delhi, a UNESCO World Heritage Site known for its Mughal architecture; and the Qutub Minar in Delhi, the tallest brick minaret in the world."],
['what are the main components of indian cuisine?', "Indian cuisine is renowned for its diversity of flavors, spices, and regional specialties. Some main components of Indian cuisine include rice, wheat, lentils, vegetables, spices (such as cumin, coriander, turmeric, and garam masala), dairy products (such as yogurt and paneer), and various types of bread (such as roti, naan, and paratha). Indian food is known for its aromatic curries, biryanis, tandoori dishes, and a wide variety of sweets and desserts."],
['what are the major festivals celebrated in india?', "India celebrates a multitude of festivals throughout the year, reflecting its cultural diversity and religious pluralism. Some major festivals include Diwali (Festival of Lights), Holi (Festival of Colors), Eid al-Fitr and Eid al-Adha (Islamic festivals), Christmas (celebrated by Christians), Navratri (nine nights dedicated to the worship of Goddess Durga), Durga Puja (celebrated mainly in West Bengal), and Pongal (harvest festival celebrated in South India)."],
['what is the significance of yoga in indian culture?', "India celebrates a multitude of festivals throughout the year, reflecting its cultural diversity and religious plurality. Diwali, Holi, Eid, Christmas, Durga Puja, Navratri, Pongal, and Baisakhi are among the many festivals celebrated with great fervor and enthusiasm across the country."],
['what are the major religions practiced in india?', "India is known for its religious diversity. Major religions practiced in India include Hinduism, Islam, Christianity, Sikhism, Buddhism, and Jainism."],
['what is the significance of the indian festival diwali?', "Diwali, also known as the Festival of Lights, holds great significance in Indian culture. It symbolizes the victory of light over darkness and good over evil. People celebrate by lighting oil lamps, bursting fireworks, exchanging gifts, and sharing sweets."],
['what is the importance of yoga in indian culture?', "Yoga originated in ancient India and is deeply ingrained in Indian culture. It encompasses physical, mental, and spiritual practices aimed at achieving harmony and balance. Yoga is recognized worldwide for its health benefits and is considered a way of life in India."],
['what are some traditional indian wedding customs?', "Indian weddings are vibrant and elaborate affairs, characterized by various rituals and traditions. Some common customs include the exchange of garlands between the bride and groom (known as Jaimala), the sacred fire ceremony (Pheras), applying sindoor (vermilion) on the bride's forehead, and exchanging vows amidst blessings from family and friends."],
['how do indian classical dance forms differ from each other?', "India is home to several classical dance forms, each with its unique style, costumes, and repertoire. For example, Bharatanatyam is known for its intricate footwork and expressive gestures, while Kathak emphasizes storytelling through rhythmic movements. Odissi is characterized by its fluid movements inspired by temple sculptures, and Kuchipudi incorporates both dance and drama elements."]

]);

// Function to send message
function sendMessage() {
const message = userInput.value.trim();
if (message !== '') {
    appendMessage('You: ' + message, 'user-message');
    respondToUser(message);
    userInput.value = '';
}
}

// Function to respond to user
function respondToUser(message) {
let response;
// Check if the message matches any predefined question, then retrieve the answer
for (const [question, answer] of questionAnswerMap) {
    if (message.toLowerCase().includes(question)) {
        response = answer;
        break;
    }
}
// If no predefined answer is found, provide a default response
response = response || "I'm sorry, I didn't understand that.";
appendMessage('Bot: ' + response, 'bot-message');
}

// Function to append message to chat box
function appendMessage(message, messageClass) {
const messageElement = document.createElement('div');
messageElement.textContent = message;
messageElement.classList.add(messageClass); // Add message class
chatBox.appendChild(messageElement);
chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Function to toggle chatbot visibility
function toggleChatbot() {
var chatbotContainer = document.getElementById("chatbot-container");
chatbotContainer.style.display = (chatbotContainer.style.display === "block") ? "none" : "block";
}