import React from 'react';
import { Swiper, F7Swiper } from 'framework7-react';
import { SliderItem } from '.';
import { compose } from 'redux';
import { withTranslation, WithTranslation } from 'react-i18next';
import connectSlider, { ISlidesProps } from '../../store/connectSlider';

import './style.less'

type Props = WithTranslation & F7Swiper.Props & ISlidesProps

const Slider = ({ items = [], ...rest }: Props) => (
  <Swiper init {...rest}>
    {items.map((item, i) => <SliderItem key={i.toString()} item={item} />)}
  </Swiper>
)

export default compose<React.FC<F7Swiper.Props & ISlidesProps>>(
  withTranslation(),
  connectSlider
)(Slider)