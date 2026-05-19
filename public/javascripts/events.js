document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const form = document.querySelector('.event-creation-form, .event-creation form');
    if (!form) {
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            title: document.getElementById('title')?.value,
            description: document.getElementById('description')?.value,
            event_date: document.getElementById('event_date')?.value,
            org_id: document.getElementById('org_id')?.value,
        };

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                form.reset();
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    });
});

if (typeof Vue !== 'undefined' && document.getElementById('app') && document.querySelector('.event-form')) {
    new Vue({
        el: '#app',
        data: {
            isMenuActive: false,
            searchTerm: '',
            events: [
                {
                    event_id: 'fallback-1',
                    title: 'Adelaide Shoreline Reset',
                    description: 'Morning cleanup and debris audit along a high-impact metro beach.',
                    event_date: '2026-05-25',
                    location: 'South Australia',
                    category: 'Cleanup',
                    image: 'images/event-page/upcoming_event1.jpg'
                },
                {
                    event_id: 'fallback-2',
                    title: 'Reef Watch Field Morning',
                    description: 'Collect simple reef-health observations with trained conservation coordinators.',
                    event_date: '2026-06-02',
                    location: 'Queensland',
                    category: 'Research',
                    image: 'images/event-page/upcoming_event2.jpg'
                },
                {
                    event_id: 'fallback-3',
                    title: 'Marine Care Supply Sort',
                    description: 'Prepare rescue, transport, and rehabilitation supplies for wildlife care teams.',
                    event_date: '2026-06-09',
                    location: 'Victoria',
                    category: 'Wildlife care',
                    image: 'images/event-page/upcoming_event3.jpg'
                }
            ],
            newEvent: {
                org_id: '',
                title: '',
                description: '',
                event_date: ''
            }
        },
        computed: {
            filteredEvents() {
                const term = this.searchTerm.trim().toLowerCase();
                if (!term) {
                    return this.events;
                }

                return this.events.filter(event => {
                    return [event.title, event.description, event.location, event.category]
                        .filter(Boolean)
                        .some(value => value.toLowerCase().includes(term));
                });
            }
        },
        mounted() {
            this.loadEvents();
        },
        methods: {
            toggleMenu() {
                this.isMenuActive = !this.isMenuActive;
            },
            formatDate(dateValue) {
                if (!dateValue) {
                    return 'Date to be confirmed';
                }

                return new Intl.DateTimeFormat('en-AU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }).format(new Date(dateValue));
            },
            async loadEvents() {
                try {
                    const response = await axios.get('/api/events');
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        this.events = response.data.map((event, index) => ({
                            location: 'Australia',
                            category: 'Volunteer',
                            image: `images/event-page/upcoming_event${(index % 3) + 1}.jpg`,
                            ...event
                        }));
                    }
                } catch (error) {
                    console.info('Using sample events until the API has event data.');
                }
            },
            async createEvent() {
                const createdEvent = {
                    event_id: `local-${Date.now()}`,
                    location: 'Australia',
                    category: 'Community',
                    image: 'images/event-page/upcoming_event1.jpg',
                    ...this.newEvent
                };

                try {
                    await axios.post('/api/events', this.newEvent);
                } catch (error) {
                    console.info('Event saved locally for preview because the API is unavailable.');
                }

                this.events.unshift(createdEvent);
                this.newEvent = {
                    org_id: '',
                    title: '',
                    description: '',
                    event_date: ''
                };
            }
        }
    });
}
