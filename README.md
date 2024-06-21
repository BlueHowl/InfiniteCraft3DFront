[Personnal Project]
This project is at first an attempt of strict copy of the web game InfiniteCraft (neal.fun).
The idea is to later improve the game to make it 3D and use MeshyAI to generate 3D models of the generated words.

I tried to replicate the most parts of the game website, I noticed some choices I made where different,
their game is canvas based and mine uses html draggable properties instead to mimic their own system.

The AI I used to generate the words is Gemini Flash from google, which produces acceptable results but not 
as good as the neal.fun ones.

I tried to add tags to words to enhance the results given by the AI, but that's not working that well.
My next plan is to build up a list of banned word for each new word queries,
It will consist of a list of words of which one of the words to be combined is contained in their list of tags,
by doing this, my goal is to reduce redundancy.