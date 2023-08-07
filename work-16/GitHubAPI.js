class GithubUserFinder {
    static USERNAME_INPUT = '#usernameInput'
    static SEARCH_BUTTON = '#searchButton'
    static AVATAR = '#avatar'
    static REPOSITORY_COUNT = '#reposCount'
    static FOLLOWERS_COUNT = '#followersCount'
    static FOLLOWING_COUNT = '#followingCount'

    constructor() {
        this.usernameInput = document.querySelector(GithubUserFinder.USERNAME_INPUT);
        this.searchButton = document.querySelector(GithubUserFinder.SEARCH_BUTTON);
        this.avatar = document.querySelector(GithubUserFinder.AVATAR);
        this.reposCount = document.querySelector(GithubUserFinder.REPOSITORY_COUNT);
        this.followersCount = document.querySelector(GithubUserFinder.FOLLOWERS_COUNT);
        this.followingCount = document.querySelector(GithubUserFinder.FOLLOWING_COUNT);

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
        this.reposCount.textContent = userData.public_repos;
        this.followersCount.textContent = userData.followers;
        this.followingCount.textContent = userData.following;
    }

    showUserNotFoundError() {
        alert("User not found");
    }
}