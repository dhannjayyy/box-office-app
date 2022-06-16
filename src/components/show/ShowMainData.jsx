import React from 'react';
import IMG_PLACEHOLDER from "../../images/not-found.png";
import { Star } from '../styled';

const ShowMainData = ({image,name,rating,summary,tags }) => {
    return (
      <div>
        <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
        <div>
          <div>
            <h1>{name}</h1>
            <div>
              <Star />
              <span>{rating.average||'N/A'}</span>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
  
          <div>
            Tags:{' '}
            <div>
              {tags.map((tags, i) => (
                <span key={i}>{tags}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ShowMainData