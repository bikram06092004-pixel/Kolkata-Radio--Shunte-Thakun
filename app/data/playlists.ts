export interface Track {
  id: string;
  title: string;
  artist: string;
  film?: string;
  year?: number | string;
  duration: number; // Duration in seconds
  videoId: string;  // YouTube Video ID (Embedding Enabled)
  series?: "taranath-tantrik" | "sherlock-holmes"; // Sub-category series
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  bgImage?: string;
  tracks: Track[];
}

export const PLAYLISTS: Playlist[] = [
  {
    id: "durga-pujo",
    name: "দুর্গাপূজা প্লেলিস্ট",
    description: "Durga Pujo Festival Melodies & Agamani Ragas",
    accentColor: "#f59e0b", // Amber glow
    bgImage: "/bg/Durga Pujo.png",
    tracks: [
      { id: "dp-1", title: "Durga Pujo Agamani Melodies", artist: "Mahalaya & Vintage Strings", film: "Durga Pujo Special", year: 2024, duration: 300, videoId: "oyBQywMMi24" },
      { id: "dp-2", title: "Dhak & Festive Celebration", artist: "Kolkata Agamani Collective", film: "Durga Pujo Special", year: 2024, duration: 300, videoId: "v-5t7SVVEQw" },
    ],
  },
  {
    id: "sunday-suspense",
    name: "Sunday সাসপেন্স",
    description: "Sunday Suspense Mystery Audio Plays",
    accentColor: "#e11d48", // Crimson Red
    bgImage: "https://i.ytimg.com/vi/JtTvCOWfqxo/maxresdefault.jpg",
    tracks: [
      // Taranath Tantrik Series (20 Stories)
      { id: "tt-1", series: "taranath-tantrik", title: "Mathur Baag • মথুর বাঘ", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "e1Sx2OeSw94" },
      { id: "tt-2", series: "taranath-tantrik", title: "Jadukor • জাদুকর", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "Ek-feRBQ3FE" },
      { id: "tt-3", series: "taranath-tantrik", title: "Kalo Phool • কালো ফুল", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "S0uk0gjnepg" },
      { id: "tt-4", series: "taranath-tantrik", title: "Betal • বেতাল", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "8dbsivzU7gk" },
      { id: "tt-5", series: "taranath-tantrik", title: "Sarpashikha • সর্পশিখা", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "Bzvym38M66Q" },
      { id: "tt-6", series: "taranath-tantrik", title: "Sudhamoyir Bari • সুধাময়ীর বাড়ি", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "hg9VsL66RpQ" },
      { id: "tt-7", series: "taranath-tantrik", title: "Bibhatsa Aranya • বীভৎস অরণ্য", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "kC_Ozq58q3w" },
      { id: "tt-8", series: "taranath-tantrik", title: "Adrishya Bhoy • অদৃশ্য ভয়", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "_cqV2e-F7h8" },
      { id: "tt-9", series: "taranath-tantrik", title: "Maha Shmashan • মহাশ্মশান", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "zBP7RdcSpu0" },
      { id: "tt-10", series: "taranath-tantrik", title: "Ashubho Atma • অশুভ আত্মা", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "1qjJf_F9B9k" },
      { id: "tt-11", series: "taranath-tantrik", title: "Yaksha Rahasya • যক্ষ রহস্য", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "DtUMLu9_gaQ" },
      { id: "tt-12", series: "taranath-tantrik", title: "Tantrik Chattujje • তান্ত্রিক চাটুজ্জে", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "tg8YJ73Tz9k" },
      { id: "tt-13", series: "taranath-tantrik", title: "Kala Bhairav • কালভৈরব", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "-jIdJkjN-Jk" },
      { id: "tt-14", series: "taranath-tantrik", title: "Bhoyonkari Rati • ভয়ঙ্করী রাতি", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "Mw4EpxQfbO8" },
      { id: "tt-15", series: "taranath-tantrik", title: "Shmashan Ghat • শ্মশান ঘাট", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "UMiKPN-QHRA" },
      { id: "tt-16", series: "taranath-tantrik", title: "Andhakar Guha • অন্ধকার গুহা", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "C3YpWl4vLoo" },
      { id: "tt-17", series: "taranath-tantrik", title: "Tantrik Sadhana • তান্ত্রিক সাধনা", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "oK6xCER-aWE" },
      { id: "tt-18", series: "taranath-tantrik", title: "Maha Maya • মহামায়া", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "_yDeRVl7400" },
      { id: "tt-19", series: "taranath-tantrik", title: "Mrityu Phand • মৃত্যু ফাঁদ", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "4ykBTPmhOP4" },
      { id: "tt-20", series: "taranath-tantrik", title: "Rahasyamoy Sadhu • রহস্যময় সাধু", artist: "Bibhutibhushan Bandyopadhyay • Sunday Suspense", film: "Taranath Series", year: 2024, duration: 2400, videoId: "FKIUpZbBxkc" },

      // Sherlock Holmes Series (18 Stories with exact titles)
      { id: "sh-1", series: "sherlock-holmes", title: "The Hound of the Baskervilles • দ্য হাউন্ড অব দ্য বাস্কারভিলস", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "JtTvCOWfqxo" },
      { id: "sh-2", series: "sherlock-holmes", title: "A Study in Scarlet • আ স্টাডি ইন স্কারলেট", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "008JPqilAcc" },
      { id: "sh-3", series: "sherlock-holmes", title: "The Sign of Four • দ্য সাইন অব ফোর", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "_rjXALBVAIU" },
      { id: "sh-4", series: "sherlock-holmes", title: "The Red-Headed League • দ্য রেড হেডেড লীগ", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "-lHPNK7fFg0" },
      { id: "sh-5", series: "sherlock-holmes", title: "A Scandal in Bohemia • আ স্ক্যান্ডাল ইন বোহেমিয়া", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "FHa9i0tik50" },
      { id: "sh-6", series: "sherlock-holmes", title: "The Speckled Band • দ্য স্পেক্‌ল্ড ব্যান্ড", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "xL7R8JGjnkc" },
      { id: "sh-7", series: "sherlock-holmes", title: "The Five Orange Pips • ফাইভ অরেঞ্জ পিপস", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "CCRCZOpYR2A" },
      { id: "sh-8", series: "sherlock-holmes", title: "The Man with the Twisted Lip • টুইস্টেড লিপ", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "rFWbvPJwG7c" },
      { id: "sh-9", series: "sherlock-holmes", title: "The Blue Carbuncle • দ্য ব্লু কারবাঙ্কল", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "qFC0Jnnac0s" },
      { id: "sh-10", series: "sherlock-holmes", title: "The Engineer's Thumb • ইঞ্জিনিয়ার্স থাম্ব", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "Xvzph_P_R3E" },
      { id: "sh-11", series: "sherlock-holmes", title: "The Noble Bachelor • নোবেল ব্যাচেলর", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "v4Zq4v7aRB8" },
      { id: "sh-12", series: "sherlock-holmes", title: "The Beryl Coronet • বেরিল করোনেট", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "jSCM9enJ29Y" },
      { id: "sh-13", series: "sherlock-holmes", title: "The Copper Beeches • কপার বিচেস", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "CE7JB-aplB8" },
      { id: "sh-14", series: "sherlock-holmes", title: "Silver Blaze • সিলভার ব্লেজ", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "DqtbB-iTpmI" },
      { id: "sh-15", series: "sherlock-holmes", title: "The Yellow Face • দ্য ইয়েলো ফেস", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "BX1tYmQ_M0E" },
      { id: "sh-16", series: "sherlock-holmes", title: "The Stockbroker's Clerk • স্টকব্রোকার্স ক্লার্ক", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "rvLU5zshQdo" },
      { id: "sh-17", series: "sherlock-holmes", title: "The Gloria Scott • দ্য গ্লোরিয়া স্কট", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "aeU2V8nSGgQ" },
      { id: "sh-18", series: "sherlock-holmes", title: "The Musgrave Ritual • মাসগ্রেভ রিচুয়াল", artist: "Arthur Conan Doyle • Sunday Suspense", film: "Sherlock Series", year: 2024, duration: 2400, videoId: "IoO05_bpO38" },
    ],
  },
];
