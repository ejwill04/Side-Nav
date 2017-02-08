class SideNav {
  constructor () {
    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.startX = 0;
    this.currentX = 0;

    this.addEventListeners();
  }

  addEventListeners() {
    this.showButtonEl.addEventListener('click', this.showSideNav)
    this.hideButtonEl.addEventListener('click', this.hideSideNav)
    this.sideNavEl.addEventListener('click', this.hideSideNav)
    this.sideNavContainerEl.addEventListener('click', this.blockClicks);

    this.sideNavContainerEl.addEventListener('touchstart', this.onTouchStart);
    this.sideNavContainerEl.addEventListener('touchmove', this.onTouchMove);
    this.sideNavContainerEl.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchStart(evt) {
    evt.preventDefault();
    this.startX = evt.touch[0].pageX;
    this.currentX = this.startX;
  }

  onTouchMove(evt) {
    this.currentX = evt.touches[0].pageX;

    const translateX = this.currentX - this.startX;
    this.sideNavEl.style.transform = `${translateX}`;
  }

  onTouchEnd(evt) {
  }

  blockClicks(evt) {
    evt.stopPropagation();
  }

  onTransitionEnd (evt) {
    this.sideNavEl.classList.remove('side-nav__container--animatable');
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav() {
    this.sideNavEl.classList.add('side-nav__container--animatable');
    this.sideNavEl.classList.add('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }

  hideSideNav() {
    this.sideNavEl.classList.add('side-nav__container--animatable');
    this.sideNavEl.classList.remove('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }

}

new SideNav();
