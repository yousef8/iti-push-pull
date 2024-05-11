const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  console.log("clicked");
  xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dummyjson.com/products", true);
  // console.log(xhr);
  xhr.send();

  console.log(xhr);

  xhr.onload = function () {
    console.log(xhr.response);
    document.getElementById("para").innerText += `${xhr.response}`;
  };
});

// btn.addEventListener("click", function () {
//   $.ajax({
//     method: "GET",
//     url: "https://dummyjson.com/products",
//     success: function (res) {
//       console.log(res);
//       document.getElementById("para").innerText += JSON.stringify(res, null, 2);
//     },
//     error: function () {
//       console.log("error");
//     },
//   });
// });
