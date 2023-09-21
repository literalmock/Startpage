/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"aS15ZsG4uKLr2dxc","label":"reddit","bookmarks":[{"id":"DdUL5FO3B3SZ50To","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"8Nd6au8LXxL5OE0q","label":"r/beermoneyindia","url":"https://www.reddit.com/r/beermoneyindia/new/"},{"id":"jnv3pJ7gfbj9iw65","label":"r/subreddits","url":"https://github.com/ankitshah009/best-subreddits#browser"}]},{"id":"7PsGDIm5hf3whKhe","label":"productivity","bookmarks":[{"id":"o51J4HHS9Igqc0Ik","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"0EW8Tzl6gry6W2Ah","label":"notion","url":"https://notion.so/"},{"id":"eCjYA4jPU6Nn4MN4","label":"polotno studio","url":"https://studio.polotno.com/"}]},{"id":"ZmIAtRVfmzpjPU3z","label":"worth reading","bookmarks":[{"id":"rv4xmeKhSMjLuKm4","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"Io8hnQfUgBsEwI4A","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"M0YnkB7U4Q6hxtZO","label":"college tips","url":"https://www.reddit.com/r/Indian_Academia/comments/cmb68c/tips_and_advice_for_engineers_in_the_tech_field/?utm_source=share&utm_medium=web2x&context=3"},{"id":"xnH5U8tJ78zoDObY","label":"start from scratch","url":"https://www.reddit.com/r/Indian_Academia/comments/d98uje/guide_for_landing_a_high_paying_job_from_a_tier_3/?utm_source=share&utm_medium=android_app&utm_name=androidcss&utm_term=1&utm_content=share_button"}]},{"id":"eWmQyaqe3SXn1kVY","label":"stuff","bookmarks":[{"id":"PAH8VRElAGkfDm5L","label":"ChatGPT","url":"https://chat.openai.com/"},{"id":"VC1QJtJoX0gHIgGu","label":"Youtube","url":"https://www.youtube.com/"},{"id":"COpkvyZJEzWSx8kC","label":"rix ai","url":"https://hashnode.com/rix/"},{"id":"cRdpSW12YG0T0TFM","label":"movie","url":"https://www.justchill.tv/home"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
