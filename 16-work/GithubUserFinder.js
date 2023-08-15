class GithubUserFinder {
    static USERNAME_INPUT = "#usernameInput";
    static SEARCH_BUTTON = "#searchButton";
    static AVATAR = "#avatar";
    static USER_INFO_TEXT = "#userInfoText";

    constructor() {
        this.usernameInput = document.querySelector(GithubUserFinder.USERNAME_INPUT);
        this.searchButton = document.querySelector(GithubUserFinder.SEARCH_BUTTON);
        this.avatar = document.querySelector(GithubUserFinder.AVATAR);
        this.userInfoText = document.querySelector(GithubUserFinder.USER_INFO_TEXT);

        this.searchButton.addEventListener("click", this.searchUser.bind(this));
    }

    async searchUser() {
        const username = this.usernameInput.value;

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error("User not found");
            }
            const userData = await response.json();
            this.displayUserInfo(userData);
        } catch (error) {
            console.error("Error:", error);
            this.showUserNotFoundError();
        } finally {
            this.usernameInput.value = "";
        }
    }

    displayUserInfo(userData) {
        this.avatar.src = userData.avatar_url;

        this.userInfoText.innerHTML = `
      <p>Repositories: <span>${userData.public_repos}</span></p>
      <p>Followers: <span>${userData.followers}</span></p>
      <p>Following: <span>${userData.following}</span></p>
    `;
    }

    showUserNotFoundError() {
        alert("User not found");
    }
}