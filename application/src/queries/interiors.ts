import {match} from "react-router";
import {TInteriorMatch} from "utils/routes";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {TInterior} from "types/common";

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

const GET_INTERIOR_BY_ID = gql`
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

const GET_PREV_INTERIOR_BY_ID = gql`
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

const GET_NEXT_INTERIOR_BY_ID = gql`
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

const withInteriorById = graphql<TInputProps, TResponse, TVariables, TChildProps>(GET_INTERIOR_BY_ID, {
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

const withPrevInteriorById = graphql<TInputProps, TPrevResponse, TVariables, TPrevChildProps>(GET_PREV_INTERIOR_BY_ID, {
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

const withNextInteriorById = graphql<TInputProps, TNextResponse, TVariables, TNextChildProps>(GET_NEXT_INTERIOR_BY_ID, {
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

const withAllInteriors = graphql<TInputProps, TAllResponse, TVariables, TAllChildProps>(GET_ALL_INTERIORS, {
    props: ({data}) => {
        return ({
            allInteriors: data && data.interiors,
        })
    },
});


export {withAllInteriors, withInteriorById, withPrevInteriorById, withNextInteriorById};