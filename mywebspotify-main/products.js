const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;

    return products;
  } catch (err) {
    console.log(err);
  }
};

var x = window.matchMedia("(max-width: 576px)");

/*
=============
Load Category Products
=============
 */
const categoryCenter = document.querySelector(".songItemContainer");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayAllProductItems(products);
  hojaa();
  // myFunction(x);
});

/*
=============
view all
=============
 */

const displayAllProductItems = (items) => {
  let displayAllProduct = items.map(
    (product) => `
                    <div class="songItem">
                      <img  src="${product.coverPath}" alt="1" />
                      <span class="songName">${product.songName}</span>
                      <span class="songlistplay"
                        ><span class="timestamp"
                          >
                          <i id="${product.id}" class="far  songItemPlay fa-play-circle"></i> </span
                      ></span>
                   </div>
                  `
  );

  displayAllProduct = displayAllProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayAllProduct;
  }
};

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section__title");
    // console.log(target);
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter((product) => {
        if (product.category === id) {
          return product;
        }
      });

      if (id === "All") {
        displayAllProductItems(products);
      } else {
        displayAllProductItems(menuCategory);
      }
    }

    hojaa();
  });
}

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(
  "https://dns4.pendusaab.com/download/128k-wqod/Tum-Se-Hi.mp3"
);

let masterPlay = document.getElementById("masterPlay");
let next = document.getElementById("forward");
let previous = document.getElementById("previous");

let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [

  {
    songName: "Jab We Met - Tum Se Hi",
    filePath:
      "https://dns4.pendusaab.com/download/128k-wqod/Tum-Se-Hi.mp3",
  },
  {
    songName: "Hold My Hand -  Michael Jackson",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Hold%20My%20Hand.mp3",
  },
  {
    songName: "Cinema - Harry Styles",
    filePath: "https://hiphopkit.com/music/download/9358/",
  },
  {
    songName: "Daydreaming - Harry Styles",
    filePath: "https://hiphopkit.com/music/download/9359/",
  },
  {
    songName: "Satellite - Harry Styles",
    filePath: "https://hiphopkit.com/music/download/9361/",
  },
  {
    songName: "Keep Driving - Harry Styles",
    filePath: "https://hiphopkit.com/music/download/9360/",
  },

  
  {
    songName: "What Do You Mean - Justin Bieber ",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Justin%20Bieber%20-%20What%20Do%20You%20Mean.mp3",
  },
  {
    songName: "Never Say Never - Justin Bieber",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Never%20Say%20Never.mp3",
  },
  {
    songName: "Shape of you - Ed Sheeran",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Shape%20of%20You.mp3",
  },

  {
    songName: "Intentions - Justin Bieber",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Intentions.mp3",
  },

  {
    songName: "Love Me - Justin Bieber",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/love%20me.mp3",
  },
  {
    songName: "One Less Lonely Girl - Justin Bieber",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/one%20less%20lonely%20girl.mp3",
  },
  {
    songName: "Baby - Justin Bieber",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Baby%20Baby.mp3",
  },

  {
    songName: "Somebody To Love - Justin Bieber",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Somebody%20To%20Love.mp3",
  },

  {
    songName: "Peaches - Justin Bieber",
    filePath:
      "https://naasongs.vip/myuploads/uploads/English%20Songs/Peaches.mp3",
  },
 
  {
    songName: "Akhiyaan - Mitraz",
    filePath:
      "https://djmaza.live/files/download/type/128/id/8919",
  },
  {
    songName: "Alfaazo - Mitraz",
    filePath:
      "https://ghantalele.com/uploads/files/data-79/39023/Alfaazo%20-%20Mitraz_192(Ghantalele.com).mp3",
  },
  
  {
    songName: "Baarishein - Anuj Jain",
    filePath: "https://dns4.pendusaab.com/download/128k-dguyy/Baarishien.mp3",
  },
  
  {
    songName: "Choo loo - The Local Train",
    filePath:
      "http://sameergyaani.wapqiz.com/filedownload/1033530/The-Local-Train-Choo-Lo-Home-DemoMP3-70K-(sameergyaani.wapqiz.com).mp3",
  },
 
];

// songItems.forEach((element, i) => {
//   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
//   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
// });

// Handle play/pause click

playpause = () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
};
masterPlay.addEventListener("click", playpause);
window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    playpause();
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  console.log(myProgressBar.value);
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;

  if (myProgressBar.value == 1) {
    console.log("next");
  }
});

const itemsss = document.getElementsByClassName("songItemPlay");
const songNamee = document.getElementsByClassName("songName");

const makeAllPlays = (element) => {
  if (element.classList[2] === "fa-play-circle") {
    element.classList.replace("fa-play-circle", "fa-pause-circle");
    songIndex = parseInt(element.id);

    audioElement.src = songs[songIndex].filePath;

    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;

    gif.style.opacity = 1;
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
  } else {
    element.classList.replace("fa-pause-circle", "fa-play-circle");
    songIndex = parseInt(element.id);

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.pause();
    gif.style.opacity = 0;
    masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
  }
};

const hojaa = () => {
  Array.from(itemsss).forEach((element) => {
    element.addEventListener("click", (e) => {
      // console.log(e.target.id);
      makeAllPlays(e.target);
    });
  });
};

const Nextsong = () => {
  if (songIndex >= songs.length) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;

  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

next.addEventListener("click", Nextsong);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    Nextsong();
  }
});

const Previoussong = () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    Previoussong();
  }
});

previous.addEventListener("click", Previoussong);

// let brownie = document.getElementById("brownie");

// window.addEventListener("keydown", (e) => {
//   if (e.key === "b") {
//     setTimeout(() => {
//       brownie.className = "roll-in-blurred-left";
//     }, 2000);

//     setTimeout(() => {
//       brownie.className = "swirl-out-tl-fwd";
//     }, 10000);

//     setTimeout(() => {
//       brownie.className = "brownie";
//     }, 12000);
//   }
// });

// let burger = document.getElementById("burger");

// window.addEventListener("keydown", (e) => {
//   if (e.key === "s") {
//     setTimeout(() => {
//       burger.className = "bounce-in-top";
//     }, 2000);

//     setTimeout(() => {
//       burger.className = "slide-out-blurred-top";
//     }, 10000);

//     setTimeout(() => {
//       burger.className = "burger";
//     }, 12000);
//   }
// });

// window.addEventListener("keyup", (e) => {
//   if (e.key === "b") {
//     console.log(brownie);
//     brownie.className = "swirl-out-tl-fwd";

//     setTimeout(() => {
//       brownie.className = "brownie";
//     }, 5000);
//   }
// });

const checkprogress = () => {
  // console.log(myProgressBar.value);
  if (myProgressBar.value === "100") {
    Nextsong();
  }
};

setInterval(() => {
  checkprogress();
}, 2000);

// start modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const modalfun = () => {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// last modal

var modal2 = document.getElementById("myModal2");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

var btn2 = document.getElementById("myBtn");

btn2.onclick = function () {
  modal2.style.display = "block";
};

const modalfun2 = () => {
  modal2.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
// span2.onclick = function () {
//   modal2.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal.style.display = "none";
  }
};
// function myFunction(x) {
//   if (x.matches) {
//     // If media query matches
//     console.log("yess");
//     modal.style.display = "block";
//   } else {
//     console.log("no");
//   }
// }
