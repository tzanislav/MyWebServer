import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

new Vue({
  el: '#app',
  data: {
    name: '',
    age: '',
    entries: [],
  },
  created() {
    // Fetch the list of saved entities from your server
    axios.get('/entries')
      .then(response => {
        this.entries = response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
  methods: {
    addEntry() {
      const data = { name: this.name, age: this.age };
      axios.post('/entries', data)
        .then(response => {
          console.log(response.data.message);
          this.entries.push(data);
          this.name = '';
          this.age = '';
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
});
