export const mockArtists = [
  {
    _id: "artist-1",
    name: "Raji Pavithran",
    location: "Chengannur, India",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
  },
  {
    _id: "artist-2",
    name: "Neeta Singh",
    location: "Ghaziabad, India",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop",
  },
  {
    _id: "artist-3",
    name: "Ranjit Singh Kurmi",
    location: "Virar, India",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
];

export const mockArtworks = [
  {
    _id: "art-1",
    name: "Crimson Silence",
    price: 48000,
    artist: mockArtists[0],
    category: "Painting",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format&fit=crop",
    tag: "FEATURED",
    description: "A layered study of mood and memory in warm tones.",
    location: "Global Gallery",
    comments: [],
  },
  {
    _id: "art-2",
    name: "Night Geometry",
    price: 35500,
    artist: mockArtists[1],
    category: "Digital Art",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    tag: "TRENDING",
    description: "Crisp digital forms balanced with deep cinematic shadows.",
    location: "Global Gallery",
    comments: [],
  },
  {
    _id: "art-3",
    name: "Quiet Lines",
    price: 22000,
    artist: mockArtists[2],
    category: "Sketching",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    tag: "NEW",
    description: "An expressive graphite composition with subtle textures.",
    location: "Global Gallery",
    comments: [],
  },
];
