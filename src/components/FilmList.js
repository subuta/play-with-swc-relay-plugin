import { graphql, useFragment } from 'react-relay'

import { Film } from './Film'

export const FilmList = (props) => {
  const data = useFragment(
    graphql`
        fragment FilmListComponent_films on Film @relay(plural: true) {
            id
            ...FilmComponent_film
        }
    `,
    props.films,
  );

  return (
    <ul>
      {data.map((node) => (
        <Film key={node.id} film={node} />
      ))}
    </ul>
  )
}
