import { toast } from "react-toastify";

export const errorMessageHandler = async (error) => {
  console.log(error?.data?.message);
  toast.error(error?.data?.message);
};

export const handleDownload = async (base64Image) => {
  try {
    const blob = await fetch(base64Image).then((response) => response.blob());
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.webp";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

export const randomPrompts = [
  "A serene moonlit lake nestled between towering mountains, reflecting the starry night sky.",
  "An ancient, overgrown temple hidden deep within a dense jungle, its stone walls covered in moss and vines.",
  "A bustling futuristic metropolis with towering skyscrapers, advanced monorail systems, and holographic advertisements.",
  "A medieval castle perched atop a steep hill, surrounded by a vast, rolling meadow dotted with wildflowers.",
  "A sun-kissed vineyard with rows of lush grapevines, overlooked by a rustic Tuscan villa and distant rolling hills.",
  "A subterranean cavern adorned with intricate, bioluminescent crystals, casting an ethereal glow throughout the chamber.",
  "A tranquil Japanese garden with a wooden bridge, koi pond, and meticulously pruned bonsai trees.",
  "An alien landscape with bizarre rock formations, strange flora, and multiple moons in the sky.",
  "A futuristic underwater research facility, encased in a transparent dome, showcasing the vibrant marine life outside.",
  "A bustling market in Marrakech, filled with colorful textiles, spices, and merchants haggling over goods.",
  "A sleek, high-speed train racing through a picturesque countryside, with fields and forests passing by in a blur.",
  "A majestic, ice-covered mountain range at dawn, with alpenglow painting the peaks in shades of pink and orange.",
  "A hidden, ancient library filled with dusty tomes, illuminated only by the soft light of ornate stained glass windows.",
  "An ornate, Venetian canal at sunset, where gondolas glide beneath romantic bridges and the city's architecture shines.",
  "A futuristic space station in orbit around a distant exoplanet, with spacecraft docking and astronauts conducting research.",
  "A mythical, enchanted forest where trees whisper secrets and magical creatures roam, protected by ancient wards.",
  "A bustling Moroccan souk with narrow, winding alleys, stalls overflowing with spices, and the aroma of exotic foods.",
  "A pristine, white sandy beach with crystal-clear turquoise waters, framed by lush palm trees and distant cliffs.",
  "A Victorian-era library with towering bookshelves, leather-bound volumes, and a roaring fireplace in an ornate reading nook.",
  "A post-apocalyptic cityscape reclaimed by nature, where vines and trees grow amidst decaying skyscrapers.",
  "A futuristic city on a terraformed Mars, with domed colonies, bustling streets, and the red Martian landscape beyond.",
  "A sun-drenched Greek island with whitewashed buildings, azure-domed churches, and a calm, inviting Mediterranean sea.",
  "A majestic waterfall cascading from a towering cliff into a serene, emerald-green pool below, surrounded by lush vegetation.",
  "A neon-lit, cyberpunk alleyway with holographic graffiti, flickering advertisements, and characters from a dystopian future.",
  "A magical underwater kingdom, with vibrant coral reefs, mermaids, and schools of colorful fish swimming amidst ancient ruins.",
  "A medieval blacksmith's forge, with sparks flying as a skilled artisan hammers a glowing hot piece of metal.",
  "A sleek, high-tech laboratory with futuristic equipment, holographic displays, and scientists conducting experiments.",
  "An alien city on a distant planet, with architecture unlike anything on Earth, bathed in the glow of multiple moons.",
  "A snowy, alpine village nestled among snow-covered peaks, with charming chalets and twinkling lights.",
  "A cyberpunk hacker's lair, with a web of screens, code scrolling, and virtual reality equipment.",
  "A serene Zen garden with carefully raked gravel, minimalist rock formations, and a sense of tranquil simplicity.",
  "A space explorer's ship approaching a distant, uncharted planet, its surface obscured by swirling storms.",
  "An underwater cavern filled with bioluminescent creatures, creating a mesmerizing light show beneath the surface.",
  "A medieval jousting tournament in a grand arena, with knights in shining armor and a cheering crowd.",
  "A haunted, gothic cathedral with towering spires, ominous gargoyles, and eerie moonlight.",
  "An abandoned, overgrown theme park reclaimed by nature, with rusting rides and an eerie, forgotten atmosphere.",
  "A futuristic cityscape during a cyber-attack, with neon signs flickering and chaos in the streets.",
  "An ancient, mystical forest where the trees have eyes and ancient spirits watch over the land.",
  "A bustling Moroccan riad with intricate tilework, lush gardens, and the sound of a splashing fountain.",
  "A cyberpunk city skyline at night, with towering skyscrapers, flying cars, and neon lights reflected in wet streets.",
  "A hidden underground cave filled with luminescent mushrooms, creating an enchanting subterranean world.",
  "A vibrant Indian market with bustling crowds, colorful saris, and aromatic spices wafting through the air.",
  "A futuristic, high-speed hyperloop train speeding through a vacuum tube, connecting distant cities.",
  "An ancient, stone circle on a windswept hill, surrounded by mist and ancient legends.",
  "A dystopian cityscape under a blood-red sky, with ominous clouds and a sense of impending doom.",
  "A lush, alien rainforest with exotic flora and fauna, and towering trees that seem to touch the sky.",
  "A medieval village celebrating a harvest festival, with villagers in costumes, music, and feasting.",
  "A futuristic spaceport on a distant moon, with rocket ships, bustling terminals, and an alien landscape.",
  "An abandoned, eerie amusement park at night, with dilapidated rides and haunting, distant laughter.",
  "A serene, floating city in the clouds, with ornate architecture and airships soaring through the sky.",
];
