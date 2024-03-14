import { Router } from 'express';
import Album from '../models/Album';
import { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import check from '../middleware/check';

const albumsRouter = Router();

albumsRouter.get('/', check, async (req: RequestWithUser, res, next) => {
  try {
    let albumsArray: any[] = [];
    const artist = req.query.artist;
    if (artist && req.user && req.user.role === 'user') {
      albumsArray = await Album.find({
        artist: req.query.artist,
        isPublished: true,
      })
        .sort({ date: 'desc' })
        .populate('artist', 'name information');
    } else if (artist && req.user && req.user.role === 'admin') {
      albumsArray = await Album.find({ artist: req.query.artist })
        .sort({ date: 'desc' })
        .populate('artist', 'name information');
    } else if (!artist && req.user && req.user.role === 'user') {
      albumsArray = await Album.find({ isPublished: true }).populate(
        'artist',
        'name information',
      );
    } else if (!artist && req.user && req.user.role === 'admin') {
      albumsArray = await Album.find().populate('artist', 'name information');
    }

    return res.send(albumsArray);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const album = await Album.findById(_id).populate(
      'artist',
      'name information',
    );

    res.send(album);
  } catch (e) {
    next(e);
  }
});
albumsRouter.post(
  '/',
  auth,
  permit('user', 'admin'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const albumData = {
        name: req.body.name,
        artist: req.body.artist,
        date: parseFloat(req.body.date),
        image: req.file ? req.file.filename : null,
      };

      const album = new Album(albumData);
      await album.save();
      return res.send(album);
    } catch (e) {
      next(e);
    }
  },
);

albumsRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.params.id);
      } catch {
        return res.status(404).send({ error: 'Wrong ObjectId!' });
      }
      const album = await Album.findById(_id);
      if (!album) {
        return res.status(404).send({ error: 'Album Not found!' });
      }
      const deletedOne = await Album.findByIdAndDelete(_id);

      res.send(deletedOne);
    } catch (e) {
      next(e);
    }
  },
);

albumsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.params.id);
      } catch {
        return res.status(404).send({ error: 'Wrong ObjectId!' });
      }
      const album = await Album.findById(_id);
      if (!album) {
        return res.status(404).send({ error: 'Album Not found!' });
      }

      const newAlbum = new Album({
        _id: _id,
        name: req.body.name,
        artist: req.body.artist,
        date: parseFloat(req.body.date),
        image: album.image,
        isPublished: !req.body.isPublished,
      });

      res.send(await Album.findByIdAndUpdate(_id, newAlbum));
    } catch (e) {
      next(e);
    }
  },
);

export default albumsRouter;
