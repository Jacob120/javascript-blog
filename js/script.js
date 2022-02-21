'use strict';
{
  /* OPTIONS */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.tags.list',
    optArticleAuthorSelector = '.post-author',
    optAuthorsListSelector = '.authors.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  /* const opt = {
      articleSelector: '.post',
      titleSelector: '.post-title',
      titleListSelector: '.titles',
      articleTagsSelector: '.post-tags .list',
      tagsListSelector: '.tags.list',
      articleAuthorSelector: '.post-author',
      authorsListSelector: '.authors.list',
      cloudClassCount: 5,
      cloudClassPrefix: 'tag-size-'
    }; */

  /* CLICK HANDLER */
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

  /* GENERATE TITLE LIST */

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
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

  /* TAGS COUNT */

  // eslint-disable-next-line no-inner-declarations
  function calculateTagsParams(tags) {
    const params = { max: 0, min: 99999 };
    for (let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.max);
    }
    return params;
  }
  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  }

  /* GENERATE TAGS  */

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
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
        const tagHTML =
          '<li><a href ="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + tagHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      tagsList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] tags parameters calculator  */
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML =
        '<li><a href="#tag-' +
        tag +
        '" class="' +
        calculateTagClass(allTags[tag], tagsParams) +
        '">' +
        tag +
        ' ' +
        '</a></li>';
      allTagsHTML += tagLinkHTML;
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /* [NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
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

  /* GENERATE AUTHOR */

  // eslint-disable-next-line no-inner-declarations
  function generateAuthor() {
    /* [NEW] create new variable allAuthors with empty object */
    let allAuthors = {};
    //   /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP for every article */
    for (let article of articles) {
      /* make html variable with empty string */
      let html = '';
      /* get author from .data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* generate HTML of the link */
      const authorLink =
        '<a href="#author-' +
        articleAuthor +
        '"><span>' +
        articleAuthor +
        '</span></a>';
      /* add generated code to html variable */
      html = html + '' + authorLink;
      /* [NEW] check is this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        /* [NEW] add generated code to allTags array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      const author = article.querySelector(optArticleAuthorSelector);
      author.innerHTML = html;
      /* END LOOP: for every article */
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(optAuthorsListSelector);
    /* [NEW] create variable for all links HTML code*/
    let allAuthorsHTML = '';
    /* [NEW] START LOOP: for each author in allAuthors */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and it to allAuthorsHTML */
      allAuthorsHTML +=
        '<li><a href="#author-' +
        author +
        '"><span>' +
        author +
        ' (' +
        allAuthors[author] +
        ')</span></a></li> ';
      /* [NEW] END LOOP: for each author in allAuthors */
    }
    /* [NEW] add html from allAuthos to authorList */
    authorList.innerHTML = allAuthorsHTML;
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
      /* END LOOP: for each found tag link */
    }
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
