import { Dom7 as $$ } from "framework7";
import Utils from "framework7/utils/utils";

import "./hider.css";

function pageInit(page) {
  let $pageEl = page.$el;
  let $pageContentEl = $pageEl.find(".page-content");
  let pageContentEl = $pageContentEl[0];
  let $elements =
    page.app.theme === "ios"
      ? $pageEl.closest(".view").find(".hider")
      : $pageEl.find(".hider");

  if (page.type && page.type === "popup") $elements = $pageEl.find(".hider");

  if ($elements.length) {
    let old_min = 40;
    let old_max = 100;
    let lastKnowScrollPosition = 0;
    let ticking = false;

    function update() {
      let $elements = this.$elements;

      let scrollTop = lastKnowScrollPosition; /* pageContentEl.scrollTop */
      let new_value =
        ((scrollTop - old_min) / (old_max - old_min)) * (100 - 0) + 0;

      if (new_value < 0) new_value = 0;
      else if (new_value > 100) new_value = 100;

      if (scrollTop > old_min) {
        $elements[0].classList.add("visible");
        $elements[0].style.opacity = new_value / 100;
        if (new_value / 100 < 1) {
          $elements[0].style.transition = "opacity 0.3s ease-out";
        }

        let scale = 1 - new_value / 100;
        if (scale < 0.8) scale = 0.8;

        $elements[1].classList.add("hide");
        $elements[1].style.opacity = 1 - (new_value / 100) * 8;
        $elements[1].style.transform = `scale(${scale})`;

        if (new_value / 100 < 1) {
          $elements[1].style.transition =
            "transform 0.3s ease-out, opacity 0.3s ease-out";
        }
      } else {
        $elements[0].classList.remove("visible");
        $elements[0].style.opacity = 0;

        $elements[1].classList.remove("hide");
        $elements[1].style.opacity = 1;
        $elements[1].style.transform = "";
      }
    }

    const updateBound = update.bind({
      $pageEl: $pageEl,
      $pageContentEl: $pageContentEl,
      pageContentEl: pageContentEl,
      $elements: $elements,
    });

    function handleScroll(e) {
      lastKnowScrollPosition = pageContentEl.scrollTop;
      if (!ticking) {
        Utils.requestAnimationFrame(function () {
          updateBound();
          ticking = false;
        });
        ticking = true;
      }
    }

    $pageEl.on("scroll", ".page-content", handleScroll, true);
  }
}

export default {
  create: function (app) {
    ["pageInit", "popupOpen"].forEach((eventname) =>
      app.on(eventname, pageInit)
    );
  },
};
