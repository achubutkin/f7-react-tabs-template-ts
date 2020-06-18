import { connect } from 'react-redux'
import { F7Swiper } from 'framework7-react'

export interface ISliderItem {
  href: string,
  imageUrl?: string,
  title?: string,
  description?: string,
}

export interface ISlidesProps {
  items?: ISliderItem[]
}

const defaultSwiperParams = {
  centeredSlides: true,
  spaceBetween: 16,
  slidesPerView: 'auto'
}

const mock: ISliderItem[] = [
  {
    href: '#',
    description: 'Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.',
    imageUrl: '',
    title: 'Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.'
  },
  {
    href: '#',
    description: 'Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.',
    imageUrl: '',
    title: 'Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.'
  },
  {
    href: '#',
    description: 'Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat.',
    imageUrl: '',
    title: 'Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.'
  }
]

const mapStateToProps = (_state: any, props: F7Swiper.Props & ISlidesProps): F7Swiper.Props & ISlidesProps => ({
  params: { ...defaultSwiperParams, ...props.params },
  items: props.items ? props.items : mock
})

export default connect(mapStateToProps)