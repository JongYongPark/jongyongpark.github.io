document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      fetch('/index.json')
        .then(response => response.json())
        .then(data => {
          const results = data.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
          );

          displayResults(results);
        })
        .catch(error => {
          console.error('검색 중 오류 발생:', error);
          searchResults.innerHTML = '검색 중 오류가 발생했습니다.';
        });
    });
  }

  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '검색 결과가 없습니다.';
      return;
    }

    searchResults.innerHTML = results.map(item => `
      <div class="search-item">
        <a href="${item.permalink}">${item.title}</a>
        <p>${item.summary}</p>
      </div>
    `).join('');
  }
});