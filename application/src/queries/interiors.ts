import {match} from "react-router";
import {TInteriorMatch} from "utils/routes";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {TInterior} from "types/common";

export const interiorsQuery = gql`
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

const interiorByIdQuery = gql`
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

const interiorPreviousQuery = gql`
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

const interiorNextQuery = gql`
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

type TResponse = {
    interiorById: TInterior;
}

type TInputProps = {
    match: match<TInteriorMatch>
}

type TVariables = {
    _id: string;
};

interface TChildProps {
    current?: TInterior
}

const interiorById = graphql<TInputProps, TResponse, TVariables, TChildProps>(interiorByIdQuery, {
    props: ({data}) => ({
        current: data && data.interiorById,
    }),
    options: ({match}) => ({
        variables: {_id: match.params.id}
    })
});

type TPrevResponse = {
    interiorPrevious: TInterior;
}

interface TPrevChildProps {
    prev?: TInterior
}

const prevInteriorById = graphql<TInputProps, TPrevResponse, TVariables, TPrevChildProps>(interiorPreviousQuery, {
    props: ({data}) => ({
        prev: data && data.interiorPrevious,
    }),
    options: ({match}) => ({
        variables: {_id: match.params.id}
    })
});

type TNextResponse = {
    interiorNext: TInterior;
}

interface TNextChildProps {
    next?: TInterior
}

const nextInteriorById = graphql<TInputProps, TNextResponse, TVariables, TNextChildProps>(interiorNextQuery, {
    props: ({data}) => ({
        next: data && data.interiorNext,
    }),
    options: ({match}) => ({
        variables: {_id: match.params.id}
    })
});

type TAllResponse = {
    interiors: TInterior;
}

interface TAllChildProps {
    allInteriors?: TInterior
}

const allInteriors = graphql<TInputProps, TAllResponse, TVariables, TAllChildProps>(interiorsQuery, {
    props: ({data}) => {
        return ({
            allInteriors: data && data.interiors,
        })
    },
});


export {allInteriors, interiorById, prevInteriorById, nextInteriorById};