export interface Artist {
  _id: string;
  name: string;
  image: string | null;
}

export interface Album {
  artist: Artist;
  _id: string;
  name: string;
  date: number;
  image: string | null;
}

export interface Track {
  album: Album;
  _id: string;
  name: string;
  number: number;
  length: string;
}