const openNav = () => {
  document.getElementById('dashSidebar').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
}

const closeNav = () => {
  document.getElementById('dashSidebar').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
};
