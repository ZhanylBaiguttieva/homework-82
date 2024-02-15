export interface Artist {
    name: string,
    information: string,
    image: string | null,
}

export interface Album {
    name: string,
    artist: string,
    date: string,
    image: string | null,
}

export interface Track {
    name: string,
    album: string,
    length: string,
}

export interface User {
    username: string;
    password: string;
    token: string;
}