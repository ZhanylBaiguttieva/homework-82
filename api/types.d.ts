import {Model} from "mongoose";

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

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface TrackHistory {
    user: string,
    track: string,
    datetime: string,
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>