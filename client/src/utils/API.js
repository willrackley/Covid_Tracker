import axios from 'axios';

export default {
    scrape_usa: function() {
        return axios.get('/api/scrape/usa')
    },
    scrape_states: function() {
        return axios.get('/api/scrape/states')
    },
    get_latest_usa_stats: function() {
        return axios.get('/api/usa_stats')
    },
    get_latest_states_stats: function() {
        return axios.get('/api/states_stats')
    },
    save_current_usa_stats: function(saved_stats) {
        return axios.post('/api/usa_stats/saved', saved_stats)
    },
    save_current_states_stats: function(saved_stats) {
        return axios.post('/api/states_stats/saved', saved_stats)
    }
}