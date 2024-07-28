var quotes = [
    "“In three words I can sum up everything I’ve learned about life: It goes on.” -Robert Frost",
    "“The most common way people give up their power is by thinking they don’t have any.” -Alice Walker",
    "“There is no better compass than compassion.” – Amanda Gorman",
    "“Vitality shows not only in the ability to persist but in the ability to start over.” -F. Scott Fitzgerald",
    "“Love yourself first and everything else falls into line.” – Lucille Ball",
    "“It is never too late to be what you might have been.” -George Eliot",
    "“Keep your face always toward the sunshine, and shadows will fall behind you.” -Walt Whitman",
    "“If you’re having fun, that’s when the best memories are built.” -Simone Biles",
    "“Definitions belong to the definers, not the defined.” -Toni Morrison",
    "“A problem is a chance for you to do your best.” -Duke Ellington",
    "“Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you.” -Mary Lou Retton",
    "“To live is the rarest thing in the world. Most people just exist.” -Oscar Wilde",
    "“Your story is what you have, what you will always have. It is something to own.” -Michelle Obama",
    "“If you prioritize yourself, you are going to save yourself.” –Gabrielle Union",
    "“Failure is the condiment that gives success its flavor.” –Truman Capote",
    "“First you do, then you become.” - Iman Gadzhi"
]

let quoteText = document.querySelector(".quote_text");

function generateQuote () {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var quote = quotes[randomIndex];
    quoteText.innerHTML = quote;
}