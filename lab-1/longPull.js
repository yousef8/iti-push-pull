const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  function longPull() {
    $.ajax({
      method: "GET",
      url: "http://localhost:8000/api/users",
      success: function (res) {
        console.log("success");
        document.getElementById("para").innerText = JSON.stringify(
          res,
          null,
          2
        );

        setTimeout(longPull, 10000);
      },
      error: function () {
        console.log("error");
        setTimeout(longPull, 8000);
      },
    });
  }

  longPull();
});
