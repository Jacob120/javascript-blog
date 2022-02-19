'use strict';
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    // titleList.remove(".titles li"); // Usuń wszystkie elementy  <li> wewnątrz tagu <ul class='list title'>

    /* [DONE] find all the articles and save them to variable: articles  */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /*[DONE] find the title element */
      const articleTitleElement = article.querySelector(optTitleSelector);
      /*[DONE] get the title from the title element */
      const articleTitle = articleTitleElement.innerHTML;
      /* [DONE] create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const tagLink =
          '<li><a href ="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + tagLink;
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      tagsList.innerHTML = html;
    }
    /* END LOOP: for every article: */
  }

  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event) {
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags() {
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('.post-tags a');
    /* START LOOP: for each link */
    for (let singleTagLink of allTagsLinks) {
      /* add tagClickHandler as event listener for that link */
      singleTagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  // eslint-disable-next-line no-inner-declarations
  function generateAuthor() {
    //   /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP for every article */
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get author from .data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* generate HTML of the link */
      const authorLink =
        '<a href ="#author-' +
        articleAuthor +
        '"><span>' +
        articleAuthor +
        '</span></a>';
      /* add generated code to html variable */
      html = html + '' + authorLink;
      /* insert HTML of all the links into the tags wrapper */
      const author = article.querySelector(optArticleAuthorSelector);
      author.innerHTML = html;
      /* END LOOP: for every article */
    }
  }

  generateAuthor();

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler(event) {
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll(
      'a.active[href^="#author-"]'
    );
    /* START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
      /* remove class active */
      activeAuthor.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    // const tagLinks = document.getAttribute(href);
    const authorLinks = document.querySelectorAll(
      'a[href^="#author-' + href + '"]'
    );

    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors() {
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('.post-author a');
    /* START LOOP: for each link */
    for (let singleTagLink of allTagsLinks) {
      /* add tagClickHandler as event listener for that link */
      singleTagLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();
}
