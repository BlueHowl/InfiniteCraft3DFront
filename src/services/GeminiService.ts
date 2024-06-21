import { GoogleGenerativeAI } from "@google/generative-ai";


  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });


const generationConfig = {
  temperature: 1,//0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 256,
  responseMimeType: "application/json",
};

const parts = [
  {text: "Strictly follow my instructions.      Answer in only one word and give ten tags to describe the word.      Format the result in json format with the key \"text\" and the value of the result, the key emoji and the value emoji that match the text and the key \"tags\" and the value the tags,      the tags must be a string with the tags separated by commas and there must be only ten.      You will receive two words to combine also formatted in json,       you will have to combine the str1 and str2 word \"text\" and take in account tags to inspire yourself and get different results,       try to find a result at all price. Also avoid putting any other characters like *"},
  {text: "input: {\"str1\": {\"text\": \"Water\",\" tags\": \"Liquid, Flow, Life, Aqua, Drink, Drinkable, H2O, HUMID, WET, COLD\"},\"str2\": {\"text\": \"Fire\", \"tags\": \"Hot, Flame, Blaze, Inferno, Heat, Burn, Wildfire, Spark, Ember, Smoke, Combustion, Pyro\"}}"},
  {text: "output: {\"text\": \"Steam\", \"emoji\": \"💨\", \"tags\": \"Gas, Vapor, Heat, Water,  Hot,  Moisture,  Energy,  Cloud,  Boiling,  Rise\"}"},
  {text: "input: {\"str1\": {\"text\": \"Water\",\" tags\": \"Liquid, Flow, Life, Aqua, Drink, Drinkable, H2O, HUMID, WET, COLD\"},\"str2\": {\"text\": \"Water\",\" tags\": \"Liquid, Flow, Life, Aqua, Drink, Drinkable, H2O, HUMID, WET, COLD\"}}"},
  {text: "output: {\"text\": \"Ocean\", \"emoji\": \"🌊\", \"tags\": \"Water, Blue, Deep, Salty, Vast, Waves, Fish, Marine, Life, Coast\"}"},
  {text: "input: {\"str1\": {\"text\": \"Earth\", \"emoji\": \"🌍\", \"tags\": \"Ground, Soil, Terra, Land, Planet, Gaia, Earthquake, Geology, Terrain, Dust\"},\"str2\": {\"text\": \"Earth\", \"tags\": \"Ground, Soil, Terra, Land, Planet, Gaia, Earthquake, Geology, Terrain, Dust\"}}"},
  {text: "output: {\"text\": \"Planet\", \"emoji\": \"🪐\", \"tags\": \"Earth, Space, Celestial, Orbit, Gravity, Solar System, Universe, Astronomy, Star, World\"}"},
  {text: "input: {\"str1\": {\"text\": \"Earth\", \"tags\": \"Ground, Soil, Terra, Land, Planet, Gaia, Earthquake, Geology, Terrain, Dust\"},\"str2\": {\"text\": \"Fire\", \"tags\": \"Hot, Flame, Blaze, Inferno, Heat, Burn, Wildfire, Spark, Ember, Smoke, Combustion, Pyro\"}}"},
  {text: "output: {\"text\": \"Volcano\", \"emoji\": \"🌋\", \"tags\": \"Mountain, Earth, Fire, Lava, Hot, Eruption, Magma, Rock, Ash, Smoke\"}"},
  {text: "input: {\"str1\": {\"text\": \"Water\",\" tags\": \"Liquid, Flow, Life, Aqua, Drink, Drinkable, H2O, HUMID, WET, COLD\"},\"str2\": {\"text\": \"Earth\", \"tags\": \"Ground, Soil, Terra, Land, Planet, Gaia, Earthquake, Geology, Terrain, Dust\"}}"},
  {text: "output: {\"text\": \"Mud\", \"emoji\": \"💩\", \"tags\": \"Earth, Water, Soil, Clay, Wet, Sticky, Brown,  Sludge,  Terrain,  Grunge\"}"},
  {text: "input: {\"str1\": {\"text\": \"Fire\", \"tags\": \"Hot, Flame, Blaze, Inferno, Heat, Burn, Wildfire, Spark, Ember, Smoke, Combustion, Pyro\"},\"str2\": {\"text\": \"Fire\", \"tags\": \"Hot, Flame, Blaze, Inferno, Heat, Burn, Wildfire, Spark, Ember, Smoke, Combustion, Pyro\"}}"},
  {text: "output: {\"text\": \"Inferno\", \"emoji\": \"🔥\", \"tags\": \"Hot, Flame, Blaze, Inferno, Heat, Burn, Wildfire, Spark, Ember, Smoke\"}"},
  {text: "input: {\"str1\": {\"text\": \"Air\", \"tags\": \"Wind, Sky, Atmosphere, Breeze, Oxygen, Breath, Gust, Clouds, Aerodynamics, Fresh\"},\"str2\": {\"text\": \"Fire\", \"tags\": \"Hot, Flame, Blaze, Inferno, Heat, Burn, Wildfire, Spark, Ember, Smoke, Combustion, Pyro\"}}"},
  {text: "output: {\"text\": \"Smoke\", \"emoji\": \"💨\", \"tags\": \"Air, Fire, Ash,  Vapor,  Pollutant,  Dark,  Invisible,  Combustion,  Heat,  Wind\"}"},
  {text: "input: {\"str1\": {\"text\": \"Air\", \"tags\": \"Wind, Sky, Atmosphere, Breeze, Oxygen, Breath, Gust, Clouds, Aerodynamics, Fresh\"},\"str2\": {\"text\": \"Water\",\" tags\": \"Liquid, Flow, Life, Aqua, Drink, Drinkable, H2O, HUMID, WET, COLD\"}}"},
  {text: "output: {\"text\": \"Mist\", \"emoji\": \"🌫️\", \"tags\": \"Water, Air, Fog, Cloud,  Vapor,  Moisture,  Atmosphere,  Haze,  Humidity,  Visibility\"}"},
  {text: "input: {\"str1\": {\"text\": \"Air\", \"tags\": \"Wind, Sky, Atmosphere, Breeze, Oxygen, Breath, Gust, Clouds, Aerodynamics, Fresh\"},\"str2\": {\"text\": \"Air\", \"tags\": \"Wind, Sky, Atmosphere, Breeze, Oxygen, Breath, Gust, Clouds, Aerodynamics, Fresh\"}}"},
  {text: "output: {\"text\": \"Smoke\", \"emoji\": \"💨\", \"tags\": \"Air, Fire, Ash,  Vapor,  Pollutant,  Dark,  Invisible,  Combustion,  Heat,  Wind\"}"},
];


export const generateNewValue = async(input: any): Promise<string|null> => {
  // but if it's really impossible return null.  and add one emoji at the start that represent the word

  const duplicateParts = [...parts];
  duplicateParts.push({ text: `input: ${JSON.stringify(input)}` });

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: duplicateParts }],
      generationConfig,
    });

    if(!result.response.candidates) return null;

    return result.response.candidates[0].content.parts[0].text || null;
  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.response && error.response.data) {
      console.error('Error details:', error.response.data);
    }
    return null;
  }
}