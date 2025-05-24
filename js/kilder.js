    // --- Kilder data og visning ---

    // const kilder = [
    //   {
    //     titel: "Retsinformation – Straffeloven",
    //     beskrivelse: "LBKG nr. 1145 af 05/11/2024",
    //     link: "https://www.retsinformation.dk/eli/lta/2024/1145",
    //     ekstraLinks: [{ navn: "Forarbejder til straffeloven", url: "https://www.ft.dk/samling/20221/lovforslag/L17/index.htm" }]
    //   },
    //   { titel: "Domsdatabasen – Seneste afgørelser i straffesager", link: "https://domsdatabasen.dk/#/sager/1339" },
    //   { titel: "Københavns Byret – Nyheder", beskrivelse: "Nyheder og pressemeddelelser fra Københavns Byret.", link: "https://www.domstol.dk/koebenhavn/aktuelt/" },
    //   { titel: "Retten på Frederiksberg – Nyheder", beskrivelse: "Nyheder og pressemeddelelser fra Retten på Frederiksberg.", link: "https://www.domstol.dk/frederiksberg/aktuelt/" }
    // ];

    fetch("https://test01.adham.dk/feed.json")

    function visKilder() {
      const kilderList = document.getElementById('kilderList');
      kilderList.innerHTML = '';

      kilder.forEach(kilde => {
        const li = document.createElement('li');
        let innerHtml = `<strong>${kilde.titel}</strong>`;
        if (kilde.beskrivelse) innerHtml += ` - ${kilde.beskrivelse}`;
        innerHtml += ` <a href="${kilde.link}" target="_blank" rel="noopener noreferrer">[Link]</a>`;

        if (kilde.ekstraLinks) {
          kilde.ekstraLinks.forEach(el => {
            innerHtml += `<br><small><a href="${el.url}" target="_blank" rel="noopener noreferrer">${el.navn}</a></small>`;
          });
        }

        li.innerHTML = innerHtml;
        kilderList.appendChild(li);
      });
    }
    visKilder();