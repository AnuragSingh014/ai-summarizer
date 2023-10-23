import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidAPIKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY

export const articleApi = createApi({
    reducerPath: 'articleApi',
    
    baseQuery: fetchBaseQuery({
        baseUrl:"https://article-extractor-and-summarizer.p.rapidapi.com/",
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key',rapidAPIKey);
            headers.set('X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),

    endpoints: (builder)=>({

        // whenever we pass a url, the url may contain some special parameters, so we use a built in function encodeURIComponents which is built in in javascript
        
        getSummary: builder.query({
            query: (p) => `/summarize?url=${encodeURIComponent(p.articleUrl)}&length=3`
        })
    })
});

// export const {useGetSummaryQuery} = articleApi;  -> we would have used it if we want to call it immediately at the start, but we want to call it once we enter the url and press the button

// so we use useLazyGetSummaryQuery

export const {useLazyGetSummaryQuery} = articleApi