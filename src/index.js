const attachButton = async (username) => {
    const element = document.querySelector("div[data-testid='UserName'] div:nth-child(2) span");
    const element2 = document.querySelector("#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div > div > div > div > div.css-175oi2r.r-13awgt0.r-18u37iz.r-1w6e6rj > div:nth-child(2)");
    
    if (element2) {
        console.log(element2);
        const existingButton = element2.parentNode.querySelector('.firstfollower-btn');
        const existingButton2 = element2.parentNode.querySelector('.recentfollowing-btn');
        if (existingButton && existingButton2) {
            existingButton.remove();
            existingButton2.remove();
        }
  
        const button2 = await createButtonFirstFollower(username);
        const button3 = await createButtonRecentFollowing(username);
  
        button2.className = "firstfollower-btn";
        button3.className = "recentfollowing-btn";
  
        element2.parentNode.appendChild(button2);
        element2.parentNode.appendChild(button3);
    }
  }
  
  const createButtonFirstFollower = async (username) => {
    const button = document.createElement("div");
    button.innerText = 'First Follower';
    button.style.background = 'transparent';
    button.style.marginBottom = '10px';
    button.style.marginLeft = '30px';
    button.style.cursor = "pointer";
    button.style.color = "#E0FBFC";
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
  
  const createButtonRecentFollowing = async (username) => {
    const button = document.createElement("div");
    button.innerText = 'Recent Following';
    button.style.background = 'transparent';
    button.style.marginBottom = '10px';
    button.style.marginLeft = '30px';
    button.style.cursor = "pointer";
    button.style.color = "#E0FBFC";
    button.style.fontWeight = "bold";
    button.style.fontSize = "16px";
    button.style.fontFamily = "TwitterChirp, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
    button.style.display = "flex";
    button.style.alignItems = "stretch";
    button.style.flexDirection = "column";
    button.style.position = "relative";
  
    button.onclick = async function(event) {
        const result  = createModalUI();
        await createUIRecentFollowingResult(username, result);
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
    popup.style.backgroundColor = "#001d3d";
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
  
  const getAllFollowers = async (username, maxConcurrent = 5) => {
    const fetchFollowers = async (cursor) => {
      const url = new URL('https://api.twitter.com/1.1/followers/list.json');
      url.search = new URLSearchParams({
        cursor,
        screen_name: username,
        count: 200,
        skip_status: true,
        include_user_entities: false,
      }).toString();
  
      const res = await fetch(url, {
        headers: {
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'
        }
      });
  
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
      return res.json();
    };
  
    let allFollowers = [];
    let cursors = [-1];
    
    while (cursors.length > 0) {
      const batch = cursors.splice(0, maxConcurrent);
      const responses = await Promise.all(batch.map(fetchFollowers));
      
      for (const { users, next_cursor } of responses) {
        allFollowers.push(...users.map(user => ({
          id: user.id_str,
          name: user.name,
          username: user.screen_name,
          bio: user.description,
          follower: user.followers_count,
          following: user.friends_count,
          pfp: user.profile_image_url_https,
          post: user.statuses_count,
          age: `<t:${Math.floor(new Date(user.created_at).getTime() / 1000)}:R>`
        })));
        
        if (next_cursor) cursors.push(next_cursor);
      }
    }
  
    return allFollowers;
  };
  
  const getAllFollowing = async(username,  maxConcurrent = 5) => {
    const fetchFollowers = async (cursor) => {
        const url = new URL('https://api.twitter.com/1.1/friends/list.json');
        url.search = new URLSearchParams({
          cursor,
          screen_name: username,
          count: 200,
          skip_status: true,
          include_user_entities: false,
        }).toString();
    
        const res = await fetch(url, {
          headers: {
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'
          }
        });
    
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
        return res.json();
      };
    
      let allFollowings = [];
      let cursors = [-1];
      
      while (cursors.length > 0) {
        const batch = cursors.splice(0, maxConcurrent);
        const responses = await Promise.all(batch.map(fetchFollowers));
        
        for (const { users, next_cursor } of responses) {
          allFollowings.push(...users.map(user => ({
            id: user.id_str,
            name: user.name,
            username: user.screen_name,
            bio: user.description,
            follower: user.followers_count,
            following: user.friends_count,
            pfp: user.profile_image_url_https,
            post: user.statuses_count,
            age: `<t:${Math.floor(new Date(user.created_at).getTime() / 1000)}:R>`
          })));
          
          if (next_cursor) cursors.push(next_cursor);
        }
      }
    
      return allFollowings;
  }
  
  const createUIFirstFollowerResult = async (username, result) => {
    const loading = document.createElement("div");
    loading.classList.add("loader");
    result.appendChild(loading);
  
    const followers = await getAllFollowers(username);
    const firstfollowers = followers.slice(-150).reverse();
    
    loading.remove();
    let outputHTML = '';
  
    firstfollowers.forEach(user => {
        outputHTML += ` <div class="container-content">
                            <a href="https://twitter.com/${user.username}" target="_blank"><img src="${user.pfp}" alt="pfp"></a>
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
  
  const createUIRecentFollowingResult = async (username, result) => {
    const loading = document.createElement("div");
    loading.classList.add("loader");
    result.appendChild(loading);
  
    const followings = await getAllFollowing(username);
    const recentfollowing = followings.slice(0,200);
  
    loading.remove();
    let outputHTML = '';
  
    recentfollowing.forEach(user => {
        outputHTML += ` <div class="container-content">
                            <a href="https://twitter.com/${user.username}" target="_blank"><img src="${user.pfp}" alt="pfp"></a>
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