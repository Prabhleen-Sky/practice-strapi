import React from 'react'
// import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const REVIEWS = gql`
    query GetReviews{
        reviews{
            documentId,
            title,
            rating,
            body
        }
    }
  
`

export default function Homepage() {
    // const { loading, error, data } = useFetch('http://localhost:1337/api/reviews')
    const { loading, error, data } = useQuery(REVIEWS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)

  return (
    <div>
         {data.reviews.map((review) => (

            <div key={review.documentId} className="review-card">
                <div className="rating">{review.rating}</div>
                <h2>{review.title}</h2>
                <p>{review.body[0].children[0].text.substring(0,200)}...</p>
                <Link to={`/details/${review.documentId}`}>Read More</Link>
                <br/>
            </div>
        ))}
    </div>
  )
}
