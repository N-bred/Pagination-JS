'use strict';

function _instanceof(left, right) {
   if (
      right != null &&
      typeof Symbol !== 'undefined' &&
      right[Symbol.hasInstance]
   ) {
      return right[Symbol.hasInstance](left);
   } else {
      return left instanceof right;
   }
}

function _classCallCheck(instance, Constructor) {
   if (!_instanceof(instance, Constructor)) {
      throw new TypeError('Cannot call a class as a function');
   }
}

function _defineProperties(target, props) {
   for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
   }
}

function _createClass(Constructor, protoProps, staticProps) {
   if (protoProps) _defineProperties(Constructor.prototype, protoProps);
   if (staticProps) _defineProperties(Constructor, staticProps);
   return Constructor;
}

/**
 * Pagination class for easy implementaion of pagination functionality
 */
var Pagination =
   /*#__PURE__*/
   (function() {
      /**
       * Initial config of pagination
       * @param postsContainer HTML element where the posts or the data will be rendered
       * @param paginationContainer HTML element where the pagination list will be rendered
       * @param limitPerPage Limit of the data to be rendered per page
       * @param currentPage Current page to show, its 1 by default
       * @param renderFunction Function that will interact with the data passed, this functions sets the template of the data
       * @param elementClasses Optional argument, object with CSS classes for the pagination elements: ul, li, a
       */
      function Pagination(postsContainer, paginationContainer) {
         var limitPerPage =
            arguments.length > 2 && arguments[2] !== undefined
               ? arguments[2]
               : 10;
         var currentPage =
            arguments.length > 3 && arguments[3] !== undefined
               ? arguments[3]
               : 1;
         var renderFunction = arguments.length > 4 ? arguments[4] : undefined;
         var elementClasses =
            arguments.length > 5 && arguments[5] !== undefined
               ? arguments[5]
               : {
                    ul: 'pagination__list',
                    li: 'pagination__item',
                    a: 'pagination__link'
                 };

         _classCallCheck(this, Pagination);

         this.postsContainer = postsContainer;
         this.paginationContainer = paginationContainer;
         this.limitPerPage = limitPerPage;
         this.currentPage = currentPage;
         this.renderFunction = renderFunction;
         this.elementClasses = elementClasses;
         this.pagination = [];
      }
      /**
       * Init method, that receives the data for the pagination element. E.g from a fetch call
       * @param data Data from which you want to make the pagination
       * @param page Sets the current portion of data to show in page
       */

      _createClass(Pagination, [
         {
            key: 'init',
            value: function init(data) {
               var page =
                  arguments.length > 1 && arguments[1] !== undefined
                     ? arguments[1]
                     : this.currentPage;
               this.data = data;
               this.setPaginationLength();
               this.render(page);
            }
            /**
             * Render method that initially sets all the pagination functionality and render both posts and pagination
             * @param page Sets the current portion of data to show in page
             */
         },
         {
            key: 'render',
            value: function render(page) {
               this.paginationContainer.innerHTML = '';
               this.configPagination(page);
               this.renderPosts();
               this.renderPagination();
            }
            /**
             * Mehtod that will set the configuration of the pagination;
             * @param page Current page showin
             */
         },
         {
            key: 'configPagination',
            value: function configPagination(page) {
               var indexOfLastPost = page * this.limitPerPage;
               var indexOfFirstPost = indexOfLastPost - this.limitPerPage;
               var currentPosts = this.data.slice(
                  indexOfFirstPost,
                  indexOfLastPost
               );
               this.postsPerPage = currentPosts;
            }
            /**
             * Method that sets a number of pagination items needed based on the data length and the pushes those numbers to the pagination array
             */
         },
         {
            key: 'setPaginationLength',
            value: function setPaginationLength() {
               for (
                  var i = 1;
                  i <= Math.ceil(this.data.length / this.limitPerPage);
                  i++
               ) {
                  this.pagination.push(i);
               }
            }
            /**
             * Method that will loop through the data passed
             * It will use the renderFunction passed as the way to format the data passed
             * Finally it appends each value from renderFunction into the postsContainer element.
             */
         },
         {
            key: 'renderPosts',
            value: function renderPosts() {
               var _this = this;

               this.postsContainer.innerHTML = '';
               this.postsPerPage.forEach(function(users) {
                  var user = _this.renderFunction(users);

                  _this.postsContainer.innerHTML += user;
               });
            }
            /**
             * Method that renders the whole pagination, the pagination consist of an UL HTML element that has both li and a elements
             */
         },
         {
            key: 'renderPagination',
            value: function renderPagination() {
               var _this2 = this;

               // Creates the ul element
               var list = document.createElement('ul');
               list.classList.add(this.elementClasses.ul); // Sets this to a variable due to scope issues.

               var that = this; // Loops through the pagination array and creates li and a elements

               this.pagination.forEach(function(number) {
                  var li = document.createElement('li');
                  li.classList.add(_this2.elementClasses.li);
                  var a = document.createElement('a');
                  a.setAttribute('href', 'javascript:void(0)');
                  a.classList.add(_this2.elementClasses.a);
                  a.innerText = ''.concat(number); // Adds event listener to each a element, this is where the logic of each pagination link is done

                  a.addEventListener('click', function(e) {
                     that.configPagination(this.innerText);
                     that.renderPosts();
                  }); // Appends the elements

                  li.appendChild(a);
                  list.appendChild(li);
               }); //Appends the ul element to the paginationContainer;

               this.paginationContainer.appendChild(list);
            }
         }
      ]);

      return Pagination;
   })();
