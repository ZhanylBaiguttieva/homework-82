export interface Artist {
  _id: string;
  name: string;
  image: string | null;
}

export interface Album {
  artist: Artist;
  name: string;
  date: number;
  image: string | null;
}

export interface Track {
  album: Album,
  name: string;
  number: number;
  length: string;
}