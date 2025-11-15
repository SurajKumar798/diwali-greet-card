function buildPrompt(name, language, tone){
    const lang = 
      language === "Hindi"
       ? "white the message in Hindi(use Devnagiti script)."
       : language === "Hinglish"
       ? "write the message in Hinglish (Hindi words using latin english)."
       : "write the message in english";
    
    const toneLine = 
     tone === "formal"
     ? "use a polite/formal tone suitable for collegues, elders or professions."
     :  "use a warm informal tone for close friends and family";
    return `create a diwali greeting for me with the language=${lang} and use the tone as ${toneLine} and please use my recepient name as ${name}`;
};

module.exports = {buildPrompt};