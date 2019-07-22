import { gql } from 'apollo-boost';

export const addInteriorMutation = gql`
  mutation addInterior($name: String, $type: String, $year: Int, $description: String) {
    addInterior(name: $name, type: $type, year: $year, description: $description) {
      name,
      type,
      year,
      description
    }
  }
  `;