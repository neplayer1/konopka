import gql from "graphql-tag";

export const addInteriorMutation = gql`
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

export const deleteInteriorMutation = gql`
  mutation deleteInterior($_id: ObjectId) {
    deleteInterior(_id: $_id) {
      _id
    }
  }
  `;

export const updateInteriorMutation = gql`
  mutation updateInterior($_id: ObjectId, $nameRu: String!, $typeRu: String!, $yearRu: String!, $descriptionRu: String!, $nameEn: String!, $typeEn: String!, $yearEn: String!, $descriptionEn: String!, $preview: Upload!, $images: Upload!) {
    updateInterior(_id: $_id, nameRu: $nameRu, typeRu: $typeRu, yearRu: $yearRu, descriptionRu: $descriptionRu, nameEn: $nameEn, typeEn: $typeEn, yearEn: $yearEn, descriptionEn: $descriptionEn, preview: $preview, images: $images) {
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