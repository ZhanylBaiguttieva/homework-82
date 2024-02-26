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

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
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


