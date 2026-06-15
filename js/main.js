(function() {

    // Бургер меню

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {
        const burgerIcon = e.target.closest('.header__burger-logo')
        const burgerNavLink = e.target.closest('.nav__link')
        if (!burgerIcon && !burgerNavLink) return

        if (document.documentElement.clientWidth > 900) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }
    }

    // Показать еще Sales

    const showMoreSales = document.querySelector('.show-more__link--sales')
    let salesItems = 4

    showMoreSales.addEventListener('click', (e) => {
        salesItems += 4
        e.preventDefault()
        const array = Array.from(document.querySelector('.sales__hints-list').children)
        const visItems = array.slice(0, salesItems)

        visItems.forEach(el => el.classList.toggle('sales__hints-item--visible'))
    })

    // изменение количества товара

    document.addEventListener('click', function(e) {
        const plusBtn = e.target.closest('.sales__item-plus');
        const minusBtn = e.target.closest('.sales__item-minus');

        if (plusBtn || minusBtn) {
            const item = e.target.closest('.sales__item');
            const countElement = item.querySelector('.sales__item-count');
            let count = Number(countElement.innerHTML);

            if (plusBtn) {
                count++;
            } else if (minusBtn && count > 0) {
                count--;
            }

            countElement.innerHTML = count;
        }
    });

    //фильтр товаров

    const ITEMS_PER_PAGE = 6;

    document.getElementById('filter-select').addEventListener('change', function() {
        const filterType = this.value;

        const allLists = Array.from(document.querySelectorAll('.sales__list'));

        const allItems = Array.from(document.querySelectorAll('.sales__item'));

        switch (filterType) {
            case 'popular':
                sortByPopularity(allItems);
                break;
            case 'cheap':
                sortByPrice(allItems, 'cheap');
                break;
            case 'fancy':
                sortByPrice(allItems, 'fancy');
                break;
            case 'new':
                sortByNew(allItems);
                break;
            case 'high-rating':
                sortByRating(allItems);
                break;
        }

        allLists.forEach(list => {
            list.innerHTML = '';
        });

        allItems.forEach((item, index) => {
            const pageIndex = Math.floor(index / ITEMS_PER_PAGE);
            if (pageIndex < allLists.length) {
                allLists[pageIndex].appendChild(item);
            }
        });
    });

    // Функции сортировки

    function sortByPopularity(items) {
        items.sort((a, b) => {
            const popularityA = parseInt(a.dataset.popularity);
            const popularityB = parseInt(b.dataset.popularity);
            return popularityB - popularityA;
        });
    }

    function sortByPrice(items, order) {
        items.sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            return order === 'cheap' ? priceA - priceB : priceB - priceA;
        });
    }

    function sortByNew(items) {
        items.sort((a, b) => {
            const isNewA = a.dataset.isNew === 'true';
            const isNewB = b.dataset.isNew === 'true';

            if (isNewA && !isNewB) return -1;
            if (!isNewA && isNewB) return 1;
            return 0;
        });
    }

    function sortByRating(items) {
        items.sort((a, b) => {
            const ratingA = parseFloat(a.dataset.rating);
            const ratingB = parseFloat(b.dataset.rating);
            return ratingB - ratingA;
        });
    }

    //Показать еще Reviews

    const showMoreReviewsImg1 = document.querySelector('.show-more__link--photo-1')
    const hintsReviewsImgLenght1 = document.querySelectorAll('.reviews__imgs-item--1').length
    let imgItems1 = 2

    showMoreReviewsImg1.addEventListener('click', (e) => {
        imgItems1 += 3
        e.preventDefault()
        const array = Array.from(document.querySelector('.reviews__imgs-list--1').children)
        const visItems = array.slice(0, imgItems1)

        visItems.forEach(el => el.classList.toggle('reviews__imgs-item--visible'))
        if (imgItems1 >= hintsReviewsImgLenght1) {
            showMoreReviewsImg1.style.display = 'none'
        }
    })

    const showMoreReviewsImg2 = document.querySelector('.show-more__link--photo-2')
    const hintsReviewsImgLenght2 = document.querySelectorAll('.reviews__imgs-item--2').length
    let imgItems2 = 2

    showMoreReviewsImg2.addEventListener('click', (e) => {
        imgItems2 += 2
        e.preventDefault()
        const array = Array.from(document.querySelector('.reviews__imgs-list--2').children)
        const visItems = array.slice(0, imgItems2)

        visItems.forEach(el => el.classList.toggle('reviews__imgs-item--visible'))
        if (imgItems2 >= hintsReviewsImgLenght2) {
            showMoreReviewsImg2.style.display = 'none'
        }
    })

    const showMoreReviews = document.querySelector('.show-more--reviews')
    const reviewsLenght = document.querySelectorAll('.reviews__item').length
    let reviewsItems = 2

    showMoreReviews.addEventListener('click', (e) => {
        reviewsItems += 3
        e.preventDefault()
        const array = Array.from(document.querySelector('.reviews__reviews-list').children)
        const visItems = array.slice(0, reviewsItems)

        visItems.forEach(el => el.classList.toggle('reviews__reviews-item--visible'))
        if (reviewsItems >= reviewsLenght) {
            showMoreReviews.style.display = 'none'
        }
    })

    // Аккордион

    const accordionLists = document.querySelectorAll('.faq__accordion-list');

    accordionLists.forEach(el => {

        // document.querySelector('.accordion-list__item--opened .accordion-list__content').style.maxHeight = document.querySelector('.accordion-list__item--opened .accordion-list__content').scrollHeight + 'px';

        el.addEventListener('click', (event) => {

            const accordionList = event.currentTarget
            const accordionOpenedItem = accordionList.querySelector('.faq__accordion-list-item--opened')
            const accordionOpenedContent = accordionList.querySelector('.faq__accordion-list-item--opened .faq__accordion-list-content')

            const accordionControl = event.target.closest('.faq__accordion-list-control');
            if (!accordionControl) return
            event.preventDefault()
            const accordionItem = accordionControl.parentElement;
            const accordionContent = accordionControl.nextElementSibling;

            if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
                accordionOpenedItem.classList.remove('faq__accordion-list-item--opened');
                accordionOpenedContent.style.maxHeight = null;
            }
            accordionItem.classList.toggle('faq__accordion-list-item--opened');

            if (accordionItem.classList.contains('faq__accordion-list-item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }

        });
    });

    // Показать еще News

    const showMoreNews = document.querySelector('.show-more--news')
    const newsLenght = document.querySelectorAll('.news__item').length
    let newsItems = 2

    showMoreNews.addEventListener('click', (e) => {
        newsItems += 4
        const array = Array.from(document.querySelector('.news__list').children)
        const visItems = array.slice(0, newsItems)

        visItems.forEach(el => el.classList.add('news__item--visible'))
        if (newsItems >= newsLenght) {
            showMoreNews.style.display = 'none'
        }
    })

    // Тень хедера при прокрутке страницы

    const header = document.querySelector('.header__top');
    const shadow = 'shadow';

    function toggleHeaderShadow() {
        if (window.scrollY > 0) {
            header.classList.add(shadow);
        } else {
            header.classList.remove(shadow);
        };
    }

    window.addEventListener('scroll', toggleHeaderShadow);

    const swiper = new Swiper('.swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 275,
    });

    const sliderButtonLeft = document.querySelector('.sales__arrow-left');
    const sliderButtonRight = document.querySelector('.sales__arrow-right');

    sliderButtonLeft.addEventListener("click", () => {
        swiper.slidePrev()
    });
    sliderButtonRight.addEventListener("click", () => {
        swiper.slideNext()
    });
})()
