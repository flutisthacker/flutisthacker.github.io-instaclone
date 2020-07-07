async function getData(profileId) {
  const url = `https://www.instagram.com/${profileId}/?__a=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data
}
async function getBio(profileId) {
  data = await getData(profileId);
  return data.graphql.user.biography;
}
async function getFollows(profileId) {
  data = await getData(profileId);
  return data.graphql.user.edge_follow.count;
}
async function getPostCount(profileId) {
  data = await getData(profileId);
  return data.graphql.user.edge_owner_to_timeline_media.count
}
async function getFullName(profileId) {
  data = await getData(profileId);
  return data.graphql.user.full_name;
}
async function getFollowers(profileId) {
  data = await getData(profileId);
  console.log(data.graphql.user);
  if (data.graphql.user.external_url !== null) {
    console.log(data.graphql.user.external_url);
  }
  return data.graphql.user.edge_followed_by.count;
  // return data.graphql.user.username;
}
async function getWebsite(profileId) {
  data = await getData(profileId);
  return data.graphql.user.external_url;
  // return data.graphql.user.username;
}
async function getWebsite2(profileId) {
  data = await getData(profileId);
  return data.graphql.user.external_url_linkshimmed;
  // return data.graphql.user.username;
}
async function getsidecar(profileId) {
  data = await getData(profileId);
  const latest = data.graphql.user.edge_owner_to_timeline_media.edges;
  const thumbnails = [];

  latest.forEach(element => thumbnails.push(element.node.edge_sidecar_to_children));
  //access the data from the latest 12 posts
  return thumbnails;
}
async function getsidecarchild(profileId) {

  const thumbnails = [];
  var temps = await getsidecar(profileId);

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
async function getProfilePicture(profileId) {
  data = await getData(profileId);
  return data.graphql.user.profile_pic_url_hd;
}


async function fetchlatestvideo(profileId) {
  const url = `https://www.instagram.com/${profileId}/?__a=1`;
  const response = await fetch(url);
  const data = await response.json();

  const latest = data.graphql.user.edge_felix_video_timeline.edges;
  //access the data from the latest 12 posts
  const thumbnails = [];

  latest.forEach(element => thumbnails.push(element.node.display_url));
  return thumbnails;

  //loop through the latest 12 post to get the image link
}

async function fetchlatestpost(profileId) {
  const url = `https://www.instagram.com/${profileId}/?__a=1`;
  const response = await fetch(url);
  const data = await response.json();

  const latest = data.graphql.user.edge_owner_to_timeline_media.edges;
  //access the data from the latest 12 posts
  const thumbnails = [];

  latest.forEach(element => thumbnails.push(element.node.display_url));
  return thumbnails;

  //loop through the latest 12 post to get the image link
}

async function createGallery(profileId) {
  const thumbnails = await fetchlatestpost(profileId);
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
async function appendGallery(profileId) {
  const thumbnails = await fetchlatestvideo(profileId);
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
async function appendGalliers(profileId) {
  const thumbnails = await getsidecarchild(profileId)
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
