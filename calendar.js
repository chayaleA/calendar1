document.addEventListener('DOMContentLoaded', function () {
  axios.get("https://eventsapi.onrender.com/api/Events").then((res) => {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: res.data,
    });
    calendar.render();
  });
});
//I am up and you also
function addEvent() {
  var title = document.getElementById("title").value;
  var date = document.getElementById("date").value;
  axios.post("https://eventsapi.onrender.com/api/Events", {
    "title": title,
    "start": date
  }).then((res) => {
    alert(`The event {title: ${title}, date: ${date}} was added succesfully`);
    location.reload()
  })
}

function deleteEvent() {
  axios.get("https://eventsapi.onrender.com/api/Events").then(items => {
    var myList = document.getElementById("myList");
    for (var i = 0; i < items.data.length; i++) {
      (
        function (item) {
          var listItem = document.createElement("li");
          listItem.textContent = "Event: " + item.title + " Date: " + item.start;
          myList.appendChild(listItem);
          var button = document.createElement("button");
          button.textContent = "Delete";
          var id = item.id;
          button.addEventListener("click", function () {
            axios.delete(`https://eventsapi.onrender.com/api/Events/${id}`).then(
            alert("Deleted successfully"))
            location.reload();
          });
          myList.appendChild(button);
        }
      )(items.data[i]);
    }
  })
}


function update() {
  axios.get("https://eventsapi.onrender.com/api/Events").then(items => {
    var myList = document.getElementById("myList2");
    for (var i = 0; i < items.data.length; i++) {
      (function (item) {
        var listItem = document.createElement("li");
        listItem.textContent = "Event: " + item.title + " Date: " + item.start;
        myList2.appendChild(listItem);
        var inputTittle = document.createElement("input");
        var inputDate = document.createElement("input");

        inputTittle.setAttribute("type", "text");
        inputDate.setAttribute("type", "date");

        inputTittle.value = item.title;
        inputDate.value = item.start;

        inputDate.setAttribute("id", item.start);
        inputTittle.setAttribute("id", item.title);

        myList2.appendChild(inputTittle);
        myList2.appendChild(inputDate);

        var button = document.createElement("button");
        button.setAttribute("id", item.id);
        button.textContent = "Update";

        button.addEventListener("click", function () {
          var inputTittle = document.getElementById(item.title).value;
          var inputDate = document.getElementById(item.start).value;
          axios.put(`https://eventsapi.onrender.com/api/Events/${item.id}`, {
            "title": inputTittle,
            "start": inputDate
          }).then(
            alert("Update successfully"))
          location.reload();
        })
        myList2.appendChild(button);
      })(items.data[i]);
    }
  });
}

