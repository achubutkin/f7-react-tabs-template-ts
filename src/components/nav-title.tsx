import React, { Component } from 'react';
import { F7NavTitle } from 'framework7-react';
import { Router } from 'framework7/modules/router/router';
import classNames from 'classnames';

import './NavTitle.style.css';
import { Utils } from 'framework7';

type Props = F7NavTitle.Props & {
  showOnScroll?: boolean
}

class NavTitle extends Component<Props> {
  componentDidMount() {
    this.$f7ready!(f7 => f7.on('pageInit', this.pageInitHandle))
  }

  componentWillUnmount() {
    this.$f7?.off('pageInit', this.pageInitHandle)
  }

  pageInitHandle = (page: Router.Page) => {
    const { $el } = page
    const $pageContentEl = $el.find('.page-content')
    const pageContentEl = $pageContentEl[0]

    const $navTitleEl = (function () {
      if (page.app.theme === 'ios') {
        const $navbars = $el.closest('.view').find('.navbar-current, .navbar-next')
        return $navbars.length === 1 ? $navbars[0].querySelectorAll('.show-on-scroll')[0]
          : $navbars[1].querySelectorAll('.show-on-scroll')[0]
      } else {
        return $el.find('.show-on-scroll')[0]
      }
    }())

    if ($navTitleEl) {
      const $blockTitleEl = $pageContentEl.find('.block-title')[0]

      if ($blockTitleEl) {
        let old_min = 40
        let old_max = 100

        let lastKnowScrollPosition = 0
        let ticking = false

        function update(this: any) {
          const $navTitleEl = this.$navTitleEl
          const $blockTitleEl = this.$blockTitleEl
          let scrollTop = lastKnowScrollPosition /* pageContentEl.scrollTop */

          let new_value = ((scrollTop - old_min) / (old_max - old_min)) * (100 - 0) + 0
          if (new_value < 0) new_value = 0
          else if (new_value > 100) new_value = 100

          if (scrollTop > old_min) {
            $navTitleEl.classList.add('visible')
            $navTitleEl.style.opacity = new_value / 100
            if (new_value / 100 < 1) {
              $navTitleEl.style.transition = 'opacity 0.3s ease-out'
            }

            let scale = 1 - new_value / 100
            if (scale < 0.8) scale = 0.8

            $blockTitleEl.classList.add('hide')
            $blockTitleEl.style.opacity = 1 - new_value / 100 * 8
            $blockTitleEl.style.transform = `scale(${scale})`

            if (new_value / 100 < 1) {
              $blockTitleEl.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out'
            }
          } else {
            $navTitleEl.classList.remove('visible')
            $navTitleEl.style.opacity = 0

            $blockTitleEl.classList.remove('hide')
            $blockTitleEl.style.opacity = 1
            $blockTitleEl.style.transform = ''
          }
        }

        const updateBound = update.bind({
          $el,
          $pageContentEl,
          pageContentEl,
          $navTitleEl,
          $blockTitleEl
        })

        function handleScroll(_e: Event) {
          lastKnowScrollPosition = pageContentEl.scrollTop
          if (!ticking) {
            Utils.requestAnimationFrame(function () {
              updateBound()
              ticking = false
            })
            ticking = true
          }
        }

        $el.on('scroll', '.page-content', handleScroll, true)
      }
    }
  }

  render() {
    const { children, ...props } = this.props
    const classes = classNames(props.className, {
      'show-on-scroll': props.showOnScroll,
    })
    return (
      <F7NavTitle {...props} className={classes}>
        {children}
      </F7NavTitle>
    )
  }
}

export default NavTitle