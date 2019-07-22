const graphql = require('graphql');
const GraphQLObjectId = require('graphql-scalar-objectid');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = graphql;

const Interiors = require('../models/interiors');
const Furniture = require('../models/furniture');

const InteriorType = new GraphQLObjectType({
  name: 'Interior',
  fields: () => ({
    _id: { type: GraphQLObjectId },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    year: { type: GraphQLInt },
    description: { type: GraphQLString },
  })
});

const FurnitureType = new GraphQLObjectType({
  name: 'Furniture',
  fields: () => ({
    _id: { type: GraphQLObjectId },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    year: { type: GraphQLInt },
    description: { type: GraphQLString },
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addInterior: {
      type: InteriorType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        year: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      resolve(parent, {name, type, year, description}) {
        const interior = new Interiors({
          name,
          type,
          year,
          description
        });
        return interior.save();
      }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    interiors: {
      type: new GraphQLList(InteriorType),
      resolve(parent, args) {
        return Interiors.find({});
      }
    },
    interiorById: {
      type: InteriorType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, {_id}) {
        return Interiors.findById(_id);
      }
    },
    interiorPrevious: {
      type: InteriorType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, {_id}) {
        return Interiors.findOne({_id: {$lt: _id}}).sort({_id: -1 }).limit(1);
      }
    },
    interiorNext: {
      type: InteriorType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, {_id}) {
        return Interiors.findOne({_id: {$gt: _id}}).sort({_id: 1 }).limit(1);
      }
    },
    furniture: {
      type: new GraphQLList(FurnitureType),
      resolve(parent, args) {
        return Furniture.find({});
      }
    },
    furnitureById: {
      type: FurnitureType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, {_id}) {
        return Furniture.findById(_id);
      }
    },
    furniturePrevious: {
      type: FurnitureType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, {_id}) {
        return Furniture.findOne({_id: {$lt: _id}}).sort({_id: -1 }).limit(1);
      }
    },
    furnitureNext: {
      type: FurnitureType,
      args: {
        _id: {
          type: GraphQLObjectId
        }
      },
      resolve(parent, {_id}) {
        return Furniture.findOne({_id: {$gt: _id}}).sort({_id: 1 }).limit(1);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});