
new Vue ({
    el: '#app',
    data: {
        mission: "We fight to protect and preserve marine life. Every helping hand contributes to the safety and well-being of sea animals in and around Australia.",
        teamCTA: "Meet some of the team",
        team: [
            {
                id: 1,
                name: "Jesse Hoppo",
                bio: "Jesse leads education partnerships and turns field knowledge into volunteer programs that are practical, welcoming, and measurable.",
                role: "Founder"
            },
            {
                id: 2,
                name: "Arthur Perets",
                bio: "Arthur coordinates events, partner relationships, and coastal action days so volunteers can move from interest to impact quickly.",
                role: "Events Lead"
            },
            {
                id: 3,
                name: "Loay Abdel.",
                bio: "Loay brings animal welfare experience to rescue support, rehabilitation logistics, and volunteer training across marine care projects.",
                role: "Care Lead"
            }
        ]
    },
    methods: {
        created() {

            //change api endpoint to correct route
            fetch('api/team')
                .then(response => response.json())
                .then(data => {
                    this.team = data;
                });

                //change api endpoint to correcr route
            fetch('api/mission')
                .then(response => response.json())
                .then(data => {
                    this.mission = data;
                });
        }
    }
});










document.addEventListener('DOMContentLoaded', function() {
    // Get references to the menu toggle button and the navigation links
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Add event listener to toggle the visibility of navigation links
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

});


