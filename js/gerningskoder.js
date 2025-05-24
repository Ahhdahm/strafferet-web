 let data = [];
  let editingNoteId = null;

  fetch('gerningskoder.json')
    .then(response => response.json())
    .then(json => data = json)
    .catch(error => {
      console.error("Kunne ikke hente data:", error);
      alert("Fejl ved indlæsning af gerningskoder.");
    });

  const searchInput = document.getElementById('searchKodeInput');
  const suggestionsList = document.getElementById('suggestionsList');

const forbrydelseInput = document.getElementById('searchForbrydelseInput');
const suggestionsForbrydelse = document.getElementById('suggestionsForbrydelse');

  // Vis forslag på klik og input
  searchInput.addEventListener('focus', () => {
    renderSuggestions('');
  });

  searchInput.addEventListener('input', () => {
    renderSuggestions(searchInput.value.trim());
  });

  document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
    suggestionsList.innerHTML = '';
  }
  if (!forbrydelseInput.contains(e.target) && !suggestionsForbrydelse.contains(e.target)) {
    suggestionsForbrydelse.innerHTML = '';
  }
});

forbrydelseInput.addEventListener('focus', () => {
  renderSuggestionsForbrydelse('');
});

forbrydelseInput.addEventListener('input', () => {
  renderSuggestionsForbrydelse(forbrydelseInput.value.trim());
});

  function renderSuggestions(filter) {
    suggestionsList.innerHTML = '';

    const filtered = filter
      ? data.filter(item => (item.kode + ' ' + item.forbrydelse).toLowerCase().includes(filter.toLowerCase()))
      : data;

    if (filtered.length === 0) {
      const none = document.createElement('li');
      none.textContent = 'Ingen forslag';
      none.style.pointerEvents = 'none';
      suggestionsList.appendChild(none);
      return;
    }

    const grouped = filtered.reduce((acc, item) => {
      const kapitel = item.kapitel || 'Uden kapitel';
      if (!acc[kapitel]) acc[kapitel] = [];
      acc[kapitel].push(item);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([kapitel, items]) => {
      const header = document.createElement('li');
      header.textContent = kapitel;
      header.className = 'header';
      suggestionsList.appendChild(header);

      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.kode} - ${item.forbrydelse}`;
        li.onclick = () => {
          searchInput.value = item.kode;
          suggestionsList.innerHTML = '';
        };
        suggestionsList.appendChild(li);
      });
    });
  }

function renderSuggestionsForbrydelse(filter) {
  suggestionsForbrydelse.innerHTML = '';

  const filtered = filter
    ? data.filter(item => item.forbrydelse && item.forbrydelse.toLowerCase().includes(filter.toLowerCase()))
    : data;

  if (filtered.length === 0) {
    const none = document.createElement('li');
    none.textContent = 'Ingen forslag';
    none.style.pointerEvents = 'none';
    suggestionsForbrydelse.appendChild(none);
    return;
  }

  const grouped = filtered.reduce((acc, item) => {
    const kapitel = item.kapitel || 'Uden kapitel';
    if (!acc[kapitel]) acc[kapitel] = [];
    acc[kapitel].push(item);
    return acc;
  }, {});

  Object.entries(grouped).forEach(([kapitel, items]) => {
    const header = document.createElement('li');
    header.textContent = kapitel;
    header.className = 'header';
    suggestionsForbrydelse.appendChild(header);

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.forbrydelse} (${item.kode})`;
      li.onclick = () => {
        forbrydelseInput.value = item.forbrydelse;
        suggestionsForbrydelse.innerHTML = '';
      };
      suggestionsForbrydelse.appendChild(li);
    });
  });
}

  function search() {
    const kodeInput = document.getElementById('searchKodeInput').value.trim().toLowerCase();
    const forbrydelseInput = document.getElementById('searchForbrydelseInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!kodeInput && !forbrydelseInput) {
      resultDiv.innerHTML = '<p>Indtast gerningskode eller forbrydelse for at søge.</p>';
      return;
    }

    const matches = data.filter(item => {
      const kode = item.kode ? item.kode.toLowerCase() : '';
      const forbrydelse = item.forbrydelse ? item.forbrydelse.toLowerCase() : '';
      const kodeMatch = kodeInput ? kode.includes(kodeInput) : true;
      const forbrydelseMatch = forbrydelseInput ? forbrydelse.includes(forbrydelseInput) : true;
      return kodeMatch && forbrydelseMatch;
    });

    if (matches.length === 0) {
      resultDiv.innerHTML = '<p>Ingen resultater fundet.</p>';
      return;
    }

    matches.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      const title = document.createElement('h2');
      title.textContent = `${item.kode} - ${item.forbrydelse}`;
      card.appendChild(title);

      if (item.gerningskoder && item.gerningskoder.length > 0) {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        const btn = document.createElement('button');
        btn.textContent = 'Vis tilknyttede sager ▼';

        btn.onclick = () => {
          const content = dropdown.querySelector('.dropdown-content');
          if (content.style.display === 'block') {
            content.style.display = 'none';
            btn.textContent = 'Vis tilknyttede sager ▼';
          } else {
            content.style.display = 'block';
            btn.textContent = 'Skjul tilknyttede sager ▲';
          }
        };

        dropdown.appendChild(btn);

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        item.gerningskoder.forEach(sag => {
          const link = document.createElement('a');
          link.href = sag.link;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = sag.titel;
          dropdownContent.appendChild(link);
        });

        dropdown.appendChild(dropdownContent);
        card.appendChild(dropdown);
      }

      if (item.kommentar) {
        const pKommentar = document.createElement('p');
        pKommentar.textContent = item.kommentar;
        card.appendChild(pKommentar);
      }

      resultDiv.appendChild(card);
    });
  }