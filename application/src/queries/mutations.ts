import gql from "graphql-tag";

export const addInteriorMutation = gql`
  mutation addInterior($name: String, $type: String, $year: Int, $description: String, $preview: Upload!, $images: Upload!) {
    addInterior(name: $name, type: $type, year: $year, description: $description, preview: $preview, images: $images) {
      name,
      type,
      year,
      description,
      preview,
      images
    }
  }
  `;