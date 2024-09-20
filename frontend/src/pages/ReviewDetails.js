import React from 'react'
import { useParams } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'

const REVIEW = gql `
    query GetReview($id: ID!){
        review(documentId: $id) {
            documentId,
            title,
            rating,
            body,
          }
    }
`

export default function ReviewDetails() {
    const { id } = useParams()
    // const { loading, error, data } = useFetch('http://localhost:1337/api/reviews/' + id)

    const { loading, error, data } = useQuery(REVIEW, {
        variables : {id : id}
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)

  return (
    <div className="review-card">
        <div className="rating">{data.review.rating}</div>
        <h2>{data.review.title}</h2>
        {/* <p>{data.data.body[0].children[0].text}</p>
         */}
          <p>
            {data.review.body.map((paragraph, pIndex) =>
            paragraph.children.map((child, cIndex) => (
                <span key={`${pIndex}-${cIndex}`}>
                {child.text}{" "}
                </span>
            ))
            )}
        </p>
    </div>
    )
}
