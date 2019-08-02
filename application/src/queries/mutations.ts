import gql from "graphql-tag";
import {graphql} from "react-apollo";
import {TUpdateInterior} from "types/common";

export const ADD_INTERIOR = gql`
  mutation addInterior($nameRu: String!, $typeRu: String!, $yearRu: String!, $descriptionRu: String!, $nameEn: String!, $typeEn: String!, $yearEn: String!, $descriptionEn: String!, $preview: Upload!, $images: Upload!) {
    addInterior(nameRu: $nameRu, typeRu: $typeRu, yearRu: $yearRu, descriptionRu: $descriptionRu, nameEn: $nameEn, typeEn: $typeEn, yearEn: $yearEn, descriptionEn: $descriptionEn, preview: $preview, images: $images) {
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
      preview,
      images
    }
  }
  `;

export const DELETE_INTERIOR = gql`
  mutation deleteInterior($_id: ObjectId) {
    deleteInterior(_id: $_id) {
      _id
    }
  }
  `;

export const UPDATE_INTERIOR = gql`
  mutation updateInterior($_id: ObjectId, $nameRu: String!, $typeRu: String!, $yearRu: String!, $descriptionRu: String!, $nameEn: String!, $typeEn: String!, $yearEn: String!, $descriptionEn: String!, $previewUrl: String!, $newPreview: Upload!, $imagesUrls: [String]!, $newImages: Upload!, $removedImagesUrls: [String]!) {
    updateInterior(_id: $_id, nameRu: $nameRu, typeRu: $typeRu, yearRu: $yearRu, descriptionRu: $descriptionRu, nameEn: $nameEn, typeEn: $typeEn, yearEn: $yearEn, descriptionEn: $descriptionEn, previewUrl: $previewUrl, newPreview: $newPreview, imagesUrls: $imagesUrls, newImages: $newImages, removedImagesUrls: $removedImagesUrls) {
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
      previewUrl,
      newPreview,
      imagesUrls,
      newImages,
      removedImagesUrls
    }
  }
  `;

export const withGraphqlUpdate = graphql(UPDATE_INTERIOR, {
  props: ({mutate}) => ({
    updateInterior: (interior: TUpdateInterior) => mutate!({
      variables: interior
    }),
  }),
});