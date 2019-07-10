/**
 * Pagination class for easy implementaion of pagination functionality
 */
class Pagination {
   private pagination: number[] = [];
   private postsPerPage;
   private data: [];

   /**
    * Initial config of pagination
    * @param postsContainer HTML element where the posts or the data will be rendered
    * @param paginationContainer HTML element where the pagination list will be rendered
    * @param limitPerPage Limit of the data to be rendered per page
    * @param currentPage Current page to show, its 1 by default
    * @param renderFunction Function that will interact with the data passed, this functions sets the template of the data
    * @param elementClasses Optional argument, object with CSS classes for the pagination elements: ul, li, a
    */
   constructor(
      private postsContainer: HTMLElement,
      private paginationContainer,
      private limitPerPage: number = 10,
      private currentPage: number = 1,
      private renderFunction,
      private elementClasses = {
         ul: 'pagination__list',
         li: 'pagination__item',
         a: 'pagination__link'
      }
   ) {}

   /**
    * Init method, that receives the data for the pagination element. E.g from a fetch call
    * @param data Data from which you want to make the pagination
    * @param page Sets the current portion of data to show in page
    */

   init(data: [], page = this.currentPage) {
      this.data = data;
      this.setPaginationLength();
      this.render(page);
   }

   /**
    * Render method that initially sets all the pagination functionality and render both posts and pagination
    * @param page Sets the current portion of data to show in page
    */

   private render(page: number) {
      this.paginationContainer.innerHTML = '';
      this.configPagination(page);
      this.renderPosts();
      this.renderPagination();
   }

   /**
    * Mehtod that will set the configuration of the pagination;
    * @param page Current page showin
    */

   private configPagination(page) {
      const indexOfLastPost: number = page * this.limitPerPage;
      const indexOfFirstPost: number = indexOfLastPost - this.limitPerPage;
      const currentPosts = this.data.slice(indexOfFirstPost, indexOfLastPost);
      this.postsPerPage = currentPosts;
   }

   /**
    * Method that sets a number of pagination items needed based on the data length and the pushes those numbers to the pagination array
    */

   private setPaginationLength() {
      for (
         let i = 1;
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
   private renderPosts() {
      this.postsContainer.innerHTML = '';
      this.postsPerPage.forEach(users => {
         const user = this.renderFunction(users);
         this.postsContainer.innerHTML += user;
      });
   }

   /**
    * Method that renders the whole pagination, the pagination consist of an UL HTML element that has both li and a elements
    */
   private renderPagination() {
      // Creates the ul element
      const list = document.createElement('ul');
      list.classList.add(this.elementClasses.ul);

      // Sets this to a variable due to scope issues.
      const that = this;

      // Loops through the pagination array and creates li and a elements
      this.pagination.forEach(number => {
         const li = document.createElement('li');
         li.classList.add(this.elementClasses.li);
         const a = document.createElement('a');
         a.setAttribute('href', 'javascript:void(0)');
         a.classList.add(this.elementClasses.a);
         a.innerText = `${number}`;

         // Adds event listener to each a element, this is where the logic of each pagination link is done
         a.addEventListener('click', function(e) {
            that.configPagination(this.innerText);
            that.renderPosts();
         });

         // Appends the elements
         li.appendChild(a);
         list.appendChild(li);
      });

      //Appends the ul element to the paginationContainer;
      this.paginationContainer.appendChild(list);
   }
}
