import axios from 'axios';

export default {
    scrape_usa: function() {
        return axios.get('/api/scrape/usa')
    },
    scrape_states: function() {
        return axios.get('/api/scrape/states')
    }
}