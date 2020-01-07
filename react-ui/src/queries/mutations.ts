import gql from "graphql-tag";

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

export const UPDATE_INTERIOR = gql`
  mutation updateInterior($_id: ObjectId, $nameRu: String!, $typeRu: String!, $yearRu: String!, $descriptionRu: String!, $nameEn: String!, $typeEn: String!, $yearEn: String!, $descriptionEn: String!, $previewUrl: String!, $newPreview: Upload!, $imagesOrder: [String]!, $addedFiles: [Upload]!, $removedImagesUrls: [String]!) {
    updateInterior(_id: $_id, nameRu: $nameRu, typeRu: $typeRu, yearRu: $yearRu, descriptionRu: $descriptionRu, nameEn: $nameEn, typeEn: $typeEn, yearEn: $yearEn, descriptionEn: $descriptionEn, previewUrl: $previewUrl, newPreview: $newPreview, imagesOrder: $imagesOrder, addedFiles: $addedFiles, removedImagesUrls: $removedImagesUrls) {
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
      imagesOrder,
      addedFiles,
      removedImagesUrls
    }
  }
  `;

export const DELETE_INTERIOR = gql`
  mutation deleteInterior($_id: ObjectId, $previewUrl: String!, $picturesUrl: [String]! ) {
    deleteInterior(_id: $_id, previewUrl: $previewUrl, picturesUrl: $picturesUrl) {
      _id,
      previewUrl,
      picturesUrl
    }
  }
  `;