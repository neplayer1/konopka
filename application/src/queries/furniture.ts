import {match} from "react-router";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {TFurnitureMatch} from "../utils/routes";
import {TInterior} from "./interiors";

const furnitureQuery = gql`
  query furnitureQuery {
    furniture {
      _id,
      name,
      type,
      year,
      description
    }
  }
  `;

const furnitureByIdQuery = gql`
  query furnitureByIdQuery($_id: ObjectId) {
    furnitureById(_id: $_id) {
      _id,
      name,
      type,
      year,
      description
    }
  }
  `;

const furniturePreviousQuery = gql`
  query furniturePreviousQuery($_id: ObjectId) {
    furniturePrevious(_id: $_id) {
      _id,
      name,
      type,
      year,
      description
    }
  }
  `;

const furnitureNextQuery = gql`
  query furnitureNextQuery($_id: ObjectId) {
    furnitureNext(_id: $_id) {
      _id,
      name,
      type,
      year,
      description
    }
  }
  `;

export type TFurniture = {
    _id: string;
    name: string;
    type: string;
    year: string;
    description: string;
    previewUrl: string;
    picturesUrl: string[];
};

type TResponse = {
    furnitureById: TFurniture;
}

type TInputProps = {
    match: match<TFurnitureMatch>
}

type TVariables = {
    _id: string;
};

interface TChildProps {
    current?: TFurniture
}

const furnitureById = graphql<TInputProps, TResponse, TVariables, TChildProps>(furnitureByIdQuery, {
    props: ({data}) => ({
        current: data && data.furnitureById,
    }),
    options: ({match}) => ({
        variables: {_id: match.params.id}
    })
});

type TPrevResponse = {
    furniturePrevious: TFurniture;
}

interface TPrevChildProps {
    prev?: TFurniture
}

const prevFurnitureById = graphql<TInputProps, TPrevResponse, TVariables, TPrevChildProps>(furniturePreviousQuery, {
    props: ({data}) => ({
        prev: data && data.furniturePrevious,
    }),
    options: ({match}) => ({
        variables: {_id: match.params.id}
    })
});

type TNextResponse = {
    furnitureNext: TFurniture;
}

interface TNextChildProps {
    next?: TFurniture
}

const nextFurnitureById = graphql<TInputProps, TNextResponse, TVariables, TNextChildProps>(furnitureNextQuery, {
    props: ({data}) => ({
        next: data && data.furnitureNext,
    }),
    options: ({match}) => ({
        variables: {_id: match.params.id}
    })
});


type TAllResponse = {
    furniture: TInterior;
}

interface TAllChildProps {
    allFurniture?: TInterior
}

const allFurniture = graphql<TInputProps, TAllResponse, TVariables, TAllChildProps>(furnitureQuery, {
    props: ({data}) => ({
        allFurniture: data && data.furniture,
    })
});


export {allFurniture, furnitureById, prevFurnitureById, nextFurnitureById};