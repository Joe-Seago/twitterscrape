import fetch from 'isomorphic-fetch'

// Twitter uses OAuth for access to its API
// Use Application-only authentication (since our endpoints won't require user context)
// App-Only Auth docs: https://dev.twitter.com/oauth/application-only


/*------------- FETCH ACTIONS ---------------*/

// POST req to -> /oauth2/token
//
// request = {
//  method: 'POST',
//  headers: {
//    "Authorization": "Basic " + bearerToken,
//    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//  },
//  "Content-Length": "29",
//  body: "grant_type=client_credentials"
// }

// Retrieve tweets from Twitter API, arranged by users with most followers
export var fetchGetTweets = (userSearch) => {
  console.log("in fetchGetTweets, ", userSearch)
  return (dispatch) => {
    let url = 'http://localhost:8080/tweets'
    let request = {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: {
        "userSearch": userSearch
      }
    }
    return fetch(url, request)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        console.log('2')
        const error = new Error(response.statusText)
        error.response = response
        throw error
      }
      return response.json()
    })
    .then((tweets) => {
      console.log(tweets, "<--Response Body")

      return dispatch(
        fetchGetTweetsSuccess(tweets)
      )
    })
    .catch((error) => {
      return dispatch(
        fetchGetTweetsError(error)
      )
    })
  }
}


/*------- FETCH SUCCESS / ERROR ACTIONS --------*/

export const FETCH_GET_TWEETS_SUCCESS = 'FETCH_GET_TWEETS_SUCCESS'
export var fetchGetTweetsSuccess = (tweets) => {
  return {
    type: FETCH_GET_TWEETS_SUCCESS,
    tweets: tweets
  }
}

export const FETCH_GET_TWEETS_ERROR = 'FETCH_GET_TWEETS_ERROR'
export var fetchGetTweetsError = (error) => {
  return {
    type: FETCH_GET_TWEETS_SUCCESS,
    error: error
  }
}
