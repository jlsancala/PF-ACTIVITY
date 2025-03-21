// Switch to the Feed page after profile creation
document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user inputs
    const name = document.getElementById('name').value;
    const birthday = document.getElementById('birthday').value;
    const bio = document.getElementById('bio').value;
    const quote = document.getElementById('quote').value;
    const profilePic = document.getElementById('profile-pic').files[0];

    // Create profile picture URL
    const reader = new FileReader();
    reader.onloadend = function() {
        // Store user data and display it on feed page
        localStorage.setItem('profileData', JSON.stringify({
            name, birthday, bio, quote, profilePic: reader.result
        }));

        // Display profile data on feed page
        document.getElementById('profile-page').classList.add('hidden');
        document.getElementById('feed-page').classList.remove('hidden');

        const profileData = JSON.parse(localStorage.getItem('profileData'));
        document.getElementById('profile-image').src = profileData.profilePic;
        document.getElementById('profile-name').textContent = profileData.name;
        document.getElementById('profile-bio').textContent = profileData.bio;
        document.getElementById('profile-quote').textContent = `"${profileData.quote}"`;
    };

    reader.readAsDataURL(profilePic);
});

// Posting a tweet
document.getElementById('post-button').addEventListener('click', function() {
    const tweetText = document.getElementById('tweet-input').value;

    if (tweetText.trim() !== '') {
        const tweetContainer = document.getElementById('tweets');

        // Create new tweet
        const tweetDiv = document.createElement('div');
        tweetDiv.classList.add('tweet');

        const profileData = JSON.parse(localStorage.getItem('profileData'));

        tweetDiv.innerHTML = `
            <img src="${profileData.profilePic}" alt="Profile Image">
            <div class="tweet-content">
                <strong>${profileData.name}</strong>
                <p>${tweetText}</p>
            </div>
            <button class="like-button">❤️</button>
        `;

        tweetContainer.prepend(tweetDiv);

        // Reset the tweet input
        document.getElementById('tweet-input').value = '';
    }
});

// Limiting the number of tweets to 3
document.getElementById('tweets').addEventListener('DOMNodeInserted', function(event) {
    const tweets = document.getElementById('tweets').children;
    if (tweets.length > 3) {
        tweets[3].remove();
    }
});


// Function to show a popup message
function showPopupMessage() {
    alert('The cow says "meow"');
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', showPopupMessage);
    });
});