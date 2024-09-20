import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

export default function ReviewDetails() {
    const { id } = useParams()
    const { loading, error, data } = useFetch('http://localhost:1337/api/reviews/' + id)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    console.log(data)

  return (
    <div className="review-card">
        <div className="rating">{data.data.rating}</div>
        <h2>{data.data.title}</h2>
        {/* <p>{data.data.body[0].children[0].text}</p>
         */}
          <p>
            {data.data.body.map((paragraph, pIndex) =>
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
