var mydata = JSON.parse(names);
// console.table(mydata);

const instaname2 = document.querySelector('#instaname2');
window.onunload = function () {
  alert("Bye now!");
}

var totalIDS = 0;
var fpa = mydata["lips"].split(" ");
fpa = fpa.concat(mydata["korean"].split(" ")).concat(mydata["jap"].split(" ")).concat(mydata["chi"].split(" ")).concat(mydata["thai"].split(" "));
var fpb = mydata["normal"].split(" ")
fpb.concat(mydata["coding"].split(" "));
fpb.forEach((element) => {
  totalIDS++;
  var option = document.createElement("option");
  option.value = element;
  option.innerHTML = element;
  instaname2.appendChild(option)

  menuli = document.createElement("li")
  menuli.innerHTML = element;
  menuli.classList.add("menu-li")
  menuli.classList.add("menu-li" + totalIDS)
  menuli.addEventListener("click", (e) => {
    setFlowers(e.target.innerHTML);
    username.textContent = e.target.innerHTML
  })
  document.querySelector(".menu-ul").append(menuli)
})

instaname2.addEventListener("change", () => {
  setFlowers(instaname2.value);
  username.textContent = instaname2.value

});
fpa.forEach(element => {
  totalIDS++;
  var option = document.createElement("option");
  option.value = element;
  option.innerHTML = element;
  instaname1.appendChild(option)

  menuli = document.createElement("li")
  menuli.innerHTML = element;
  menuli.classList.add("menu-li")
  menuli.classList.add("menu-li" + totalIDS)
  menuli.addEventListener("click", (e) => {
    setFlowers(e.target.innerHTML);
    username.textContent = e.target.innerHTML
  })
  document.querySelector(".menu-ul").append(menuli)
})

instaname1.addEventListener("change", () => {
  setFlowers(instaname1.value);
  username.textContent = instaname1.value
});



const followers = document.getElementById('followers')
const follows = document.getElementById('follows')
const image = document.querySelector('img')
const instaid = document.querySelector('#instaid')
const biography = document.querySelector('#biography')
const username = document.querySelector('#username')
const posts = document.querySelector('#posts')
var GetData;
async function setFlowers(profileId) {
  GetData = await getData(profileId)
  followers.textContent = await getFollowers(profileId, GetData);
  debugger
  follows.textContent = await getFollows(profileId, GetData);
  image.src = await getProfilePicture(profileId, GetData);
  biography.innerHTML = await getBio(profileId, GetData) + "<br/>" +
    `<a href="${await getWebsite(profileId, GetData) || "none"}">#Link1</a>` +
    "<br/>" + `<a href="${await getWebsite2(profileId, GetData) || "none"}">#Link2</a>`
  posts.innerHTML = await getPostCount(profileId, GetData)
  username.dataset.content = await getFullName(profileId, GetData)
  createGallery(profileId, GetData)
  appendGallery(profileId, GetData)
  appendGalliers(profileId, GetData)
}
instaid.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    if (instaid.value == "flutisthacker" || instaid.value == "samaharjan") {
      document.querySelector('.select').style = "opacity:1;";
      document.querySelector(".toggle").classList.remove("thide")
    }
    setFlowers(instaid.value);
    username.textContent = instaid.value
  }
});

async function getData(profileId) {
  const url = `https://www.instagram.com/${profileId}/?__a=1`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.graphql.user);
  return data
}
async function getBio(profileId, gd) {
  // gets data through await getData(profileId)
  return gd.graphql.user.biography;
}
async function getFollows(profileId, gd) {
  // gets data through await getData(profileId)
  return gd.graphql.user.edge_follow.count;
}
async function getPostCount(profileId, gd) {
  // gets data through await getData(profileId)
  return gd.graphql.user.edge_owner_to_timeline_media.count
}
async function getFullName(profileId, gd) {
  // gets data through await getData(profileId)
  return gd.graphql.user.full_name;
}
async function getFollowers(profileId, gd) {
  // data = await getData(profileId,gd);
  if (gd.graphql.user.external_url !== null) {
    // console.log(gd.graphql.user.external_url);
  }
  return gd.graphql.user.edge_followed_by.count;
  // return data.graphql.user.username;
}
async function getWebsite(profileId, gd) {
  // gets data through await getData(profileId)
  return gd.graphql.user.external_url;
  // return data.graphql.user.username;
}
async function getWebsite2(profileId, gd) {
  // gets data through await getData(profileId)
  return gd.graphql.user.external_url_linkshimmed;
  // return data.graphql.user.username;
}
async function getsidecar(profileId, gd) {
  // gets data through await getData(profileId)
  const latest = gd.graphql.user.edge_owner_to_timeline_media.edges;
  const thumbnails = [];

  latest.forEach(element => thumbnails.push(element.node.edge_sidecar_to_children));
  //access the data from the latest 12 posts
  return thumbnails;
}
async function getsidecarchild(profileId, gd) {

  const thumbnails = [];
  var temps = await getsidecar(profileId, gd);

  for (i = 0; i < temps.length; i++) {
    if (i == 11) {
      break;
    }
    temps[i].edges.forEach(element =>
      thumbnails.push(element.node.display_url)
    );
  }
  //access the data from the latest 12 posts
  return thumbnails;
}
async function getProfilePicture(profileId, gd) {
  // gets data through await getData(profileId)
  return gd.graphql.user.profile_pic_url_hd;
}


async function fetchlatestvideo(profileId, gd) {
  // const url = `https://www.instagram.com/${profileId}/?__a=1`;
  // const response = await fetch(url);
  // const data = await response.json();

  const latest = gd.graphql.user.edge_felix_video_timeline.edges;
  //access the data from the latest 12 posts
  const thumbnails = [];

  latest.forEach(element => thumbnails.push(element.node.video_url));
  return thumbnails;

  //loop through the latest 12 post to get the image link
}

async function fetchlatestpost(profileId, gd) {
  const latest = gd.graphql.user.edge_owner_to_timeline_media.edges;
  //access the data from the latest 12 posts
  const thumbnails = [];

  latest.forEach(element => thumbnails.push(element.node.display_url));
  return thumbnails;

  //loop through the latest 12 post to get the image link
}

async function createGallery(profileId, gd) {
  const thumbnails = await fetchlatestpost(profileId, gd);
  const container = document.createElement('div');
  // const mydp = await fetchdp(fetchProfile);
  container.id = 'gallery';
  thumbnails.forEach((thumbnail, index) => {
    const tag = document.createElement('div');
    const tagimg = document.createElement('img');
    const tagname = document.createElement('p');
    const img = document.createElement('img');
    img.className = "imgs";
    const alink = document.createElement('a');
    const post = document.createElement('div');
    const icons = document.createElement('div');
    const texts = document.createElement('label');
    const nolikes = document.createElement('h4');
    const desc = document.createElement('h4');
    const comments = document.createElement('h5');
    const times = document.createElement('h6');
    const mycomments = document.createElement('div');
    // tagimg.src = mydp;
    tagimg.id = "tagimg"
    tagname.id = "tag"
    tagname.innerHTML = profileId;
    tag.appendChild(tagimg)
    tag.appendChild(tagname)
    desc.innerText = profileId;
    texts.appendChild(desc)
    texts.setAttribute("for", profileId + index)

    img.src = thumbnail;
    alink.appendChild(texts)
    // alink.setAttribute("onclick", "clicklink(this)")
    alink.href = thumbnail;
    alink.setAttribute("target", "_blank")
    post.appendChild(img);
    post.appendChild(alink)

    container.appendChild(post)
  });
  document.getElementById('container').innerHTML = ""
  document.getElementById('container').appendChild(container);
}
async function appendGallery(profileId, gd) {
  const thumbnails = await fetchlatestvideo(profileId, gd);
  const container = document.querySelector('#gallery');
  // const mydp = await fetchdp(fetchProfile);
  thumbnails.forEach((thumbnail, index) => {
    const tag = document.createElement('div');
    const tagimg = document.createElement('img');
    const tagname = document.createElement('p');
    const img = document.createElement('VIDEO');
    img.className = "imgs";
    if (img.canPlayType("video/mp4")) {
      img.setAttribute("src", "movie.mp4");
    } else {
      img.setAttribute("src", "movie.ogg");
    }

    img.setAttribute("width", "320");
    img.setAttribute("height", "240");
    img.setAttribute("controls", "controls");
    const alink = document.createElement('a');
    const post = document.createElement('div');
    const icons = document.createElement('div');
    const texts = document.createElement('label');
    const nolikes = document.createElement('h4');
    const desc = document.createElement('h4');
    const comments = document.createElement('h5');
    const times = document.createElement('h6');
    const mycomments = document.createElement('div');
    // tagimg.src = mydp;
    tagimg.id = "tagimg"
    tagname.id = "tag"
    tagname.innerHTML = profileId;
    tag.appendChild(tagimg)
    tag.appendChild(tagname)
    desc.innerText = profileId;
    texts.appendChild(desc)
    texts.setAttribute("for", profileId + index)

    img.src = thumbnail;
    alink.appendChild(texts)
    // alink.setAttribute("onclick", "clicklink(this)")
    alink.href = thumbnail;
    alink.setAttribute("target", "_blank")
    post.appendChild(img);
    post.appendChild(alink)

    container.appendChild(post)
  });
  document.getElementById('container').innerHTML = ""
  document.getElementById('container').appendChild(container);
}
async function appendGalliers(profileId, gd) {
  const thumbnails = await getsidecarchild(profileId, gd)
  const container = document.querySelector('#gallery');
  // const mydp = await fetchdp(fetchProfile);
  thumbnails.forEach((thumbnail, index) => {
    const tag = document.createElement('div');
    const tagimg = document.createElement('img');
    const tagname = document.createElement('p');
    const img = document.createElement('img');
    img.className = "imgs";
    const alink = document.createElement('a');
    const post = document.createElement('div');
    const icons = document.createElement('div');
    const texts = document.createElement('label');
    const nolikes = document.createElement('h4');
    const desc = document.createElement('h4');
    const comments = document.createElement('h5');
    const times = document.createElement('h6');
    const mycomments = document.createElement('div');
    // tagimg.src = mydp;
    tagimg.id = "tagimg"
    tagname.id = "tag"
    tagname.innerHTML = profileId;
    tag.appendChild(tagimg)
    tag.appendChild(tagname)
    desc.innerText = profileId;
    texts.appendChild(desc)
    texts.setAttribute("for", profileId + index)

    img.src = thumbnail;
    alink.appendChild(texts)
    // alink.setAttribute("onclick", "clicklink(this)")
    alink.href = thumbnail;
    alink.setAttribute("target", "_blank")
    post.appendChild(img);
    post.appendChild(alink)

    container.appendChild(post)
  });
  document.getElementById('container').innerHTML = ""
  document.getElementById('container').appendChild(container);
}
