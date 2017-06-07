'use strict';

const Header = (update) => {
  const header = $("<header></header>");
  const linkIcon = $('<a class="prevIcon" href="#"></a>');
  const icon = $('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
  const title = $("<span>Gas Finder</span>");
  linkIcon.hide();
  linkIcon.append(icon)
  header.append(linkIcon);
  header.append(title);

  linkIcon.on('click', (e) =>{
    e.preventDefault();
    state.selectedStation = null;
    update();
  });
  return header;
}
