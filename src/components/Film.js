import { graphql, useFragment } from 'react-relay'

export const Film = (props) => {
  const data = useFragment(
    graphql`
        fragment FilmComponent_film on Film {
            id
            title
            director
        }
    `,
    props.film,
  );

  return (
    <li>{data.id}: {data.title} - {data.director}</li>
  )
}
