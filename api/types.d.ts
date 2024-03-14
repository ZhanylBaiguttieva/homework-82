import {Model} from "mongoose";

export interface Artist {
    name: string,
    information: string,
    image: string | null,
    isPublished: boolean,
}

export interface Album {
    name: string,
    artist: string,
    date: number,
    image: string | null,
    isPublished: boolean,
}

export interface Track {
    name: string,
    album: string,
    length: string,
    number: number,
    isPublished: boolean,
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId: string;
    avatar: string | null;
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