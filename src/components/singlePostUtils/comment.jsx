import React from 'react'

export const Comment = (props) => {
    return (
        <div id="comments-container">
            {
                props.data.map((doc, index) => {
                    return (
                        <div id="single-comment" key={index}>
                            <div id="single-comment-meta">
                                <span>{doc.name}</span>
                                <span>{doc.time}</span>
                            </div>
                            <span >{doc.comment}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}