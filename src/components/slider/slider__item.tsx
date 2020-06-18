import React from 'react';
import { SwiperSlide } from 'framework7-react';
import { ISliderItem } from '../../store/connectSlider';

import './style.less'

type Props = {
  item: ISliderItem
}

const getSlideBackgroundStyle = (url?: string): React.CSSProperties => url ? { backgroundImage: `url(${url})` } : {}

export default ({ item }: Props) => (
  <SwiperSlide
    style={getSlideBackgroundStyle(item.imageUrl)}
  >
    {item.title && (
      <p className="name">{item.title}</p>
    )}
    {item.description && (
      <p className="description">{item.description}</p>
    )}
  </SwiperSlide>
)