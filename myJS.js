// Функция инициализации клиента Google Sheets API
function initClient() {
    // Загрузка клиентской библиотеки Google API
    gapi.load('client', startApp);
  }
  
  // Запуск приложения после загрузки клиентской библиотеки Google API
  function startApp() {
    // Конфигурация клиента Google Sheets API
    gapi.client.init({
      'apiKey': 'AIzaSyA4XhySqRU22GKWjzledX5OGhkAjyMwjtI',
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      // Вызов функции для получения данных
      getDataFromSheet();
    }).catch(function(error) {
      console.log('Ошибка инициализации клиента Google Sheets API:', error);
    });
  }
  
  // Функция для получения данных из Google Sheet
  function getDataFromSheet() {
    // ID таблицы Google Sheets
    var spreadsheetId = 'https://docs.google.com/spreadsheets/d/1-LzgKPWh04DmfOdmlrhxVnL8o6fVX6yspJ25S3A5NqQ/edit?usp=sharing';
  
    // Диапазон данных, которые вы хотите получить (например, 'Лист1!A1:B10')
    var range = 'Лист1!A1:B10';
  
    // Вызов метода spreadsheets.values.get для получения данных
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    }).then(function(response) {
      var result = response.result;
      var values = result.values;
  
      if (values.length > 0) {
        var tableBody = document.querySelector('#data-table tbody');
  
        // Очищаем содержимое таблицы перед добавлением новых данных
        tableBody.innerHTML = '';
  
        // Добавляем данные в таблицу
        values.forEach(function(row) {
          var newRow = document.createElement('tr');
          row.forEach(function(cell) {
            var newCell = document.createElement('td');
            newCell.textContent = cell;
            newRow.appendChild(newCell);
          });
          tableBody.appendChild(newRow);
        });
      } else {
        console.log('Нет данных в таблице.');
      }
    }).catch(function(error) {
      console.log('Ошибка получения данных из таблицы:', error);
    });
  }
  
  // Вызов функции инициализации клиента Google Sheets API
  initClient();
  