export interface Artist {
  _id: string;
  name: string;
  image: string | null;
}

export interface ArtistMutation {
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

export interface AlbumMutation {
  artist: string;
  name: string;
  date: string;
  image: File| null;
}

export interface Track {
  album: Album;
  _id: string;
  name: string;
  number: number;
  length: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export  interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface TrackListened {
  _id: string;
  track: {
    _id: string;
    name: string;
  };
  artist: {
    _id: string;
    name: string;
  };
  user: string;
  datetime: string;
}


