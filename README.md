<b>URL Shortener Microservice</b><br>
freeCodeCamp URL Shortener Microservice Basejump

<b>Objective:</b> Build a full stack JavaScript app that is functionally similar to <a href="https://little-url.herokuapp.com/">this</a> and deploy it to Glitch.

Note that for each project, you should create a new GitHub repository and a new Glitch project. If you can't remember how to do this, revisit <a href="https://freecodecamp.org/challenges/get-set-for-our-api-development-projects">this</a>.

Here are the specific user stories you should implement for this project:

<b>User Story:</b> I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

<b>User Story:</b> If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

<b>User Story:</b> When I visit that shortened URL, it will redirect me to my original link.

<b>Pro Tip:</b> Checkout this <a href="https://forum.freecodecamp.org/t/guide-for-using-mongodb-and-deploying-to-heroku/19347">wiki article</a> for tips on integrating MongoDB on Glitch.

<b>Example URL creation usage:</b><br>
<code>https://ms1-url-micro.glitch.me/api/url/https://www.google.com</code><br>
<code>https://ms1-url-micro.glitch.me/api/url/http://foo.com:80</code><br>

<b>Example URL creation output:</b><br>
<code>{ "original_url":"http://foo.com:80", "short_url":"https://ms1-url-micro.glitch.me/8170" }</code>


<b>Example URL usage</b><br>
<code>https://ms1-url-micro.glitch.me/2871</code>

<b>Example URL redirects to</b><br>
<code>https://www.google.com</code>