import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const collections = ['albums', 'artists', 'tracks', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [artist1, artist2, artist3] = await Artist.create(
    {
      name: 'Michael Jackson',
      image: 'fixtures/jackson_photo.jpg',
      isPublished: true,
    },
    {
      name: 'Dua Lipa',
      image: 'fixtures/dualipa_photo.jpg',
      isPublished: true,
    },
    {
      name: 'Arctic Monkeys',
      image: 'fixtures/arctic_monkeys.png',
      isPublished: false,
    },
  );

  const [album1, album2, album3, album4, album5] = await Album.create(
    {
      artist: artist1,
      name: 'Thriller',
      date: 1982,
      image: 'fixtures/thriller_album.jpg',
      isPublished: true,
    },
    {
      artist: artist1,
      name: 'Bad',
      date: 1987,
      image: 'fixtures/bad_album.jpg',
      isPublished: true,
    },
    {
      artist: artist2,
      name: 'Dua Lipa',
      date: 2017,
      image: 'fixtures/dua_Lipa_album.png',
      isPublished: true,
    },
    {
      artist: artist2,
      name: 'Future Nostalgia',
      date: 2020,
      image: 'fixtures/future_nostalgia_album.png',
      isPublished: true,
    },
    {
      artist: artist3,
      name: 'AM',
      date: 2013,
      image: 'fixtures/AM.png',
      isPublished: false,
    },
  );

  await Track.create(
    {
      album: album1,
      name: 'Beat it',
      length: '4:18',
      number: 5,
      isPublished: true,
    },
    {
      album: album1,
      name: 'Billie Jean',
      length: '4:54',
      number: 6,
      isPublished: true,
    },
    {
      album: album1,
      name: 'Human Nature',
      length: '4:06',
      number: 7,
      isPublished: true,
    },
    {
      album: album1,
      name: 'Wanna Be Starting Something',
      length: '6:03',
      number: 1,
      isPublished: true,
    },
    {
      album: album1,
      name: 'Baby Be Mine',
      length: '4:20',
      number: 2,
      isPublished: true,
    },
    {
      album: album2,
      name: 'Bad',
      length: '4:07',
      number: 1,
      isPublished: true,
    },
    {
      album: album2,
      name: 'The Way You Make Me Feel',
      length: '4:59',
      number: 2,
      isPublished: true,
    },
    {
      album: album2,
      name: 'Speed Demon',
      length: '4:01',
      number: 3,
      isPublished: true,
    },
    {
      album: album2,
      name: 'Liberian Girl',
      length: '3:54',
      number: 4,
      isPublished: true,
    },
    {
      album: album2,
      name: 'Just Good Friends',
      length: '4:08',
      number: 5,
      isPublished: true,
    },
    {
      album: album3,
      name: 'Genesis',
      length: '3:26',
      number: 1,
      isPublished: true,
    },
    {
      album: album3,
      name: 'Lost in Your Light',
      length: '3:27',
      number: 2,
      isPublished: true,
    },
    {
      album: album3,
      name: 'Hotter than Hell',
      length: '3:08',
      number: 3,
      isPublished: true,
    },
    {
      album: album3,
      name: 'Be the One',
      length: '3:25',
      number: 4,
      isPublished: true,
    },
    {
      album: album3,
      name: 'IDGAF',
      length: '3:38',
      number: 5,
      isPublished: true,
    },
    {
      album: album4,
      name: 'Future Nostalgia',
      length: '3:04',
      number: 1,
      isPublished: true,
    },
    {
      album: album4,
      name: 'Dont Start Now',
      length: '3:03',
      number: 2,
      isPublished: true,
    },
    {
      album: album4,
      name: 'Cool',
      length: '3:29',
      number: 3,
      isPublished: true,
    },
    {
      album: album4,
      name: 'Physical',
      length: '3:13',
      number: 4,
      isPublished: true,
    },
    {
      album: album4,
      name: 'Levitating',
      length: '3:23',
      number: 5,
      isPublished: true,
    },
    {
      album: album5,
      name: 'Do I Wanna Know?',
      length: '4:31',
      number: 1,
      isPublished: false,
    },
    {
      album: album5,
      name: 'R U Mine?',
      length: '3:21',
      number: 2,
      isPublished: false,
    },
    {
      album: album5,
      name: 'One for the Road?',
      length: '3:26',
      number: 3,
      isPublished: false,
    },
  );
  await User.create(
    {
      email: 'Zhanyl@music.local',
      displayName: 'Zhanyl',
      password: '123',
      token: crypto.randomUUID(),
      role: 'admin',
      avatar: 'fixtures/avatar.png',
    },
    {
      email: 'TestUser@music.local',
      displayName: 'TestUser',
      password: '000',
      token: crypto.randomUUID(),
      role: 'user',
    },
  );

  await db.close();
};

void run();
