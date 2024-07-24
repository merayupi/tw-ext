const attachButton = async (username) => {
    const element = document.querySelector("div[data-testid='UserName'] div:nth-child(2) span");
    const element2 = document.querySelector("#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1c4cdxw.r-1t251xo.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div > div > div > div.css-175oi2r.r-3pj75a.r-ttdzmv.r-1ifxtd0 > div.css-175oi2r.r-13awgt0.r-18u37iz.r-1w6e6rj > div:nth-child(2)");

    if (element2) {
        const existingButton = element.parentNode.querySelector('.history-btn');
        if (existingButton) {
            existingButton.remove();
        }
        const existingButton2 = element2.parentNode.querySelector('.firstfollower-btn');
        if (existingButton2) {
            existingButton2.remove();
        }

        const button = await createButtonHistory(username);
        const button2 = await createButtonFirstFollower(username);
        
        button.className = "history-btn";
        button2.className = "firstfollower-btn";
        element.parentNode.appendChild(button);
        element2.parentNode.appendChild(button2);
    
    }
}

const createButtonHistory = async (username) => {
    const button = document.createElement("button");
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: 20px; width: auto; vertical-align: middle;"><path fill="#B100FF" d="M12,2A10,10,0,0,0,5.12,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1H8.62a1,1,0,0,0,0-2H6.22A8,8,0,1,1,4,12a1,1,0,0,0-2,0A10,10,0,1,0,12,2Zm0,6a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2H13V9A1,1,0,0,0,12,8Z"></path></svg>';
    button.style.background = 'transparent';
    button.style.padding = '0px';
    button.style.cursor = "pointer";
    button.style.border = "0px";
    button.style.margin = "0em 0em 0em 0.5em";

    button.onclick = async function(event) {
        const result  = createModalUI();
        await createUIResult(username, result);
    };
    
    return button;
}

const createButtonFirstFollower = async (username) => {
    const button = document.createElement("div");
    button.innerText = 'First Follower';
    button.style.background = 'transparent';
    button.style.marginBottom = '10px';
    button.style.marginLeft = '30px';
    button.style.cursor = "pointer";
    button.style.color = "#B100FF";
    button.style.fontWeight = "bold";
    button.style.fontSize = "16px";
    button.style.fontFamily = "TwitterChirp, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
    button.style.display = "flex";
    button.style.alignItems = "stretch";
    button.style.flexDirection = "column";
    button.style.position = "relative";

    button.onclick = async function(event) {
        const result  = createModalUI();
        await createUIFirstFollowerResult(username, result);
    };

    return button;
}
const createModalUI = () => {
    document.body.style.overflow = 'hidden';

    const container = document.createElement("div");
    container.id = 'container';
    const page = document.createElement("div");
    page.style.position = "fixed";
    page.style.top = "0";
    page.style.left = "0";
    page.style.width = "100vw";
    page.style.height = "100vh";
    page.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    page.style.zIndex = "9998";
    page.onclick = function () {
        container.remove();
        page.remove();
        document.body.style.overflow = '';
    };

    const popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup-layout";
    popup.style.backgroundColor = "#3C096C";
    const c = document.createElement("div");
    c.style.display = "flex";
    c.style.width = "100%";
    c.style.flexDirection = "column";
    c.style.alignItems = "end";
    const closeButton = document.createElement("span");
    closeButton.id = "close";
    closeButton.innerHTML = '❌';
    closeButton.style.fontSize = "18px";
    closeButton.style.cursor = "pointer";
    closeButton.style.justifySelf = "end";
    closeButton.onclick = function () {
        container.remove();
        page.remove();
        document.body.style.overflow = '';
    };
    c.appendChild(closeButton);
    const result = document.createElement("div");
    result.className = "result";
    result.id = "result";
    popup.appendChild(c);
    popup.appendChild(result);
    container.appendChild(popup);
    document.body.appendChild(container);

    const closeModal = document.getElementById("close");
    closeModal && (closeModal.onclick = function () {
        container.remove();
        page.remove();
        document.body.style.overflow = '';
    });
    document.body.appendChild(page);

    return result;
}

const getAllHistoryUsername = async (username) => {
    // const id = 11111111;
    // const response = await fetch(`http://localhost:3000/twitter-users/id/${id}`, {
    //     method: "get",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    // });
    
    // const data = await response.json();
    // return data;
}

const getAllFollowers = async (username, cursor = -1, followers = []) => {
    try {
        const url = new URL('https://api.twitter.com/1.1/followers/list.json');
        url.search = new URLSearchParams({
          'cursor': cursor,
          'screen_name': username,
          'count': 200,
          'skip_status': true,
          'include_user_entities': false,
        }).toString();
    
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'
          }
        });
    
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
    
        const data = await res.json();
        
        const newData = data.users.map(user => {
          const date = new Date(user.created_at);
          const unixTimestamp = Math.floor(date.getTime() / 1000);
          const created = `<t:${unixTimestamp}:R>`;
          return {
            id: user.id_str,
            name: user.name,
            username: user.screen_name,
            bio: user.description,
            follower: user.followers_count,
            following: user.friends_count,
            pfp: user.profile_image_url_https,
            post: user.statuses_count,
            age: created
          };
        });
    
        followers = followers.concat(newData);
    
        if (data.next_cursor) {
          return await getAllFollowers(username, data.next_cursor, followers);
        } else {
          return followers;
        }
      } catch (e) {
        console.error("An error occurred:", e);
        throw e;
      }
};

const createUIResult = async (username, result) => {
    let outputHTML = '';
    const usernames = await getAllHistoryUsername(username);

    usernames.forEach(user => {
        outputHTML += ` <div class="container-content">
                            <img src="pfp.png" alt="pfp">
                            <div class="content">
                                <h2 class="username">Username: ${user.username}</h2>
                                <p class="last-checked">Date:</p>
                            </div>
                        </div>`;
    });

    const outputContainer = document.createElement("div");
    outputContainer.classList.add("container-main");
    outputContainer.innerHTML = outputHTML;

    result.appendChild(outputContainer);
}

const createUIFirstFollowerResult = async (username, result) => {
    const followers = await getAllFollowers(username);
    const firstfollowers = followers.slice(-30).reverse();
    let outputHTML = '';

    firstfollowers.forEach(user => {
        outputHTML += ` <div class="container-content">
                            <img src="${user.pfp}" alt="pfp">
                            <div class="content">
                                <h2 class="username"><a href="https://twitter.com/${user.username}" target="_blank">${user.username}</a> |  Follower: ${user.follower}</h2>
                                <p class="bio">${user.bio}</p>
                            </div>
                        </div>`;
    });

    const outputContainer = document.createElement("div");
    outputContainer.classList.add("container-main");
    outputContainer.innerHTML = outputHTML;

    result.appendChild(outputContainer);
};

const observePageChanges = () => {
    let currentUsername = null;
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const element = document.querySelector("div[data-testid='UserName'] div:nth-child(2) span");

                if (element) {
                    const username = element.innerHTML.substr(1);
                    if (currentUsername !== username) {
                        currentUsername = username;
                        attachButton(username);
                    }
                }
            }
        }
    });
    observer.observe(document, { subtree: true, childList: true });
}

observePageChanges();


