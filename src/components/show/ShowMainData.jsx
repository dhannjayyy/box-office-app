import React from 'react';
import IMG_PLACEHOLDER from "../../images/not-found.png";
import { Star } from '../styled';
import { Headline, TagList } from './ShowMainData.styled';
import { MainDataWrapper } from './ShowMainData.styled';

const ShowMainData = ({image,name,rating,summary,tags }) => {
    return (
      <MainDataWrapper>
        <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
        <div className='text-side'>
          <Headline>
            <h1>{name}</h1>
            <div>
              <Star />
              <span>{rating.average||'N/A'}</span>
            </div>
          </Headline>
          <div className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
  
          <div>
            Tags:{' '}
            <TagList>
              {tags.map((tags, i) => (
                <span key={i}>{tags}</span>
              ))}
            </TagList>
          </div>
        </div>
        </MainDataWrapper>
    );
  };

export default ShowMainData