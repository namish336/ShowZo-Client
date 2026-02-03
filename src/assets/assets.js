import logo from './logo.png'
import marvelLogo from './marvelLogo.svg'
import googlePlay from './googlePlay.svg'
import appStore from './appStore.svg'
import screenImage from './screenImage.svg'
import profile from './profile.png'

export const assets = {
    logo,
    marvelLogo,
    googlePlay,
    appStore,
    screenImage,
    profile

}

export const dummyTrailers = [
    {
        image: "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=WpW36ldAqnM'
    },
    {
        image: "https://img.youtube.com/vi/-sAOWhvheK8/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=-sAOWhvheK8'
    },
    {
        image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y'
    },
    {
        image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=umiKiW4En9g'
    },
]

const dummyCastsData = [
    { "name": "Milla Jovovich", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Dave Bautista", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Arly Jover", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Amara Okereke", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", },
    { "name": "Fraser James", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg", },
    { "name": "Deirdre Mullins", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg", },
    { "name": "Sebastian Stankiewicz", "profile_path": "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg", },
    { "name": "Tue Lunding", "profile_path": "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg", },
    { "name": "Jacek Dzisiewicz", "profile_path": "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg", },
    { "name": "Ian Hanmore", "profile_path": "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg", },
    { "name": "Eveline Hall", "profile_path": "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg", },
    { "name": "Kamila Klamut", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Caoilinn Springall", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg", },
    { "name": "Jan Kowalewski", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Pawel Wysocki", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Simon Lööf", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg", },
    { "name": "Tomasz Cymerman", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", }
]

export const dummyShowsData = [
    {
        "_id": "324544",
        "id": 324544,
        "title": "Scream 7",
        "overview": "When a new Ghostface killer emerges in the quiet town where Sidney Prescott has built a new life, her darkest fears are realized as her daughter becomes the next target",
        "poster_path": "https://i.redd.it/h6979x0yy8yf1.jpeg",
        "backdrop_path": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQVpb1Weke40vqM-UUYXOhKRn87XhK1Xj59A&s",
        "genres": [
            { "id": 28, "name": "Horror" },
            { "id": 14, "name": "Thriller" },
            { "id": 12, "name": "Mystery" }
        ],
        "casts": dummyCastsData,
        "release_date": "2026-02-27",
        "original_language": "en",
        "tagline": "She seeks the power to free her people.",
        "vote_average": 7.4,
        "vote_count": 15000,
        "runtime": 114,
    },
    {
        "_id": "1232546",
        "id": 1232546,
        "title": "Border 2",
        "overview": " This war epic narrates the story of Subedar Joginder Singh Sahnan who led a platoon against the Chinese aggressors, in the 1962 Indo-China war",
        "poster_path": "https://m.media-amazon.com/images/M/MV5BMTUxZjgwNTItMjQ5Yy00NGU4LTlhMGYtY2ZiN2Y2ZmQ1MTRiXkEyXkFqcGc@._V1_.jpg",
        "backdrop_path": "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRjNMbMcQCkN-UtMtbwOT4bp7AgY_2sOwJY87RwVwt_RTqXtvYOyH1bqs69FCJB2QQKjFg9N3RzwBRYWugj",
        "genres": [
            { "id": 27, "name": "War" },
            { "id": 9648, "name": "Action" }
        ],
        "casts": dummyCastsData,
        "release_date": "2026-04-23",
        "original_language": "en",
        "tagline": "Every night a different nightmare.",
        "vote_average": 7.205,
        "vote_count": 18000,
        "runtime": 155,
    },
    {
        "_id": "552524",
        "id": 552524,
        "title": "Dhurander 2",
        "overview": "Hamza Ali Mazari's continues his relentless pursuit to topple the Pakistani crime system, eyeing the shifty Major Iqbal. As his journey unfolds, so does his transformative history..",
        "poster_path": "https://m.media-amazon.com/images/M/MV5BZTJiZmE0MzItOWIwZC00YjE0LTkzZmMtZjdjZTgxZjg3ZDQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5BZTJiZmE0MzItOWIwZC00YjE0LTkzZmMtZjdjZTgxZjg3ZDQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "genres": [
            { "id": 10751, "name": "Action" },
            { "id": 35, "name": "Thriller" },
            { "id": 878, "name": "Spy" }
        ],
        "casts": dummyCastsData,
        "release_date": "2026-05-17",
        "original_language": "en",
        "tagline": "Hold on to your coconuts.",
        "vote_average": 8.117,
        "vote_count": 27500,
        "runtime": 208,
    },
    {
        "_id": "668489",
        "id": 668489,
        "title": "Project Hail Mary",
        "overview": "Science teacher Ryland Grace wakes up on a spaceship with no recollection of who he is or how he got there. As his memory slowly returns, he soon discovers he must solve the riddle behind a mysterious substance that's causing the sun to die out.",
        "poster_path": "https://cdn.district.in/movies-assets/images/cinema/G%20Project-Hail-Mary-b79dfed0-5651-11f0-b09a-11c880b90aa7.jpg",
        "backdrop_path": "https://cdn.district.in/movies-assets/images/cinema/G%20Project-Hail-Mary-b79dfed0-5651-11f0-b09a-11c880b90aa7.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 80, "name": "Science-fiction" },
            { "id": 53, "name": "Adventure" }
        ],
        "casts": dummyCastsData,
        "release_date": "2026-04-25",
        "original_language": "en",
        "tagline": "No law. Only disorder.",
        "vote_average": 6.537,
        "vote_count": 35960,
        "runtime": 166,
    },
    {
        "_id": "950387",
        "id": 950387,
        "title": "Swayambhu",
        "overview": "This tale unfolds the journey of an emperor who forged an era of unparalleled prosperity and achievement, leaving an indelible mark on history as he ushered in a golden age of civilization",
        "poster_path": "https://cdn.district.in/movies-assets/images/cinema/SWAYAMBHU-poster-c45d0340-4040-11f0-aa9f-8fefdb33bbbf.jpg",
        "backdrop_path": "https://cdn.district.in/movies-assets/images/cinema/SWAYAMBHU-poster-c45d0340-4040-11f0-aa9f-8fefdb33bbbf.jpg",
        "genres": [
            { "id": 10751, "name": "Action" },
            { "id": 35, "name": "Drama" },
            { "id": 12, "name": "Adventure" },
            { "id": 14, "name": "Fantasy" }
        ],
        "casts": dummyCastsData,
        "release_date": "2026-03-31",
        "original_language": "en",
        "tagline": "Be there and be square.",
        "vote_average": 6.216,
        "vote_count": 15225,
        "runtime": 122,
    },
    {
        "_id": "575265",
        "id": 575265,
        "title": "Your Name",
        "overview": "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5BOTkzMGIyYzAtMDQyYi00OTkxLWI2ZGMtODNmYjMyMWM3ZGY1XkEyXkFqcGc@._V1_.jpg",
        "backdrop_path": "https://i.pinimg.com/736x/5d/1f/e2/5d1fe27edafbecd06ef5c6bd1d375465.jpg",
        "genres": [
            { "id": 28, "name": "Romance" },
            { "id": 12, "name": "Fantasy" },
            { "id": 53, "name": "Drama" }
        ],
        "casts": dummyCastsData,
        "release_date": "2016-05-17",
        "original_language": "en",
        "tagline": "Our lives are the sum of our choices.",
        "vote_average": 8.442,
        "vote_count": 19885,
        "runtime": 106,
    },
    {
        "_id": "986056",
        "id": 986056,
        "title": "Tu Ya Main",
        "overview": "After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.",
        "poster_path": "https://cdn.district.in/movies-assets/images/cinema/Tu-Ya-Main-psoter-10fc63d0-edf2-11f0-b2b0-a1088fac5852.jpg",
        "backdrop_path": "https://cdn.district.in/movies-assets/images/cinema/Tu-Ya-Main-psoter-10fc63d0-edf2-11f0-b2b0-a1088fac5852.jpg",
        "genres": [
            { "id": 28, "name": "Romance" },
            { "id": 878, "name": "Thriller" },
            { "id": 12, "name": "Survival" }
        ],
        "casts": dummyCastsData,
        "release_date": "2026-04-30",
        "original_language": "en",
        "tagline": "Everyone deserves a second shot.",
        "vote_average": 5.443,
        "vote_count": 23569,
        "runtime": 132,
    }
]

export const dummyDateTimeData = {
    "2025-07-24": [
        { "time": "2025-07-24T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-07-24T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-07-24T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
    ],
    "2025-07-25": [
        { "time": "2025-07-25T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd4" },
        { "time": "2025-07-25T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd5" },
        { "time": "2025-07-25T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd6" }
    ],
    "2025-07-26": [
        { "time": "2025-07-26T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd7" },
        { "time": "2025-07-26T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd8" },
        { "time": "2025-07-26T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd9" }
    ],
    "2025-07-27": [
        { "time": "2025-07-27T01:00:00.000Z", "showId": "68395b407f6329be2bb45bda" },
        { "time": "2025-07-27T03:00:00.000Z", "showId": "68395b407f6329be2bb45bdb" },
        { "time": "2025-07-27T05:00:00.000Z", "showId": "68395b407f6329be2bb45bdc" }
    ]
}

export const dummyDashboardData = {
    "totalBookings": 14,
    "totalRevenue": 1517,
    "totalUser": 5,
    "activeShows": [
        {
            "_id": "68352363e96d99513e4221a4",
            "movie": dummyShowsData[0],
            "showDateTime": "2025-06-30T02:30:00.000Z",
            "showPrice": 59,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "C1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "6835238fe96d99513e4221a8",
            "movie": dummyShowsData[1],
            "showDateTime": "2025-06-30T15:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221a9",
            "movie": dummyShowsData[2],
            "showDateTime": "2025-06-30T03:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221aa",
            "movie": dummyShowsData[3],
            "showDateTime": "2025-07-15T16:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A4": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "683682072b5989c29fc6dc0d",
            "movie": dummyShowsData[4],
            "showDateTime": "2025-06-05T15:30:00.000Z",
            "showPrice": 49,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
            "__v": 0
        },
        {
            "_id": "68380044686d454f2116b39a",
            "movie": dummyShowsData[5],
            "showDateTime": "2025-06-20T16:00:00.000Z",
            "showPrice": 79,
            "occupiedSeats": {
                "A1": "user_2xl7eCSUHddibk5lRxfOtw9RMwX",
                "A2": "user_2xl7eCSUHddibk5lRxfOtw9RMwX"
            }
        }
    ]
}


export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 400,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 200,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 600,
        "bookedSeats": ["A1", "A2", "A3"],
        "isPaid": true,
    },
]