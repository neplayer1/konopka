import gql from "graphql-tag";
import {TFurniture, TInterior} from "types/common";

export type T_GET_ALL_FURNITURE = {
    furniture: TFurniture[]
}

export const GET_ALL_FURNITURE = gql`
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

export type T_GET_FURNITURE_BY_ID = {
    furnitureById: TFurniture
}
export type T_VAR_GET_FURNITURE_BY_ID = {
    _id: string
}

export const GET_FURNITURE_BY_ID = gql`
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

export type T_GET_PREV_FURNITURE_BY_ID = {
    furniturePrevious: TInterior
}
export type T_VAR_PREV_FURNITURE_BY_ID = {
    _id: string
}

export const GET_PREV_FURNITURE_BY_ID = gql`
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

export type T_GET_NEXT_FURNITURE_BY_ID = {
    furnitureNext: TInterior
}
export type T_VAR_NEXT_FURNITURE_BY_ID = {
    _id: string
}

export const GET_NEXT_FURNITURE_BY_ID = gql`
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