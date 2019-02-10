import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CreatableSelect from "react-select/lib/Creatable";

const GET_THINGS = gql`
{
  things {
    id
    name
    props {
      id
      kind
      value
    }
  }
}
`;

interface Thing {
    id: string;
    name: string;
}

export default class ThingLogger extends Component {
  render() {
    return <Query query={GET_THINGS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        let options = data.things.map((thing : Thing) => {
          return {
            value: thing.id,
            label: thing.name,
          }
        });

        return (
          <CreatableSelect
          isClearable
          //onChange={this.handleChange}
          options={options}
          />
        );

      }}
      </Query>;
  }
}