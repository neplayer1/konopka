const graphql = require('graphql');
const GraphQLObjectId = require('graphql-scalar-objectid');
const { GraphQLUpload } = require('graphql-upload');
const path = require('path');
const shortid = require('shortid');
const { createWriteStream, existsSync, mkdirSync, unlink } = require('fs');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const storeUpload = async (stream) => {
  const id = shortid.generate();
  const imgPath = `${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path.join(__dirname, "../images", imgPath)))
      .on("finish", () => {
        console.log("Uploaded success!")
        return resolve({ imgPath })
      })
      .on("error", reject)
  );
};

const processUpload = async (upload) => {
  if (upload.length !== 1) {
    return await upload.reduce(async (acc, file) => {
      const accumulator = await acc;
      const { createReadStream } = await file;
      const stream = createReadStream();
      const { imgPath } = await storeUpload(stream);
      accumulator.push(imgPath);
      return Promise.resolve(accumulator);
    }, []);
  } else {
    const { createReadStream } = await upload[0];
    const stream = createReadStream();
    const { imgPath } = await storeUpload(stream);
    return imgPath;
  }
};

const processDelete = async (url) => {
  await unlink(path.join(__dirname, "../images", url), function (error) {
    if (error) {
      throw error;
    }
    console.log('Deleted success!');
  })
};

const InteriorsModel = require('../models/interiors');
const FurnitureModel = require('../models/furniture');

const InteriorType = new GraphQLObjectType({
  name: 'Interior',
  fields: () => ({
    _id: { type: GraphQLObjectId },
    nameRu: { type: GraphQLString },
    typeRu: { type: GraphQLString },
    yearRu: { type: GraphQLString },
    descriptionRu: { type: GraphQLString },
    nameEn: { type: GraphQLString },
    typeEn: { type: GraphQLString },
    yearEn: { type: GraphQLString },
    descriptionEn: { type: GraphQLString },
    previewUrl: { type: GraphQLString },
    picturesUrl: { type: new GraphQLList(GraphQLString) }
  })
});

const InteriorMutateType = new GraphQLObjectType({
  name: 'InteriorMutate',
  fields: () => ({
    _id: { type: GraphQLObjectId },
    nameRu: { type: GraphQLString },
    typeRu: { type: GraphQLString },
    yearRu: { type: GraphQLString },
    descriptionRu: { type: GraphQLString },
    nameEn: { type: GraphQLString },
    typeEn: { type: GraphQLString },
    yearEn: { type: GraphQLString },
    descriptionEn: { type: GraphQLString },
    preview: { type: GraphQLUpload },
    images: { type: GraphQLUpload }
  })
});

const InteriorEditMutateType = new GraphQLObjectType({
  name: 'InteriorEditMutate',
  fields: () => ({
    _id: { type: GraphQLObjectId },
    nameRu: { type: GraphQLString },
    typeRu: { type: GraphQLString },
    yearRu: { type: GraphQLString },
    descriptionRu: { type: GraphQLString },
    nameEn: { type: GraphQLString },
    typeEn: { type: GraphQLString },
    yearEn: { type: GraphQLString },
    descriptionEn: { type: GraphQLString },
    previewUrl: { type: GraphQLString },
    newPreview: { type: GraphQLUpload },
    imagesOrder: { type: new GraphQLList(GraphQLString) },
    addedFiles: { type: new GraphQLList(GraphQLUpload) },
    removedImagesUrls: { type: new GraphQLList(GraphQLString) },
  })
});

const FurnitureType = new GraphQLObjectType({
  name: 'Furniture',
  fields: () => ({
    _id: { type: GraphQLObjectId },
    nameRu: { type: GraphQLString },
    typeRu: { type: GraphQLString },
    yearRu: { type: GraphQLString },
    descriptionRu: { type: GraphQLString },
    nameEn: { type: GraphQLString },
    typeEn: { type: GraphQLString },
    yearEn: { type: GraphQLString },
    descriptionEn: { type: GraphQLString },
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addInterior: {
      type: InteriorMutateType,
      args: {
        nameRu: { type: GraphQLString },
        typeRu: { type: GraphQLString },
        yearRu: { type: GraphQLString },
        descriptionRu: { type: GraphQLString },
        nameEn: { type: GraphQLString },
        typeEn: { type: GraphQLString },
        yearEn: { type: GraphQLString },
        descriptionEn: { type: GraphQLString },
        preview: { type: GraphQLUpload },
        images: { type: GraphQLUpload },
      },
      async resolve(parent, { nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, preview, images }) {
        console.log("preview", preview)
        console.log("images", images)
        const previewUrl = await processUpload(preview);
        const picturesUrl = await processUpload(images);

        const interior = new InteriorsModel({
          nameRu,
          typeRu,
          yearRu,
          descriptionRu,
          nameEn,
          typeEn,
          yearEn,
          descriptionEn,
          previewUrl,
          picturesUrl
        });
        return interior.save();
      }
    },
    deleteInterior: {
      type: InteriorType,
      args: {
        _id: { type: GraphQLObjectId },
        previewUrl: { type: GraphQLString },
        picturesUrl: { type: new GraphQLList(GraphQLString) }
      },
      async resolve(parent, { _id, previewUrl, picturesUrl }) {
        console.log("DELETE STARTED");
        if (previewUrl.length !== 0) {
          // удаляем превью
          await processDelete(previewUrl);
        }
        if (picturesUrl.length !== 0) {
          // удаляем картинки
          picturesUrl.map(async (image) => {
            await processDelete(image);
          })
        }
        return InteriorsModel.findByIdAndRemove(_id);
      }
    },
    updateInterior: {
      type: InteriorEditMutateType,
      args: {
        _id: { type: GraphQLObjectId },
        nameRu: { type: GraphQLString },
        typeRu: { type: GraphQLString },
        yearRu: { type: GraphQLString },
        descriptionRu: { type: GraphQLString },
        nameEn: { type: GraphQLString },
        typeEn: { type: GraphQLString },
        yearEn: { type: GraphQLString },
        descriptionEn: { type: GraphQLString },
        previewUrl: { type: GraphQLString },
        newPreview: { type: GraphQLUpload },
        imagesOrder: { type: new GraphQLList(GraphQLString) },
        addedFiles: { type: new GraphQLList(GraphQLUpload) },
        removedImagesUrls: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, { _id, nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, previewUrl, newPreview, imagesOrder, addedFiles, removedImagesUrls }) {
        console.log(imagesOrder)
        let preview = previewUrl;
        let picturesUrl = [];
        // смотрим не изменилось ли превью
        if (newPreview.length !== 0) {
          // загружаем новое
          preview = await processUpload(newPreview);
          // удаляем старое
          await processDelete(previewUrl);
        }
        // смотрим есть ли удаленные картинки
        if (removedImagesUrls.length !== 0) {
          // удаляем их
          removedImagesUrls.map(async (image) => {
            await processDelete(image);
          })
        }
        // смотрим есть ли новые картинки
        if (addedFiles.length !== 0) {
          // загружаем их
          let newUrls = await processUpload(addedFiles);
          newUrls = [...newUrls];
          imagesOrder.forEach(name => {
            if (name === 'empty') {
              picturesUrl.push(newUrls[0]);
              newUrls.shift();
            } else {
              picturesUrl.push(name)
            }
          })
        } else {
          picturesUrl = imagesOrder;
        }
        console.log("FINISED UPDATE");
        return InteriorsModel.findByIdAndUpdate(
          _id,
          {
            $set: {
              nameRu,
              typeRu,
              yearRu,
              descriptionRu,
              nameEn,
              typeEn,
              yearEn,
              descriptionEn,
              previewUrl: preview,
              picturesUrl
            },
          },
          { new: true },
        );
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    interiors: {
      type: new GraphQLList(InteriorType),
      resolve(parent, args) {
        return InteriorsModel.find({});
      }
    },
    interiorById: {
      type: InteriorType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, { _id }) {
        return InteriorsModel.findById(_id);
      }
    },
    interiorPrevious: {
      type: InteriorType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, { _id }) {
        return InteriorsModel.findOne({ _id: { $lt: _id } }).sort({ _id: -1 }).limit(1);
      }
    },
    interiorNext: {
      type: InteriorType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, { _id }) {
        return InteriorsModel.findOne({ _id: { $gt: _id } }).sort({ _id: 1 }).limit(1);
      }
    },
    furniture: {
      type: new GraphQLList(FurnitureType),
      resolve(parent, args) {
        return FurnitureModel.find({});
      }
    },
    furnitureById: {
      type: FurnitureType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, { _id }) {
        return FurnitureModel.findById(_id);
      }
    },
    furniturePrevious: {
      type: FurnitureType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, { _id }) {
        return FurnitureModel.findOne({ _id: { $lt: _id } }).sort({ _id: -1 }).limit(1);
      }
    },
    furnitureNext: {
      type: FurnitureType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, { _id }) {
        return FurnitureModel.findOne({ _id: { $gt: _id } }).sort({ _id: 1 }).limit(1);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});