export interface Artist {
    name: string,
    image: string | null,
    information: string,
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