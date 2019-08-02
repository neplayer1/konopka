import {match} from "react-router";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {TFurnitureMatch} from "utils/routes";
import {TFurniture} from "types/common";

const GET_ALL_FURNITURE = gql`
  query furnitureQuery {
    furniture {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
    }
  }
  `;

const GET_FURNITURE_BY_ID = gql`
  query furnitureByIdQuery($_id: ObjectId) {
    furnitureById(_id: $_id) {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
    }
  }
  `;

const GET_PREV_FURNITURE_BY_ID = gql`
  query furniturePreviousQuery($_id: ObjectId) {
    furniturePrevious(_id: $_id) {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
    }
  }
  `;

const GET_NEXT_FURNITURE_BY_ID = gql`
  query furnitureNextQuery($_id: ObjectId) {
    furnitureNext(_id: $_id) {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
    }
  }
  `;

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

const withFurnitureById = graphql<TInputProps, TResponse, TVariables, TChildProps>(GET_FURNITURE_BY_ID, {
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

const withPrevFurnitureById = graphql<TInputProps, TPrevResponse, TVariables, TPrevChildProps>(GET_PREV_FURNITURE_BY_ID, {
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

const withNextFurnitureById = graphql<TInputProps, TNextResponse, TVariables, TNextChildProps>(GET_NEXT_FURNITURE_BY_ID, {
    props: ({data}) => ({
        next: data && data.furnitureNext,
    }),
    options: ({match}) => ({
        variables: {_id: match.params.id}
    })
});


type TAllResponse = {
    furniture: TFurniture;
}

interface TAllChildProps {
    allFurniture?: TFurniture
}

const withAllFurniture = graphql<TInputProps, TAllResponse, TVariables, TAllChildProps>(GET_ALL_FURNITURE, {
    props: ({data}) => ({
        allFurniture: data && data.furniture,
    })
});


export {withAllFurniture, withFurnitureById, withPrevFurnitureById, withNextFurnitureById};