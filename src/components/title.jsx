import React,{memo} from 'react';
import { TitleWrapper } from './Title.styled';

const Title = (props) => {
  return (
    <TitleWrapper>
    <h1>{props.title}</h1>
    <p>{props.subTitle}</p>
    </TitleWrapper>
  )
}

export default memo(Title);