let currentUser = null;
let users = []; // This will hold the list of users

document.addEventListener("DOMContentLoaded", function() {
    // Load users from localStorage
    loadUsers();

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutButton = document.getElementById('logoutButton');
    const userInfo = document.getElementById('user-info');
    const newsfeedSection = document.getElementById('newsfeed');
    const postSection = document.getElementById('postSection');
    const loginSignupSection = document.getElementById('loginSignup');
    const showLoginButton = document.getElementById('showLogin');
    const showSignupButton = document.getElementById('showSignup');

    // Check user login status
    if (localStorage.getItem('currentUser')) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }

    showLoginButton?.addEventListener('click', function() {
        window.location.href = 'login.html';
    });

    showSignupButton?.addEventListener('click', function() {
        window.location.href = 'signup.html';
    });

    loginForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const user = users.find(user => user.username === username && user.password === password);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = 'index.html'; // Redirect after login
        } else {
            document.getElementById('loginMessage').textContent = 'Invalid username or password';
        }
    });

    signupForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        const role = document.getElementById('signupRole').value;

        if (!users.find(user => user.username === username)) {
            const newUser = { username, password, role };
            users.push(newUser);
            saveUsers(); // Save updated users list to localStorage
            alert('Thank you for signing up! Start posting your services now!');
            currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = 'index.html'; // Redirect after sign up
        } else {
            document.getElementById('signupMessage').textContent = 'Username already exists';
        }
    });

    logoutButton.addEventListener('click', function() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateUIForLoggedOutUser();
    });

    function loadUsers() {
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }
    }

    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function updateUIForLoggedInUser() {
        userInfo.textContent = `${currentUser.username} (${currentUser.role})`;
        logoutButton.style.display = 'inline';
        newsfeedSection.style.display = 'block';
        loginSignupSection.style.display = 'none';

        // Handle post creation if user is a customer
        if (currentUser.role === 'customer') {
            const postForm = document.createElement('form');
            postForm.innerHTML = `
                <h3>Create a Post</h3>
                <textarea id="postContent" placeholder="What's on your mind?" required></textarea>
                <button type="submit">Post</button>
            `;
            postForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const content = document.getElementById('postContent').value;
                const postId = Date.now();
                const post = { id: postId, content, author: currentUser.username };
                displayPost(post);
                postForm.reset();
            });
            postSection.innerHTML = ''; // Clear any previous forms
            postSection.appendChild(postForm);
        }
    }

    function updateUIForLoggedOutUser() {
        userInfo.textContent = '';
        logoutButton.style.display = 'none';
        newsfeedSection.style.display = 'none';
        loginSignupSection.style.display = 'block';
    }

    function displayPost(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <p>${post.content}</p>
            <p>Posted by: ${post.author}</p>
            ${currentUser.role === 'customer' && post.author === currentUser.username ? 
                `<button class="delete-post" data-id="${post.id}">Delete</button>` : ''}
        `;
        postSection.appendChild(postDiv);

        const deleteButtons = document.querySelectorAll('.delete-post');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const postId = this.getAttribute('data-id');
                // Remove post from storage or backend (not shown here)
                postSection.removeChild(this.parentElement);
            });
        });
    }
});
