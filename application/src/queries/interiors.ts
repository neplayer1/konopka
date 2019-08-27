import gql from "graphql-tag";
import {TInterior} from "types/common";

export type T_GET_ALL_INTERIORS = {
    interiors: TInterior[]
}

export const GET_ALL_INTERIORS = gql`
  query interiorsQuery {
    interiors {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
      previewUrl,
      picturesUrl,
    }
  }
  `;

export type T_GET_INTERIOR_BY_ID = {
    interiorById: TInterior
}
export type T_VAR_GET_INTERIOR_BY_ID = {
    _id: string
}

export const GET_INTERIOR_BY_ID = gql`
  query interiorByIdQuery($_id: ObjectId) {
    interiorById(_id: $_id) {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
      previewUrl,
      picturesUrl,
    }
  }
  `;

export type T_GET_PREV_INTERIOR_BY_ID = {
    interiorPrevious: TInterior
}
export type T_VAR_PREV_INTERIOR_BY_ID = {
    _id: string
}

export const GET_PREV_INTERIOR_BY_ID = gql`
  query interiorPreviousQuery($_id: ObjectId) {
    interiorPrevious(_id: $_id) {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
      previewUrl,
      picturesUrl,
    }
  }
  `;

export type T_GET_NEXT_INTERIOR_BY_ID = {
    interiorNext: TInterior
}
export type T_VAR_NEXT_INTERIOR_BY_ID = {
    _id: string
}

export const GET_NEXT_INTERIOR_BY_ID = gql`
  query interiorNextQuery($_id: ObjectId) {
    interiorNext(_id: $_id) {
      _id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
      previewUrl,
      picturesUrl,
    }
  }
  `;
